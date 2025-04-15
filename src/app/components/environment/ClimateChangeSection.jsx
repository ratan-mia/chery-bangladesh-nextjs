'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useMemo, useRef } from 'react';

const ClimateChangeSection = ({
  title,
  subtitle,
  content,
  backgroundImage,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  contentPosition = 'left',
  className = '',
  ctaText = 'Learn More',
  ctaLink = '#',
  secondaryCta = null,
  ariaLabel = '',
  minHeight = '80vh',
  themeVariant = 'dark',
  showStats = false,
  stats = [],
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Theme colors matching Chery brand design system
  const themes = {
    dark: {
      accent: '#8c735d',       // Brown
      text: '#ffffff',         // White
      textSecondary: 'rgba(255, 255, 255, 0.8)',
      buttonBg: '#8c735d',     // Brown
      buttonText: '#ffffff',   // White
      accentLine: '#8c735d',   // Brown
      contentBg: 'rgba(17, 24, 39, 0.5)'
    },
    light: {
      accent: '#8c735d',       // Brown
      text: '#111827',         // Dark Slate Gray
      textSecondary: '#4B5563', // Slate Gray
      buttonBg: '#8c735d',     // Brown
      buttonText: '#ffffff',   // White
      accentLine: '#8c735d',   // Brown
      contentBg: '#ffffff'     // White
    },
  };

  const theme = themes[themeVariant];

  const positionClasses = useMemo(() => {
    switch (contentPosition) {
      case 'center':
        return 'text-center mx-auto lg:col-start-4 lg:col-span-6';
      case 'right':
        return 'ml-auto lg:col-start-7 lg:col-span-6';
      default:
        return 'lg:col-span-6';
    }
  }, [contentPosition]);

  const renderContent = useMemo(() => {
    if (typeof content === 'string') {
      return content.split('\n\n').map((para, idx) => (
        <p key={idx} className="mb-4 text-base md:text-lg leading-relaxed">
          {para}
        </p>
      ));
    }
    return content;
  }, [content]);

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel || title}
      className={`relative w-full overflow-hidden ${className} ${themeVariant === 'light' ? 'bg-white border-t border-gray-100' : ''}`}
      style={{ minHeight }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Content Wrapper */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-10 lg:gap-16">
          {/* Content Container with Local Overlay */}
          <motion.div
            className={`relative ${positionClasses}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Local overlay for content area */}
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundColor: overlayColor,
                backgroundImage: themeVariant === 'dark' ? 
                  'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.2))' : 
                  'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.3))'
              }}
            />

            {/* Content with padding */}
            <div className="relative z-10 p-8">
              {/* Accent line */}
              <div 
                className="h-1 w-10 mb-4"
                style={{ backgroundColor: theme.accent }}
              />
              
              {subtitle && (
                <span 
                  className="inline-block text-sm uppercase tracking-wider mb-3"
                  style={{ color: theme.accent }}
                >
                  {subtitle}
                </span>
              )}

              <h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
                style={{ color: theme.text }}
              >
                {title}
              </h2>

              <div 
                className="text-base md:text-lg leading-relaxed mb-8" 
                style={{ color: theme.textSecondary }}
              >
                {renderContent}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={ctaLink}
                  className="inline-flex items-center justify-center px-8 py-3 font-medium transition-colors duration-300 group"
                  style={{ backgroundColor: theme.buttonBg, color: theme.buttonText }}
                >
                  {ctaText}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                {secondaryCta?.text && (
                  <a
                    href={secondaryCta.link}
                    className="inline-flex items-center justify-center px-8 py-3 font-medium border transition-colors duration-300"
                    style={{ 
                      borderColor: themeVariant === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(75, 85, 99, 0.2)', 
                      color: theme.text,
                      hover: { borderColor: theme.accent }
                    }}
                  >
                    {secondaryCta.text}
                  </a>
                )}
              </div>

              {/* Optional Stats */}
              {showStats && stats?.length > 0 && (
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {stats.map(({ value, label }, index) => (
                    <div key={index} className="text-center border-t border-l border-r border-gray-200 py-6 px-4">
                      <div 
                        className="text-3xl md:text-4xl font-bold mb-2" 
                        style={{ color: theme.accent }}
                      >
                        {value}
                      </div>
                      <div 
                        className="text-sm" 
                        style={{ color: theme.textSecondary }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClimateChangeSection;
