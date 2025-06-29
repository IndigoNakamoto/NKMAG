import type { CollectionConfig, Field } from 'payload'
import type { Post } from '@/payload-types'

import { lexicalEditor, BlocksFeature, FixedToolbarFeature } from '@payloadcms/richtext-lexical'
// import { RichTextBlock } from '../components/Blocks/RichTextBlock'
import { ImageBlock } from '../components/Blocks/ImageBlock'
import { CodeBlock } from '../components/Blocks/CodeBlock'
import { BlockchainDataBlock } from '../components/Blocks/BlockchainDataBlock'
import { formatSlug } from '../utils/formatSlug'

const postFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
  },
  {
    name: 'excerpt',
    type: 'textarea',
    label: 'Excerpt',
    admin: {
      description: 'A short summary of the post to display on list pages or in social media previews.',
    },
  },
  {
    name: 'featuredImage',
    type: 'upload',
    relationTo: 'media',
    label: 'Featured Image',
    admin: {
      position: 'sidebar',
      description: 'Select or create tags for this post.',
    },
  },
  {
    name: 'content',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ defaultFeatures }) => [
        ...defaultFeatures,
        FixedToolbarFeature(),
        BlocksFeature({
          blocks: [ImageBlock, CodeBlock, BlockchainDataBlock], // Add your custom blocks here [richTextBlock],
        }),
      ],
    }),
  },
]

const sidebarFields: Field[] = [

  {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    admin: {
      position: 'sidebar',
      description: 'A unique identifier for the URL. Will be auto-generated from the title.',
    },
    hooks: {
      beforeValidate: [formatSlug('title')],
    },
  },
  {
    name: 'author',
    type: 'relationship',
    relationTo: 'users',
    required: true,
    admin: {
      position: 'sidebar',
    },
  },
  {
    name: 'status',
    type: 'select',
    options: [
      { value: 'draft', label: 'Draft' },
      { value: 'published', label: 'Published' },
    ],
    defaultValue: 'draft',
    required: true,
    admin: {
      position: 'sidebar',
    },
  },
  {
    name: 'tags',
    type: 'select',
    hasMany: true,
    options: [],
    admin: {
      position: 'sidebar',
      description: 'Select or create tags for this post.',
    },
  },
  {
    name: 'featured',
    type: 'checkbox',
    label: 'Feature this Post',
    defaultValue: false,
    admin: {
      position: 'sidebar',
    },
  },
  {
    name: 'publishedDate',
    type: 'date',
    label: 'Published Date',
    admin: {
      position: 'sidebar',
      date: {
        pickerAppearance: 'dayOnly',
      },
    },
  },
  {
    name: 'meta',
    label: 'SEO & Social Media',
    type: 'group',
    admin: {
      position: 'sidebar',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Meta Title',
        admin: {
          description: 'Title for social media previews and search engines. Defaults to post title.',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Meta Description',
        admin: {
          description: 'Description for social media previews and search engines. Defaults to post excerpt.',
        },
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Social Media Image',
        admin: {
          description: 'Image for social media previews. Defaults to Featured Image.',
        },
      },
    ],
  },
]

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'updatedAt'],
    preview: (doc: any) => {
      // The web app is on a different port, so we need a full URL
      const webUrl = process.env.PAYLOAD_PUBLIC_WEB_URL || 'http://localhost:3001'
      return doc.slug ? `${webUrl}/blog/${doc.slug}` : null
    },
  },
  timestamps: true,
  fields: [...postFields, ...sidebarFields],
}
