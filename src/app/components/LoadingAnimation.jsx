'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingAnimation() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reduced loading time from 1000ms to 800ms for faster initial load
    // Still provides enough time for branding effect
    const minLoadingTime = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => {
      clearTimeout(minLoadingTime);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }} // Reduced from 0.5s to 0.3s
        >
          <div className="relative">
            {/* Chery Logo */}
            <motion.div
              className="w-32 h-32 flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }} // Increased initial scale for faster animation
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.3, // Reduced from 0.5s to 0.3s
                ease: "easeOut" 
              }}
            >
              {/* Using next/image would be better here for optimization */}
              <img
                src="/logo.png" 
                alt="Chery Logo"
                className="w-24 h-auto"
                // Add loading="eager" if using regular img tag
                loading="eager"
              />
            </motion.div>
            
            {/* Loading indicator */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }} // Reduced delay from 0.5s to 0.2s
            >
              <div className="w-full max-w-[100px] h-1 bg-gray-200 overflow-hidden">
                <motion.div 
                  className="h-full bg-primary-600"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1, // Reduced from 1.2s to 1s
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="mt-8 text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }} // Reduced delay from 0.6s to 0.3s
          >
            Loading...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}