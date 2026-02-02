'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User } from 'lucide-react';

export function Navigation() {
  const { isLoggedIn, user, logout, isLoading } = useAuth();

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/RUMERA -AI LOGO.jpeg" 
              alt="RUMERA Logo" 
              width={40} 
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold text-foreground">RUMERA</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            {isLoggedIn && !isLoading && (
              <>
                <Link href="/" className="hidden sm:inline text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link href="/analyze" className="hidden sm:inline text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                  Analyze
                </Link>
                <Link href="/history" className="hidden sm:inline text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                  History
                </Link>
                <Link href="/about" className="hidden sm:inline text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                  About
                </Link>
              </>
            )}
            
            <ThemeToggle />
            
            {!isLoading && (
              <>
                {isLoggedIn ? (
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 text-sm text-foreground/70">
                      <User className="h-4 w-4" />
                      <span>{user?.name}</span>
                    </div>
                    <Button 
                      size="sm"
                      variant="ghost"
                      className="text-foreground/70 hover:text-foreground hover:bg-destructive/10"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link href="/login">
                      <Button size="sm" variant="ghost" className="text-foreground/70 hover:text-foreground">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
