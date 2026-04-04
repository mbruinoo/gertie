import type { CollectionConfig } from 'payload'
import { canPropose } from '../access/roles'

export const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: canPropose,
    update: canPropose,
    delete: ({ req: { user } }) => user?.role === 'dev' || user?.role === 'admin',
    readVersions: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug, e.g. "about" for /about',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'richText',
          labels: { singular: 'Rich Text', plural: 'Rich Text' },
          fields: [
            {
              name: 'body',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          slug: 'teamSection',
          labels: { singular: 'Team Section', plural: 'Team Sections' },
          fields: [
            {
              name: 'members',
              type: 'array',
              required: true,
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'title', type: 'text' },
              ],
            },
          ],
        },
        {
          slug: 'image',
          labels: { singular: 'Image', plural: 'Images' },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
