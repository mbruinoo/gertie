import type { GlobalConfig } from 'payload'
import { lexicalEditor, BoldFeature, ItalicFeature } from '@payloadcms/richtext-lexical'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  versions: { drafts: false },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'dev' || user?.role === 'admin' || user?.role === 'manager',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
    },
    {
      name: 'mastheadPhotos',
      type: 'array',
      label: 'Masthead Photos',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'richText',
          editor: lexicalEditor({
            features: () => [BoldFeature(), ItalicFeature()],
          }),
        },
      ],
    },
  ],
}
