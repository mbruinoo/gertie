import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gertie — Contemporary Art, Chicago',
  description: 'From the world to Chicago and Chicago to the world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
