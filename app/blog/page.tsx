import { allPosts, Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { getAllPosts } from 'lib/posts'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import { PageWrapper } from '@/components/PageWrapper'

const inter = Inter({ subsets: ['latin'] })

function PostCard(post: Post) {
  return (
    <div className='mb-6'>
      <time dateTime={post.date} className='block text-sm text-slate-600'>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <h2 className='flex flex-col text-lg'>
        <Link
          className='text-blue-700 hover:text-blue-900'
          href={`/blog/${post._id}`}
        >
          {post.title}
        </Link>
        {post.excerpt}
      </h2>
    </div>
  )
}

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <PageWrapper>
      <div className={inter.className}>
        <div className='mx-auto max-w-2xl py-16 text-center'>
          <h1 className='mb-8 text-3xl font-bold'>Posts ({allPosts.length})</h1>
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
