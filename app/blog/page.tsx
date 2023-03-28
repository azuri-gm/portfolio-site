import { allPosts, Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { getAllPosts } from 'lib/posts'
import Link from 'next/link'

import { PageWrapper } from '@/components/PageWrapper'

function PostCard(post: Post) {
  return (
    <div className='p-4 mb-6 rounded-lg hover:bg-background-blue'>
      <Link href={`/blog/${post._id}`} className='text-xl'>
        <time dateTime={post.date} className='block text-sm text-slate-600'>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h2 className='flex flex-col'>
          {post.title}
          <p className='text-[16px] mt-4'>{post.excerpt}</p>
        </h2>
      </Link>
    </div>
  )
}

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <PageWrapper>
      <div className='mx-auto max-w-4xl py-16'>
        <h1 className='mb-8 text-3xl font-bold text-center'>
          Posts ({allPosts.length})
        </h1>
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </PageWrapper>
  )
}
