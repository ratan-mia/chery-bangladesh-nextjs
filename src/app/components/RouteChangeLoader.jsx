'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

// Create a separate component for the parts that need Suspense
function NavigationEventWatcher({ onRouteChange }) {
  const pathname = usePathname();
  // We moved useSearchParams into its own component
  const SearchParamsWatcher = () => {
    const searchParams = useSearchParams();
    
    // This effect will run when searchParams changes
    useEffect(() => {
      onRouteChange();
    }, [searchParams, onRouteChange]);
    
    return null;
  };
  
  // Run effect when pathname changes
  useEffect(() => {
    onRouteChange();
  }, [pathname, onRouteChange]);
  
  return (
    <Suspense fallback={null}>
      <SearchParamsWatcher />
    </Suspense>
  );
}

export default function RouteChangeLoader() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Callback for route changes - reduced timeout for faster loading
  const handleRouteChange = () => {
    setIsLoading(true);
    // Reduced timeout to improve performance
    setTimeout(() => setIsLoading(false), 300);
  };
  
  return (
    <>
      <NavigationEventWatcher onRouteChange={handleRouteChange} />
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="relative">
              {/* Chery Logo */}
              <motion.div
                className="w-32 h-32 flex items-center justify-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.15,
                  ease: "easeOut" 
                }}
              >
                {/* Replace with actual Chery logo */}
                <img
                  src="/logo.png" 
                  alt="Chery Logo"
                  className="w-24 h-auto"
                />
              </motion.div>
              
              {/* Loading indicator */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-full max-w-[100px] h-1 bg-gray-200 overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ 
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


