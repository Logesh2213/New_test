'use client';

import { useEffect, useState } from 'react';
import { initializeDemoData } from '@/lib/demo-data';

export default function DataInitializer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      // Only initialize if no data exists
      const hasData = localStorage.getItem('arkk-event-storage');
      if (!hasData) {
        initializeDemoData().catch(console.error);
      }
    }
  }, [isMounted]);

  return null;
}
