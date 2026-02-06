'use client'

import type { BlogPost } from '@/lib/blog'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'motion/react'
import { Clock, FileText, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { calculateReadingTime, cn } from '@/lib/utils'

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
          || post.description?.toLowerCase().includes(query),
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

  const hasActiveFilters = selectedTag !== null || searchQuery.trim().length > 0

  const clearFilters = () => {
    setSelectedTag(null)
    setSearchQuery('')
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold tracking-tight text-balance">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Thoughts on software, design, and building things.
        </p>
      </motion.div>

      {/* Search + Sort toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex gap-3 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
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
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Tag chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        <Badge
          variant={selectedTag === null ? 'default' : 'outline'}
          className="cursor-pointer transition-colors"
          onClick={() => setSelectedTag(null)}
        >
          All
        </Badge>
        {allTags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            className="cursor-pointer transition-colors"
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
          >
            {tag}
          </Badge>
        ))}
      </motion.div>

      {/* Post count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredAndSortedPosts.length} post{filteredAndSortedPosts.length !== 1 ? 's' : ''}
        </p>
      </div>

      <Separator className="mb-6" />

      {/* Post list */}
      <div className="space-y-0">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <Link href={`/blog/${post.id}`} className="group block">
                <div className="py-5 -mx-3 px-3 rounded-lg transition-colors hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base font-medium leading-snug group-hover:text-primary transition-colors line-clamp-1">
                        {post.title}
                      </h2>

                      {post.description && (
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {post.description}
                        </p>
                      )}

                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(post.date), 'MMM d, yyyy')}
                        </span>
                        <span className="text-muted-foreground/40">|</span>
                        <span className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {calculateReadingTime(post.content || '')} min
                        </span>
                        {post.tags && post.tags.length > 0 && (
                          <>
                            <span className="text-muted-foreground/40">|</span>
                            <div className="flex gap-1.5">
                              {post.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-xs text-muted-foreground/70">
                                  #{tag}
                                </span>
                              ))}
                              {post.tags.length > 2 && (
                                <span className="text-xs text-muted-foreground/50">
                                  +{post.tags.length - 2}
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              {index < filteredAndSortedPosts.length - 1 && (
                <Separator />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      <AnimatePresence>
        {filteredAndSortedPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground">No posts found</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs">
              {hasActiveFilters
                ? 'Try adjusting your search or filters to find what you\'re looking for.'
                : 'No blog posts have been published yet. Check back soon.'}
            </p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear filters
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
