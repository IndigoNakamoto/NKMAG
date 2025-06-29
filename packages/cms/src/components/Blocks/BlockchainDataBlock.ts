import type { Block } from 'payload'

export const BlockchainDataBlock: Block = {
  slug: 'blockchainData',
  labels: {
    singular: 'Blockchain Data',
    plural: 'Blockchain Data Blocks',
  },
  fields: [
    {
      name: 'coin',
      type: 'select',
      options: [
        { label: 'Bitcoin', value: 'bitcoin' },
        { label: 'Litecoin', value: 'litecoin' },
        { label: 'Dogecoin', value: 'dogecoin' },
      ],
      required: true,
    },
    {
      name: 'displayStyle',
      type: 'select',
      options: [
        { label: 'Price Card', value: 'priceCard' },
        { label: 'Simple Ticker', value: 'simpleTicker' },
      ],
      required: true,
    },
  ],
}
