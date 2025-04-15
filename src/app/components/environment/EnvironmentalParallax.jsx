import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const EnvironmentalParallax = () => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Enhanced image configuration with descriptive alt text
  const images = {
    background: "/images/environment/beach-aerial.jpg",
    midground: "/images/environment/trees-silhouette.png",
    foreground: "/images/environment/waves-overlay.png",
  };

  // Enhanced statistics with more detailed information
  const stats = [
    { 
      value: '60+',
      label: 'Conservation Projects',
      description: 'Active global initiatives'
    },
    { 
      value: '12M+',
      label: 'Trees Planted',
      description: 'Contributing to reforestation'
    },
    { 
      value: '35%',
      label: 'Carbon Reduction',
      description: 'Decrease in emissions'
    }
  ];

  // Enhanced scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Refined parallax transformations
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-5%', '-15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.95, 0.8]);

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stats.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-neutral-900"
      role="region"
      aria-label="Environmental Impact Showcase"
    >
      {/* Background Layer */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="relative h-full w-full">
          <Image 
            src={images.background}
            alt="Aerial view of coastline showing environmental impact"
            fill
            priority
            quality={90}
            className="object-cover"
            onLoad={() => setIsLoaded(true)}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-transparent to-emerald-900/40" />
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div 
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <AnimatePresence mode="wait">
          {isLoaded && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl text-center"
            >
              <motion.h1 
                className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Preserving Earth's Legacy
              </motion.h1>

              {/* Stats Display */}
              <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: currentSlide === index ? 1 : 0.7,
                      y: 0,
                      scale: currentSlide === index ? 1.05 : 1
                    }}
                    transition={{ duration: 0.5 }}
                    className=" bg-white/10 p-6 backdrop-blur-sm"
                  >
                    <div className="text-3xl font-bold text-white lg:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm font-medium uppercase tracking-wider text-white/90">
                      {stat.label}
                    </div>
                    <div className="mt-1 text-xs text-white/70">
                      {stat.description}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <motion.div
                className="flex flex-col gap-4 sm:flex-row sm:justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  className="group relative overflow-hidden  bg-primary-700 px-8 py-3 text-white transition-all hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  onClick={() => window.location.href = '/join-cause'}
                >
                  <span className="relative z-10">Join Our Mission</span>
                  <div className="absolute inset-0 -translate-x-full bg-primary-700 transition-transform group-hover:translate-x-0" />
                </button>
                <button
                  className=" border-2 border-white/80 px-8 py-3 text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  onClick={() => window.location.href = '/learn-more'}
                >
                  Discover More
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-xs uppercase tracking-widest text-white/70">
            Explore More
          </span>
          <motion.div 
            className="flex h-10 w-5 rounded-full items-start justify-center  border border-white/30 p-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <motion.div 
              className="h-2 w-1 rounded-full bg-white"
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