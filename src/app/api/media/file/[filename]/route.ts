import { promises as fs } from 'fs'
import path from 'path'
import { list } from '@vercel/blob'

const MIME_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  webm: 'video/webm',
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params
  const filePath = path.join(process.cwd(), 'media', filename)

  // Try local file first
  try {
    const file = await fs.readFile(filePath)
    const ext = filename.split('.').pop()?.toLowerCase() ?? ''
    const contentType = MIME_TYPES[ext] ?? 'application/octet-stream'

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Content-Length': String(file.length),
      'Cache-Control': 'public, max-age=3600',
    }

    if (ext === 'pdf') {
      headers['Content-Disposition'] = `attachment; filename="${filename}"`
    }

    return new Response(file, { headers })
  } catch {
    // Fall through to Vercel Blob
  }

  // Fall back to Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: filename, limit: 1 })
      if (blobs.length > 0) {
        return Response.redirect(blobs[0].url, 302)
      }
    } catch {
      // Fall through to 404
    }
  }

  return new Response('Not Found', { status: 404 })
}
