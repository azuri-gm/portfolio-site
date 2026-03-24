'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-24 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center relative z-10"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm font-medium text-primary mb-4 tracking-widest uppercase"
        >
          Software Engineer
        </motion.p>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          Eduardo Gaytan
        </h1>

        <div className="h-16 mb-10">
          <TypeAnimation
            sequence={[
              'Building fast, accessible web applications',
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
            className="text-lg md:text-xl text-muted-foreground"
            repeat={Number.POSITIVE_INFINITY}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild className="shadow-glow hover:shadow-glow-lg transition-shadow duration-300">
            <Link href="/about">About Me</Link>
          </Button>
          <Button asChild variant="outline" className="border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300">
            <Link href="/blog">Read Blog</Link>
          </Button>
        </motion.div>
      </motion.div>
    </main>
  )
}
