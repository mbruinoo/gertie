import MastheadScroll from './MastheadScroll'
import Link from 'next/link'

type MastheadPhoto = {
  url: string
  alt: string
}

type MastheadProps = {
  tagline: string
  photos: MastheadPhoto[]
}

const photoConfigs = [
  { className: 'floating-photo-a', caption: 'Learn more about exhibitions', href: '/exhibitions', captionAbove: true },
  { className: 'floating-photo-b', caption: 'Learn more about the Gertie Hub', href: '/hub', captionAbove: false },
  { className: 'floating-photo-c', caption: 'Learn more about membership', href: '/membership', captionAbove: false },
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
          <Link
            key={i}
            href={config.href}
            className={config.className}
            style={{ position: 'absolute', willChange: 'transform', display: 'block', textDecoration: 'none', color: 'inherit' }}
          >
            {config.captionAbove && (
              <div className="masthead-caption">
                {config.caption} &#8594;
              </div>
            )}
            <div className="masthead-floating-photo-crop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            {!config.captionAbove && (
              <div className="masthead-caption">
                {config.caption} &#8594;
              </div>
            )}
          </Link>
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
