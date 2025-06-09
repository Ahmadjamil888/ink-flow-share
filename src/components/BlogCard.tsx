
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogPost, useBlog } from '@/contexts/BlogContext';
import { Share, Edit, Delete } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { EditPostModal } from './EditPostModal';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  showActions?: boolean;
}

export const BlogCard = ({ post, featured = false, showActions = false }: BlogCardProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { deletePost, updatePost } = useBlog();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const canEdit = user && post.authorId === user.id;

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const postUrl = `${window.location.origin}/post/${post.id}`;
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: postUrl,
        });
      } else {
        await navigator.clipboard.writeText(postUrl);
        toast({
          title: "Link copied!",
          description: "Blog post link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      toast({
        title: "Share failed",
        description: "Unable to share the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;

    const success = deletePost(post.id, user.id);
    if (success) {
      toast({
        title: "Success",
        description: "Blog post deleted successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: "You can only delete your own posts.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updates: Partial<BlogPost>) => {
    if (!user) return;
    
    const success = updatePost(post.id, updates, user.id);
    if (success) {
      toast({
        title: "Success",
        description: "Blog post updated successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: "You can only edit your own posts.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const ActionButtons = () => (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="hover:bg-accent"
      >
        <Share className="h-4 w-4" />
      </Button>
      {canEdit && showActions && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="hover:bg-accent"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="hover:bg-accent text-red-600 hover:text-red-700"
          >
            <Delete className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );

  if (featured) {
    return (
      <>
        <Link to={`/post/${post.id}`} className="block">
          <Card className="mb-8 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            {post.imageUrl && (
              <div className="aspect-[2/1] overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardContent className="p-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{post.author}</span>
                  <span>•</span>
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </div>
                <ActionButtons />
              </div>
              <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </CardContent>
          </Card>
        </Link>
        <EditPostModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          post={post}
          onSave={handleSaveEdit}
        />
      </>
    );
  }

  return (
    <>
      <Link to={`/post/${post.id}`} className="block">
        <Card className="mb-6 overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer">
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{post.author}</span>
                <span>•</span>
                <span>{formatDate(post.publishedAt)}</span>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </div>
              <ActionButtons />
            </div>
            <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {post.excerpt}
            </p>
          </CardContent>
        </Card>
      </Link>
      <EditPostModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        post={post}
        onSave={handleSaveEdit}
      />
    </>
  );
};
