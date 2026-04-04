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

export default function Nav({ transparent = false }: { transparent?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      style={{
        paddingTop: 'var(--padding)',
        paddingRight: 'var(--padding)',
        paddingLeft: 'var(--padding)',
        display: 'grid',
        gridTemplate: '"Area Area-2 Area-2 Area-2" / 1fr 1fr 1fr 1fr',
        width: '100svw',
        position: 'fixed',
        top: 0,
        zIndex: 100,
        boxSizing: 'border-box',
        backgroundColor: transparent ? 'transparent' : 'white',
      }}
    >
      {/* Left: wordmark — shown on all pages except homepage */}
      <div style={{ gridArea: 'Area', display: 'flex', alignItems: 'center' }}>
        {!transparent && (
          <Link
            href="/"
            style={{
              fontFamily: 'Abcrom, Arial, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Gertie
          </Link>
        )}
      </div>

      {/* Center: nav links */}
      <div
        style={{
          gridArea: 'Area-2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '12px',
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
              style={{
                fontFamily: 'Abcrom, Arial, sans-serif',
                fontSize: '16px',
                fontWeight: link.accent ? 500 : 300,
                lineHeight: '20px',
                borderRadius: '60px',
                padding: '4px 6px 3px',
                textAlign: 'center',
                transition:
                  'background-color .2s cubic-bezier(.645,.045,.355,1), transform .24s cubic-bezier(.439,.088,.25,1)',
                textDecoration: 'none',
                color: 'inherit',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = '#000'
                ;(e.currentTarget as HTMLElement).style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                ;(e.currentTarget as HTMLElement).style.color = 'inherit'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
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
              style={{
                fontFamily: 'Abcrom, Arial, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '20px',
                borderRadius: '60px',
                padding: '4px 6px 3px',
                textDecoration: 'none',
                color: 'inherit',
                transition:
                  'background-color .2s cubic-bezier(.645,.045,.355,1), transform .24s cubic-bezier(.439,.088,.25,1)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = '#000'
                ;(e.currentTarget as HTMLElement).style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                ;(e.currentTarget as HTMLElement).style.color = 'inherit'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
