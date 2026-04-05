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

export const Exhibitions: CollectionConfig = {
  slug: 'exhibitions',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'dateStart', 'dateEnd', '_status', 'updatedAt'],
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
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Past', value: 'past' },
      ],
    },
    {
      name: 'dateStart',
      type: 'date',
      label: 'Start Date',
    },
    {
      name: 'dateEnd',
      type: 'date',
      label: 'End Date',
    },
    {
      name: 'venue',
      type: 'text',
      label: 'Venue / Location',
    },
    {
      name: 'curators',
      type: 'text',
      hasMany: true,
      label: 'Curators',
    },
    {
      name: 'presenting',
      type: 'text',
      label: 'Presented By',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: fullEditor,
    },
    {
      name: 'artists',
      type: 'array',
      label: 'Artists',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Artist Name',
        },
      ],
    },
    {
      name: 'documents',
      type: 'array',
      label: 'Documents',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Link Text',
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          label: 'File (upload PDF)',
          admin: {
            description: 'Upload a PDF. If provided, this takes precedence over the URL field below.',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            description: 'Use for internal paths (e.g. /exhibitions/over-my-head/labels) or external links. Ignored if a file is uploaded above.',
          },
        },
      ],
    },
    {
      name: 'labels',
      type: 'array',
      label: 'Exhibition Labels',
      fields: [
        {
          name: 'artistName',
          type: 'text',
          required: true,
          label: 'Artist Name',
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Label Content',
          editor: fullEditor,
        },
        {
          name: 'audioCaption',
          type: 'text',
          label: 'Audio Caption',
        },
        {
          name: 'audioUrl',
          type: 'text',
          label: 'Audio URL',
        },
      ],
    },
    {
      name: 'installationImages',
      type: 'array',
      label: 'Installation Images',
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
}
