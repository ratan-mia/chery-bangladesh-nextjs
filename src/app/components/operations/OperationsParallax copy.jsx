// OperationsParallax.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const OperationsParallax = () => {
  const containerRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);
  
  // First section content
  const firstSectionContent = {
    title: "Excellent Operations",
    description: "We actively implement rigorous governance standards and procedures, striving for business growth while driving sustainable transformation. Our goal is to align user value with corporate value, fostering co-creation and mutual integration."
  };
  
  // Second section content - 2023 achievements
  const achievements = [
    "Enhanced governance with 1 General shareholders' Meeting, 6 Extraordinary Meetings, and 37 proposals reviewed.",
    "Promoted board diversity with 9 directors, including 1 female, from accounting, finance, and engineering backgrounds.",
    "Ensured transparency with 100% integrity commitment signed by key employees and suppliers.",
    "Strengthened ethical awareness, ensuring 100% participation in business ethics training for all employees and board members.",
    "Ensured information security with zero major incidents related to privacy and data breaches."
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      
      const handleResize = () => {
        setWindowHeight(window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values for parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const contentScaleFirst = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);
  const contentOpacityFirst = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const yearScale = useTransform(scrollYProgress, [0.35, 0.5], [0.9, 1]);
  const yearOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  
  // Individual achievement animations
  const achievementAnimations = achievements.map((_, index) => {
    const startProgress = 0.4 + (index * 0.05);
    const endProgress = startProgress + 0.05;
    return {
      x: useTransform(scrollYProgress, [startProgress, endProgress], [-30, 0]),
      opacity: useTransform(scrollYProgress, [startProgress, endProgress], [0, 1])
    };
  });
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-hidden"
  
    >
      {/* Fixed container for all content */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Background image with subtle parallax effect */}
        <motion.div 
          className="absolute inset-0 w-full  bg-cover bg-center"
          style={{ 
            height: `${windowHeight * 3}px`,
            backgroundImage: "url('/images/operations/building.jpg')",
            y: backgroundY
          }}
        >
          {/* Overlay with design tokens */}
          <div className="absolute inset-0 bg-primary/80" />
        </motion.div>
        
        {/* Content container */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-6 w-full">
            {/* First section content */}
            <motion.div 
              style={{ 
                scale: contentScaleFirst,
                opacity: contentOpacityFirst
              }}
              className="w-full"
            >
              <div className="bg-secondary/20 backdrop-blur-sm rounded-lg p-8 border border-secondary/10 max-w-2xl">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "40%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-1 bg-accent mb-6"
                />
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-6"
                >
                  {firstSectionContent.title}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg text-gray-100"
                >
                  {firstSectionContent.description}
                </motion.p>
              </div>
            </motion.div>
            
            {/* Second section with 2023 achievements */}
            <div className="w-full">
              {/* Year heading with scale animation */}
              <motion.div
                style={{ 
                  scale: yearScale,
                  opacity: yearOpacity
                }}
                className="mb-8 flex items-center"
              >
                <div className="w-10 h-1 bg-accent mr-4" />
                <h2 className="text-6xl md:text-7xl font-bold text-white">
                  2023
                </h2>
                <div className="w-10 h-1 bg-accent ml-4" />
              </motion.div>
              
              {/* Achievements list with subtle animations */}
              <motion.div
                style={{ opacity: yearOpacity }}
                className="bg-secondary/20 backdrop-blur-sm rounded-lg p-8 border border-secondary/10 max-w-3xl"
              >
                <ul className="space-y-5">
                  {achievements.map((item, index) => (
                    <motion.li 
                      key={index}
                      style={{ 
                        x: achievementAnimations[index].x,
                        opacity: achievementAnimations[index].opacity
                      }}
                      className="flex items-start"
                    >
                      <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-accent mr-4 text-white font-medium text-sm">
                        {index + 1}
                      </span>
                      <span className="text-base md:text-lg text-white">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsParallax;