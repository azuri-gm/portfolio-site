import { allPosts, type Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { getAllPosts } from 'lib/posts'
import Link from 'next/link'

import { PageWrapper } from '@/components/PageWrapper'

export const metadata = {
  title: 'Eduardo Gaytan | Software Engineer',
  description: 'Current posts I have written',
}

function PostCard(post: Post) {
  return (
    <div className='hover:bg-background-blue mb-6 rounded-lg p-4'>
      <Link href={`/blog/${post._id}`} className='text-xl'>
        <time dateTime={post.date} className='block text-sm text-slate-600'>
          {format(parseISO(post.date), "MMMM d, yyyy 'at' hh:mm a'")}
        </time>
        <h2 className='flex flex-col'>
          {post.title}
          <p className='mt-4 text-[16px]'>{post.excerpt}</p>
        </h2>
      </Link>
    </div>
  )
}

export default async function Home() {
  const posts = getAllPosts()

  return (
    <PageWrapper>
      <div className='mx-auto max-w-4xl py-4'>
        <h1 className='mb-8 text-center text-3xl font-bold'>
          Posts ({allPosts.length})
        </h1>
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </PageWrapper>
  )
}
