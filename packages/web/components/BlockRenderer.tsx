import React from 'react'

// Define a generic Block type
interface Block {
  id: string
  blockType: string
  [key: string]: unknown
}

// --- Placeholder Components ---
// In the future, these will be moved to their own files and fully implemented.

const RichTextBlock = ({ block }: { block: Block }) => (
  <div className="prose lg:prose-xl max-w-none">
    <h4>Rich Text Block</h4>
    <pre className="bg-gray-100 p-2 rounded text-sm">
      {JSON.stringify(block, null, 2)}
    </pre>
  </div>
)

const ImageBlock = ({ block }: { block: Block }) => (
  <div>
    <h4>Image Block</h4>
    <pre className="bg-gray-100 p-2 rounded text-sm">
      {JSON.stringify(block, null, 2)}
    </pre>
  </div>
)

const CodeBlock = ({ block }: { block: Block }) => (
  <div>
    <h4>Code Block</h4>
    <pre className="bg-gray-100 p-2 rounded text-sm">
      {JSON.stringify(block, null, 2)}
    </pre>
  </div>
)

const BlockchainDataBlock = ({ block }: { block: Block }) => (
  <div>
    <h4>Blockchain Data Block</h4>
    <pre className="bg-gray-100 p-2 rounded text-sm">
      {JSON.stringify(block, null, 2)}
    </pre>
  </div>
)

// A mapping from block type slugs to their corresponding components
const blockComponents: { [key: string]: React.FC<{ block: Block }> } = {
  RichTextBlock: RichTextBlock,
  ImageBlock: ImageBlock,
  CodeBlock: CodeBlock,
  BlockchainDataBlock: BlockchainDataBlock,
}

// --- The Master Block Renderer ---

interface BlockRendererProps {
  blocks: Block[]
}

export const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  if (!blocks || blocks.length === 0) {
    return <p>This post has no content.</p>
  }

  return (
    <div className="space-y-8">
      {blocks.map(block => {
        const Component = blockComponents[block.blockType]

        if (Component) {
          return <Component key={block.id} block={block} />
        }

        // Fallback for unknown block types
        return (
          <div key={block.id} className="border-2 border-dashed border-red-400 p-4">
            <p className="font-semibold text-red-600">
              {`Unknown Block Type: "${block.blockType}"`}
            </p>
            <pre className="text-xs mt-2 bg-red-50 p-2">
              {JSON.stringify(block, null, 2)}
            </pre>
          </div>
        )
      })}
    </div>
  )
}
