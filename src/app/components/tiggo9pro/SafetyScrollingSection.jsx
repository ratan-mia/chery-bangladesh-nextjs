'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

/**
 * SafetyScrollingSection Component
 * 
 * Premium responsive section showcasing vehicle safety features
 * Following Chery Bangladesh design system guidelines
 * Features:
 * - Autoplay video with proper fallback
 * - Text that changes on scroll with smooth transitions
 * - Optimized animated stat counter
 * - Enhanced design matching brand guidelines
 */
const SafetyScrollingSection = () => {
    // Safety features data exactly matching requirements
    const safetyFeatures = [
        {
            id: 1,
            smallTitle: "SAFE",
            title: "MORE THAN SAFETY",
            description: "High-strength steel",
            stat: "85%",
            isPercentage: true
        },
        {
            id: 2,
            smallTitle: "SAFE",
            title: "MORE THAN SAFETY",
            description: "Safety airbags",
            stat: "10",
            prefix: "UP TO"
        },
        {
            id: 3,
            smallTitle: "SAFE",
            title: "MORE THAN SAFETY",
            description: "Hot-formed steel",
            stat: "21%",
            isPercentage: true
        },
        {
            id: 4,
            smallTitle: "SAFE",
            title: "MORE THAN SAFETY",
            description: "Traverse side air curtains",
            stat: "2060MM",
            isSpecialFormat: true
        }
    ];

    // States
    const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
    const [countingValue, setCountingValue] = useState(0);
    const [isScrollLocked, setIsScrollLocked] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isVideoError, setIsVideoError] = useState(false);
    const [isInViewport, setIsInViewport] = useState(false);
    const [hasViewedAllContent, setHasViewedAllContent] = useState(false);

    // Refs
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const statsRef = useRef(null);
    const lastScrollTop = useRef(0);
    const currentFeature = safetyFeatures[currentFeatureIndex];
    const touchStartY = useRef(0);
    const animationFrameId = useRef(null);
    
    // Handle scroll within this section to progress through features
    useEffect(() => {
        let wheelEventThrottle;
        let isAnimating = false;
        
        const handleScroll = () => {
            if (!sectionRef.current || !isInViewport) return;
            
            const sectionTop = sectionRef.current.getBoundingClientRect().top;
            const sectionHeight = sectionRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // Section is fully in view
            if (sectionTop <= 0 && sectionTop > -sectionHeight + viewportHeight) {
                const currentScrollTop = window.scrollY;
                const scrollDirection = currentScrollTop > lastScrollTop.current ? 'down' : 'up';
                lastScrollTop.current = currentScrollTop;
                
                // If user has seen all content, don't lock scrolling
                if (hasViewedAllContent && scrollDirection === 'down') {
                    return;
                }
                
                // Only progress if not currently animating
                if (!isAnimating) {
                    if (scrollDirection === 'down' && currentFeatureIndex < safetyFeatures.length - 1) {
                        isAnimating = true;
                        setIsScrollLocked(true);
                        setCurrentFeatureIndex(prev => prev + 1);
                        
                        // Set progress based on current feature
                        setScrollProgress((currentFeatureIndex + 1) / safetyFeatures.length);
                        
                        // Unlock after animation completes
                        setTimeout(() => {
                            isAnimating = false;
                            setIsScrollLocked(false);
                        }, 1000);
                    } else if (scrollDirection === 'up' && currentFeatureIndex > 0) {
                        isAnimating = true;
                        setIsScrollLocked(true);
                        setCurrentFeatureIndex(prev => prev - 1);
                        
                        // Set progress based on current feature
                        setScrollProgress(currentFeatureIndex / safetyFeatures.length);
                        
                        // Unlock after animation completes
                        setTimeout(() => {
                            isAnimating = false;
                            setIsScrollLocked(false);
                        }, 1000);
                    } else if (currentFeatureIndex === safetyFeatures.length - 1 && scrollDirection === 'down') {
                        // User has viewed all content, release scroll lock
                        setHasViewedAllContent(true);
                        setIsScrollLocked(false);
                    }
                }
            }
        };

        // Check if section is in viewport
        const checkIfInView = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const isPartiallyVisible = 
                    (rect.top <= window.innerHeight && rect.top >= -window.innerHeight) ||
                    (rect.bottom <= window.innerHeight * 2 && rect.bottom >= 0);
                
                setIsInViewport(isPartiallyVisible);
            }
        };
        
        // Helper for wheel event (mouse scroll)
        const handleWheel = (e) => {
            if (isInViewport) {
                if (hasViewedAllContent && e.deltaY > 0) {
                    // Allow scrolling down if all content has been viewed
                    return;
                }
                
                e.preventDefault();
                
                clearTimeout(wheelEventThrottle);
                wheelEventThrottle = setTimeout(() => {
                    const direction = e.deltaY > 0 ? 'down' : 'up';
                    
                    if (!isAnimating) {
                        if (direction === 'down' && currentFeatureIndex < safetyFeatures.length - 1) {
                            isAnimating = true;
                            setCurrentFeatureIndex(prev => prev + 1);
                            setScrollProgress((currentFeatureIndex + 1) / safetyFeatures.length);
                            setTimeout(() => {
                                isAnimating = false;
                            }, 1000);
                        } else if (direction === 'up' && currentFeatureIndex > 0) {
                            isAnimating = true;
                            setCurrentFeatureIndex(prev => prev - 1);
                            setScrollProgress(currentFeatureIndex / safetyFeatures.length);
                            setTimeout(() => {
                                isAnimating = false;
                            }, 1000);
                        } else if (direction === 'down' && currentFeatureIndex === safetyFeatures.length - 1) {
                            // User has viewed all content, release scroll lock
                            setHasViewedAllContent(true);
                            setIsScrollLocked(false);
                        }
                    }
                }, 50);
            }
        };
        
        // Touch handlers for mobile
        const handleTouchStart = (e) => {
            touchStartY.current = e.touches[0].clientY;
        };
        
        const handleTouchMove = (e) => {
            if (!isInViewport) return;
            
            const touchY = e.touches[0].clientY;
            const diff = touchStartY.current - touchY;
            
            // If the user has seen all content and is swiping up (scrolling down the page)
            if (hasViewedAllContent && diff > 0) {
                return; // Don't prevent default scrolling
            }
            
            if (Math.abs(diff) > 50) { // Threshold to prevent accidental swipes
                if (!isAnimating) {
                    if (diff > 0 && currentFeatureIndex < safetyFeatures.length - 1) {
                        // Swiping up
                        isAnimating = true;
                        setCurrentFeatureIndex(prev => prev + 1);
                        setScrollProgress((currentFeatureIndex + 1) / safetyFeatures.length);
                        setTimeout(() => {
                            isAnimating = false;
                        }, 1000);
                        e.preventDefault();
                    } else if (diff < 0 && currentFeatureIndex > 0) {
                        // Swiping down
                        isAnimating = true;
                        setCurrentFeatureIndex(prev => prev - 1);
                        setScrollProgress(currentFeatureIndex / safetyFeatures.length);
                        setTimeout(() => {
                            isAnimating = false;
                        }, 1000);
                        e.preventDefault();
                    } else if (diff > 0 && currentFeatureIndex === safetyFeatures.length - 1) {
                        // User has viewed all content, release scroll lock
                        setHasViewedAllContent(true);
                        setIsScrollLocked(false);
                    }
                }
                
                touchStartY.current = touchY;
            }
        };
        
        // When user reaches the last feature, automatically release scroll lock after a delay
        if (currentFeatureIndex === safetyFeatures.length - 1) {
            const timer = setTimeout(() => {
                setHasViewedAllContent(true);
                setIsScrollLocked(false);
            }, 2000);
            
            return () => clearTimeout(timer);
        }
        
        window.addEventListener('scroll', checkIfInView);
        checkIfInView(); // Initial check
        
        if (sectionRef.current) {
            sectionRef.current.addEventListener('wheel', handleWheel, { passive: false });
            sectionRef.current.addEventListener('touchstart', handleTouchStart, { passive: true });
            sectionRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
        }
        
        return () => {
            window.removeEventListener('scroll', checkIfInView);
            
            if (sectionRef.current) {
                sectionRef.current.removeEventListener('wheel', handleWheel);
                sectionRef.current.removeEventListener('touchstart', handleTouchStart);
                sectionRef.current.removeEventListener('touchmove', handleTouchMove);
            }
        };
    }, [currentFeatureIndex, isInViewport, isScrollLocked, safetyFeatures.length, hasViewedAllContent]);

    // Counting animation with requestAnimationFrame for smoother animation
    useEffect(() => {
        // Cancel any running animation
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
        
        // Reset count to zero
        setCountingValue(0);
        
        // Skip animation for special format
        if (currentFeature.isSpecialFormat) {
            return;
        }
        
        // Parse the target value
        let targetValue = 0;
        
        try {
            if (currentFeature.isPercentage) {
                // Extract number from percentage
                targetValue = parseInt(currentFeature.stat.replace('%', ''), 10);
            } else {
                // Parse regular number
                targetValue = parseInt(currentFeature.stat, 10);
            }
            
            if (isNaN(targetValue)) {
                console.error('Invalid number format:', currentFeature.stat);
                return;
            }
        } catch (error) {
            console.error('Error parsing number:', error);
            return;
        }
        
        // Animation parameters
        const duration = 1500; // ms
        const startTime = performance.now();
        
        // Animation function using requestAnimationFrame
        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime >= duration) {
                // Animation finished - set to final value
                setCountingValue(targetValue);
                animationFrameId.current = null;
                return;
            }
            
            // Calculate progress with easing
            const progress = elapsedTime / duration;
            // Cubic easing out for smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            // Calculate and set current value
            const currentValue = Math.floor(easedProgress * targetValue);
            setCountingValue(currentValue);
            
            // Continue animation
            animationFrameId.current = requestAnimationFrame(animate);
        };
        
        // Start animation with small delay for better visual transition
        const timeoutId = setTimeout(() => {
            animationFrameId.current = requestAnimationFrame(animate);
        }, 300);
        
        // Clean up function
        return () => {
            clearTimeout(timeoutId);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        };
    }, [currentFeatureIndex]); // Only re-run when feature index changes

    // Start video playback when component mounts with improved error handling
    useEffect(() => {
        if (videoRef.current) {
            // Ensure video autoplays with proper error handling
            const playVideo = async () => {
                try {
                    await videoRef.current.play();
                    setIsVideoLoaded(true);
                    setIsVideoError(false);
                } catch (error) {
                    console.error("Video play failed:", error);
                    setIsVideoError(true);
                    
                    // Try to play without sound if initial playback fails
                    // This can help with autoplay policies on some browsers
                    try {
                        videoRef.current.muted = true;
                        await videoRef.current.play();
                        setIsVideoLoaded(true);
                        setIsVideoError(false);
                    } catch (fallbackError) {
                        console.error("Fallback video play failed:", fallbackError);
                        setIsVideoError(true);
                    }
                }
            };
            
            playVideo();
        }
        
        // Initial setup
        setScrollProgress(0);
        
        return () => {
            // Cleanup video on unmount
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = "";
            }
        };
    }, []);

    // Animation variants
    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3
            }
        }
    };

    const statVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.2
            }
        }
    };

    // Render the stat based on current feature
    const renderStat = () => {
        if (currentFeature.isSpecialFormat) {
            // For special format like "2060MM"
            return (
                <span className="text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-bold leading-none tracking-tight" style={{ color: '#7d694b' }}>
                    {currentFeature.stat}
                </span>
            );
        } else if (currentFeature.isPercentage) {
            // For percentage values
            return (
                <span className="text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-bold leading-none tracking-tight" style={{ color: '#7d694b' }}>
                    {countingValue}%
                </span>
            );
        } else {
            // For regular numbers with potential prefix
            return (
                <div>
                    {currentFeature.prefix && (
                        <div className="text-lg sm:text-xl font-medium mb-1" style={{ color: '#7d694b' }}>
                            {currentFeature.prefix}
                        </div>
                    )}
                    <span className="text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-bold leading-none tracking-tight" style={{ color: '#7d694b' }}>
                        {countingValue}
                    </span>
                </div>
            );
        }
    };

    return (
        <section 
            ref={sectionRef}
            className="relative w-full bg-gray-50 overflow-hidden min-h-[100vh]"
            id="safety-section"
        >
            <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row min-h-[100vh]">
                {/* Left Content Area - Moved further left to match design */}
                <div className="w-full lg:w-[45%] min-h-[50vh] lg:min-h-screen flex items-center justify-start relative py-12 lg:py-0 px-10 sm:px-12 lg:px-16 xl:px-20 bg-white">
                    <div className="w-full">
                        <div className="space-y-4 lg:max-w-sm">
                            {/* Static Small Title - Using brand typography */}
                            <p className="text-sm sm:text-base font-medium tracking-wider text-gray-500 uppercase">
                                {currentFeature.smallTitle}
                            </p>
                            
                            {/* Main Title - Using brand colors */}
                            <AnimatePresence mode="wait">
                                <motion.h2 
                                    key={`title-${currentFeatureIndex}`}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={contentVariants}
                                    className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                                    style={{ color: '#7d694b' }}
                                >
                                    {currentFeature.title}
                                </motion.h2>
                            </AnimatePresence>
                            
                            {/* Description - Using brand typography */}
                            <AnimatePresence mode="wait">
                                <motion.p 
                                    key={`desc-${currentFeatureIndex}`}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={contentVariants}
                                    className="text-lg sm:text-xl font-medium mt-3"
                                    style={{ color: '#7d694b' }}
                                >
                                    {currentFeature.description}
                                </motion.p>
                            </AnimatePresence>
                            
                            {/* Statistics Value - Responsive sizing */}
                            <div ref={statsRef} className="mt-4">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`stat-${currentFeatureIndex}`}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={statVariants}
                                        className="mt-4"
                                    >
                                        {renderStat()}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Video Area - Enhanced design with fallbacks */}
                <div className="w-full lg:w-[55%] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-auto bg-[#1c1f23] relative overflow-hidden">
                    {/* Video loading indicator */}
                    {!isVideoLoaded && !isVideoError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#1c1f23] z-10">
                            <div className="w-16 h-16 border-4 border-primary-700 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                    
                    {/* Main Video - Fixed with multiple sources and proper attributes */}
                    {!isVideoError && (
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            onLoadedData={() => setIsVideoLoaded(true)}
                            poster="/api/placeholder/1200/800"
                        >
                            <source src="/videos/safety-chassis.mp4" type="video/mp4" />
                            <source src="/videos/safety-chassis.webm" type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    
                    {/* Fallback image for when video fails */}
                    {(isVideoError || !isVideoLoaded) && (
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="/api/placeholder/1200/800" 
                                alt="Vehicle chassis safety frame" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    
                    {/* Enhanced wireframe grid overlay that matches the screenshot */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                        <div className="w-full h-full grid grid-cols-12 grid-rows-12 opacity-40">
                            {Array.from({ length: 144 }).map((_, index) => (
                                <div 
                                    key={`grid-${index}`}
                                    className="border border-gray-100/10"
                                />
                            ))}
                        </div>
                    </div>
                    
                    {/* Dotted pattern overlay for additional texture */}
                    <div className="absolute inset-0 z-20 bg-[url('/images/dot-pattern.png')] bg-repeat opacity-10 pointer-events-none" />
                    
                    {/* Additional gradient overlay for depth */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
                </div>
            </div>
            
            {/* Subtle progress indicator - only shows on desktop */}
            <div className="hidden lg:block absolute bottom-6 right-6 z-30">
                <div className="flex space-x-2">
                    {safetyFeatures.map((_, index) => (
                        <div 
                            key={`indicator-${index}`}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentFeatureIndex ? 'bg-primary-700 scale-125' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SafetyScrollingSection;