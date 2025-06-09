
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/contexts/BlogContext';
import { Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const { toast } = useToast();

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (featured) {
    return (
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
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="hover:bg-accent"
              >
                <Share className="h-4 w-4" />
              </Button>
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
    );
  }

  return (
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
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="hover:bg-accent"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {post.excerpt}
          </p>
        </CardContent>
      </Link>
    );
  }
};
