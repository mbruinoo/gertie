'use client'
import React from 'react'

const IMAGE_EXTS = /\.(jpe?g|png|gif|webp|avif|svg)$/i

export default function MediaThumbnailCell({ rowData }: { rowData: Record<string, unknown> }) {
  const url = rowData?.url as string | undefined
  if (!url || !IMAGE_EXTS.test(url)) return null
  return (
    <img
      src={url}
      alt=""
      style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4, display: 'block' }}
    />
  )
}

export { MediaThumbnailCell }
