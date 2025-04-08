import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Refined Hero Section component with improved design and layout
const ClimateChangeSection = ({
  title,
  subtitle,
  content,
  backgroundImage,
  contentPosition = 'right',
  className = '',
  showCta = true,
  ctaText = "Learn More",
  ctaLink = "#learn-more",
  secondaryCta = null,
  secondaryCtaLink = "#",
  overlayColor = "bg-blue-950/75",
  accentColor = "bg-primary",
  // Optional stat counters to display
  stats = []
}) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [climateStats, setClimateStats] = useState(stats);
  
  // Set visible after component mounts for animation
  useEffect(() => {
    setIsVisible(true);
    
    // Optional cleanup
    return () => setIsVisible(false);
  }, []);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  
  // Text animations that respond to scroll
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };
  
  // Lightning flash animation for the background
  const flashVariants = {
    normal: { opacity: 0 },
    flash: { opacity: [0, 0.3, 0, 0.2, 0], transition: { duration: 1.5, times: [0, 0.1, 0.3, 0.35, 1] } }
  };
  
  // Random flash effect
  const [flashState, setFlashState] = useState("normal");
  
  useEffect(() => {
    const flashInterval = setInterval(() => {
      if (Math.random() > 0.7) {  // 30% chance of lightning flash
        setFlashState("flash");
        setTimeout(() => setFlashState("normal"), 1500);
      }
    }, 5000);
    
    return () => clearInterval(flashInterval);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <Image
          src={backgroundImage}
          alt="Background for climate change section"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        
        {/* Base overlay for text readability */}
        <div className={`absolute inset-0 z-10 ${overlayColor}`}></div>
        
        {/* Lightning flash effect overlay */}
        <AnimatePresence>
          <motion.div 
            className="absolute inset-0 z-20 bg-white/30 mix-blend-soft-light"
            variants={flashVariants}
            animate={flashState}
          ></motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Left Column */}
          <div 
            className={`lg:col-span-6 ${
              contentPosition === 'left' ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <motion.div
              ref={contentRef}
              className="relative"
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {/* Content Card with backdrop blur */}
              <div className="relative backdrop-blur-sm bg-black/30 p-6 sm:p-8 lg:p-10 rounded-lg border border-white/10">
                {/* Accent line */}
                <div className={`absolute top-0 ${contentPosition === 'left' ? 'right-0' : 'left-0'} h-full w-1 ${accentColor}`}></div>
                
                {/* Title and content with motion effects */}
                <motion.div style={{ opacity: titleOpacity }} variants={itemVariants}>
                  {subtitle && (
                    <p className="text-primary text-sm sm:text-base uppercase tracking-widest mb-3 font-medium">
                      {subtitle}
                    </p>
                  )}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight tracking-tight">
                    {title}
                  </h2>
                </motion.div>

                <motion.div 
                  className="text-white space-y-4 lg:space-y-6"
                  style={{ opacity: contentOpacity }}
                  variants={itemVariants}
                >
                  {content}
                </motion.div>

                {/* Stats display if provided */}
                {stats.length > 0 && (
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 sm:mt-10"
                    variants={itemVariants}
                  >
                    {stats.map((stat, index) => (
                      <div key={index} className="bg-white/10 p-4 rounded-lg text-center">
                        <p className="text-primary text-2xl sm:text-3xl font-bold">{stat.value}</p>
                        <p className="text-white/80 text-sm">{stat.label}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* CTA buttons */}
                {(showCta || secondaryCta) && (
                  <motion.div 
                    className="mt-8 sm:mt-10 flex flex-wrap gap-4"
                    variants={itemVariants}
                  >
                    {showCta && (
                      <motion.a 
                        href={ctaLink}
                        className={`inline-flex items-center px-6 py-3 ${accentColor} text-white font-medium rounded-lg transition-all duration-300 group`}
                        whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {ctaText}
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-2 transition-transform duration-300" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            repeatType: "loop",
                            repeatDelay: 2
                          }}
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                            clipRule="evenodd" 
                          />
                        </motion.svg>
                      </motion.a>
                    )}
                    
                    {secondaryCta && (
                      <motion.a 
                        href={secondaryCtaLink}
                        className="inline-flex items-center px-6 py-3 bg-transparent border border-white/30 hover:border-white/80 text-white font-medium rounded-lg transition-all duration-300"
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {secondaryCta}
                      </motion.a>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Could be empty or contain additional content */}
          <div 
            className={`hidden lg:block lg:col-span-6 ${
              contentPosition === 'left' ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            {/* Optional animated graphic or decoration */}
            <div className="h-full flex items-center justify-center relative">
              {/* Examples of decorative elements */}
              <motion.div 
                className="absolute w-64 h-64 rounded-full border border-white/20"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute w-48 h-48 rounded-full border border-primary/20"
                animate={{ 
                  scale: [0.9, 1, 0.9],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent z-30"></div>
    </section>
  );
};

export default ClimateChangeSection;