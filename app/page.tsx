import { getAllPosts } from 'lib/posts'

import { LatestPosts } from '@/components/LatestPosts'
import { PageWrapper } from '@/components/PageWrapper'
import { BalancedTitle } from '@/components/BalancedTitle'
import Balancer from 'react-wrap-balancer'
import MagneticWrapper from '@/components/MagneticWrapper'

export default async function Home() {
  const posts = getAllPosts()
  return (
    <PageWrapper>
      <div className='prose mx-auto max-w-none dark:prose-invert'>
        <div className='pt-4 text-center'>
          <MagneticWrapper>
            <BalancedTitle className='text-4xl sm:text-6xl'>
              I&apos;m Eduardo, a software engineer.
            </BalancedTitle>
          </MagneticWrapper>
          <h3 className='mt-6 text-lg'>
            <MagneticWrapper>
              <Balancer>
                Tech lover with a passion for everything front end and coffee.
              </Balancer>
            </MagneticWrapper>
          </h3>
        </div>
        <LatestPosts posts={posts} />
      </div>
    </PageWrapper>
  )
}
