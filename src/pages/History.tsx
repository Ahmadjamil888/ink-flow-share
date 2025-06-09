
import React from 'react';
import { Header } from '@/components/Header';
import { BlogCard } from '@/components/BlogCard';
import { useBlog } from '@/contexts/BlogContext';

const History = () => {
  const { posts } = useBlog();
  
  // Sort posts by date, oldest first for history view
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">History</h1>
          
          {sortedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No posts found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedPosts.map(post => (
                <BlogCard 
                  key={post.id} 
                  post={post}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
