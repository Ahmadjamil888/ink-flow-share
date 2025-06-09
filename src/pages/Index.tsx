
import React from 'react';
import { Header } from '@/components/Header';
import { BlogCard } from '@/components/BlogCard';
import { useBlog } from '@/contexts/BlogContext';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Index = () => {
  const { posts } = useBlog();
  
  // Sort posts by date, newest first
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const featuredPost = sortedPosts[0];
  const regularPosts = sortedPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <div className="p-2">
          <SidebarTrigger />
        </div>
      </div>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {featuredPost && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Featured Story</h2>
              <BlogCard post={featuredPost} featured={true} />
            </section>
          )}
          
          {regularPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-foreground">Latest Stories</h2>
              <div className="space-y-6">
                {regularPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Welcome to The Daily Herald</h2>
              <p className="text-muted-foreground text-lg">
                No stories published yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
