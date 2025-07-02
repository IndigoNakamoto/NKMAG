import React from 'react'
import Link from 'next/link'
import { BlockRenderer, type LexicalRoot } from '@/components/BlockRenderer'

// Define a simple type for our Post documents, including the content blocks
interface Post {
  id: string
  title: string
  slug: string
  content: LexicalRoot
  createdAt: string
}

// Define a type for the collection response from Payload for a single post
interface CollectionResponse {
  docs: Post[]
}

// Props for the page component, Next.js passes params for dynamic routes
interface PageProps {
  params: {
    slug: string
  }
}

async function PostPage({ params }: PageProps) {
  const { slug } = await params
  let post: Post | null = null

  try {
    // Fetch the specific post by its slug from the Payload CMS
    const response = await fetch(
      `${process.env.PAYLOAD_API_URL}/posts?where[slug][equals]=${slug}`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`)
    }

    const data: CollectionResponse = await response.json()

    if (data.docs.length === 0) {
      // Handle case where no post is found for the given slug
      return (
        <main className="container mx-auto p-4">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p>The post you are looking for does not exist.</p>
          <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
            &larr; Back to Home
          </Link>
        </main>
      )
    }

    post = data.docs[0]
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error)
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-red-500">Could not load the post. Please try again later.</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-5xl font-extrabold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">
        Published on: {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-8">
        <BlockRenderer content={post.content} />
      </div>
    </main>
  )
}

// This function is needed for Next.js to know which slugs to generate at build time
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.PAYLOAD_API_URL}/posts?limit=100`)
    const data: CollectionResponse = await response.json()
    return data.docs.map(({ slug }) => ({ slug }))
  } catch (error) {
    console.error('Error fetching slugs for static generation:', error)
    return []
  }
}

export default PostPage
