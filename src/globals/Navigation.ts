import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  versions: { drafts: false },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'dev' || user?.role === 'admin',
  },
  fields: [
    {
      name: 'navLinks',
      type: 'array',
      label: 'Nav Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'ctaLinks',
      type: 'array',
      label: 'CTA Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
