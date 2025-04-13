'use client';

import { useEffect, useState } from 'react';
import LoadingAnimation from './LoadingAnimation';
import RouteChangeLoader from './RouteChangeLoader';

export default function ClientLoadingWrapper() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  useEffect(() => {
    // Only show the initial loading animation on first site load
    // Use localStorage to check if the user has visited before
    const hasVisitedBefore = localStorage.getItem('hasVisitedCheryBD');
    
    if (hasVisitedBefore) {
      setIsFirstLoad(false);
    } else {
      // Mark that the user has visited
      localStorage.setItem('hasVisitedCheryBD', 'true');
      
      // Set a timer to remember "first load" status for current session
      // This prevents loading animation from showing on refreshes
      // but will show it if they close the tab and return later
      setTimeout(() => {
        setIsFirstLoad(false);
      }, 1000); // Adjust timing to match your LoadingAnimation duration
    }
  }, []);
  
  return (
    <>
      {/* Show intro animation only on first load of the site */}
      {isFirstLoad && <LoadingAnimation />}
      
      {/* Always show for page transitions */}
      <RouteChangeLoader />
    </>
  );
}