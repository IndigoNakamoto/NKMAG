import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'

// Define a generic Block type
interface Block {
  blockType: 'code'
  language: string
  code: string
}

export const CodeBlock = (block: Block) => {
  return (
    <Highlight
      theme={themes.dracula}
      code={block.code}
      language={block.language || 'tsx'}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="not-prose bg-gray-900 rounded-xl my-8 overflow-hidden border border-gray-700">
          <div className="text-xs text-gray-400 bg-gray-800/50 px-4 py-2 font-mono">
            {block.language}
          </div>
          <pre className={`${className} p-4 overflow-x-auto text-sm`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  )
}
