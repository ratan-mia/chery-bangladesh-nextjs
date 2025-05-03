'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Mohammad Rashid",
      rating: 5,
      comment: "Outstanding service from start to finish. The team was very professional and completed the work ahead of schedule. Very impressed with their attention to detail.",
      vehicle: "Tiggo 7 Pro"
    },
    {
      id: 2,
      name: "Aminul Islam Chowdhury",
      rating: 5,
      comment: "The service center is clean, modern, and well-organized. My Tiggo 8 Pro was serviced promptly and the staff was very knowledgeable.",
      vehicle: "Tiggo 8 Pro"
    },
    {
      id: 3,
      name: "Fahmida Rahman",
      rating: 4,
      comment: "Very satisfied with the roadside assistance. When my car wouldn't start, the emergency team arrived within 30 minutes and solved the problem on-site.",
      vehicle: "Tiggo Cross"
    },
    {
      id: 4,
      name: "Abdul Karim Sheikh",
      rating: 5,
      comment: "Excellent maintenance service. They explained everything they were doing and provided helpful tips to maintain my vehicle. The facility is state-of-the-art and the staff is very knowledgeable.",
      vehicle: "Tiggo 7 Pro"
    },
    {
      id: 5,
      name: "Nabila Hossain",
      rating: 5,
      comment: "The 24/7 roadside assistance came to my rescue during heavy rain in Dhaka. The team's quick response and professional service were remarkable. Highly recommended!",
      vehicle: "Tiggo 8 Pro"
    },
    {
      id: 6,
      name: "Rafiqul Hassan",
      rating: 5,
      comment: "Got my first scheduled maintenance done. The technicians were thorough and explained every check they performed. The genuine parts guarantee gives me peace of mind.",
      vehicle: "Tiggo Cross"
    },
    {
      id: 7,
      name: "Dr. Sabrina Ahmed",
      rating: 4,
      comment: "Impressed with the service center's efficiency. They diagnosed the issue quickly and fixed it the same day. The transparent pricing and detailed invoice are appreciated.",
      vehicle: "Tiggo 7 Pro"
    },
    {
      id: 8,
      name: "Zahid Hassan Khan",
      rating: 5,
      comment: "My experience with Bangladesh Motor Service has been excellent. From booking to service completion, everything was streamlined. The staff's hospitality is exceptional.",
      vehicle: "Tiggo 8 Pro"
    },
    {
      id: 9,
      name: "Tasneem Zaman",
      rating: 5,
      comment: "The mobile service unit is a game-changer! Got my car serviced at my office parking lot during work hours. Incredibly convenient and time-saving service.",
      vehicle: "Tiggo Cross"
    },
    {
      id: 10,
      name: "Shahidul Alam",
      rating: 4,
      comment: "Excellent customer service and genuine spare parts. The service advisor kept me updated throughout the process. Minor delay but overall very satisfied.",
      vehicle: "Tiggo 7 Pro"
    },
    {
      id: 11,
      name: "Rubaiya Hasan",
      rating: 5,
      comment: "The diagnostic equipment is top-notch and the technicians are Chery-certified. They found and fixed an issue that another workshop couldn't diagnose properly.",
      vehicle: "Tiggo 8 Pro"
    },
    {
      id: 12,
      name: "Kamrul Hasan Milon",
      rating: 5,
      comment: "During Eid travel season, their emergency hotline was a lifesaver. The response time was under 45 minutes despite traffic. Outstanding service commitment!",
      vehicle: "Tiggo Cross"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Determine reviews per page based on screen size
  const getReviewsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 3; // xl screens
      if (window.innerWidth >= 768) return 2; // md screens
    }
    return 1; // mobile
  };

  const [reviewsPerPage, setReviewsPerPage] = useState(1);

  // Update reviews per page on resize
  const updateReviewsPerPage = () => {
    setReviewsPerPage(getReviewsPerPage());
  };

  useEffect(() => {
    updateReviewsPerPage();
    window.addEventListener('resize', updateReviewsPerPage);
    return () => window.removeEventListener('resize', updateReviewsPerPage);
  }, []);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    
    if (isAutoPlaying && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
  }, [isAutoPlaying, isPaused]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [startAutoPlay, isAutoPlaying, isPaused]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalPages]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Pause on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Toggle auto-play
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Get current reviews to display
  const getCurrentReviews = () => {
    const start = currentIndex * reviewsPerPage;
    return reviews.slice(start, start + reviewsPerPage);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -50 : 50,
      transition: {
        duration: 0.5,
        ease: 'easeIn',
      },
    }),
  };

  // Render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i}
        size={16}
        className={`${i < rating ? 'text-primary-700 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="relative py-20 bg-gray-50">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/texture-dots.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Customer <span className="text-primary-900">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover what our valued customers have to say about their Chery service experience
          </p>
        </motion.div>
        
        <div 
          ref={containerRef}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Reviews Grid */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div 
              key={currentIndex}
              custom={direction}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12"
            >
              {getCurrentReviews().map((review) => (
                <motion.article 
                  key={review.id}
                  custom={direction}
                  variants={itemVariants}
                  className="relative border border-gray-200 bg-white shadow-sm overflow-hidden group hover:border-primary-700/40 transition-all duration-300"
                >
                  {/* Top accent */}
                  <div className="h-1 w-full bg-primary-800 bg-opacity-40 group-hover:bg-opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="p-8">
                    {/* Quote icon */}
                    <div className="w-12 h-12 bg-primary-light bg-opacity-40 flex items-center justify-center mb-6">
                      <Quote className="text-primary-900" size={24} />
                    </div>
                    
                    {/* Review text */}
                    <blockquote className="text-gray-600 italic leading-relaxed mb-6">
                      "{review.comment}"
                    </blockquote>
                    
                    {/* Reviewer info */}
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900">{review.name}</h3>
                          <p className="text-sm text-primary-700 font-medium mt-1">{review.vehicle}</p>
                        </div>
                        <div className="flex mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="h-0.5 w-full bg-gray-200">
                    <div className="h-full bg-primary-700 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setDirection(i > currentIndex ? 1 : -1);
                      setCurrentIndex(i);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`h-2 transition-all duration-300 cursor-pointer hover:bg-primary-600 ${
                    i === currentIndex ? 'w-8 bg-primary-700' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
              {/* Auto-play toggle */}
              <button 
                onClick={toggleAutoPlay}
                className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:border-primary-700 hover:bg-primary-700/5 transition-all duration-300 group"
                aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
              >
                {isAutoPlaying ? (
                  <Pause size={20} className="text-gray-500 group-hover:text-primary-700" />
                ) : (
                  <Play size={20} className="text-gray-500 group-hover:text-primary-700" />
                )}
              </button>
              
              {/* Navigation Buttons */}
              <button 
                onClick={handlePrev} 
                className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:border-primary-700 hover:bg-primary-700/5 transition-all duration-300 group"
                disabled={isAnimating}
                aria-label="Previous reviews"
              >
                <ChevronLeft size={20} className="text-gray-500 group-hover:text-primary-700" />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:border-primary-700 hover:bg-primary-700/5 transition-all duration-300 group"
                disabled={isAnimating}
                aria-label="Next reviews"
              >
                <ChevronRight size={20} className="text-gray-500 group-hover:text-primary-700" />
              </button>
            </div>
          </div>
          
          {/* Mobile swipe instructions */}
          <div className="text-center mt-6 md:hidden">
            <p className="text-sm text-gray-500">Swipe left or right to navigate</p>
          </div>
        </div>
        
        {/* Leave Review CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mt-20"
        >
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Share Your Experience</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We value your feedback about our service team and would love to hear about your experience
            </p>
            <button className="inline-flex items-center px-10 py-4 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-colors duration-300 group">
              LEAVE A REVIEW
              <Star size={20} className="ml-2 group-hover:ml-3 transition-all duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;