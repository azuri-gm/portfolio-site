import BlogList from '@/components/blog-list';
import { getSortedPostsData } from '@/lib/blog';

export default function BlogPage() {
  const posts = getSortedPostsData();
  return <BlogList initialPosts={posts} />;
}
