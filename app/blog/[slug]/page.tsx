import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'

import { PageWrapper } from '@/components/PageWrapper'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = allPosts.find((post) => post._id === params.slug)
  return {
    title: `Eduardo Gaytan | ${post?.title ?? 'Blog Page'}`,
    description: post?.excerpt ?? 'Blog posts for my site',
  }
}

export default async function PostLayout({
  params,
}: {
  params: { slug: string }
}) {
  const post = await allPosts.find((post) => post._id === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className={inter.className}>
      <PageWrapper>
        <article className='prose prose-lg mx-auto dark:prose-invert'>
          <div className='mb-6 text-center'>
            <h1 className='mb-1 text-3xl font-bold'>{post.title}</h1>
            <time dateTime={post.date} className='text-sm'>
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
          </div>
          <div
            className='cl-post-body'
            dangerouslySetInnerHTML={{ __html: post.body.html }}
          />
        </article>
      </PageWrapper>
    </div>
  )
}
