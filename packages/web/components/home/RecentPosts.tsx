import React from 'react'
import Link from 'next/link'

interface Post {
  id: string
  slug: string
  title: string
  createdAt: string
}

interface CollectionResponse {
  docs: Post[]
}

const RecentPosts = async () => {
  let posts: Post[] = []

  if (process.env.PAYLOAD_API_URL) {
    try {
      const res = await fetch(
        `${process.env.PAYLOAD_API_URL}/posts?where[status][equals]=published&limit=3&sort=-publishedDate`,
        { next: { revalidate: 60 } },
      )
      if (res.ok) {
        const data: CollectionResponse = await res.json()
        posts = data.docs
      }
    } catch (err) {
      console.error('Error fetching recent posts', err)
    }
  }

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Recent Posts</h2>
      <div className="grid gap-6">
        {posts.length === 0 ? (
          <p className="text-center">No posts published yet.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default RecentPosts
