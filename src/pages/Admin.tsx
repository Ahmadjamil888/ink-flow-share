
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EditPostModal } from '@/components/EditPostModal';
import { BlogPost } from '@/contexts/BlogContext';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { posts, deletePost, updatePost } = useBlog();
  const { users, deleteUser } = useAuth();
  const { toast } = useToast();

  const ADMIN_EMAIL = 'admin@gmail.com';
  const ADMIN_PASSWORD = 'PASSWORD';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid admin credentials');
    }
  };

  const handleDeletePost = (postId: string) => {
    // Admin can delete any post, so we'll pass the post's authorId
    const post = posts.find(p => p.id === postId);
    if (post) {
      const success = deletePost(postId, post.authorId);
      if (success) {
        toast({
          title: "Success",
          description: "Blog post deleted successfully.",
        });
      }
    }
  };

  const handleDeleteUser = (userId: string) => {
    const success = deleteUser(userId);
    if (success) {
      toast({
        title: "Success",
        description: "User deleted successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: "Cannot delete this user.",
        variant: "destructive",
      });
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
  };

  const handleSaveEdit = (updates: Partial<BlogPost>) => {
    if (editingPost) {
      // Admin can edit any post
      const success = updatePost(editingPost.id, updates, editingPost.authorId);
      if (success) {
        toast({
          title: "Success",
          description: "Blog post updated successfully.",
        });
        setEditingPost(null);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
              
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* All Blogs Section */}
          <Card>
            <CardHeader>
              <CardTitle>All Blog Posts ({posts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {posts.map(post => (
                  <div key={post.id} className="border-b border-border pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{post.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          By {post.author} • {new Date(post.publishedAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ID: {post.id}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditPost(post)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* All Users Section */}
          <Card>
            <CardHeader>
              <CardTitle>All Users ({users.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {users.map(user => (
                  <div key={user.id} className="border-b border-border pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{user.name}</h3>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Password (hashed): {user.password}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Joined: {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {user.id}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 ml-2"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <EditPostModal
        isOpen={!!editingPost}
        onClose={() => setEditingPost(null)}
        post={editingPost}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Admin;
