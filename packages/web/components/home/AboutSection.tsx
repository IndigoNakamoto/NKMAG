import React from 'react'
import Link from 'next/link'

const AboutSection = () => (
  <section className="container mx-auto py-12 text-center">
    <h2 className="text-3xl font-bold mb-6">About Nakamotoist</h2>
    <p className="max-w-2xl mx-auto mb-4">
      NKMAG explores technology, money, and decentralized systems with a focus on Litecoin and Bitcoin development.
    </p>
    <Link href="/about" className="text-blue-400 hover:underline">
      Learn more &rarr;
    </Link>
  </section>
)

export default AboutSection
