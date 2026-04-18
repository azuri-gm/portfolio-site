'use client'

import type { BlogPost } from '@/lib/blog'
import { format } from 'date-fns'
import { ArrowRight, Clock, FileText, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Btn, Chip } from '@/components/v2/primitives'
import { Reveal } from '@/components/v2/reveal'
import { calculateReadingTime, cn, formatRelativeTime, parseDate } from '@/lib/utils'

interface BlogListProps {
  initialPosts: BlogPost[]
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [searchQuery, setSearchQuery] = useState('')

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    initialPosts.forEach((post) => {
      post.tags?.forEach(tag => tagSet.add(tag))
    })
    return ['all', ...Array.from(tagSet).sort()]
  }, [initialPosts])

  const filteredAndSortedPosts = useMemo(() => {
    let posts = initialPosts

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      posts = posts.filter(
        post =>
          post.title.toLowerCase().includes(query)
          || post.description?.toLowerCase().includes(query)
          || post.tags?.some(tag => tag.toLowerCase().includes(query)),
      )
    }

    if (selectedTag !== 'all') {
      posts = posts.filter(post => post.tags?.includes(selectedTag))
    }

    posts = [...posts].sort((a, b) => {
      const dateA = parseDate(a.date).getTime()
      const dateB = parseDate(b.date).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    return posts
  }, [initialPosts, selectedTag, sortOrder, searchQuery])

  const hasActiveFilters = selectedTag !== 'all' || searchQuery.trim() !== ''
  const clearAllFilters = () => {
    setSelectedTag('all')
    setSearchQuery('')
  }

  return (
    <main style={{ paddingTop: 104, paddingBottom: 80 }}>
      <div className="mx-auto w-full max-w-[760px] px-4 sm:px-8">
        <Reveal>
          <div className="eyebrow-v2 mb-4">/BLOG</div>
        </Reveal>
        <Reveal delay={1}>
          <h1
            className="font-mono"
            style={{
              fontSize: 'clamp(40px,6vw,64px)',
              letterSpacing: '-0.04em',
              fontWeight: 600,
              margin: '0 0 18px',
              lineHeight: 1,
            }}
          >
            Writing
            <span style={{ color: 'hsl(24 95% 53%)' }}>.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="text-muted-foreground" style={{ fontSize: 16, lineHeight: 1.6, margin: '0 0 40px' }}>
            Thoughts on development, design, and building for the web.
          </p>
        </Reveal>

        <Reveal delay={3}>
          <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
            <div
              className="flex items-center gap-2.5 flex-1 bg-card/40"
              style={{
                padding: '0 12px',
                height: 40,
                borderRadius: 8,
                border: '1px solid hsl(var(--border))',
              }}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="font-mono flex-1 bg-transparent outline-none border-0 text-foreground placeholder:text-muted-foreground/70"
                style={{ fontSize: 13 }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <Btn
              variant="ghost"
              onClick={() => setSortOrder(s => (s === 'newest' ? 'oldest' : 'newest'))}
              style={{ height: 40 }}
            >
              {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
            </Btn>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <div className="flex flex-wrap gap-1.5 mb-8">
            {allTags.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTag(t)}
                className={cn('chip-v2', selectedTag === t && 'solid')}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        {hasActiveFilters && (
          <div className="flex items-center justify-between mb-6">
            <p className="font-mono text-muted-foreground" style={{ fontSize: 12 }}>
              {filteredAndSortedPosts.length}
              {' '}
              result
              {filteredAndSortedPosts.length !== 1 ? 's' : ''}
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="link-u font-mono text-primary/80"
              style={{ fontSize: 12 }}
            >
              Clear filters
            </button>
          </div>
        )}

        <div>
          {filteredAndSortedPosts.map((post, i) => (
            <Reveal key={post.id} delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}>
              <Link
                href={`/blog/${post.id}`}
                className="group block w-full text-left"
                style={{
                  padding: '22px 0',
                  borderTop: i === 0 ? 'none' : '1px solid hsl(var(--border))',
                }}
              >
                <div className="v2-meta mb-2 flex items-center gap-1 flex-wrap">
                  <span>{format(parseDate(post.date), 'MMM d, yyyy')}</span>
                  <span className="sep">/</span>
                  <Clock className="h-3 w-3" />
                  <span>
                    {calculateReadingTime(post.content || post.description || '')}
                    {' '}
                    min
                  </span>
                  <span className="sep">/</span>
                  <span>{formatRelativeTime(post.date)}</span>
                </div>
                <h3
                  className="font-mono transition-colors duration-200 group-hover:text-primary"
                  style={{
                    fontSize: 19,
                    fontWeight: 500,
                    letterSpacing: '-0.015em',
                    margin: '0 0 8px',
                  }}
                >
                  {post.title}
                </h3>
                {post.description && (
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: 13.5, lineHeight: 1.6, margin: '0 0 14px' }}
                  >
                    {post.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags?.slice(0, 4).map(t => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                  <ArrowRight
                    className="h-4 w-4 flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                    style={{ color: 'hsl(24 95% 53%)' }}
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {filteredAndSortedPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div
              className="flex items-center justify-center mb-4"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'hsl(24 95% 53% / 0.1)',
                border: '1px solid hsl(24 95% 53% / 0.2)',
              }}
            >
              <FileText className="h-5 w-5 text-primary/70" />
            </div>
            <h3 className="font-mono mb-1" style={{ fontSize: 14, fontWeight: 500 }}>
              No posts found
            </h3>
            <p className="text-muted-foreground text-center max-w-xs mb-4" style={{ fontSize: 13 }}>
              {searchQuery
                ? `No posts match "${searchQuery}".`
                : `No posts tagged with "${selectedTag}".`}
              {' '}
              Try adjusting your search or filters.
            </p>
            <Btn variant="ghost" onClick={clearAllFilters}>
              Clear filters
            </Btn>
          </div>
        )}
      </div>
    </main>
  )
}
