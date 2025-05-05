// components/ClientLoadingWrapper.tsx
'use client'

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CheryLoader from './CheryLoader';

export default function ClientLoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loader for 2 seconds on initial load

    return () => clearTimeout(timer);
  }, []);

  // For page transitions
  useEffect(() => {
    // Prevent showing loader for small changes like hash or search params
    if (pathname === window.location.pathname) return;

    // This will trigger when the route changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Show loader for a shorter time during navigation

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      <CheryLoader isLoading={isLoading} />
      {children}
    </>
  );
}