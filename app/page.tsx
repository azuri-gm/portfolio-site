import { getAllPosts } from 'lib/posts'

import { LatestPosts } from '@/components/LatestPosts'
import { PageWrapper } from '@/components/PageWrapper'

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <PageWrapper>
      <div className='text-center pt-4'>
        <h1 className='text-custom-green sm:text-6xl text-5xl text-shadow-custom'>
          I&apos;m Eduardo, a software engineer.
        </h1>
        <h3 className='mt-6 text-2xl'>
          I specialize in creating web applications, tech lover with a passion
          for everything front end and coffee.
        </h3>
      </div>

      <LatestPosts posts={posts} />
    </PageWrapper>
  )
}
