import React from 'react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="text-center py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <h1 className="text-5xl font-extrabold mb-6">Nakamotoist Magazine</h1>
      <p className="text-xl mb-8">Exploring the frontier of AI and UTXO blockchains.</p>
      <Link
        href="/blog"
        className="inline-block px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200"
      >
        Read the Blog
      </Link>
    </section>
  )
}

export default Hero
