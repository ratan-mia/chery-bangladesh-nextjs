'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const EnvironmentalParallax = () => {
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    
    // Multiple background images for a richer experience
    const images = {
        background: "/images/environment/beach-aerial.jpg",
        midground: "/images/environment/trees-silhouette.png", // Transparent PNG with tree silhouettes
        foreground: "/images/environment/waves-overlay.png", // Transparent PNG with wave pattern
    };
    
    const stats = [
        { value: '60+', label: 'Conservation Projects' },
        { value: '12M+', label: 'Trees Planted' },
        { value: '35%', label: 'Carbon Footprint Reduction' },
    ];
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Enhanced parallax effects
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const midgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const contentY = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-10%', '-25%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0.6]);
    const statsY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
    const statsOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 1]);

    // Check if section is in view for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );
        
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        
        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="relative overflow-hidden h-screen w-full"
        >
            {/* Main background layer with better loading */}
            <motion.div 
                className="absolute inset-0 w-full h-full"
                style={{ 
                    y: backgroundY,
                    scale: backgroundScale,
                }}
            >
                <div className="w-full h-full relative">
                    <Image 
                        src={images.background}
                        alt="Environmental Background" 
                        fill
                        priority
                        quality={90}
                        className="object-cover"
                        onLoad={() => setIsLoaded(true)}
                        sizes="100vw"
                    />
                </div>
                
                {/* Enhanced gradient overlay with better blend mode */}
                <div 
                    className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/10 to-primary/40"
                    style={{ mixBlendMode: 'multiply' }}
                />
            </motion.div>

            {/* Midground layer - decorative elements */}
            <motion.div 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ 
                    y: midgroundY,
                    opacity: 0.6,
                }}
            >
                <div className="absolute bottom-0 w-full h-1/2">
                    <div className="relative w-full h-full">
                        <Image 
                            src={images.midground}
                            alt=""
                            fill
                            className="object-cover object-bottom"
                            aria-hidden="true"
                            sizes="100vw"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Foreground layer - detail elements */}
            <motion.div 
                className="absolute inset-x-0 bottom-0 w-full h-1/4 pointer-events-none"
                style={{ 
                    y: foregroundY,
                    opacity: 0.2,
                }}
            >
                <div className="relative w-full h-full">
                    <Image 
                        src={images.foreground}
                        alt=""
                        fill
                        className="object-cover object-bottom"
                        aria-hidden="true"
                        sizes="100vw"
                    />
                </div>
            </motion.div>

            {/* Statistics highlight - appears as you scroll */}
            <motion.div 
                className="absolute inset-x-0 bottom-20 z-20 pointer-events-none"
                style={{ 
                    y: statsY,
                    opacity: statsOpacity,
                }}
            >
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                        {stats.map((stat, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                className="bg-white/10 backdrop-blur-sm p-4 md:p-6 text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-white/80 text-sm uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Content layer with enhanced animations */}
            <motion.div 
                className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 sm:px-12"
                style={{ 
                    y: contentY,
                    opacity: contentOpacity
                }}
            >
                <AnimatePresence>
                    {isLoaded && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white tracking-wide"
                            >
                                Protecting Our Natural Environment
                            </motion.h1>
                            
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={isInView ? { width: "6rem" } : { width: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="h-1 mx-auto my-6 bg-white"
                            ></motion.div>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed"
                            >
                                Join our mission to preserve natural habitats and create a sustainable future for generations to come. Together we can make a difference.
                            </motion.p>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            >
                                <a 
                                    href="/join-cause" 
                                    className="px-8 py-3 font-medium text-white bg-primary border-2 border-primary hover:bg-primary/80 transition-all duration-300 w-full sm:w-auto text-center"
                                >
                                    Join Our Cause
                                </a>
                                <a 
                                    href="/learn-more" 
                                    className="px-8 py-3 font-medium text-white border-2 border-white/80 hover:bg-white/10 transition-all duration-300 w-full sm:w-auto text-center"
                                >
                                    Learn More
                                </a>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            
            {/* Scroll indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="flex flex-col items-center">
                    <span className="text-white/70 text-xs uppercase tracking-widest mb-2">Scroll</span>
                    <motion.div 
                        className="w-5 h-10 border border-white/30 rounded-full flex justify-center items-start p-1"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <motion.div 
                            className="w-1 h-2 bg-white rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default EnvironmentalParallax;