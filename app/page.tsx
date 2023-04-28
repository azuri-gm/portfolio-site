import { getAllPosts } from 'lib/posts'

import { LatestPosts } from '@/components/LatestPosts'
import { PageWrapper } from '@/components/PageWrapper'

export default async function Home() {
  const posts = getAllPosts()
  return (
    <PageWrapper>
      <div className='prose max-w-none'>
        <div className='pt-4 text-center'>
          <h1 className='text-custom-green text-shadow-custom text-5xl sm:text-6xl'>
            I&apos;m Eduardo, a software engineer.
          </h1>
          <h3 className='mt-6 text-2xl'>
            I specialize in creating web applications, tech lover with a passion
            for everything front end and coffee.
          </h3>
        </div>
        <LatestPosts posts={posts} />
      </div>
    </PageWrapper>
  )
}
