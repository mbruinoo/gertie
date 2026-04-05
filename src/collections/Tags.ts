import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'dev' || user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'dev' || user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'dev' || user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-safe identifier, e.g. "chicago-art-week"',
      },
    },
    {
      name: 'color',
      type: 'text',
      label: 'Badge Color (hex)',
      admin: {
        description: 'e.g. #1b1b1b — used for the badge background',
      },
    },
  ],
}
