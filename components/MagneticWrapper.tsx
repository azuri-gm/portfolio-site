'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

interface Position {
  x: number
  y: number
}

const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 150,
  damping: 15,
  mass: 0.1,
}

export default function MagneticWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current
    if (!element) return

    const { clientX, clientY } = e
    const { width, height, left, top } = element.getBoundingClientRect()

    setPosition({
      x: clientX - (left + width / 2),
      y: clientY - (top + height / 2),
    })
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      ref={ref}
      animate={position}
      transition={SPRING_CONFIG}
    >
      {children}
    </motion.div>
  )
}
