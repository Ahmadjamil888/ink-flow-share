
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BlogPost } from '@/contexts/BlogContext';
import { useToast } from '@/hooks/use-toast';

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
  onSave: (updates: Partial<BlogPost>) => void;
}

export const EditPostModal = ({ isOpen, onClose, post, onSave }: EditPostModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl || '',
      });
    }
  }, [post]);

  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const generateExcerpt = (content: string): string => {
    const words = content.split(/\s+/).slice(0, 20);
    return words.join(' ') + (content.split(/\s+/).length > 20 ? '...' : '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updates = {
        title: formData.title,
        content: formData.content,
        excerpt: generateExcerpt(formData.content),
        readTime: calculateReadTime(formData.content),
        imageUrl: formData.imageUrl || undefined,
      };

      onSave(updates);
      
      toast({
        title: "Success",
        description: "Your blog post has been updated!",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Blog Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Enter your blog post title"
              className="text-lg"
            />
          </div>

          <div>
            <Label htmlFor="imageUrl">Featured Image URL (Optional)</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              placeholder="Write your blog post content here..."
              className="min-h-[300px] resize-y"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
