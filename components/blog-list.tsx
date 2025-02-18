'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

interface Post {
  id: string;
  title: string;
  date: string;
}

export default function BlogList({ initialPosts }: { initialPosts: Post[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = initialPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mx-auto px-4 py-16 pt-24'>
      <motion.h1
        className='text-4xl font-bold mb-8 text-center'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Latest Blog Posts
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='mb-8'
      >
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
          <Input
            type='text'
            placeholder='Search posts...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
      </motion.div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {filteredPosts.map(({ id, date, title }, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/blog/${id}`} className='block'>
              <div className='bg-card hover:bg-accent transition-colors duration-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-300'>
                <div className='p-6'>
                  <h2 className='text-2xl font-semibold mb-2 line-clamp-2'>
                    {title}
                  </h2>
                  <div className='flex items-center text-muted-foreground mb-4'>
                    <Calendar className='w-4 h-4 mr-2' />
                    <time>{format(new Date(date), 'MMMM d, yyyy')}</time>
                  </div>
                  <div className='flex items-center text-primary'>
                    <span className='mr-2'>Read more</span>
                    <ArrowRight className='w-4 h-4' />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='text-center text-muted-foreground mt-8'
        >
          No posts found matching your search.
        </motion.p>
      )}
    </div>
  );
}
