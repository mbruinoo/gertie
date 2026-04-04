import { RichText } from '@payloadcms/richtext-lexical/react'
import MastheadScroll from './MastheadScroll'

type MastheadPhoto = {
  url: string
  alt: string
  caption?: object | null
}

type MastheadProps = {
  tagline: string
  photos: MastheadPhoto[]
}

const photoConfigs = [
  { className: 'floating-photo-a', showCaption: true  },
  { className: 'floating-photo-b', showCaption: true  },
  { className: 'floating-photo-c', showCaption: false },
]

export default function Masthead({ tagline, photos }: MastheadProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100svw',
        height: '94svh',
        backgroundColor: '#c6c5be',
        overflow: 'hidden',
      }}
    >
      {/* Floating photos — positioned via CSS classes, parallax via MastheadScroll */}
      {photos.slice(0, 3).map((photo, i) => {
        const config = photoConfigs[i]
        if (!config) return null
        return (
          <div
            key={i}
            className={config.className}
            style={{ position: 'absolute', willChange: 'transform' }}
          >
            <div className="masthead-floating-photo-crop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            {config.showCaption && photo.caption && (
              <div className="masthead-caption">
                <RichText data={photo.caption} />
              </div>
            )}
          </div>
        )
      })}

      {/* Wordmark overlay */}
      <div className="masthead-overlay">
        <div className="masthead-inner">
          <h1 className="masthead-heading">Gertie</h1>
          <h2 className="masthead-tagline">{tagline}</h2>
        </div>
      </div>

      {/* Scroll behavior — client only, queries DOM by class name */}
      <MastheadScroll />
    </div>
  )
}
