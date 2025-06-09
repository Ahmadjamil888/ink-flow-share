
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { CreatePostModal } from './CreatePostModal';

export const Header = () => {
  const { user, signOut, isSignedIn } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);

  const handleSignIn = () => {
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

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
              {isSignedIn ? (
                <>
                  <Button 
                    onClick={() => setCreatePostModalOpen(false)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Create New
                  </Button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      Welcome, {user?.name}
                    </span>
                    <Button variant="outline" onClick={signOut}>
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={handleSignIn}>
                    Sign In
                  </Button>
                  <Button onClick={handleSignUp}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      <CreatePostModal
        isOpen={createPostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
      />
    </>
  );
};
