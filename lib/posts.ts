import { allPosts, type Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

export function getAllPosts(): Post[] {
  return allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )
}

export function getPost(slug: string): Post {
  const post = allPosts.find((post) => post.slug === slug)

  if (!post) throw new Error('No post was found')

  return post
}
