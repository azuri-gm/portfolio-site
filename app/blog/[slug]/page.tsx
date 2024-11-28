import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'

import { PageWrapper } from '@/components/PageWrapper'
import { type PostParams } from 'types/blog'
import { getPost } from 'lib/posts'

const inter = Inter({ subsets: ['latin'] })

export default async function Post({ params }: PostParams) {
  const { slug } = await params
  const post = allPosts.find((post) => `${post.slug}.md` === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className={inter.className}>
      <PageWrapper>
        <article className='prose prose-lg mx-auto dark:prose-invert'>
          <header className='mb-6 text-center'>
            <h1 className='mb-1 text-3xl font-bold'>{post.title}</h1>
            <time dateTime={post.date} className='text-sm'>
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
          </header>
          <div
            className='cl-post-body'
            dangerouslySetInnerHTML={{ __html: post.body.html }}
          />
        </article>
      </PageWrapper>
    </div>
  )
}

// Generate static params for all posts
export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: PostParams): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  return {
    title: `Eduardo Gaytan | ${post?.title ?? 'Blog Page'}`,
    description: post?.excerpt ?? 'Blog posts for my site',
  }
}
