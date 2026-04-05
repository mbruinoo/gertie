'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

type NavLink = { label: string; href: string; accent?: boolean }

const defaultNavLinks: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Exhibitions', href: '/exhibitions' },
  { label: 'Membership', href: '/membership' },
  { label: 'Hub', href: '/hub' },
  { label: 'CXW 2026', href: '/cxw-2026', accent: true },
]

const defaultCtaLinks: NavLink[] = [
  { label: 'Become a member', href: '/membership' },
  { label: 'Sign in', href: 'https://join.gertie.co/' },
]

const linkHover = {
  onMouseEnter: (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    el.style.backgroundColor = '#000'
    el.style.color = '#fff'
  },
  onMouseLeave: (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    el.style.backgroundColor = 'transparent'
    el.style.color = 'inherit'
  },
}

const linkStyle: React.CSSProperties = {
  fontFamily: 'Abcrom, Arial, sans-serif',
  fontSize: '16px',
  lineHeight: '20px',
  borderRadius: '60px',
  padding: '4px 8px 3px',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'background-color .2s cubic-bezier(.645,.045,.355,1), color .2s cubic-bezier(.645,.045,.355,1)',
}

function AccentNavItem({ link, hoverLabel, linkStyle, linkHover }: {
  link: NavLink
  hoverLabel: string
  linkStyle: React.CSSProperties
  linkHover: { onMouseEnter: (e: React.MouseEvent) => void; onMouseLeave: (e: React.MouseEvent) => void }
}) {
  const [hovered, setHovered] = useState(false)
  const labelRef = useRef<HTMLSpanElement>(null)
  const hoverRef = useRef<HTMLSpanElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (labelRef.current && hoverRef.current) {
      setScale(labelRef.current.offsetWidth / hoverRef.current.offsetWidth)
    }
  }, [])

  return (
    <span
      style={{ ...linkStyle, fontWeight: 500, cursor: 'default', position: 'relative', display: 'inline-block' }}
      onMouseEnter={(e) => { setHovered(true); linkHover.onMouseEnter(e) }}
      onMouseLeave={(e) => { setHovered(false); linkHover.onMouseLeave(e) }}
    >
      {/* Sizer: always holds space for the original label */}
      <span ref={labelRef} style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>{link.label}</span>
      {/* Hover label: measured offscreen then scaled to fit */}
      <span
        ref={hoverRef}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          whiteSpace: 'nowrap',
          transform: hovered ? `scale(${scale})` : 'scale(1)',
          opacity: hovered ? 1 : 0,
        }}
      >
        {hoverLabel}
      </span>
      {/* Original label */}
      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 0 : 1 }}>
        {link.label}
      </span>
    </span>
  )
}

export default function Nav({
  transparent = false,
  navLinks = defaultNavLinks,
  ctaLinks = defaultCtaLinks,
}: {
  transparent?: boolean
  navLinks?: NavLink[]
  ctaLinks?: NavLink[]
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      {/* ── Desktop nav ── */}
      <nav
        className="hidden md:flex"
        style={{
          padding: 'var(--padding) var(--padding) 0',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100svw',
          position: 'fixed',
          top: 0,
          zIndex: 100,
          boxSizing: 'border-box',
          backgroundColor: 'transparent',
        }}
      >
        {/* Left: wordmark (non-homepage) + nav links pill */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            backdropFilter: 'brightness(160%) blur(4px)',
            WebkitBackdropFilter: 'brightness(160%) blur(4px)',
            backgroundColor: 'rgba(255,255,255,0.32)',
            borderRadius: '30px',
            padding: '6px 10px',
          }}
        >
          {!transparent && (
            <Link href="/" style={{ ...linkStyle, fontWeight: 500, fontSize: '22px' }}>
              Gertie
            </Link>
          )}
          {navLinks.map((link) =>
            link.accent ? (
              <AccentNavItem
                key={link.href}
                link={link}
                hoverLabel="Coming Soon"
                linkStyle={linkStyle}
                linkHover={linkHover}
              />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                style={{ ...linkStyle, fontWeight: 300 }}
                {...linkHover}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Right: CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            borderRadius: '30px',
            padding: '6px 10px',
          }}
        >
          {ctaLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ ...linkStyle, fontWeight: 500 }}
              {...linkHover}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── Mobile nav bar ── */}
      <nav
        className="flex md:hidden"
        style={{
          padding: '0 var(--padding)',
          height: '56px',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100svw',
          position: 'fixed',
          top: 0,
          zIndex: 100,
          boxSizing: 'border-box',
          backgroundColor: 'white',
        }}
      >
        {!isHome ? (
          <Link href="/" style={{ ...linkStyle, fontWeight: 500, fontSize: '22px', paddingLeft: 0 }}>
            Gertie
          </Link>
        ) : (
          <span />
        )}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mobileOpen ? (
            /* Close icon */
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="2" y1="2" x2="18" y2="18" stroke="#1b1b1b" strokeWidth="2" strokeLinecap="round" />
              <line x1="18" y1="2" x2="2" y2="18" stroke="#1b1b1b" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
              <line x1="0" y1="1" x2="24" y2="1" stroke="#1b1b1b" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="8" x2="24" y2="8" stroke="#1b1b1b" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="15" x2="24" y2="15" stroke="#1b1b1b" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <div
        className={`mobile-nav-overlay${mobileOpen ? ' mobile-nav-overlay--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        {!isHome && (
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: 'Abcrom, Arial, sans-serif',
              fontSize: '32px',
              fontWeight: 500,
              lineHeight: '1.2',
              color: '#1b1b1b',
              textDecoration: 'none',
              padding: '8px 0',
            }}
          >
            Gertie
          </Link>
        )}
        {navLinks.map((link) =>
          link.accent ? (
            <span
              key={link.href}
              style={{
                fontFamily: 'Abcrom, Arial, sans-serif',
                fontSize: '32px',
                fontWeight: 500,
                lineHeight: '1.2',
                color: '#1b1b1b',
                padding: '8px 0',
              }}
            >
              {link.label} <span style={{ fontSize: '18px', fontWeight: 300 }}>Coming Soon</span>
            </span>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'Abcrom, Arial, sans-serif',
                fontSize: '32px',
                fontWeight: 300,
                lineHeight: '1.2',
                color: '#1b1b1b',
                textDecoration: 'none',
                padding: '8px 0',
              }}
            >
              {link.label}
            </Link>
          )
        )}

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {ctaLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'Abcrom, Arial, sans-serif',
                fontSize: '32px',
                fontWeight: 300,
                lineHeight: '1.2',
                color: '#1b1b1b',
                textDecoration: 'none',
                padding: '8px 0',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
