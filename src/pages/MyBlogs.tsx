
import React from 'react';
import { Header } from '@/components/Header';
import { BlogCard } from '@/components/BlogCard';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';

const MyBlogs = () => {
  const { getPostsByAuthor } = useBlog();
  const { user } = useAuth();
  
  const myPosts = user ? getPostsByAuthor(user.id) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Blogs</h1>
          
          {!user ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Please sign in to view your blogs.</p>
            </div>
          ) : myPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">You haven't created any blogs yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {myPosts.map(post => (
                <BlogCard 
                  key={post.id} 
                  post={post}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyBlogs;
