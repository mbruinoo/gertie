'use client'

import { useEffect, useRef } from 'react'

type MastheadPhoto = {
  url: string
  alt: string
  caption?: string
}

type MastheadProps = {
  tagline: string
  photos: MastheadPhoto[]
}

const photoConfigs = [
  {
    className: 'floating-photo-a',
    style: { top: '10svw', left: '5svw', zIndex: 1 },
    rate: 0.4,
    scale: 1,
    showCaption: true,
  },
  {
    className: 'floating-photo-b',
    style: { top: '8svw', right: '10svw', transform: 'scale(0.85)' },
    rate: 0.7,
    scale: 0.85,
    showCaption: true,
  },
  {
    className: 'floating-photo-c',
    style: { bottom: '10svh', right: '15svw', transform: 'scale(0.7)' },
    rate: 0.05,
    scale: 0.7,
    showCaption: false,
  },
]

export default function Masthead({ tagline, photos }: MastheadProps) {
  const photoRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const configs = photoRefs.current.map((el, i) => ({
      el,
      rate: photoConfigs[i]?.rate ?? 0,
      scale: photoConfigs[i]?.scale ?? 1,
    }))

    let ticking = false
    const onScroll = () => {
      const scrollY = window.scrollY
      if (!ticking) {
        requestAnimationFrame(() => {
          configs.forEach(({ el, rate, scale }) => {
            if (!el) return
            el.style.transform = `translateY(${scrollY * rate}px) scale(${scale})`
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    // Single relative container — both the background and wordmark overlay
    // are scoped to this so absolute positioning works correctly
    <div
      style={{
        position: 'relative',
        width: '100svw',
        height: '94svh',
        backgroundColor: '#c6c5be',
        overflow: 'hidden',
      }}
    >
      {/* Floating photos — behind wordmark */}
      {photos.slice(0, 3).map((photo, i) => {
        const config = photoConfigs[i]
        if (!config) return null
        return (
          <div
            key={i}
            ref={(el) => { photoRefs.current[i] = el }}
            style={{
              position: 'absolute',
              willChange: 'transform',
              ...config.style,
            }}
          >
            <div
              style={{
                overflow: 'clip',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '220px',
                height: '280px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            {config.showCaption && photo.caption && (
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '18px',
                  marginTop: '6px',
                  color: '#1b1b1b',
                }}
              >
                {photo.caption}
              </p>
            )}
          </div>
        )
      })}

      {/* Wordmark overlay — responsive via CSS classes */}
      <div className="masthead-overlay">
        <div className="masthead-inner">
          <h1 className="masthead-heading">Gertie</h1>
          <h2 className="masthead-tagline">{tagline}</h2>
        </div>
      </div>
    </div>
  )
}
