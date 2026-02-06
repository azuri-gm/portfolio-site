import type React from 'react'
import { format } from 'date-fns'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { CopyButton } from '@/components/copy-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { getAdjacentPosts, getPostData, getSortedPostsData } from '@/lib/blog'
import { calculateReadingTime } from '@/lib/utils'

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
    return <h1 id={id} className="text-2xl font-bold mt-10 mb-4 tracking-tight" {...props} />
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = createHeadingId(props.children)
    return <h2 id={id} className="text-xl font-semibold mt-8 mb-3 tracking-tight" {...props} />
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = createHeadingId(props.children)
    return <h3 id={id} className="text-lg font-semibold mt-6 mb-2" {...props} />
  },
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = createHeadingId(props.children)
    return <h4 id={id} className="text-base font-semibold mt-5 mb-2" {...props} />
  },
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = createHeadingId(props.children)
    return <h5 id={id} className="text-sm font-semibold mt-4 mb-1.5" {...props} />
  },
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = createHeadingId(props.children)
    return <h6 id={id} className="text-sm font-semibold mt-4 mb-1.5 text-muted-foreground" {...props} />
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-7 text-foreground/90" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-foreground/90 leading-7" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground/90 leading-7" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="pl-1" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-2 border-border bg-muted/40 py-3 pl-4 pr-4 text-foreground/80 italic rounded-r-md"
      {...props}
    />
  ),
  hr: () => <Separator className="my-8" />,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-border px-4 py-2 text-left font-medium bg-muted/50" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-4 py-2" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-6 rounded-lg border border-border" alt={props.alt || ''} {...props} />
  ),
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '')
    const codeString = String(children).replace(/\n$/, '')
    return !inline && match
      ? (
          <div className="group/code relative my-6">
            <div className="flex items-center justify-between rounded-t-lg bg-[#1d1f21] px-4 py-2 border border-b-0 border-[#2d2f31]">
              <span className="text-xs text-neutral-400 font-mono">{match[1]}</span>
              <CopyButton text={codeString} />
            </div>
            <SyntaxHighlighter
              style={atomDark}
              language={match[1]}
              PreTag="div"
              customStyle={{
                margin: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: '0.5rem',
                borderBottomRightRadius: '0.5rem',
                border: '1px solid #2d2f31',
                borderTop: 'none',
              }}
              {...props}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        )
      : (
          <code
            className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground"
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
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params

  if (!resolvedParams.id) {
    notFound()
  }

  try {
    const postData = await getPostData(resolvedParams.id)

    if (!postData || !postData.content) {
      notFound()
    }

    const readingTime = calculateReadingTime(postData.content)
    const { prev, next } = getAdjacentPosts(resolvedParams.id)

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 pt-20 max-w-7xl">
          {/* Back link */}
          <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to blog
            </Link>
          </div>

          <div className="flex gap-12">
            {/* Main content */}
            <article className="flex-1 max-w-2xl mx-auto lg:mx-0">
              {/* Header */}
              <header className="mb-8">
                {postData.tags && postData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {postData.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance leading-tight">
                  {postData.title}
                </h1>

                {postData.description && (
                  <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
                    {postData.description}
                  </p>
                )}

                <Separator className="my-6" />

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {postData.author && (
                    <>
                      <span className="font-medium text-foreground">{postData.author}</span>
                      <span className="text-border">|</span>
                    </>
                  )}
                  <time>{format(new Date(postData.date), 'MMMM d, yyyy')}</time>
                  <span className="text-border">|</span>
                  <span>{readingTime} min read</span>
                </div>
              </header>

              {/* Prose content */}
              <div className="prose-custom">
                <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
                  {postData.content}
                </ReactMarkdown>
              </div>

              {/* Prev / Next navigation */}
              {(prev || next) && (
                <>
                  <Separator className="mt-12 mb-8" />
                  <nav className="flex items-stretch gap-4" aria-label="Post navigation">
                    {prev ? (
                      <Link href={`/blog/${prev.id}`} className="flex-1 group">
                        <Button
                          variant="outline"
                          className="w-full h-auto py-4 px-5 flex flex-col items-start gap-1 text-left"
                          asChild
                        >
                          <span>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                              <ArrowLeft className="h-3 w-3" />
                              Previous
                            </span>
                            <span className="text-sm font-medium line-clamp-1">{prev.title}</span>
                          </span>
                        </Button>
                      </Link>
                    ) : (
                      <div className="flex-1" />
                    )}
                    {next ? (
                      <Link href={`/blog/${next.id}`} className="flex-1 group">
                        <Button
                          variant="outline"
                          className="w-full h-auto py-4 px-5 flex flex-col items-end gap-1 text-right"
                          asChild
                        >
                          <span>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                              Next
                              <ArrowRight className="h-3 w-3" />
                            </span>
                            <span className="text-sm font-medium line-clamp-1">{next.title}</span>
                          </span>
                        </Button>
                      </Link>
                    ) : (
                      <div className="flex-1" />
                    )}
                  </nav>
                </>
              )}
            </article>

            {/* Table of contents sidebar */}
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-24">
                <TableOfContents content={postData.content} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    )
  }
  catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 py-8 pt-24 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Error Loading Post</h1>
        <p className="text-muted-foreground mb-4">
          Sorry, there was an error loading this post. Please try again later.
        </p>
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error instanceof Error
            ? error.message
            : 'An unexpected error occurred'}
        </div>
      </div>
    )
  }
}
