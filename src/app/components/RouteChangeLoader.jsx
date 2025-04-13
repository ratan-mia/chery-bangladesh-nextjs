'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RouteChangeLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Update loading state on route change
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => {
      setTimeout(() => setIsLoading(false), 500); // Small delay to ensure smooth transition
    };

    // Listen for route changes
    if (pathname) handleStart();
    
    // Set timeout to handle completion
    const completeTimeout = setTimeout(handleComplete, 1000);
    
    return () => {
      clearTimeout(completeTimeout);
    };
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {/* Chery Logo */}
            <motion.div
              className="w-32 h-32 flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.3,
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
              transition={{ delay: 0.2 }}
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
  );
}