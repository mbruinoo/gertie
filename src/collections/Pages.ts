import type { CollectionConfig } from 'payload'
import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  HeadingFeature,
  ParagraphFeature,
  BlockquoteFeature,
  OrderedListFeature,
  UnorderedListFeature,
  HorizontalRuleFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { canPropose } from '../access/roles'

const fullEditor = lexicalEditor({
  features: () => [
    FixedToolbarFeature(),
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
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

export const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
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
        description: 'URL slug, e.g. "about" for /about',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'richText',
          labels: { singular: 'Rich Text Section', plural: 'Rich Text Sections' },
          fields: [
            {
              name: 'sectionLabel',
              type: 'richText',
              label: 'Section Label',
              admin: { description: 'Short label shown in the left column (e.g. "About Gertie"). Bold/italic/link supported.' },
              editor: fullEditor,
            },
            {
              name: 'body',
              type: 'richText',
              required: true,
              editor: fullEditor,
            },
            {
              name: 'constrainWidth',
              type: 'checkbox',
              label: 'Constrain width (max 720px)',
              defaultValue: true,
            },
          ],
        },
        {
          slug: 'teamSection',
          labels: { singular: 'Accordion Section', plural: 'Accordion Sections' },
          fields: [
            {
              name: 'sectionLabel',
              type: 'richText',
              label: 'Section Label',
              editor: fullEditor,
            },
            {
              name: 'constrainWidth',
              type: 'checkbox',
              label: 'Constrain width (max 720px)',
              defaultValue: true,
            },
            {
              name: 'members',
              type: 'array',
              label: 'Items',
              required: true,
              labels: { singular: 'Accordion Item', plural: 'Accordion Items' },
              fields: [
                {
                  name: 'name',
                  type: 'richText',
                  label: 'Name',
                  editor: fullEditor,
                },
                {
                  name: 'description',
                  type: 'richText',
                  label: 'Description',
                  editor: fullEditor,
                },
              ],
            },
          ],
        },
        {
          slug: 'image',
          labels: { singular: 'Image', plural: 'Images' },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
