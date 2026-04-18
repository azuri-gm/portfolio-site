'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  delay?: 1 | 2 | 3 | 4 | 5 | 6
  as?: 'div' | 'section' | 'article' | 'span'
  className?: string
}

export function Reveal({ children, delay, as = 'div', className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el)
      return

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0 },
    )
    io.observe(el)
    const fallback = window.setTimeout(() => setShown(true), 1500)
    return () => {
      io.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  const Tag = as as 'div'
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn('v2-reveal', delay && `v2-reveal-d${delay}`, shown && 'in', className)}
    >
      {children}
    </Tag>
  )
}
