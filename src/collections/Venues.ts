import type { CollectionConfig } from 'payload'

export const Venues: CollectionConfig = {
  slug: 'venues',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'address'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'dev' || user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
      admin: {
        description: 'Full street address, e.g. "5336 S State St, Chicago, IL 60609"',
      },
    },
    {
      name: 'hours',
      type: 'textarea',
      admin: {
        description: 'e.g. "Wed–Fri, 12–6pm\nSat–Sun, 10am–6pm"',
      },
    },
    {
      name: 'instagramHandle',
      type: 'text',
      admin: {
        description: 'Without the @ symbol',
      },
    },
  ],
}
