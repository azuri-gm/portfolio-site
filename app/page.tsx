import HomeV2 from '@/components/v2/home'
import { getSortedPostsData } from '@/lib/blog'

export default function Home() {
  const posts = getSortedPostsData()
  return <HomeV2 posts={posts} />
}
