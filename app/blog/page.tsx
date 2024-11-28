import { allPosts, type Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { getAllPosts } from 'lib/posts'
import Link from 'next/link'

import { PageWrapper } from '@/components/PageWrapper'

export const metadata = {
  title: 'Blog | Eduardo Gaytan',
  description:
    'Articles and thoughts on software engineering, web development, and technology',
}

type PostCardProps = Post

function PostCard({ title, date, excerpt, _id }: PostCardProps) {
  return (
    <div className='hover:bg-background-blue mb-6 rounded-lg p-4'>
      <Link href={`/blog/${_id}`} className='text-xl'>
        <time dateTime={date} className='block text-sm text-slate-600'>
          {format(parseISO(date), "MMMM d, yyyy 'at' hh:mm a'")}
        </time>
        <h2 className='flex flex-col'>
          {title}
          <p className='mt-4 text-[16px]'>{excerpt}</p>
        </h2>
      </Link>
    </div>
  )
}

export default async function BlogPage() {
  const posts = getAllPosts()

  return (
    <PageWrapper>
      <div className='mx-auto max-w-4xl py-4'>
        <h1 className='mb-8 text-center text-3xl font-bold'>
          Posts ({posts.length})
        </h1>
        {posts.map((post, idx) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </PageWrapper>
  )
}
