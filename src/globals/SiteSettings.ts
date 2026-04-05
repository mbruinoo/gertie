import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  versions: { drafts: false },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      label: 'Site Title',
      defaultValue: 'Gertie — Contemporary Art, Chicago',
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      label: 'Default Meta Description',
      defaultValue: 'From the world to Chicago and Chicago to the world.',
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Default OG Image',
      admin: {
        description: 'Shown when sharing pages that have no page-specific OG image. Recommended: 1200×630px PNG.',
      },
    },
  ],
}
