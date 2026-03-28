import type { CollectionConfig } from 'payload'
import { canPublish, canPropose } from '../access/roles'

export const Exhibitions: CollectionConfig = {
  slug: 'exhibitions',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'dateStart', 'dateEnd', '_status', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: canPropose,
    update: canPropose,
    delete: ({ req: { user } }) => user?.role === 'dev' || user?.role === 'admin',
    readVersions: ({ req: { user } }) => !!user,
    publish: canPublish,
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
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Past', value: 'past' },
      ],
    },
    {
      name: 'dateStart',
      type: 'date',
      label: 'Start Date',
    },
    {
      name: 'dateEnd',
      type: 'date',
      label: 'End Date',
    },
    {
      name: 'venue',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'curators',
      type: 'text',
      hasMany: true,
      label: 'Curators',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
