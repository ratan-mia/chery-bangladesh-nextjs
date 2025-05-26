'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * ComfortableSeatsSlider Component - Enhanced
 * 
 * Premium responsive slider showcasing Tiggo 9 Pro seat features
 * Strictly follows Chery Bangladesh design system guidelines
 * Enhanced with improved accessibility, performance, and user experience
 */
const ComfortableSeatsSlider = () => {
    const slides = [
        {
            id: 1,
            type: 'video',
            src: '/videos/seats.mp4',
            thumbSrc: '/images/tiggo9pro/seats/thumb.jpg',
            alt: 'One-click zero gravity seat adjustment demonstration',
            caption: 'One-Click Zero Gravity Seat',
            description: 'Experience ultimate comfort with our advanced zero gravity positioning technology'
        },
        {
            id: 2,
            type: 'image',
            src: '/images/tiggo9pro/seats/2.jpg',
            alt: 'Panoramic sunroof creating spacious cabin atmosphere',
            caption: 'Panoramic Sunroof Views',
            description: 'Motorized sunroof with sunshade for natural lighting control'
        },
        {
            id: 3,
            type: 'image',
            src: '/images/tiggo9pro/seats/3.jpg',
            alt: 'Multi-position reclining seats with fine punch stitching',
            caption: 'Multi-Position Recline',
            description: 'Electric 4-way lumbar adjustment with memory function'
        },
        {
            id: 4,
            type: 'image',
            src: '/images/tiggo9pro/seats/1.jpg',
            alt: 'Spacious 7-seat configuration with premium leather',
            caption: 'Extra Large Space',
            description: '7 seats (2+3+2) configuration with luxury leather fabrics'
        },
        {
            id: 5,
            type: 'image',
            src: '/images/tiggo9pro/seats/4.jpg',
            alt: 'Premium diamond-stitched leather seats with TOM wood grain',
            caption: 'Premium Materials',
            description: 'Full leather coverage with TOM wood grain decorative panels'
        }
    ];

    const [activeSlide, setActiveSlide] = useState(slides[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [autoplayEnabled, setAutoplayEnabled] = useState(true);
    const videoRef = useRef(null);
    const thumbnailsRef = useRef(null);
    const autoplayTimeoutRef = useRef(null);

    // Handle resize events for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Autoplay functionality
    const resetAutoplayTimer = useCallback(() => {
        if (autoplayTimeoutRef.current) {
            clearTimeout(autoplayTimeoutRef.current);
        }
        
        if (autoplayEnabled && activeSlide.type !== 'video') {
            autoplayTimeoutRef.current = setTimeout(() => {
                goToNext();
            }, 4000); // 4 seconds per slide
        }
    }, [autoplayEnabled, activeSlide.type]);

    // Navigation functions with improved logic
    const goToPrevious = useCallback(() => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        setCurrentIndex(prevIndex);
        setActiveSlide(slides[prevIndex]);
        
        if (isPlaying && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
        
        resetAutoplayTimer();
    }, [currentIndex, slides, isPlaying, resetAutoplayTimer]);

    const goToNext = useCallback(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
        setActiveSlide(slides[nextIndex]);
        
        if (isPlaying && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
        
        resetAutoplayTimer();
    }, [currentIndex, slides, isPlaying, resetAutoplayTimer]);

    // Handle thumbnail click
    const handleThumbnailClick = useCallback((slide, index) => {
        if (activeSlide.id === slide.id) return;

        setActiveSlide(slide);
        setCurrentIndex(index);

        if (isPlaying && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
        
        resetAutoplayTimer();
    }, [activeSlide.id, isPlaying, resetAutoplayTimer]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    goToNext();
                    break;
                case ' ':
                    if (activeSlide.type === 'video') {
                        event.preventDefault();
                        toggleVideoPlayback();
                    }
                    break;
                case 'Escape':
                    setAutoplayEnabled(false);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToPrevious, goToNext, activeSlide.type]);

    // Video handling with improved error handling
    const toggleVideoPlayback = useCallback(() => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            setIsVideoLoading(true);
            const playPromise = videoRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                        setIsVideoLoading(false);
                    })
                    .catch(error => {
                        console.error("Video play failed:", error);
                        setIsPlaying(false);
                        setIsVideoLoading(false);
                    });
            }
        }
    }, [isPlaying]);

    // Enhanced video setup
    useEffect(() => {
        if (activeSlide.type === 'video' && videoRef.current) {
            const video = videoRef.current;
            
            video.load();
            setIsVideoLoading(true);

            const handleCanPlay = () => {
                setIsVideoLoading(false);
                // Auto-play video when it becomes active
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => setIsPlaying(true))
                        .catch(() => setIsPlaying(false));
                }
            };

            const handleEnded = () => {
                setIsPlaying(false);
                resetAutoplayTimer();
            };

            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('ended', handleEnded);

            return () => {
                video.removeEventListener('canplay', handleCanPlay);
                video.removeEventListener('ended', handleEnded);
            };
        }
    }, [activeSlide, resetAutoplayTimer]);

    // Setup autoplay timer
    useEffect(() => {
        resetAutoplayTimer();
        return () => {
            if (autoplayTimeoutRef.current) {
                clearTimeout(autoplayTimeoutRef.current);
            }
        };
    }, [resetAutoplayTimer]);

    // Scroll thumbnail into view
    useEffect(() => {
        if (thumbnailsRef.current && !isMobile) {
            const thumbnailWidth = 90;
            const gap = 4; // space-x-1 = 4px
            const scrollPosition = (thumbnailWidth + gap) * currentIndex;
            
            thumbnailsRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [currentIndex, isMobile]);

    // Animation variants following design system
    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    const captionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.2 }
        },
        exit: {
            opacity: 0,
            y: 10,
            transition: { duration: 0.3 }
        }
    };

    const buttonHoverVariants = {
        rest: {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            scale: 1,
            transition: { duration: 0.2 }
        },
        hover: {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 }
        }
    };

    return (
        <section className="w-full bg-gray-100" aria-label="Comfortable seats showcase">
            <div className="w-full mx-auto px-4 md:px-6">
                {/* Section Header following design system */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="flex items-start justify-center space-x-4 mb-6">
                        <div className="w-2 h-12 bg-primary-700 rounded-full"></div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 tracking-wider uppercase mb-2">
                                PREMIUM COMFORT
                            </p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-wide">
                                SPA GRADE COMFORTABLE SEATS
                            </h2>
                        </div>
                    </div>
                    <div className="w-24 h-1 bg-primary-700 mx-auto mb-6"></div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-normal">
                        Experience unparalleled comfort with our advanced seating technology designed for ultimate relaxation and support.
                    </p>
                </motion.div>

                <div className="relative bg-white shadow-sm border border-gray-200 overflow-hidden">
                    {/* Main Media Container */}
                    <div className="relative w-full">
                        {/* Navigation Arrows */}
                        <motion.button
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-700 hidden md:flex items-center justify-center"
                            onClick={goToPrevious}
                            variants={buttonHoverVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-5 w-5 text-primary-900" />
                        </motion.button>

                        <motion.button
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-700 hidden md:flex items-center justify-center"
                            onClick={goToNext}
                            variants={buttonHoverVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-5 w-5 text-primary-900" />
                        </motion.button>

                        {/* Autoplay control */}
                        <motion.button
                            className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-700 hidden md:flex items-center justify-center"
                            onClick={() => setAutoplayEnabled(!autoplayEnabled)}
                            variants={buttonHoverVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            aria-label={autoplayEnabled ? "Disable autoplay" : "Enable autoplay"}
                        >
                            <div className={`w-3 h-3 rounded-full ${autoplayEnabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        </motion.button>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSlide.id}
                                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative overflow-hidden"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeInVariants}
                            >
                                {activeSlide.type === 'image' ? (
                                    <div
                                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                                        style={{ backgroundImage: `url(${activeSlide.src})` }}
                                        role="img"
                                        aria-label={activeSlide.alt}
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
                                        preload="metadata"
                                    >
                                        <source src={activeSlide.src} type="video/mp4" />
                                        <p>Your browser does not support the video tag.</p>
                                    </video>
                                )}

                                {/* Loading indicator for videos */}
                                {isVideoLoading && activeSlide.type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/20">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700"></div>
                                    </div>
                                )}

                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Video Controls */}
                        {activeSlide.type === 'video' && !isVideoLoading && (
                            <motion.button
                                className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-700 flex items-center justify-center"
                                onClick={toggleVideoPlayback}
                                variants={buttonHoverVariants}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                                aria-label={isPlaying ? "Pause video" : "Play video"}
                            >
                                {isPlaying ? (
                                    <Pause className="h-5 w-5 text-primary-900" />
                                ) : (
                                    <Play className="h-5 w-5 text-primary-900" />
                                )}
                            </motion.button>
                        )}

                        {/* Mobile Navigation Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2 md:hidden">
                            {slides.map((slide, index) => (
                                <button
                                    key={`dot-${slide.id}`}
                                    className={`w-2 h-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-700 ${
                                        currentIndex === index ? 'bg-primary-700' : 'bg-white/60'
                                    }`}
                                    onClick={() => handleThumbnailClick(slide, index)}
                                    aria-label={`Go to slide ${index + 1}: ${slide.caption}`}
                                />
                            ))}
                        </div>

                        {/* Desktop Thumbnails */}
                        <div className="absolute bottom-6 right-6 hidden md:block">
                            <div
                                ref={thumbnailsRef}
                                className="flex space-x-1 max-w-[480px] overflow-x-auto scrollbar-hide"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {slides.map((slide, index) => (
                                    <motion.button
                                        key={slide.id}
                                        className={`relative flex-shrink-0 w-[90px] h-[60px] overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-700 ${
                                            activeSlide.id === slide.id
                                                ? 'border-primary-700 shadow-lg'
                                                : 'border-white/80 hover:border-primary-700/50'
                                        }`}
                                        onClick={() => handleThumbnailClick(slide, index)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        aria-label={`View ${slide.caption}`}
                                    >
                                        <img
                                            src={slide.type === 'video' ? slide.thumbSrc : slide.src}
                                            alt={slide.alt}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        {slide.type === 'video' && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-primary-900/20">
                                                <Play className="h-4 w-4 text-white drop-shadow-sm" />
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 border-t border-gray-200">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`content-${activeSlide.id}`}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={captionVariants}
                                className="max-w-3xl"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                    {activeSlide.caption}
                                </h3>
                                <p className="text-gray-600 leading-normal">
                                    {activeSlide.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress indicator */}
                        <div className="flex items-center mt-6 space-x-2">
                            <span className="text-sm text-gray-500">
                                {currentIndex + 1} / {slides.length}
                            </span>
                            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden max-w-32">
                                <div 
                                    className="h-full bg-primary-700 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Buttons */}
                <div className="flex justify-center space-x-4 mt-6 md:hidden">
                    <motion.button
                        className="bg-primary-700 text-white px-6 py-3 rounded font-medium hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 transition-colors duration-200"
                        onClick={goToPrevious}
                        whileTap={{ scale: 0.95 }}
                    >
                        Previous
                    </motion.button>
                    <motion.button
                        className="bg-primary-700 text-white px-6 py-3 rounded font-medium hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-700 transition-colors duration-200"
                        onClick={goToNext}
                        whileTap={{ scale: 0.95 }}
                    >
                        Next
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default ComfortableSeatsSlider;