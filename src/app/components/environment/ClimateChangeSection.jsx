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

  const themes = {
    dark: {
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      buttonBg: '#e2cdb8',
      buttonText: '#111827',
    },
    light: {
      text: '#111827',
      textSecondary: 'rgba(17, 24, 39, 0.7)',
      buttonBg: '#1a365d',
      buttonText: '#ffffff',
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
      className={`relative w-full ${className}`}
      style={{ minHeight }}
    >
      {/* Background */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={`${title} background`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 z-10" style={{ backgroundColor: overlayColor }} />
        </div>
      )}

      {/* Content Wrapper */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 py-16 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-10 lg:gap-16">
          {/* Textual Content */}
          <motion.div
            className={positionClasses}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ color: theme.text }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">{title}</h2>

            {subtitle && (
              <p className="text-lg md:text-xl font-light mb-6" style={{ color: theme.textSecondary }}>
                {subtitle}
              </p>
            )}

            <div className="text-base md:text-lg leading-relaxed" style={{ color: theme.textSecondary }}>
              {renderContent}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex gap-4 flex-wrap">
              <a
                href={ctaLink}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-base transition-all"
                style={{ backgroundColor: theme.buttonBg, color: theme.buttonText }}
              >
                {ctaText}
              </a>

              {secondaryCta?.text && (
                <a
                  href={secondaryCta.link}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-base border"
                  style={{ borderColor: theme.buttonBg, color: theme.text }}
                >
                  {secondaryCta.text}
                </a>
              )}
            </div>

            {/* Optional Stats */}
            {showStats && stats?.length > 0 && (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map(({ value, label }, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-semibold" style={{ color: theme.text }}>
                      {value}
                    </div>
                    <div className="text-sm mt-1" style={{ color: theme.textSecondary }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClimateChangeSection;
