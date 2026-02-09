'use client'

import { motion } from 'motion/react'
import { TypeAnimation } from 'react-type-animation'

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center px-4 pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Eduardo Gaytan
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Senior software engineer focused on building fast, accessible, and well-crafted web applications. 8+ years across the full stack.
        </p>
        <div className="h-8 mb-6">
          <TypeAnimation
            sequence={[
              'Building for the web',
              2000,
              'Shipping things that matter',
              2000,
              'Clean code, thoughtful design',
              2000,
            ]}
            wrapper="p"
            speed={50}
            className="text-sm text-muted-foreground/70"
            repeat={Number.POSITIVE_INFINITY}
          />
        </div>
      </motion.div>
    </section>
  )
}
