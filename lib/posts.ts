import { allPosts, Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

export async function getAllPosts(): Promise<Post[]> {
  const posts = await allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return posts
}
