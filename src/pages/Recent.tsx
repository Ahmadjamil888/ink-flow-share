
import React from 'react';
import { Header } from '@/components/Header';
import { BlogCard } from '@/components/BlogCard';
import { useBlog } from '@/contexts/BlogContext';

const Recent = () => {
  const { posts } = useBlog();
  
  // Sort posts by date, newest first
  const recentPosts = [...posts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, 10); // Show only last 10 posts

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Recent Posts</h1>
          
          {recentPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No recent posts found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {recentPosts.map(post => (
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

export default Recent;
