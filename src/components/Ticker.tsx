'use client'

import { useEffect, useRef } from 'react'

type TickerItem = {
  label: string
}

export default function Ticker({ items }: { items: TickerItem[] }) {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ticker = innerRef.current?.parentElement
    if (!ticker || !innerRef.current) return
    // Duplicate items for seamless loop — clone is already rendered below
  }, [])

  if (!items.length) return null

  const itemEls = items.map((item, i) => (
    <span
      key={i}
      style={{
        fontSize: '14px',
        lineHeight: '18px',
        paddingRight: '40px',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {item.label}
    </span>
  ))

  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#ffdb7d',
        height: '60px',
        overflow: 'hidden',
        alignItems: 'center',
      }}
    >
      {/* "Upcoming" pill */}
      <div
        style={{
          color: '#fff',
          backgroundColor: '#1f1f1f',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '30px',
          paddingRight: '30px',
          height: '100%',
          fontWeight: 700,
          fontSize: '14px',
          flexShrink: 0,
        }}
      >
        Upcoming
      </div>

      {/* Scrolling ticker */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <style>{`
          @keyframes ticker-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .ticker-inner {
            display: flex;
            white-space: nowrap;
            width: max-content;
            animation: ticker-scroll 60s linear infinite;
            align-items: center;
          }
        `}</style>
        <div className="ticker-inner">
          {/* Render twice for seamless loop */}
          {itemEls}
          {itemEls}
        </div>
      </div>
    </div>
  )
}
