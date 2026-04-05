import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    displayPreview: true,
    adminThumbnail: ({ doc }) => `/api/media/file/${doc.filename as string}`,
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['preview', 'alt', 'updatedAt', 'url'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'preview',
      type: 'ui',
      admin: {
        components: {
          Cell: '@/components/admin/MediaThumbnailCell',
        },
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
