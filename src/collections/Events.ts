import type { CollectionConfig } from 'payload'
import { canPropose } from '../access/roles'

export const Events: CollectionConfig = {
  slug: 'events',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', '_status', 'updatedAt'],
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
        description: 'URL slug, e.g. "art-tennis-mixer" for /events/art-tennis-mixer',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Party', value: 'party' },
        { label: 'Dinner', value: 'dinner' },
        { label: 'Talk', value: 'talk' },
        { label: 'Exhibition', value: 'exhibition' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'timeRange',
      type: 'text',
      label: 'Time Range',
      admin: {
        description: 'e.g. "10am–1pm" or "10–11:30am"',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'venue',
      type: 'relationship',
      relationTo: 'venues',
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA (black button)',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA (white button)',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: 'About the Event',
    },
  ],
}
