'use client'

import { useEffect } from 'react'

export default function AccordionController() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLDetailsElement>('.team-accordion-item'))

    // Initialize: add .is-open to items that start open (SSR-rendered)
    items.forEach((details) => {
      if (details.open) {
        details.querySelector('.team-accordion-bio')?.classList.add('is-open')
      }
    })

    const handlers: Array<{ summary: Element; handler: (e: Event) => void }> = []

    items.forEach((details) => {
      const summary = details.querySelector('summary')
      if (!summary) return

      const handler = (e: Event) => {
        e.preventDefault()
        const bio = details.querySelector<HTMLElement>('.team-accordion-bio')
        if (!bio) return

        if (details.open) {
          // Close: remove .is-open, wait for transition, then remove open
          bio.classList.remove('is-open')
          const onEnd = () => {
            details.removeAttribute('open')
            bio.removeEventListener('transitionend', onEnd)
          }
          bio.addEventListener('transitionend', onEnd)
        } else {
          // Open: set open so content renders, then double-rAF to trigger transition
          details.setAttribute('open', '')
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              bio.classList.add('is-open')
            })
          })
        }
      }

      summary.addEventListener('click', handler)
      handlers.push({ summary, handler })
    })

    return () => {
      handlers.forEach(({ summary, handler }) => summary.removeEventListener('click', handler))
    }
  }, [])

  return null
}
