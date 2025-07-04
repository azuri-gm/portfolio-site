import type React from 'react'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { calculateReadingTime, formatRelativeTime, getPostData, getSortedPostsData } from '@/lib/blog'

function createHeadingId(children: React.ReactNode): string {
  const text = typeof children === 'string' ? children : ''
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = createHeadingId(props.children)
    return <h1 id={id} className="text-3xl font-bold my-4" {...props} />
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = createHeadingId(props.children)
    return <h2 id={id} className="text-2xl font-semibold my-3" {...props} />
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = createHeadingId(props.children)
    return <h3 id={id} className="text-xl font-semibold my-2" {...props} />
  },
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = createHeadingId(props.children)
    return <h4 id={id} className="text-lg font-semibold my-2" {...props} />
  },
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = createHeadingId(props.children)
    return <h5 id={id} className="text-base font-semibold my-2" {...props} />
  },
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = createHeadingId(props.children)
    return <h6 id={id} className="text-sm font-semibold my-2" {...props} />
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-2" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-5 my-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-5 my-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="my-1" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary hover:underline" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-4"
      {...props}
    />
  ),
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match
      ? (
          <SyntaxHighlighter
            style={atomDark}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        )
      : (
          <code
            className="bg-muted text-muted-foreground px-1 py-0.5 rounded"
            {...props}
          >
            {children}
          </code>
        )
  },
}

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map(post => ({
    id: post.id,
  }))
}

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }> | { id: string }
}) {
  const resolvedParams = await params

  if (!resolvedParams.id) {
    notFound()
  }

  try {
    const postData = await getPostData(resolvedParams.id)

    if (!postData || !postData.content) {
      console.error(
        `Post data or content missing for id: ${resolvedParams.id}`,
      )
      notFound()
    }

    const readingTime = calculateReadingTime(postData.content)
    const relativeTime = formatRelativeTime(postData.date)

    return (
      <div className="min-h-screen bg-background">
        {postData.image && (
          <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
            <img
              src={postData.image}
              alt={postData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="flex-1 max-w-4xl">
              <div className="space-y-6">
                {/* Tags */}
                {postData.tags && postData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {postData.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {postData.title}
                </h1>

                {postData.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {postData.description}
                  </p>
                )}

                <div className="flex items-center gap-4 py-4 border-b border-border">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-user.jpg" alt={postData.author} />
                    <AvatarFallback>
                      {postData.author?.split(' ').map(n => n[0]).join('') || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{postData.author}</span>
                      <span>•</span>
                      <time>{format(new Date(postData.date), 'MMM d, yyyy')}</time>
                      <span>•</span>
                      <span>{relativeTime}</span>
                      <span>•</span>
                      <span>
                        {readingTime}
                        {' '}
                        min read
                      </span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
                    {postData.content}
                  </ReactMarkdown>
                </div>
              </div>
            </article>

            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-8 p-4 border border-border rounded-lg bg-card">
                <TableOfContents content={postData.content} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    )
  }
  catch (error) {
    console.error('Error rendering post:', error)

    if (error instanceof Error && error.message.includes('not found')) {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold mb-4">Error Loading Post</h1>
        <p className="text-muted-foreground mb-4">
          Sorry, there was an error loading this post. Please try again later.
        </p>
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
          {error instanceof Error
            ? error.message
            : 'An unexpected error occurred'}
        </div>
      </div>
    )
  }
}
