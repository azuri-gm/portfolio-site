import { type Post } from 'contentlayer/generated'
import Link from 'next/link'

export const LatestPosts = ({ posts }: { posts: Post[] }) => {
  const latestPosts = posts
    .filter((post) => post._id !== 'uses.md')
    .slice(0, 5)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <section className='mt-8'>
      <div className='flex items-baseline justify-between'>
        <h2>Latest Posts</h2>
        <Link href='/blog'>All articles &gt;&gt;</Link>
      </div>
      <div className='mt-4'>
        {latestPosts.map((post, idx) => (
          <div
            key={`${post.title}-${idx}`}
            className='mb-4 flex flex-col gap-2'
          >
            <Link href={`/blog/${post._id}`} className='font-medium'>
              {post.title}
            </Link>
            <time className='text-shade-blue text-xs'>
              {new Date(post.date).toLocaleDateString()}
            </time>
          </div>
        ))}
      </div>
    </section>
  )
}
