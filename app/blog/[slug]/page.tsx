import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PageWrapper } from '@/components/PageWrapper'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._id,
  }))
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
        <article className=' prose mx-auto max-w-none'>
          <div className='mb-6 text-center'>
            <Link href='/'>Home</Link>
          </div>
          <div className='mb-6 text-center'>
            <h1 className='mb-1 text-3xl font-bold'>{post.title}</h1>
            <time dateTime={post.date} className='text-sm text-slate-600'>
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
