import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

const EnvironmentalParallax = () => {
    const containerRef = useRef(null);
    
    // Use the background image that would be provided
    const backgroundImage = "/images/environment/beach-aerial.jpg";
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Configure parallax effects
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const middleLayerY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
    const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

    return (
        <div 
            ref={containerRef} 
            className="relative overflow-hidden h-screen w-full bg-primary-900"
        >
            {/* Background layer with the provided image */}
            <motion.div 
                className="absolute inset-0 w-full h-full"
                style={{ y: backgroundY }}
            >
                <img 
                    src={backgroundImage}
                    alt="Environmental Background" 
                    className="object-cover w-full h-full"
                />
                {/* Overlay to enhance text readability */}
                <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                    style={{ mixBlendMode: 'multiply' }}
                />
            </motion.div>

            {/* Middle layer - semi-transparent overlay */}
            <motion.div 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ 
                    y: middleLayerY,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)'
                }}
            />

            {/* Foreground layer - darker gradient */}
            <motion.div 
                className="absolute inset-x-0 bottom-0 w-full h-1/2 pointer-events-none"
                style={{ 
                    y: foregroundY,
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)'
                }}
            />

            {/* Content layer */}
            <motion.div 
                className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 sm:px-12"
                style={{ 
                    y: textY,
                    opacity: opacity
                }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1 
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg"
                    >
                        Protecting Our Natural Environment
                    </motion.h1>
                    
                    <div className="w-24 h-1 mx-auto my-6 bg-primary-400"></div>
                    
                    <motion.p 
                        className="text-lg md:text-xl mb-8 text-white/90 drop-shadow-md max-w-2xl mx-auto"
                    >
                        Join our mission to preserve natural habitats and create a sustainable future for generations to come. Together we can make a difference.
                    </motion.p>
                    
                    <motion.button 
                        className="px-8 py-3 rounded-full font-medium text-white shadow-lg bg-primary hover:bg-primary-800 transition-all duration-300 transform hover:scale-105"
                    >
                        Join Our Cause
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default EnvironmentalParallax;
