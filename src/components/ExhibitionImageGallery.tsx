'use client'

import { useState, useCallback, useEffect, createContext, useContext } from 'react'
import Image from 'next/image'
import { ExhibitionLightbox } from './ExhibitionLightbox'

type GalleryImage = {
  url: string
  alt?: string
  width?: number
  height?: number
}

// Simple window-event bridge so cover + grid can share lightbox state
// without needing a context provider wrapping the whole server component tree.

export function ExhibitionCoverClickable({ image, index }: { image: GalleryImage; index: number }) {
  const open = () => window.dispatchEvent(new CustomEvent('lightbox-open', { detail: { index } }))
  return (
    <div className="exhibition-cover-wrap" style={{ cursor: 'zoom-in' }} onClick={open}>
      <Image
        src={image.url}
        alt={image.alt ?? ''}
        width={image.width ?? 1600}
        height={image.height ?? 900}
        className="exhibition-cover"
        priority
      />
    </div>
  )
}

export function ExhibitionInstallationGrid({
  images,
  indexOffset,
}: {
  images: GalleryImage[]
  indexOffset: number
}) {
  if (images.length === 0) return null
  const open = (i: number) =>
    window.dispatchEvent(new CustomEvent('lightbox-open', { detail: { index: indexOffset + i } }))

  return (
    <div className="exhibition-body-section">
      <h3 className="exhibition-body-label">Installation views</h3>
      <div className="installation-grid">
        {images.map((img, i) => (
          <div
            key={i}
            className="installation-grid-item"
            style={{ cursor: 'zoom-in' }}
            onClick={() => open(i)}
          >
            <Image
              src={img.url}
              alt={img.alt ?? `Installation view ${i + 1}`}
              width={img.width ?? 1200}
              height={img.height ?? 800}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ExhibitionLightboxController({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null)

  useEffect(() => {
    const handler = (e: Event) => setIndex((e as CustomEvent).detail.index)
    window.addEventListener('lightbox-open', handler)
    return () => window.removeEventListener('lightbox-open', handler)
  }, [])

  const close = useCallback(() => setIndex(null), [])
  const prev = useCallback(() => setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)), [images.length])
  const next = useCallback(() => setIndex((i) => (i === null ? null : (i + 1) % images.length)), [images.length])

  if (index === null) return null
  return <ExhibitionLightbox images={images} index={index} onClose={close} onPrev={prev} onNext={next} />
}
