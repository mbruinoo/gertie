import type { Metadata } from 'next'
import Script from 'next/script'
import { getPayload } from 'payload'
import config from '@payload-config'
import { buildMetadata } from '@/lib/buildMetadata'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 }).catch(() => null)
  return {
    ...buildMetadata({ settings }),
    icons: { icon: '/favicon.svg', shortcut: '/favicon.svg', apple: '/favicon.svg' },
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
