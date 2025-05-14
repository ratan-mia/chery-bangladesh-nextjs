'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

/**
 * ComfortableSeatsSlider Component
 * 
 * A premium responsive slider that showcases seat features with elegant animations
 * Following Chery Bangladesh design system guidelines
 * Supports both image and video content with image thumbnails for videos
 * Enhanced with accessibility and responsive features
 */
const ComfortableSeatsSlider = () => {
    const slides = [
        {
            id: 1,
            type: 'video',
            src: '/videos/seats.mp4',
            thumbSrc: '/images/tiggo9pro/seats/thumb.jpg',
            alt: 'Video showing seat adjustments',
            caption: 'Passenger comfort'
        },
        
    
        {
            id: 2,
            type: 'image',
            src: '/images/tiggo9pro/seats/2.jpg',
            alt: 'Panoramic sunroof view',
            caption: 'Panoramic views'
        },
        {
            id: 3,
            type: 'image',
            src: '/images/tiggo9pro/seats/3.jpg',
            alt: 'Reclining seat features',
            caption: 'Multi-position recline'
        },
        {
            id: 4,
            type: 'image',
            src: '/images/tiggo9pro/seats/1.jpg',
            alt: 'Scenic nature view with camping tents',
            caption: 'Extra large space'
        },
   
        {
            id: 5,
            type: 'image',
            src: '/images/tiggo9pro/seats/4.jpg',
            alt: 'Diamond stitched leather seats',
            caption: 'Premium materials'
        }
    ];

    const [activeSlide, setActiveSlide] = useState(slides[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const videoRef = useRef(null);
    const thumbnailsRef = useRef(null);

    // Handle resize events for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Handle thumbnail click with animation consideration
    const handleThumbnailClick = (slide, index) => {
        if (activeSlide.id === slide.id) return;

        setActiveSlide(slide);
        setCurrentIndex(index);

        if (isPlaying && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Navigation functions
    const goToPrevious = () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        setCurrentIndex(prevIndex);
        setActiveSlide(slides[prevIndex]);

        if (isPlaying && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const goToNext = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
        setActiveSlide(slides[nextIndex]);

        if (isPlaying && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Set up video autoplay when a video becomes the active media
    useEffect(() => {
        if (activeSlide.type === 'video' && videoRef.current) {
            videoRef.current.load();

            // Set a slight delay to ensure the video loads properly
            const playPromise = setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.play()
                        .then(() => {
                            setIsPlaying(true);
                        })
                        .catch(error => {
                            console.error("Video play failed:", error);
                            setIsPlaying(false);
                        });
                }
            }, 100);

            return () => clearTimeout(playPromise);
        }
    }, [activeSlide]);

    // Scroll thumbnail into view when changing slides
    useEffect(() => {
        if (thumbnailsRef.current && !isMobile) {
            const thumbnailWidth = isMobile ? 60 : 90;
            const scrollPosition = thumbnailWidth * currentIndex;
            thumbnailsRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [currentIndex, isMobile]);

    // Animation variants - following the design system animation guidelines
    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5 } // Medium animation speed from guidelines
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 } // Fast animation speed from guidelines
        }
    };

    const captionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, delay: 0.2 }
        },
        exit: {
            opacity: 0,
            y: 10,
            transition: { duration: 0.2 }
        }
    };

    // Video control animation variants
    const controlVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.1 },
        tap: { scale: 0.95 }
    };

    // Button hover animation
    const buttonHoverVariants = {
        rest: {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            transition: { duration: 0.2 }
        },
        hover: {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            transition: { duration: 0.2 }
        }
    };

    return (
        <section className="w-full bg-gray-50">
            <div className="max-w-[1920px] mx-auto">
                {/* Title - Using Primary 900 for headings as per guidelines */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-900 tracking-wider py-10 px-4 sm:px-6 md:px-12 lg:px-16">
                    SPA GRADE COMFORTABLE SEATS
                </h2>

                <div className="relative">
                    {/* Main Media Container - Using appropriate spacing to match reference image */}
                    <div className="w-full overflow-hidden bg-gray-100 border-t border-b border-gray-200">
                        {/* Navigation Arrows - Positioned on the sides */}
                        <motion.button
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-sm p-2 rounded-full shadow-md opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-700 hidden sm:flex"
                            onClick={goToPrevious}
                            variants={buttonHoverVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-6 w-6 text-primary-900" />
                        </motion.button>

                        <motion.button
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-sm p-2 rounded-full shadow-md opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-700 hidden sm:flex"
                            onClick={goToNext}
                            variants={buttonHoverVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-6 w-6 text-primary-900" />
                        </motion.button>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSlide.id}
                                className="w-full h-[280px] sm:h-[380px] md:h-[480px] lg:h-[600px] relative overflow-hidden"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeInVariants}
                            >
                                {activeSlide.type === 'image' ? (
                                    <div
                                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                                        style={{ backgroundImage: `url(${activeSlide.src})` }}
                                        aria-label={activeSlide.alt}
                                        role="img"
                                    />
                                ) : (
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full object-cover"
                                        playsInline
                                        muted
                                        loop
                                        controls={false}
                                        aria-label={activeSlide.alt}
                                    >
                                        <source src={activeSlide.src} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}

                                {/* Add a subtle gradient overlay for depth - matching the reference image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Video Controls - Only show for videos with refined styling */}
                        {activeSlide.type === 'video' && (
                            <motion.button
                                className="absolute bottom-6 right-6 md:right-24 bg-white/30 backdrop-blur-sm p-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary-700"
                                onClick={() => {
                                    if (videoRef.current) {
                                        if (isPlaying) {
                                            videoRef.current.pause();
                                        } else {
                                            videoRef.current.play();
                                        }
                                        setIsPlaying(!isPlaying);
                                    }
                                }}
                                variants={controlVariants}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                                transition={{ duration: 0.2 }}
                                aria-label={isPlaying ? "Pause video" : "Play video"}
                            >
                                {isPlaying ? (
                                    <Pause className="h-6 w-6 text-primary-900" />
                                ) : (
                                    <Play className="h-6 w-6 text-primary-900" />
                                )}
                            </motion.button>
                        )}

                        {/* Mobile Navigation - Only shown on small screens */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2 sm:hidden">
                            {slides.map((slide, index) => (
                                <button
                                    key={`dot-${slide.id}`}
                                    className={`w-2 h-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-700 ${currentIndex === index ? 'bg-primary-700' : 'bg-gray-300'}`}
                                    onClick={() => handleThumbnailClick(slide, index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Thumbnails - Positioned at the bottom right edge as in the reference image */}
                        <div
                            ref={thumbnailsRef}
                            className="hidden sm:flex justify-end space-x-1 absolute bottom-8 right-0 overflow-x-auto max-w-[calc(90px*5)] scrollbar-hide"
                        >
                            {slides.map((slide, index) => (
                                <motion.div
                                    key={slide.id}
                                    className={`relative cursor-pointer h-[60px] w-[80px] lg:h-[70px] lg:w-[90px] overflow-hidden ${activeSlide.id === slide.id
                                        ? 'outline outline-primary-700'
                                        : 'border border-white/80 hover:outline hover:outline-primary-700/50'
                                        }`}
                                    onClick={() => handleThumbnailClick(slide, index)}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="w-full h-full overflow-hidden">
                                        <img
                                            src={slide.type === 'video' ? slide.thumbSrc : slide.src}
                                            alt={slide.alt}
                                            className="w-full h-full object-cover"
                                        />
                                        {slide.type === 'video' && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-primary-900/30">
                                                <Play className="h-6 w-6 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Caption - Simple and clean like in reference image */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`caption-${activeSlide.id}`}
                            className="text-base sm:text-lg md:text-xl text-primary-900 font-medium mt-4 px-4 py-3 sm:px-6 md:px-12 lg:px-16"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={captionVariants}
                        >
                            {activeSlide.caption}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ComfortableSeatsSlider;