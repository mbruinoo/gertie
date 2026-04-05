'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type ExhibitionItem = {
  slug: string
  title: string
  dateStart: string | null
  venue: string | null
}

function formatSidebarDate(dateStart: string | null): string | null {
  if (!dateStart) return null
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  const d = new Date(dateStart)
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

function ExhibitionEntry({ e, active, dimmed }: { e: ExhibitionItem; active: boolean; dimmed: boolean }) {
  const datePart = formatSidebarDate(e.dateStart)
  const meta = [datePart, e.venue].filter(Boolean).join(' at ')

  return (
    <Link
      href={`/exhibitions/${e.slug}`}
      className={`exhibition-sidebar-link${active ? ' exhibition-sidebar-link--active' : ''}`}
      style={{ opacity: dimmed ? 0.3 : 1, transition: 'opacity 0.15s ease' }}
    >
      <span className="exhibition-sidebar-link-title">{e.title}</span>
      {meta && <span className="exhibition-sidebar-link-meta">{meta}</span>}
    </Link>
  )
}

export default function ExhibitionSidebar({
  upcoming,
  past,
}: {
  upcoming: ExhibitionItem[]
  past: ExhibitionItem[]
}) {
  const pathname = usePathname()
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      setHoveredSlug((e as CustomEvent).detail.slug)
    }
    window.addEventListener('exhibition-hover', handler)
    return () => window.removeEventListener('exhibition-hover', handler)
  }, [])

  return (
    <nav className={`exhibition-sidebar${pathname !== '/exhibitions' ? ' exhibition-sidebar--detail' : ''}`}>
      <h4 className="exhibition-sidebar-heading" style={pathname === '/exhibitions' ? { visibility: 'hidden' } : undefined}>Exhibitions</h4>
      {upcoming.length > 0 && (
        <div className="exhibition-sidebar-section">
          <p className="exhibition-sidebar-group-label">Upcoming</p>
          {upcoming.map((e) => (
            <ExhibitionEntry
              key={e.slug}
              e={e}
              active={pathname.startsWith(`/exhibitions/${e.slug}`)}
              dimmed={hoveredSlug !== null && hoveredSlug !== e.slug}
            />
          ))}
        </div>
      )}
      {past.length > 0 && (
        <div className="exhibition-sidebar-section">
          <p className="exhibition-sidebar-group-label">Past</p>
          {past.map((e) => (
            <ExhibitionEntry
              key={e.slug}
              e={e}
              active={pathname.startsWith(`/exhibitions/${e.slug}`)}
              dimmed={hoveredSlug !== null && hoveredSlug !== e.slug}
            />
          ))}
        </div>
      )}
    </nav>
  )
}
