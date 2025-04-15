import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { milestonesData, yearsByCategory } from './milestonesData';

const BrandMilestones = () => {
  // State for selected category and year
  const [activeCategory, setActiveCategory] = useState('ALL CONTENT');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const swiperRef = useRef(null);
  
  // Categories for the tabs
  const categories = ['ALL CONTENT', 'BRAND', 'PRODUCT', 'MARKET', 'COMMONWEAL'];
  
  // Get years for the active category
  const years = yearsByCategory[activeCategory] || yearsByCategory['ALL CONTENT'];
  
  // Reset active slide when year changes
  useEffect(() => {
    setActiveSlide(0);
  }, [selectedYear]);

  // Reset autoplay and adjust year when category changes
  useEffect(() => {
    setActiveSlide(0);
    setIsAutoplay(true);
    
    // Default to first available year in category if current one doesn't exist
    if (!yearsByCategory[activeCategory].includes(selectedYear)) {
      setSelectedYear(yearsByCategory[activeCategory][0]);
    }
  }, [activeCategory]);

  // Get current year's data for the active category
  const currentYearData = milestonesData[activeCategory]?.[selectedYear] || [];
  const totalSlides = currentYearData.length;

  // Fade in animation for main content
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: 'easeOut' 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.5,
        ease: 'easeIn'
      }
    }
  };

  // Staggered animation for years
  const yearVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  // Handle category tab change
  const handleCategoryChange = (category) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
      
      // Reset to the first year in the new category
      const firstYearInCategory = yearsByCategory[category][0];
      setSelectedYear(firstYearInCategory);
    }
  };
  
  // Dummy background images for development/testing if real images are not available
  const getDummyBgImage = (index) => {
    const colors = ['#8c735d', '#b7a99a', '#c4b19c', '#524336'];
    return `linear-gradient(45deg, ${colors[index % colors.length]}, #b7a99a)`;
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8 md:px-20 bg-gray-100 border-b border-gray-200">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-primary-900 font-bold text-lg md:text-xl"
        >
          BRAND MILESTONES
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {categories.map((category, index) => (
            <motion.button 
              key={category} 
              onClick={() => handleCategoryChange(category)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * index,
                ease: 'easeOut'
              }}
              className={`text-sm hover:text-primary-900 transition-colors py-2 px-1 relative group`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`${activeCategory === category ? 'text-primary-900' : 'text-gray-600'}`}>
                {category}
              </span>
              {/* Active indicator line */}
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-700"
                initial={false}
                animate={{ 
                  opacity: activeCategory === category ? 1 : 0,
                  width: activeCategory === category ? '100%' : '0%'
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.button>
          ))}
        </nav>
        
        {/* Mobile category select */}
        <div className="md:hidden">
          <select 
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="bg-white border border-gray-200 py-1 px-3 rounded-md text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-700"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Language/settings button */}
        <motion.button 
          className="rounded-full bg-white p-2 shadow-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </motion.button>
      </header>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar with Category Title and Year Selection */}
        <aside className="w-full md:w-64 p-8 md:py-12 md:px-20 bg-gray-100 border-r border-gray-200">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={activeCategory}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-5xl font-extralight text-gray-300 mb-12"
            >
              {activeCategory.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word}<br />
                </React.Fragment>
              ))}
            </motion.h2>
          </AnimatePresence>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="space-y-6"
          >
            {years.map((year, index) => (
              <motion.button
                key={year}
                custom={index}
                variants={yearVariants}
                onClick={() => setSelectedYear(year)}
                className="block text-xl transition-all duration-300 w-full text-left"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  animate={{
                    color: selectedYear === year ? '#111827' : '#6B7280',
                    fontWeight: selectedYear === year ? 500 : 400,
                    scale: selectedYear === year ? 1.05 : 1
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative"
                >
                  {year}
                  {selectedYear === year && (
                    <motion.div 
                      layoutId="yearIndicator"
                      className="absolute -left-4 top-1/2 w-2 h-2 bg-primary-700 rounded-full -translate-y-1/2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        </aside>
        
        {/* Main Content Area with Swiper */}
        <main className="flex-1 flex flex-col relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeCategory}-${selectedYear}`}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full"
            >
              {totalSlides > 0 ? (
                <div className="relative h-full">
                  <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination, EffectFade, Autoplay]}
                    effect="fade"
                    speed={800}
                    slidesPerView={1}
                    onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                    pagination={{
                      el: '.custom-pagination',
                      clickable: true,
                      renderBullet: function (index, className) {
                        return `<div class="${className} custom-bullet"></div>`;
                      },
                    }}
                    autoplay={isAutoplay ? {
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true
                    } : false}
                    className="h-full"
                  >
                    {currentYearData.map((slide, index) => (
                      <SwiperSlide key={index} className="h-full">
                        <div 
                          className="relative h-96 md:h-[500px] bg-cover bg-center flex items-center overflow-hidden"
                          style={{ 
                            backgroundImage: slide.backgroundImage 
                              ? `url(${slide.backgroundImage})` 
                              : getDummyBgImage(index),
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                          }}
                        >
                          {/* Enhanced gradient overlay for better text visibility */}
                          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 via-primary-900/30 to-primary-900/30"></div>
                          
                          {/* Year and title */}
                          <div className="relative z-10 p-8 md:p-16 flex flex-col justify-between h-full w-full">
                            <div>
                              <motion.h1 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: 'easeOut' }}
                                className="text-white text-6xl md:text-8xl font-bold mb-8"
                              >
                                {selectedYear}
                              </motion.h1>
                              <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                                className="text-white text-lg md:text-xl max-w-md"
                              >
                                {slide.title}
                              </motion.p>
                            </div>
                            
                            {/* Top-right logo area */}
                            {slide.logos?.map((logo, logoIndex) => (
                              logo.position === "top-right" && (
                                <div key={logoIndex} className="absolute top-8 right-8 md:top-12 md:right-16 z-20">
                                  {logo.content}
                                </div>
                              )
                            ))}
                            
                            {/* Bottom-right logo/rating area */}
                            {slide.logos?.map((logo, logoIndex) => (
                              logo.position === "bottom-right" && (
                                <div key={logoIndex} className="absolute bottom-8 right-8 md:bottom-12 md:right-16 z-20">
                                  {logo.content}
                                </div>
                              )
                            ))}
                          </div>
                          
                          {/* Improved pagination lines (always visible) */}
                          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                            <div className="custom-pagination flex items-center space-x-3"></div>
                          </div>
                          
                          {/* Slide controls */}
                          {totalSlides > 1 && (
                            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-30 flex space-x-6">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  setIsAutoplay(!isAutoplay);
                                }}
                                className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm ${isAutoplay ? 'bg-white/90' : 'bg-primary-900/80'}`}
                              >
                                {isAutoplay ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m-9-6h14" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  if (swiperRef.current && swiperRef.current.swiper) {
                                    swiperRef.current.swiper.slidePrev();
                                  }
                                }}
                                className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  if (swiperRef.current && swiperRef.current.swiper) {
                                    swiperRef.current.swiper.slideNext();
                                  }
                                }}
                                className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className="h-96 md:h-[500px] bg-primary-900 flex items-center justify-center">
                  <p className="text-white text-xl">No content available for this selection</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Custom CSS for line pagination */}
      <style jsx>{`
        :global(.custom-bullet) {
          width: 40px;
          height: 4px;
          background-color: rgba(255, 255, 255, 0.4);
          display: inline-block;
          transition: all 0.5s ease;
          cursor: pointer;
          border-radius: 2px;
          margin: 0 3px;
        }
        
        :global(.custom-bullet.swiper-pagination-bullet-active) {
          background-color: white;
          width: 60px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
        
        /* Additional animations for smooth transitions */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        :global(.swiper-slide-active) {
          animation: fadeIn 0.8s ease-in-out;
        }
        
        /* Custom progress indicator */
        :global(.swiper-pagination-progressbar .swiper-pagination-progressbar-fill) {
          background: white !important;
        }
      `}</style>
    </div>
  );
};

export default BrandMilestones;