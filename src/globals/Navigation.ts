import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  versions: { drafts: false },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'navLinks',
      type: 'array',
      label: 'Nav Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'comingSoon', type: 'checkbox', label: 'Coming Soon (non-clickable)', defaultValue: false },
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
