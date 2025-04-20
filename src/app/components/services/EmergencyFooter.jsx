'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, ChevronDown, ChevronUp, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const EmergencyFooter = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Improved color palette with better contrast and visual appeal
  const colors = {
    crimson: "#E63946", // Vibrant red - more modern than previous crimson
    navy: "#1D3557",    // Deeper, richer navy with more character
    gold: "#c4b19c",    // Brighter, more vibrant gold
    skyBlue: "#457B9D", // Mid-tone blue for accents
    cream: "#F1FAEE"    // Cleaner, crisper light color for text
  };

  // Start pulsing animation every 10 seconds
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      if (!isMinimized) {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 2000);
      }
    }, 10000);
    
    return () => clearInterval(pulseInterval);
  }, [isMinimized]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 2000);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 inset-x-0 z-50"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {isMinimized ? (
            // Minimized state - circular button
            <motion.div
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: colors.crimson }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.1, 0] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <motion.button
                onClick={toggleMinimize}
                className="relative rounded-full p-4 shadow-lg flex items-center justify-center"
                style={{ 
                  backgroundColor: colors.crimson,
                  color: "white",
                  boxShadow: `0 4px 15px rgba(214, 40, 40, 0.4)`
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 6px 20px rgba(214, 40, 40, 0.5)`
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Show emergency hotline"
              >
                <AlertTriangle size={24} />
              </motion.button>
            </motion.div>
          ) : (
            // Full footer
            <div className="relative">
              {/* Expandable info section */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    style={{ backgroundColor: colors.navy }}
                    className="border-t"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="max-w-screen-xl mx-auto px-4 py-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-lg p-4" style={{ backgroundColor: `${colors.navy}`, border: `1px solid ${colors.skyBlue}30`, boxShadow: `0 4px 12px rgba(0,0,0,0.1)` }}>
                          <div className="flex items-center mb-2">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: `${colors.gold}30` }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 8v4l2 2"></path>
                              </svg>
                            </div>
                            <div style={{ color: colors.cream, fontWeight: 500 }}>24/7 Response Time</div>
                          </div>
                          <p className="text-sm ml-11" style={{ color: `${colors.cream}90` }}>
                            Our technicians respond within 30 minutes in urban areas, 60 minutes nationwide
                          </p>
                        </div>
                        
                        <div className="rounded-lg p-4" style={{ backgroundColor: `${colors.navy}`, border: `1px solid ${colors.skyBlue}30`, boxShadow: `0 4px 12px rgba(0,0,0,0.1)` }}>
                          <div className="flex items-center mb-2">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: `${colors.gold}30` }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                              </svg>
                            </div>
                            <div style={{ color: colors.cream, fontWeight: 500 }}>Repair Services</div>
                          </div>
                          <p className="text-sm ml-11" style={{ color: `${colors.cream}90` }}>
                            On-site repairs for minor issues and towing service for major problems
                          </p>
                        </div>
                        
                        <div className="rounded-lg p-4" style={{ backgroundColor: `${colors.navy}`, border: `1px solid ${colors.skyBlue}30`, boxShadow: `0 4px 12px rgba(0,0,0,0.1)` }}>
                          <div className="flex items-center mb-2">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: `${colors.gold}30` }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="3" width="15" height="13"></rect>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                              </svg>
                            </div>
                            <div style={{ color: colors.cream, fontWeight: 500 }}>Towing Coverage</div>
                          </div>
                          <p className="text-sm ml-11" style={{ color: `${colors.cream}90` }}>
                            Free towing to the nearest Chery service center up to 100km
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Main footer */}
              <motion.div 
                style={{ 
                  background: `linear-gradient(135deg, ${colors.crimson} 0%, #d82f3c 100%)`,
                  boxShadow: "0 -2px 10px rgba(0,0,0,0.15)"
                }}
                animate={isPulsing ? { 
                  boxShadow: [
                    "0 -2px 10px rgba(0,0,0,0.15)", 
                    "0 -4px 20px rgba(230, 57, 70, 0.4)", 
                    "0 -2px 10px rgba(0,0,0,0.15)"
                  ] 
                } : {}}
                transition={{ duration: 2 }}
              >
                <div className="flex items-stretch">
                  {/* Left expand toggle section */}
                  <motion.button
                    onClick={toggleExpand}
                    className="hidden md:flex items-center justify-center w-14 border-r border-white/10"
                    style={{ backgroundColor: colors.navy }}
                    whileHover={{ backgroundColor: "#2a4568" }}
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: colors.cream }}
                    >
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </motion.div>
                  </motion.button>

                  {/* Center content */}
                  <div className="flex-1 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <motion.div
                        className="mr-4 p-2 rounded-full"
                        style={{ 
                          backgroundColor: colors.navy,
                          color: colors.gold
                        }}
                        animate={isPulsing ? {
                          scale: [1, 1.1, 1],
                          backgroundColor: [colors.navy, "#2a4568", colors.navy],
                          boxShadow: ["0 0 0 rgba(255,183,3,0)", "0 0 15px rgba(255,183,3,0.5)", "0 0 0 rgba(255,183,3,0)"]
                        } : {}}
                        transition={{ duration: 2 }}
                      >
                        <Phone size={24} />
                      </motion.div>
                      
                      <div>
                        <div className="text-xs font-medium opacity-90" style={{ color: "white" }}>
                          24/7 EMERGENCY ASSISTANCE
                        </div>
                        <motion.a
                          href="tel:09639119977"
                          className="text-xl md:text-2xl font-bold"
                          style={{ color: "white" }}
                          whileHover={{ x: 2 }}
                        >
                          09639119977
                        </motion.a>
                      </div>
                    </div>
                    
                    <div className="hidden md:block">
                      <motion.a
                        href="tel:09639119977"
                        className="flex items-center px-6 py-2 rounded-full font-medium text-sm"
                        style={{ 
                          background: `linear-gradient(to right, ${colors.gold}, #FDBE3B)`,
                          color: colors.navy,
                          boxShadow: "0 2px 10px rgba(255,183,3,0.3)"
                        }}
                        whileHover={{ 
                          scale: 1.03,
                          boxShadow: "0 4px 15px rgba(255,183,3,0.5)"
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="mr-2">Call Now</span>
                        <ArrowRight size={16} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Right minimize button */}
                  <motion.button
                    onClick={toggleMinimize}
                    className="w-12 flex items-center justify-center border-l border-white/10"
                    style={{ 
                      backgroundColor: colors.navy,
                      color: colors.cream
                    }}
                    whileHover={{ 
                      backgroundColor: "#2a4568",
                      color: colors.gold 
                    }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>
                
                {/* Mobile call button - only visible on small screens */}
                <div className="md:hidden py-3 px-4" style={{ backgroundColor: colors.navy }}>
                  <motion.a
                    href="tel:09639119977"
                    className="flex items-center justify-center py-3 rounded-full font-medium text-sm w-full"
                    style={{ 
                      background: `linear-gradient(to right, ${colors.gold}, #FDBE3B)`,
                      color: colors.navy,
                      boxShadow: "0 2px 10px rgba(255,183,3,0.3)"
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 4px 15px rgba(255,183,3,0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-2">Call Emergency Hotline</span>
                    <Phone size={14} />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyFooter;