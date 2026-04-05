'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

type Exhibition = {
  id: number
  slug: string
  title: string
  coverImage?: { url?: string; alt?: string } | null
}

export default function ExhibitionsCoverGrid({ exhibitions }: { exhibitions: Exhibition[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [slowUndim, setSlowUndim] = useState(false)
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearFade = () => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current)
  }

  const handleEnter = (slug: string) => {
    clearFade()
    setSlowUndim(false)
    setHoveredSlug(slug)
    window.dispatchEvent(new CustomEvent('exhibition-hover', { detail: { slug, slow: false } }))

    // After 2s of hovering, slowly fade others back to 1.0 over ~2s
    fadeTimer.current = setTimeout(() => {
      setSlowUndim(true)
      setHoveredSlug(null)
      window.dispatchEvent(new CustomEvent('exhibition-hover', { detail: { slug: null, slow: true } }))
    }, 2000)
  }

  const handleLeave = () => {
    clearFade()
    setSlowUndim(false)
    setHoveredSlug(null)
    window.dispatchEvent(new CustomEvent('exhibition-hover', { detail: { slug: null, slow: false } }))
  }

  return (
    <div className="exhibitions-cover-grid">
      {exhibitions.map((ex) => {
        const dimmed = hoveredSlug !== null && hoveredSlug !== ex.slug
        return (
          <Link
            key={ex.id}
            href={`/exhibitions/${ex.slug}`}
            className="exhibitions-cover-item"
            style={{ opacity: dimmed ? 0.5 : 1, transition: dimmed ? 'opacity 0.15s ease' : slowUndim ? 'opacity 2s ease' : 'opacity 0.15s ease' }}
            onMouseEnter={() => handleEnter(ex.slug)}
            onMouseLeave={handleLeave}
          >
            {ex.coverImage?.url ? (
              <Image
                src={ex.coverImage.url}
                alt={ex.coverImage.alt ?? ex.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="50vw"
              />
            ) : (
              <div style={{ background: '#f0f0f0', width: '100%', height: '100%' }} />
            )}
            <div className="exhibitions-cover-label">
              <p className="exhibitions-cover-title">{ex.title}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
