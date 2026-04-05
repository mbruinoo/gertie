import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  versions: { drafts: false },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'dev' || user?.role === 'admin',
  },
  fields: [
    {
      name: 'klaviyoEmbedCode',
      type: 'textarea',
      label: 'Klaviyo Embed Code',
      admin: {
        description: 'Paste the full Klaviyo email signup embed HTML here.',
      },
    },
    {
      name: 'instagramUrl',
      type: 'text',
      label: 'Instagram URL',
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
    },
    {
      name: 'privacyPolicyPdf',
      type: 'upload',
      relationTo: 'media',
      label: 'Privacy Policy / Terms of Use PDF',
      admin: {
        description: 'Upload the PDF used for both the Terms of Use and Privacy Policy footer links.',
      },
    },
    {
      name: 'contactEmail',
      type: 'text',
      label: 'Contact Email',
      admin: {
        description: 'Used for "Contact Us" and "Press Inquiries" footer links.',
      },
    },
  ],
}
