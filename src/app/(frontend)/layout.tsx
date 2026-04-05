import type { Metadata } from 'next'
import Script from 'next/script'
import { getPayload } from 'payload'
import config from '@payload-config'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

  const title = (settings as any)?.siteTitle || 'Gertie — Contemporary Art, Chicago'
  const description = (settings as any)?.defaultDescription || 'From the world to Chicago and Chicago to the world.'
  const ogImage = (settings as any)?.defaultOgImage?.url ?? null

  return {
    title,
    description,
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    },
    openGraph: {
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://static.klaviyo.com/onsite/js/XWD7PF/klaviyo.js"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
