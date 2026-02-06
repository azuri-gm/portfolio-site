'use client'

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'
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
  const [readProgress, setReadProgress] = useState(0)

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
        rootMargin: '-80px 0px -66%',
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setReadProgress(Math.min((scrollTop / docHeight) * 100, 100))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const minLevel = Math.min(...headings.map(h => h.level))

  return (
    <nav className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <List className="h-3.5 w-3.5" />
        On this page
      </div>

      {/* Reading progress */}
      <div className="h-0.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-foreground/20 transition-all duration-150 ease-out rounded-full"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <ul className="space-y-0.5">
        {headings.map(heading => (
          <li key={heading.id}>
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                'relative block w-full text-left text-[13px] py-1.5 transition-colors duration-200 rounded-sm',
                heading.level > minLevel && `pl-${(heading.level - minLevel) * 3}`,
                activeId === heading.id
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground/80',
              )}
              style={{
                paddingLeft: heading.level > minLevel
                  ? `${(heading.level - minLevel) * 0.75}rem`
                  : undefined,
              }}
            >
              <span className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full bg-foreground transition-all duration-200',
                activeId === heading.id ? 'h-4 opacity-100' : 'h-0 opacity-0',
              )} />
              <span className="line-clamp-2">{heading.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
