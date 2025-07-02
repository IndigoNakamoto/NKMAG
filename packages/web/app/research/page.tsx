import React from 'react'
import Link from 'next/link'

// Define a simple type for our Post documents
interface Media {
  id: string;
  url?: string | null;
  alt?: string | null;
}

interface Author {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: Media;
  author: Author;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
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
async function BlogPage() {
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
        <h1 className="text-2xl font-bold mb-4">Blog</h1>
        <p className="text-red-500">Could not load posts. Please try again later.</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center font-grotesk">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map(post => {
            const imageUrl = post.featuredImage?.url?.startsWith('/')
              ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${post.featuredImage.url}`
              : post.featuredImage?.url;

            return (
              <div key={post.id} className="bg-white/5 rounded-lg shadow-lg overflow-hidden group flex flex-col">
                <Link href={`/blog/${post.slug}`} className="block h-48">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={post.featuredImage.alt || post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-900/50 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                </Link>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center mb-2">
                    {post.tags?.map(tag => (
                      <span key={tag} className="bg-blue-600/20 text-blue-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold mb-2 font-grotesk">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-400 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    By {post.author.name} on {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300 mb-4 flex-grow">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-blue-400 hover:underline font-semibold mt-auto">
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center">No published posts found.</p>
        )}
      </div>
    </main>
  )
}

export default BlogPage
