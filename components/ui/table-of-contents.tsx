'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  className?: string
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headingRegex = /^(#{1,6})\s(.+)$/gm
    const extractedHeadings: Heading[] = []
    const matches = Array.from(content.matchAll(headingRegex))

    matches.forEach((match) => {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

      extractedHeadings.push({ id, text, level })
    })

    setHeadings(extractedHeadings)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className={cn('space-y-2', className)}>
      <h4 className="text-sm font-semibold text-foreground mb-4">On this page</h4>
      <ul className="space-y-2">
        {headings.map(heading => (
          <li key={heading.id} className="relative">
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                'block w-full text-left text-sm transition-colors hover:text-foreground relative',
                heading.level === 1 && 'font-medium',
                heading.level === 2 && 'pl-4',
                heading.level === 3 && 'pl-8',
                heading.level === 4 && 'pl-12',
                heading.level === 5 && 'pl-16',
                heading.level === 6 && 'pl-20',
                activeId === heading.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground',
              )}
            >
              {activeId === heading.id && (
                <span className="absolute left-0 top-0 h-full w-0.5 bg-primary" />
              )}
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
