'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page since authentication is disabled
    router.push('/');
  }, [router]);

  return null;
}
