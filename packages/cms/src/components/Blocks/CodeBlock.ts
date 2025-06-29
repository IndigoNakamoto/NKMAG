import type { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'code',
  labels: {
    singular: 'Code',
    plural: 'Code Blocks',
  },
  fields: [
    {
      name: 'zIndex',
      type: 'number',
      label: 'z-index',
    },
    {
      name: 'language',
      type: 'select',
      options: [
        { label: 'Mermaid', value: 'mermaid' },
        { label: 'Markdown', value: 'markdown' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Python', value: 'python' },
        { label: 'SQL', value: 'sql' },
        { label: 'MongoDB', value: 'mongodb' },
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'JSON', value: 'json' },
        { label: 'YAML', value: 'yaml' },
        { label: 'Shell/Bash', value: 'shell' },
        { label: 'Rust', value: 'rust' },
        { label: 'Go', value: 'go' },
        { label: 'C++', value: 'cpp' },
        { label: 'C#', value: 'csharp' },
        { label: 'Java', value: 'java' },
        { label: 'PHP', value: 'php' },
        { label: 'Ruby', value: 'ruby' },
      ],
    },
    {
      name: 'code',
      type: 'textarea',
      required: true,
    },
  ],
}
