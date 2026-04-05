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
      name: 'hideHeroRule',
      type: 'checkbox',
      label: 'Hide hero rule (hr)',
      defaultValue: false,
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
          admin: { description: 'Overrides the page title for social sharing. Leave blank to use page title.' },
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          label: 'OG Description',
          admin: { description: 'Overrides the site default description for this page.' },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'OG Image',
          admin: { description: 'Overrides the site default OG image. Recommended: 1200×630px PNG.' },
        },
      ],
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
        {
          slug: 'membershipOptions',
          labels: { singular: 'Membership Options', plural: 'Membership Options' },
          fields: [
            {
              name: 'cards',
              type: 'array',
              label: 'Cards',
              minRows: 2,
              maxRows: 2,
              fields: [
                { name: 'cardType', type: 'text', label: 'Card Type', required: true },
                { name: 'tagline', type: 'text', label: 'Tagline' },
                { name: 'tierName', type: 'text', label: 'Tier Name' },
                { name: 'price', type: 'text', label: 'Price / Availability' },
                { name: 'ctaLabel', type: 'text', label: 'CTA Label' },
                { name: 'ctaUrl', type: 'text', label: 'CTA URL' },
                {
                  name: 'ctaStyle',
                  type: 'select',
                  label: 'CTA Style',
                  options: [
                    { label: 'Filled (yellow)', value: 'filled' },
                    { label: 'Outline', value: 'outline' },
                  ],
                  defaultValue: 'filled',
                },
                {
                  name: 'perks',
                  type: 'array',
                  label: 'Perks',
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
              ],
            },
          ],
        },
        {
          slug: 'memberEvents',
          labels: { singular: 'Member Events Section', plural: 'Member Events Sections' },
          fields: [
            { name: 'subtitle', type: 'text', label: 'Subtitle', admin: { description: 'e.g. "Interested in our member events?"' } },
            { name: 'ctaLabel', type: 'text', label: 'CTA Label', defaultValue: 'Learn more' },
            { name: 'ctaUrl', type: 'text', label: 'CTA URL' },
          ],
        },
        {
          slug: 'hubHero',
          labels: { singular: 'Hub Hero Image', plural: 'Hub Hero Images' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', label: 'Image' },
          ],
        },
        {
          slug: 'hubInfo',
          labels: { singular: 'Hub Info (Address & Hours)', plural: 'Hub Info Sections' },
          fields: [
            { name: 'address', type: 'textarea', label: 'Address' },
            { name: 'hours', type: 'textarea', label: 'Hours' },
          ],
        },
        {
          slug: 'curatedExperiences',
          labels: { singular: 'Curated Experiences', plural: 'Curated Experiences' },
          fields: [
            { name: 'ctaLabel', type: 'text', label: 'CTA Label', defaultValue: 'Learn more' },
            { name: 'ctaUrl', type: 'text', label: 'CTA URL' },
            {
              name: 'upcomingItems',
              type: 'array',
              label: 'Upcoming Trips',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'note', type: 'text', label: 'Note (e.g. date in parens)' },
              ],
            },
            { name: 'disclaimer', type: 'text', label: 'Disclaimer' },
            {
              name: 'experiences',
              type: 'array',
              label: 'Curated Experience Items',
              fields: [
                { name: 'date', type: 'text', label: 'Date (e.g. April 2026)' },
                { name: 'title', type: 'text', required: true },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Image' },
                { name: 'body', type: 'textarea', label: 'Body Text' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
