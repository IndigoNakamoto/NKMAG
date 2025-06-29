import React from 'react'

// This should match the 'media' collection in Payload
interface Media {
  id: string
  url?: string | null
  alt?: string | null
}

// This should match the 'image' block in the CMS
interface Block {
  blockType: 'image'
  image: Media | string // The 'image' field can be an object or just an ID
  caption?: string
  featured?: boolean
}

export const ImageBlock = (block: Block) => {
  const { image, caption, featured } = block
  const imageUrl = typeof image === 'string' ? image : image?.url
  const altText = typeof image === 'string' ? 'Image' : image?.alt || 'Image'

  if (!imageUrl) {
    return (
      <div className="border-2 border-dashed border-gray-300 p-4 text-center">
        <p>Image not available</p>
      </div>
    )
  }

  const figureClasses = `my-8 ${featured ? 'w-full h-auto' : ''}`
  return (
    <figure className={figureClasses}>
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-auto rounded-lg shadow-lg"
      />
      {caption && (
        <figcaption className="text-center text-sm italic text-gray-500 mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
