'use client'

import { useState, useRef } from 'react'

const tagColors: Record<string, string> = {
  opening:            '#7cc8e8',
  talk:               '#5cd8cc',
  walkthrough:        '#c44848',
  dinner:             '#d07848',
  performance:        '#9868c8',
  party:              '#e06080',
  music:              '#6888d0',
  'open-studios':     '#f0d840',
  'studio-visit':     '#b868d8',
  'collection-visit': '#58a8d8',
  trip:               '#e8b030',
  fair:               '#88c040',
  screening:          '#d04868',
}

const categoryLabels: Record<string, string> = {
  opening:            'Opening',
  talk:               'Talk',
  walkthrough:        'Walkthrough',
  dinner:             'Dinner',
  performance:        'Performance',
  party:              'Party',
  music:              'Music',
  'open-studios':     'Open Studios',
  'studio-visit':     'Studio Visit',
  'collection-visit': 'Collection Visit',
  trip:               'Trip',
  fair:               'Fair',
  screening:          'Screening',
}

// Light backgrounds need dark text
const lightPills = new Set(['open-studios', 'trip'])
function pillTextColor(category: string) {
  return lightPills.has(category) ? '#1b1b1b' : '#fff'
}

// Strip CXW/Chicago Art Week prefixes from display title — they're shown as pills instead
const TITLE_PREFIXES = ['Chicago Art Week | ', 'CXW | ']
function displayTitle(title: string) {
  for (const prefix of TITLE_PREFIXES) {
    if (title.startsWith(prefix)) return title.slice(prefix.length)
  }
  return title
}

interface EventItem {
  id: number
  title: string
  category: string
  date: string | null
  coverImageUrl: string | null
  venueName: string
  tags: Array<{ id: number; name: string; slug: string; color: string | null }>
}

const PAGE_SIZE = 8

export default function MemberEventsList({ events }: { events: EventItem[] }) {
  const [showing, setShowing] = useState(PAGE_SIZE)
  const prevShowing = useRef(showing)

  const visible = events.slice(0, showing)
  const hasMore = events.length > showing

  function handleShowMore() {
    prevShowing.current = showing
    setShowing((n) => n + PAGE_SIZE)
  }

  return (
    <div className="member-events-scroll-outer">
      <div className="member-events-list">
        {visible.map((event, i) => {
          const isNew = i >= prevShowing.current
          const color = tagColors[event.category] ?? '#888'
          const label = categoryLabels[event.category] ?? event.category
          const dateStr = event.date
            ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : ''
          const meta = [event.venueName, dateStr].filter(Boolean).join(' · ')

          return (
            <a
              key={event.id}
              href="https://join.gertie.co/"
              target="_blank"
              rel="noopener noreferrer"
              className={`member-event-card${isNew ? ' member-event-card--new' : ''}`}
            >
              <div
                className="member-event-image"
                style={
                  event.coverImageUrl
                    ? {
                        backgroundImage: `url(${event.coverImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : { background: color }
                }
              >
                <div className="member-event-pills">
                  <span className="member-event-pill" style={{ background: color, color: pillTextColor(event.category) }}>
                    {label}
                  </span>
                  {event.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="member-event-pill"
                      style={{ background: tag.color ?? '#1b1b1b', color: '#fff' }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="member-event-info">
                <p className="member-event-title">{displayTitle(event.title)}</p>
                {meta && <h6 className="member-event-meta">{meta}</h6>}
              </div>
            </a>
          )
        })}
      </div>
      {hasMore && (
        <button className="member-events-show-more" onClick={handleShowMore}>
          Show more
        </button>
      )}
    </div>
  )
}
