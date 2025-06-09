import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useBlog } from '@/contexts/BlogContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { createPost } = useBlog();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Helper: estimate read time
  function getReadTime(text: string): number {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }

  // Helper: create a short excerpt
  function getExcerpt(text: string): string {
    const words = text.trim().split(/\s+/);
    return words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
  }

  function handleChange(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const postPayload = {
        title: formData.title,
        content: formData.content,
        excerpt: getExcerpt(formData.content),
        author: user?.name || 'Anonymous',
        authorId: user?.id || 'anonymous',
        readTime: getReadTime(formData.content),
        imageUrl: formData.imageUrl || undefined,
      };

      await Promise.resolve(createPost(postPayload));

      toast({
        title: 'Success',
        description: 'Your blog post has been published!',
      });

      setFormData({ title: '', content: '', imageUrl: '' });
      onClose();
      navigate('/');
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Blog Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleChange('title')}
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
              onChange={handleChange('imageUrl')}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={handleChange('content')}
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
              {isLoading ? 'Publishing...' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};