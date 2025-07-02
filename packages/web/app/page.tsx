import React from 'react'
import Hero from '@/components/home/Hero'
import FeaturedPosts from '@/components/home/FeaturedPosts'
import RecentPosts from '@/components/home/RecentPosts'
import AboutSection from '@/components/home/AboutSection'
import SubscribeSection from '@/components/home/SubscribeSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      <RecentPosts />
      <AboutSection />
      <SubscribeSection />
    </>
  )
}
