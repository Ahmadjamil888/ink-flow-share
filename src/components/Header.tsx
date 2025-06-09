import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreatePostModal } from './CreatePostModal';

export const Header = () => {
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);

  return (
    <>
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold tracking-tight">The Daily Herald</h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                Your trusted source for quality journalism
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={() => setCreatePostModalOpen(true)}
                className="bg-primary hover:bg-primary/90"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </header>

      <CreatePostModal
        isOpen={createPostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
      />
    </>
  );
};
