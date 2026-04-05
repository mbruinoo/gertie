export default function HubHeroBlock({
  image,
}: {
  image?: { url?: string; alt?: string } | null
}) {
  if (!image?.url) return null
  return (
    <div className="hub-hero-wrap">
      <div className="hub-hero-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt={image.alt ?? 'Gertie Hub'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}
