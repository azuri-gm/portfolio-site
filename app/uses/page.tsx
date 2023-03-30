import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import { PageWrapper } from '@/components/PageWrapper'

export const metadata = {
  title: 'Eduardo Gaytan | Software Engineer',
  description: 'Software and hardware I use day-to-day',
}

export default function Home() {
  const uses = allPosts.find((post) => post._id === 'uses.md')

  if (!uses) {
    notFound()
  }

  return (
    <PageWrapper>
      <article className='prose mx-auto max-w-none'>
        <div
          className='cl-post-body'
          dangerouslySetInnerHTML={{ __html: uses.body.html }}
        />
      </article>
    </PageWrapper>
  )
}
