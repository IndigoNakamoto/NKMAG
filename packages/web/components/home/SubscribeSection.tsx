import React from 'react'

const SubscribeSection = () => (
  <section className="container mx-auto py-12 text-center">
    <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
    <p className="mb-6">Subscribe to get the latest articles delivered to your inbox.</p>
    <form className="flex flex-col sm:flex-row justify-center gap-2">
      <input
        type="email"
        placeholder="you@example.com"
        className="px-4 py-2 rounded-md text-black"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Subscribe
      </button>
    </form>
  </section>
)

export default SubscribeSection
