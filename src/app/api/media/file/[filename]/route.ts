import { promises as fs } from 'fs'
import path from 'path'

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
    return new Response('Not Found', { status: 404 })
  }
}
