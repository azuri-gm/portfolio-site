'use client'

import { motion } from 'framer-motion'
import { type RefObject, useRef, useState } from 'react'

export default function MagneticWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const ref: RefObject<HTMLDivElement> = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      const { width, height, left, top } = rect
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      setPosition({ x, y })
    }
  }

  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.div
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      ref={ref}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}
