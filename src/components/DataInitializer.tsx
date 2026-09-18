'use client';

import { useEffect, useState } from 'react';
import { initializeDemoData } from '@/lib/demo-data';
import { useStore } from '@/lib/store';

export default function DataInitializer() {
  const [isMounted, setIsMounted] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined' && !hasInitialized) {
      // Manually hydrate the store from localStorage
      useStore.persist.rehydrate();
      
      // Wait a bit for hydration to complete, then check if we need demo data
      setTimeout(() => {
        const currentUsers = useStore.getState().users;
        if (!currentUsers || currentUsers.length === 0) {
          // Initialize demo data if no users exist
          initializeDemoData().catch(console.error);
        }
        setHasInitialized(true);
      }, 100);
    }
  }, [isMounted, hasInitialized]);

  return null;
}
