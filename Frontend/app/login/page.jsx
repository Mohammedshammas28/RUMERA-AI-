'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login as loginService } from '@/services/authService';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginService(formData.email, formData.password);
      
      if (response.success || response.user) {
        setSuccess('Login successful!');
        // Update auth context
        login(response.user, response.token);
        // Instant redirect
        router.replace('/');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col items-center justify-center px-4">
      {/* Welcome Message */}
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Welcome back to <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">RUMERA</span>
        </h1>
        <p className="text-lg text-foreground/70">
          A New Era of Truth
        </p>
      </div>

      {/* Form Card */}
      <Card className="w-full max-w-md border border-border/50 bg-card/50 p-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Sign In</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Continue your verification journey
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-border/50 bg-background/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="john@example.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-border/50 bg-background/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Create one
          </Link>
        </p>
      </Card>
    </div>
  );
}
