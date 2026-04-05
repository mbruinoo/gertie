import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Exhibitions } from './collections/Exhibitions'
import { Events } from './collections/Events'
import { Venues } from './collections/Venues'
import { Media } from './collections/Media'
import { Tags } from './collections/Tags'

import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'
import { Homepage } from './globals/Homepage'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Pages, Exhibitions, Events, Venues, Media, Tags],
  globals: [Navigation, Footer, Homepage, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  email: resendAdapter({
    defaultFromAddress: process.env.EMAIL_FROM || 'no-reply@yourdomain.com',
    defaultFromName: 'Gertie',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
})
