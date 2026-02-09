import { ArrowRight, BookOpen, Briefcase, Code2 } from 'lucide-react'
import Link from 'next/link'
import { HeroSection } from '@/components/hero-section'
import { Separator } from '@/components/ui/separator'
import { getSortedPostsData } from '@/lib/blog'
import { formatRelativeTime } from '@/lib/utils'

export default function Home() {
  const recentPosts = getSortedPostsData().slice(0, 3)

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <HeroSection />

      {/* Content sections */}
      <div className="container mx-auto px-4 max-w-2xl pb-16">
        {/* Quick links */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
          <Link
            href="/about"
            className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
          >
            <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium">About</p>
              <p className="text-xs text-muted-foreground">Background & experience</p>
            </div>
          </Link>
          <Link
            href="/uses"
            className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
          >
            <Code2 className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium">Uses</p>
              <p className="text-xs text-muted-foreground">Tools & tech stack</p>
            </div>
          </Link>
          <Link
            href="/blog"
            className="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
          >
            <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium">Blog</p>
              <p className="text-xs text-muted-foreground">Writing & thoughts</p>
            </div>
          </Link>
        </section>

        <Separator className="mb-12" />

        {/* Recent posts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-muted-foreground">Recent posts</h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-0">
            {recentPosts.map((post, index) => (
              <div key={post.id}>
                <Link href={`/blog/${post.id}`} className="group block py-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                    <time>{formatRelativeTime(post.date)}</time>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span className="text-border">/</span>
                        <span>{post.tags[0]}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors mb-1">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {post.description}
                    </p>
                  )}
                </Link>
                {index < recentPosts.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
