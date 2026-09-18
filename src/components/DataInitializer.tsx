'use client';

import { useEffect, useState } from 'react';
import { initializeDemoData } from '@/lib/demo-data';
import { useStore } from '@/lib/store';

export default function DataInitializer() {
  const [isMounted, setIsMounted] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    console.log('[DataInitializer] Component mounted, setting isMounted to true');
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined' && !hasInitialized) {
      console.log('[DataInitializer] Starting initialization process');
      
      // Manually hydrate the store from localStorage
      console.log('[DataInitializer] Hydrating store from localStorage');
      useStore.persist.rehydrate();
      
      // Wait a bit for hydration to complete, then check if we need demo data
      setTimeout(() => {
        const currentUsers = useStore.getState().users;
        console.log('[DataInitializer] Current users in store:', currentUsers?.length || 0);
        
        if (!currentUsers || currentUsers.length === 0) {
          console.log('[DataInitializer] No users found, initializing demo data');
          // Initialize demo data if no users exist
          initializeDemoData().catch(console.error);
        } else {
          console.log('[DataInitializer] Users already exist, skipping demo data initialization');
        }
        setHasInitialized(true);
      }, 100);
    }
  }, [isMounted, hasInitialized]);

  return null;
}
