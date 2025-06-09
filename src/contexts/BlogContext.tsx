
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  authorId: string;
  publishedAt: Date;
  readTime: number;
  imageUrl?: string;
}

interface BlogContextType {
  posts: BlogPost[];
  createPost: (post: Omit<BlogPost, 'id' | 'publishedAt'>) => void;
  getPostById: (id: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'The Future of Web Development',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development...',
      author: 'John Doe',
      authorId: '1',
      publishedAt: new Date('2024-01-15'),
      readTime: 5,
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    },
    {
      id: '2',
      title: 'Understanding Modern JavaScript',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      excerpt: 'A comprehensive guide to modern JavaScript features and best practices...',
      author: 'Jane Smith',
      authorId: '2',
      publishedAt: new Date('2024-01-10'),
      readTime: 8,
      imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
    },
  ]);

  const createPost = (post: Omit<BlogPost, 'id' | 'publishedAt'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      publishedAt: new Date(),
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const getPostById = (id: string): BlogPost | undefined => {
    return posts.find(post => post.id === id);
  };

  const value = {
    posts,
    createPost,
    getPostById,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
