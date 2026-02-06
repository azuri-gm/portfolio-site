'use client'

import type { BlogPost } from '@/lib/blog'
import { format } from 'date-fns'
import { motion } from 'motion/react'
import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { calculateReadingTime, cn, formatRelativeTime } from '@/lib/utils'

interface BlogListProps {
  initialPosts: BlogPost[]
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    initialPosts.forEach((post) => {
      post.tags?.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [initialPosts])

  const filteredAndSortedPosts = useMemo(() => {
    let posts = initialPosts

    if (selectedTag) {
      posts = posts.filter(post => post.tags?.includes(selectedTag))
    }

    posts = [...posts].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    return posts
  }, [initialPosts, selectedTag, sortOrder])

  const isRecentlyReleased = (date: string) => {
    const postDate = new Date(date)
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
    return postDate > threeMonthsAgo
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24 max-w-7xl">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Latest Blog Posts
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">
              {filteredAndSortedPosts.length}
              {' '}
              post
              {filteredAndSortedPosts.length !== 1 ? 's' : ''}
              {selectedTag && ` tagged with "${selectedTag}"`}
            </p>
            <Select value={sortOrder} onValueChange={(value: 'newest' | 'oldest') => setSortOrder(value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Blog Posts */}
          <div className="space-y-6">
            {filteredAndSortedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.id}`} className="block">
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Post Content */}
                        <div className="flex-1">
                          {/* Date and Badge */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-1" />
                              <time>{format(new Date(post.date), 'MMM d, yyyy')}</time>
                              <span className="mx-2">•</span>
                              <span>{formatRelativeTime(post.date)}</span>
                            </div>
                            {isRecentlyReleased(post.date) && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Recently released
                              </Badge>
                            )}
                          </div>

                          <h2 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                            {post.title}
                          </h2>

                          {post.description && (
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {post.description}
                            </p>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>
                                {calculateReadingTime(post.content || '')}
                                {' '}
                                min read
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {post.tags?.slice(0, 3).map(tag => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setSelectedTag(tag)
                                  }}
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags && post.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +
                                  {post.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {post.image && (
                          <div className="w-32 h-24 md:w-40 md:h-28 flex-shrink-0">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredAndSortedPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">
                No posts found
                {selectedTag && ` for tag "${selectedTag}"`}
                .
              </p>
              {selectedTag && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedTag(null)}
                  className="mt-4"
                >
                  Clear filter
                </Button>
              )}
            </motion.div>
          )}
        </div>

        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-24">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4"># Topics</h3>
              <div className="space-y-2">
                <Button
                  variant={selectedTag === null ? 'default' : 'ghost'}
                  onClick={() => setSelectedTag(null)}
                  className="w-full justify-start text-left"
                >
                  All Posts (
                  {initialPosts.length}
                  )
                </Button>
                {allTags.map((tag) => {
                  const count = initialPosts.filter(post => post.tags?.includes(tag)).length
                  return (
                    <Button
                      key={tag}
                      variant={selectedTag === tag ? 'default' : 'ghost'}
                      onClick={() => setSelectedTag(tag)}
                      className={cn(
                        'w-full justify-start text-left',
                        selectedTag === tag && 'bg-primary text-primary-foreground',
                      )}
                    >
                      {tag}
                      {' '}
                      (
                      {count}
                      )
                    </Button>
                  )
                })}
              </div>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  )
}
