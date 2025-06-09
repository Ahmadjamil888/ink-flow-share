
import React from 'react';
import { Header } from '@/components/Header';
import { BlogCard } from '@/components/BlogCard';
import { useBlog } from '@/contexts/BlogContext';

const Index = () => {
  const { posts } = useBlog();

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {featuredPost && (
              <section className="mb-12">
                <div className="border-b border-border pb-4 mb-6">
                  <h2 className="text-2xl font-bold">Featured Story</h2>
                </div>
                <BlogCard post={featuredPost} featured />
              </section>
            )}

            <section>
              <div className="border-b border-border pb-4 mb-6">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
              </div>
              {otherPosts.length > 0 ? (
                <div className="space-y-6">
                  {otherPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No more articles available.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* About Section */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">About The Daily Herald</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your trusted source for quality journalism, bringing you the latest insights 
                  in technology, culture, and innovation. Join our community of readers and writers.
                </p>
              </div>

              {/* Categories */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
                <div className="space-y-2">
                  {['Technology', 'Science', 'Business', 'Culture', 'Opinion'].map((category) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm hover:text-primary cursor-pointer transition-colors">
                        {category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 20) + 5}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest articles delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-input rounded-md text-sm"
                  />
                  <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-md text-sm transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">The Daily Herald</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Committed to bringing you quality journalism and insightful commentary 
                on the topics that matter most.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <div className="hover:text-primary cursor-pointer transition-colors">About Us</div>
                <div className="hover:text-primary cursor-pointer transition-colors">Contact</div>
                <div className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</div>
                <div className="hover:text-primary cursor-pointer transition-colors">Terms of Service</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="space-y-2 text-sm">
                <div className="hover:text-primary cursor-pointer transition-colors">Twitter</div>
                <div className="hover:text-primary cursor-pointer transition-colors">LinkedIn</div>
                <div className="hover:text-primary cursor-pointer transition-colors">Facebook</div>
                <div className="hover:text-primary cursor-pointer transition-colors">RSS Feed</div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 The Daily Herald. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
