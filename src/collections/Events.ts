import type { CollectionConfig } from 'payload'
import { canPropose } from '../access/roles'

// NOTE: Fields marked TBD will be updated once Matt provides the CSV files.
// See skill.md open questions: "Events CSV files — request from Matt before building Events collection"

export const Events: CollectionConfig = {
  slug: 'events',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', '_status', 'updatedAt'],
    description: 'Schema is a placeholder — update once CSV files are reviewed.',
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
      name: 'date',
      type: 'date',
    },
    {
      name: 'description',
      type: 'richText',
    },
  ],
}
