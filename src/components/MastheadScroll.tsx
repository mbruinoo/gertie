'use client'

import { useEffect } from 'react'

// Attaches parallax scroll behavior to the photo elements rendered by the
// server component. Queries by class name so no refs need to cross the
// server/client boundary.
const scrollConfigs = [
  { selector: '.floating-photo-a', rate: 0.4,  scale: 1    },
  { selector: '.floating-photo-b', rate: 0.7,  scale: 0.85 },
  { selector: '.floating-photo-c', rate: 0.05, scale: 0.7  },
]

export default function MastheadScroll() {
  useEffect(() => {
    const targets = scrollConfigs.map(({ selector, rate, scale }) => ({
      el: document.querySelector<HTMLElement>(selector),
      rate,
      scale,
    }))

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          targets.forEach(({ el, rate, scale }) => {
            if (el) el.style.transform = `translateY(${scrollY * rate}px) scale(${scale})`
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
