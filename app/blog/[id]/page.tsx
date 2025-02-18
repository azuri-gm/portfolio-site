import type React from 'react';
import { getPostData, getSortedPostsData } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format } from 'date-fns';

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className='text-3xl font-bold my-4' {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className='text-2xl font-semibold my-3' {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className='text-xl font-semibold my-2' {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className='my-2' {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className='list-disc pl-5 my-2' {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className='list-decimal pl-5 my-2' {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className='my-1' {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className='text-primary hover:underline' {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className='border-l-4 border-primary pl-4 italic my-4'
      {...props}
    />
  ),
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag='div'
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code
        className='bg-muted text-muted-foreground px-1 py-0.5 rounded'
        {...props}
      >
        {children}
      </code>
    );
  },
};

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await params;

  if (!resolvedParams.id) {
    notFound();
  }

  try {
    const postData = await getPostData(resolvedParams.id);

    if (!postData || !postData.content) {
      console.error(
        `Post data or content missing for id: ${resolvedParams.id}`
      );
      notFound();
    }

    return (
      <article className='container mx-auto px-4 py-8 pt-24'>
        <header className='mb-8'>
          <h1 className='text-4xl font-bold mb-4'>{postData.title}</h1>
          <time className='text-muted-foreground'>
            {format(new Date(postData.date), 'MMMM d, yyyy')}
          </time>
        </header>
        <div className='prose prose-lg dark:prose-invert max-w-none'>
          <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
            {postData.content}
          </ReactMarkdown>
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error rendering post:', error);

    if (error instanceof Error && error.message.includes('not found')) {
      notFound();
    }

    return (
      <div className='container mx-auto px-4 py-8 pt-24'>
        <h1 className='text-4xl font-bold mb-4'>Error Loading Post</h1>
        <p className='text-muted-foreground mb-4'>
          Sorry, there was an error loading this post. Please try again later.
        </p>
        <div className='p-4 rounded-lg bg-destructive/10 text-destructive'>
          {error instanceof Error
            ? error.message
            : 'An unexpected error occurred'}
        </div>
      </div>
    );
  }
}
