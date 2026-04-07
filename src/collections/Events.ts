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
      name: 'tickerPrefix',
      type: 'select',
      label: 'Ticker Prefix',
      options: [
        { label: 'Exhibition', value: 'EXHIBITION' },
        { label: 'Membership', value: 'MEMBERSHIP' },
        { label: 'Hub', value: 'HUB' },
      ],
      admin: {
        description: 'Label shown before this event in the homepage ticker.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Opening', value: 'opening' },
        { label: 'Talk', value: 'talk' },
        { label: 'Walkthrough', value: 'walkthrough' },
        { label: 'Dinner', value: 'dinner' },
        { label: 'Performance', value: 'performance' },
        { label: 'Party', value: 'party' },
        { label: 'Music', value: 'music' },
        { label: 'Open Studios', value: 'open-studios' },
        { label: 'Studio Visit', value: 'studio-visit' },
        { label: 'Collection Visit', value: 'collection-visit' },
        { label: 'Trip', value: 'trip' },
        { label: 'Fair', value: 'fair' },
        { label: 'Screening', value: 'screening' },
        { label: 'Curated Experience', value: 'curated-experience' },
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
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Tags',
      admin: {
        description: 'e.g. "Chicago Art Week", "EXPO Chicago"',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'About the Event',
    },
  ],
}
