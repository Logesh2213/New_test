'use client';

import { useEffect, useState } from 'react';

export default function HydrationBoundary({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log('[HydrationBoundary] Component mounted, setting isMounted to true');
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    console.log('[HydrationBoundary] Not mounted yet, returning null');
    return null;
  }

  console.log('[HydrationBoundary] Mounted, rendering children');
  return <>{children}</>;
}
