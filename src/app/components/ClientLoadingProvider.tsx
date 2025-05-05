'use client'

import { useEffect, useState } from 'react';
import CheryLoader from './CheryLoader';

/**
 * ClientLoadingProvider - Manages the loading state for the application
 * and provides the CheryLoader for both initial load and route transitions.
 */
export default function ClientLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialLoading, setInitialLoading] = useState(true)

  // Handle initial page load
  useEffect(() => {
    // Show loader for initial page load
    const timer = setTimeout(() => {
      setInitialLoading(false)
    }, 2500) // Initial loading time (adjust as needed)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <CheryLoader
        isLoading={initialLoading}
        enableRouteTransition={true}
        routeTransitionDuration={0.8}
      />
      {children}
    </>
  )
}