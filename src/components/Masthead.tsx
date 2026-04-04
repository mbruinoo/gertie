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
    <>
      {/* Wordmark overlay — sits above masthead, centered */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100svw',
          height: '94svh',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div style={{ textAlign: 'center', width: '80%', maxWidth: '1280px' }}>
          <h1
            style={{
              color: '#1b1b1b',
              fontSize: '300px',
              fontWeight: 700,
              lineHeight: '100px',
              margin: 0,
              fontFamily: 'Abcrom, Arial, sans-serif',
            }}
          >
            Gertie
          </h1>
          <h2
            style={{
              color: '#fff',
              fontSize: '32px',
              fontWeight: 500,
              lineHeight: '38px',
              margin: '32px auto 0',
              fontFamily: 'Abcrom, Arial, sans-serif',
            }}
          >
            {tagline}
          </h2>
        </div>
      </div>

      {/* Masthead background + floating photos */}
      <div
        style={{
          backgroundColor: '#c6c5be',
          width: '100svw',
          height: '94svh',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
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
      </div>
    </>
  )
}
