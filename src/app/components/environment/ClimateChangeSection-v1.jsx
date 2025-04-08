import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

// Reusable Hero Section component using only Tailwind CSS
const ClimateChangeSection = ({
  title,
  content,
  backgroundImage,
  contentPosition = 'right', // 'left' or 'right'
  className = '',
  showCta = true,
}) => {
  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className={`relative w-full overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Background Image"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 z-10 bg-blue-900/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[60vh]">
          {/* Empty column when content is on the right */}
          {contentPosition === 'right' && (
            <div className="hidden lg:block">
              {/* Space for decorative elements if needed */}
            </div>
          )}

          {/* Content Column */}
          <motion.div 
            className={contentPosition === 'left' ? 'lg:order-1' : 'lg:order-2'}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight tracking-wide"
              variants={itemVariants}
            >
              {title}
            </motion.h2>

            <motion.div 
              className="text-white space-y-4"
              variants={itemVariants}
            >
              {content}
            </motion.div>

            {/* Optional CTA button */}
            {showCta && (
              <motion.div 
                className="mt-8"
                variants={itemVariants}
              >
                <a 
                  href="#learn-more" 
                  className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded transition-colors duration-300 group"
                >
                  Learn More
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </a>
              </motion.div>
            )}
          </motion.div>

          {/* Empty column when content is on the left */}
          {contentPosition === 'left' && (
            <div className="hidden lg:block">
              {/* Space for decorative elements if needed */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClimateChangeSection;