import { allPosts } from 'contentlayer/generated'

export default async function sitemap() {
  const posts = allPosts.map((post) => ({
    url: `https://azuri.app/blog/${post.slug}`,
    lastModified: post.date,
  }))

  const routes = ['/', '/about', '/blog', '/uses'].map((route) => ({
    url: `https://azuri.app${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...posts]
}
