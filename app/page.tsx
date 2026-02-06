'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <div className="h-20 mb-8">
          {' '}
          <TypeAnimation
            sequence={[
              'A modern and minimal showcase of my work',
              2000,
              'Bringing ideas to life through code',
              2000,
              'Crafting digital experiences with passion',
              2000,
              'Innovating at the intersection of design and technology',
              2000,
            ]}
            wrapper="p"
            speed={50}
            className="text-xl"
            repeat={Number.POSITIVE_INFINITY}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/blog">Read Blog</Link>
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
