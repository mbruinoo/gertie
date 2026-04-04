'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Exhibitions', href: '/exhibitions' },
  { label: 'Membership', href: '/membership' },
  { label: 'Hub', href: '/hub' },
  { label: 'CXW 2026', href: '/cxw-2026', accent: true },
]

const ctaLinks = [
  { label: 'Become a member', href: '/membership' },
  { label: 'Sign in', href: '/login' },
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

export default function Nav({ transparent = false }: { transparent?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)

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
          backgroundColor: transparent ? 'transparent' : 'white',
        }}
      >
        {/* Left: wordmark (non-homepage) + nav links pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {!transparent && (
            <Link href="/" style={{ ...linkStyle, fontWeight: 700, fontSize: '16px' }}>
              Gertie
            </Link>
          )}

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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ ...linkStyle, fontWeight: link.accent ? 500 : 300 }}
                {...linkHover}
              >
                {link.label}
              </Link>
            ))}
          </div>
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
          justifyContent: 'flex-end',
          width: '100svw',
          position: 'fixed',
          top: 0,
          zIndex: 100,
          boxSizing: 'border-box',
          backgroundColor: 'white',
        }}
      >
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
      {mobileOpen && (
        <div
          className="flex md:hidden"
          style={{
            position: 'fixed',
            top: '56px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            zIndex: 99,
            flexDirection: 'column',
            padding: 'var(--padding)',
            gap: '4px',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'Abcrom, Arial, sans-serif',
                fontSize: '32px',
                fontWeight: link.accent ? 500 : 300,
                lineHeight: '1.2',
                color: '#1b1b1b',
                textDecoration: 'none',
                padding: '8px 0',
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {ctaLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'Abcrom, Arial, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
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
      )}
    </>
  )
}
