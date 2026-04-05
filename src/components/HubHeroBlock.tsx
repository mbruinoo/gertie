import Image from 'next/image'

export default function HubHeroBlock({
  image,
}: {
  image?: { url?: string; alt?: string; width?: number; height?: number } | null
}) {
  if (!image?.url) return null
  return (
    <div className="hub-hero-wrap">
      <div className="hub-hero-image">
        <Image
          src={image.url}
          alt={image.alt ?? 'Gertie Hub'}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </div>
  )
}
