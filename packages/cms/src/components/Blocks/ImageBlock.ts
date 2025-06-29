import type { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'image',
  labels: {
    singular: 'Image',
    plural: 'Image Blocks',
  },
  fields: [
    {
      name: 'zIndex',
      type: 'number',
      label: 'z-index',
    },
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
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Is this a featured image?',
    },
  ],
}
