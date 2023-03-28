import { Post } from 'contentlayer/generated'
import Link from 'next/link'

export const LatestPosts = ({ posts }: { posts: Post[] }) => {
  const latestPosts = posts
    .slice(0, 3)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <section className='mt-8'>
      <div className='flex justify-between'>
        <h2>Latest Posts</h2>
        <Link href='/blog'>All articles &gt;&gt;</Link>
      </div>
      <div className='mt-4'>
        {latestPosts.map((post, idx) => (
          <div key={idx} className='flex flex-col mb-4 gap-2'>
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
