import React from 'react'
import Link from 'next/link'

// Define a simple type for our Post documents
interface Post {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

// Define a type for the collection response from Payload
interface CollectionResponse {
  docs: Post[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

// This page will be rendered on the server
async function HomePage() {
  let posts: Post[] = []

  try {
    // Fetch posts from the Payload CMS
    const response = await fetch(
      `${process.env.PAYLOAD_API_URL}/posts?where[status][equals]=published`,
      {
        // Use Next.js's caching mechanism
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`)
    }

    const data: CollectionResponse = await response.json()
    posts = data.docs
  } catch (error) {
    console.error('Error fetching posts:', error)
    // Render an error message or a fallback UI
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Nakamotoist</h1>
        <p className="text-red-500">Could not load posts. Please try again later.</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Nakamotoist</h1>
      <div className="grid gap-8">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-500 text-sm">
                Published on: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No published posts found.</p>
        )}
      </div>
    </main>
  )
}

export default HomePage
