'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'

type LightboxImage = {
  url: string
  alt?: string
  width?: number
  height?: number
}

export function ExhibitionGallery({
  images,
  coverIndex,
  startIndex,
  onOpen,
}: {
  images: LightboxImage[]
  coverIndex: number | null
  startIndex: number
  onOpen: (index: number) => void
}) {
  // Cover click
  if (coverIndex !== null) {
    return null // handled separately
  }
  return null
}

export function ExhibitionLightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: LightboxImage[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const img = images[index]

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!img) return null

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      {/* Prev */}
      <button
        className="lightbox-arrow lightbox-arrow--prev"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous image"
      >
        ←
      </button>

      {/* Image */}
      <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
        <Image
          src={img.url}
          alt={img.alt ?? ''}
          width={img.width ?? 1600}
          height={img.height ?? 1200}
          style={{ maxWidth: '100%', maxHeight: '90svh', width: 'auto', height: 'auto', display: 'block' }}
          priority
        />
      </div>

      {/* Next */}
      <button
        className="lightbox-arrow lightbox-arrow--next"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next image"
      >
        →
      </button>

      {/* Counter + close */}
      <div className="lightbox-ui">
        <span className="lightbox-counter">{index + 1} / {images.length}</span>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
      </div>
    </div>
  )
}
