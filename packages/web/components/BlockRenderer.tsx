import React, { Fragment } from 'react'
import { CodeBlock } from '@/components/custom-blocks/CodeBlock'
import { ImageBlock } from '@/components/custom-blocks/ImageBlock'

// --- Type Definitions for Lexical Editor ---

// This represents a single node in the Lexical JSON structure
type LexicalNode = {
  type: string
  children?: LexicalNode[]
  direction?: 'ltr' | 'rtl' | null
  format?: string | number
  indent?: number
  version: number
  style?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'ul' | 'ol' | 'li'
  text?: string
  fields?: {
    blockType: string
    [key: string]: unknown
  }
  [key: string]: unknown
}

// This is the root structure of the 'content' field from Payload
export type LexicalRoot = {
  root: {
    children: LexicalNode[]
    direction: 'ltr' | 'rtl' | null
    format: string | number
    indent: number
    type: 'root'
    version: number
  }
}

// --- Block Components ---
// A mapping from block slugs (from the CMS) to their corresponding React components.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockComponents: { [key: string]: React.FC<any> } = {
  code: CodeBlock,
  image: ImageBlock,
}

// --- The Serializer ---
// This function recursively walks the Lexical node tree and renders components.

const serialize = (nodes: LexicalNode[]): React.ReactNode => {
  return nodes.map((node, i) => {
    if (node.type === 'text') {
      let text = <span dangerouslySetInnerHTML={{ __html: node.text || '' }} />
      if (node.bold) {
        text = <strong key={i}>{text}</strong>
      }
      if (node.italic) {
        text = <em key={i}>{text}</em>
      }
      if (node.underline) {
        text = <u key={i}>{text}</u>
      }
      // Handle other text formatting like strikethrough, code, etc. if needed
      return <Fragment key={i}>{text}</Fragment>
    }

    if (!node) {
      return null
    }

    switch (node.type) {
      case 'heading':
        const Tag = node.tag || 'p'
        const tagClasses: { [key: string]: string } = {
          h1: 'text-4xl lg:text-5xl font-bold my-6 lg:my-8',
          h2: 'text-3xl lg:text-4xl font-bold my-5 lg:my-7',
          h3: 'text-2xl lg:text-3xl font-bold my-4 lg:my-6',
          h4: 'text-xl lg:text-2xl font-bold my-3 lg:my-5',
          h5: 'text-lg lg:text-xl font-bold my-2 lg:my-4',
          h6: 'text-base lg:text-lg font-bold my-1 lg:my-3',
        }
        return (
          <Tag key={i} className={tagClasses[node.tag || ''] || 'mb-4'}>
            {serialize(node.children || [])}
          </Tag>
        )
      case 'paragraph':
        return <p key={i} className="my-4">{serialize(node.children || [])}</p>
      case 'list':
        const ListTag = node.tag || 'ul'
        const listClasses = 'list-disc list-outside my-4 ml-6'
        return <ListTag key={i} className={listClasses}>{serialize(node.children || [])}</ListTag>
      case 'listitem':
        return <li key={i} className="mb-2">{serialize(node.children || [])}</li>
      case 'link':
        const url = (node.fields?.url as string) || ''
        return (
          <a href={url} key={i} className="text-blue-600 hover:underline">
            {serialize(node.children || [])}
          </a>
        )
      case 'linebreak':
        return <br key={i} />
      case 'block':
        if (node.fields) {
          const Component = blockComponents[node.fields.blockType]
          if (Component) {
            return <Component key={i} {...node.fields} />
          }
        }
        return (
          <div key={i} className="border-2 border-dashed border-yellow-400 p-4">
            <p className="font-semibold text-yellow-600">
              {`Unknown CMS Block: "${node.fields?.blockType || 'unknown'}"`}
            </p>
          </div>
        )
      default:
        return <p key={i}>{serialize(node.children || [])}</p>
    }
  })
}

// --- The Master Block Renderer ---

interface BlockRendererProps {
  content: LexicalRoot
  className?: string
}

export const BlockRenderer = ({ content, className }: BlockRendererProps) => {
  if (!content?.root?.children) {
    return <p>This post has no content.</p>
  }

  const serializedContent = serialize(content.root.children)

  return (
    <div className={`prose lg:prose-xl max-w-none ${className}`}>
      {serializedContent}
    </div>
  )
}
