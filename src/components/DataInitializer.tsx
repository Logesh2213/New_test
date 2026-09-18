'use client';

import { useEffect, useState, useRef } from 'react';
import { initializeDemoData } from '@/lib/demo-data';
import { useStore } from '@/lib/store';

export default function DataInitializer() {
  const [isMounted, setIsMounted] = useState(false);
  const users = useStore((state) => state.users);
  const hasInitialized = useRef(false);

  useEffect(() => {
    console.log('[DataInitializer] Component mounted');
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined' && !hasInitialized.current) {
      console.log('[DataInitializer] Checking for users:', users?.length || 0);
      
      if (!users || users.length === 0) {
        console.log('[DataInitializer] No users found, initializing demo data');
        hasInitialized.current = true;
        initializeDemoData().catch(console.error);
      } else {
        console.log('[DataInitializer] Users exist, skipping initialization');
        hasInitialized.current = true;
      }
    }
  }, [isMounted, users]);

  return null;
}
