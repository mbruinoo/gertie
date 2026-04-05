import type { Metadata } from 'next'

/** Walk a page's block layout and return the first image URL found. */
function firstImageFromLayout(layout: any[]): string | null {
  for (const block of layout ?? []) {
    // image block
    if (block?.image?.url) return block.image.url
    // array of items with images (e.g. teamSection members, mastheadPhotos)
    for (const key of Object.keys(block ?? {})) {
      const val = block[key]
      if (Array.isArray(val)) {
        for (const item of val) {
          if (item?.image?.url) return item.image.url
        }
      }
    }
  }
  return null
}

export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackImageUrl,
  settings,
}: {
  seo?: { ogTitle?: string; ogDescription?: string; ogImage?: { url?: string } | null }
  fallbackTitle?: string
  fallbackImageUrl?: string | null
  settings: any
}): Metadata {
  const title = seo?.ogTitle || fallbackTitle || settings?.siteTitle || 'Gertie'
  const description = seo?.ogDescription || settings?.defaultDescription || ''
  const ogImage =
    seo?.ogImage?.url ||
    fallbackImageUrl ||
    settings?.defaultOgImage?.url ||
    null

  return {
    title,
    description,
    openGraph: { title, description, ...(ogImage ? { images: [{ url: ogImage }] } : {}) },
    twitter: { card: 'summary_large_image', title, description, ...(ogImage ? { images: [ogImage] } : {}) },
  }
}

export { firstImageFromLayout }
