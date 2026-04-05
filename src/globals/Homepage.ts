import type { GlobalConfig } from 'payload'
import {
  lexicalEditor,
  FixedToolbarFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
} from '@payloadcms/richtext-lexical'

const fullEditor = lexicalEditor({
  features: () => [
    FixedToolbarFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    LinkFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    BlockquoteFeature(),
    HorizontalRuleFeature(),
  ],
})

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
      name: 'seo',
      type: 'group',
      label: 'SEO / Social Sharing',
      fields: [
        {
          name: 'ogTitle',
          type: 'text',
          label: 'OG Title',
          admin: { description: 'Overrides the site title for social sharing. Leave blank to use site title.' },
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          label: 'OG Description',
          admin: { description: 'Overrides the site default description for the homepage.' },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'OG Image',
          admin: { description: 'Recommended: 1200×630px PNG.' },
        },
      ],
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
          editor: fullEditor,
        },
      ],
    },
  ],
}
