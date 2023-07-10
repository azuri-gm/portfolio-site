import { PageWrapper } from '@/components/PageWrapper'

export default function Home() {
  return (
    <PageWrapper>
      <div className='prose prose-lg mx-auto max-w-none dark:prose-invert'>
        <h1 className=''>About</h1>
        <p>
          I&apos;m a software engineer at Apptegy, focused on creating web
          applications. Over the years, I&apos;ve worked on projects ranging
          from small web applications to large enterprise systems. I love
          exploring new technologies and making complex things simple. I&apos;m
          passionate about building high-quality software that makes a
          difference in people&apos;s lives.
        </p>
      </div>
    </PageWrapper>
  )
}
