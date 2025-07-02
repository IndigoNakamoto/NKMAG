import React from 'react'
import Link from 'next/link'

interface Media {
  url?: string | null
}

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  featuredImage?: Media | string | null
}

interface CollectionResponse {
  docs: Post[]
}

const FeaturedPosts = async () => {
  let posts: Post[] = []

  if (process.env.PAYLOAD_API_URL) {
    try {
      const res = await fetch(
        `${process.env.PAYLOAD_API_URL}/posts?where[featured][equals]=true&limit=2&sort=-publishedDate`,
        { next: { revalidate: 60 } },
      )
      if (res.ok) {
        const data: CollectionResponse = await res.json()
        posts = data.docs
      }
    } catch (err) {
      console.error('Error fetching featured posts', err)
    }
  }

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.length === 0 ? (
          <p className="col-span-full text-center">No featured posts yet.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="border rounded-lg overflow-hidden shadow bg-white/5">
              {post.featuredImage && typeof post.featuredImage !== 'string' && post.featuredImage.url && (
                <img src={post.featuredImage.url} alt="" className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                {post.excerpt && <p className="text-sm text-gray-300">{post.excerpt}</p>}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default FeaturedPosts
