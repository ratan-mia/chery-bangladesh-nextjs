'use client';

import Image from 'next/image';
import React from 'react';

const SocialResponsibility = ({
  // Content props
  title = 'GATHERING FORCES FOR GOOD',
  description = 'Chery actively fulfills its global corporate citizenship responsibilities, focusing on child development, environmental protection, and charitable aid. We give back to society with sincerity and warmth through meaningful action.',
  
  // Image props
  imageSrc = '/images/social-responsibility.jpg',
  imageAlt = 'Corporate social responsibility initiative',
  
  // Layout props
  contentPosition = 'left', // 'left' or 'right'
  overlayOpacity = 0.4,
  overlayColor = 'rgba(98, 58, 94, 0.8)', // Purple gradient base color
  textColor = '#ffffff',
  
  // Action props
  ctaText = 'Learn More',
  ctaLink = '#initiatives',
  showCta = false,
  
  // Container props
  height = 'h-screen',
  className = '',
}) => {
  // Determine content position classes
  const contentPositionClasses = contentPosition === 'right' 
    ? 'items-end text-right' 
    : 'items-start text-left';
  
  // Determine content width and position
  const contentClasses = contentPosition === 'right'
    ? 'md:ml-auto md:mr-0 pr-8 md:pr-16'
    : 'md:mr-auto md:ml-0 pl-8 md:pl-16';
  
  // Determine gradient direction based on content position
  const gradientDirection = contentPosition === 'right'
    ? 'to left'
    : 'to right';
  
  return (
    <section className={`relative w-full overflow-hidden ${height} ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(${gradientDirection}, ${overlayColor} 0%, rgba(0,0,0,${overlayOpacity}) 100%)`,
        }}
      ></div>
      
      {/* Content Container */}
      <div className={`relative z-20 h-full w-full flex flex-col justify-center ${contentPositionClasses}`}>
        <div className={`w-full max-w-xl ${contentClasses}`}>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{ color: textColor }}
          >
            {title}
          </h2>
          
          <p 
            className="text-base md:text-lg mb-8 opacity-90 leading-relaxed"
            style={{ color: textColor }}
          >
            {description}
          </p>
          
          {showCta && (
            <a 
              href={ctaLink}
              className="inline-flex items-center py-3 px-6 bg-white text-purple-900 font-medium rounded-lg transition-transform hover:translate-y-[-2px]"
            >
              <span>{ctaText}</span>
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default SocialResponsibility;