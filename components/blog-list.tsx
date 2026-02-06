'use client'

import type { BlogPost } from '@/lib/blog'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Clock, FileText, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { calculateReadingTime, cn, formatRelativeTime } from '@/lib/utils'

interface BlogListProps {
  initialPosts: BlogPost[]
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [searchQuery, setSearchQuery] = useState('')

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    initialPosts.forEach((post) => {
      post.tags?.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
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

    if (selectedTag) {
      posts = posts.filter(post => post.tags?.includes(selectedTag))
    }

    posts = [...posts].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    return posts
  }, [initialPosts, selectedTag, sortOrder, searchQuery])

  const hasActiveFilters = selectedTag !== null || searchQuery.trim() !== ''

  const clearAllFilters = () => {
    setSelectedTag(null)
    setSearchQuery('')
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">Blog</h1>
        <p className="text-muted-foreground">
          Thoughts on development, design, and building for the web.
        </p>
      </motion.div>

      {/* Search + Sort */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <Select value={sortOrder} onValueChange={(value: 'newest' | 'oldest') => setSortOrder(value)}>
          <SelectTrigger className="w-36 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Inline Tag Chips */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap items-center gap-2 mb-8"
      >
        <button
          onClick={() => setSelectedTag(null)}
          className={cn(
            'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
            selectedTag === null
              ? 'bg-foreground text-background'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          )}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={cn(
              'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
              selectedTag === tag
                ? 'bg-foreground text-background'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            )}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* Results count + clear */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-sm text-muted-foreground">
            {filteredAndSortedPosts.length} result{filteredAndSortedPosts.length !== 1 ? 's' : ''}
          </p>
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs h-7">
            Clear filters
          </Button>
        </motion.div>
      )}

      {/* Blog Posts */}
      <div className="space-y-0">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              layout
            >
              <Link href={`/blog/${post.id}`} className="group block">
                <article className="py-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <time>{format(new Date(post.date), 'MMM d, yyyy')}</time>
                    <span className="text-border">{'/'}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {calculateReadingTime(post.content || '')} min
                    </span>
                    <span className="text-border">{'/'}</span>
                    <span>{formatRelativeTime(post.date)}</span>
                  </div>

                  <h2 className="text-lg font-semibold leading-snug mb-1.5 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {post.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                      {post.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags?.slice(0, 4).map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] px-2 py-0 h-5 font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </div>
                </article>
                {index < filteredAndSortedPosts.length - 1 && (
                  <Separator />
                )}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredAndSortedPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="text-sm font-medium mb-1">No posts found</h3>
          <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
            {searchQuery
              ? `No posts match "${searchQuery}".`
              : `No posts tagged with "${selectedTag}".`}
            {' '}Try adjusting your search or filters.
          </p>
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            Clear filters
          </Button>
        </motion.div>
      )}
    </div>
  )
}
