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
  const [activeCategory, setActiveCategory] = useState('ALL CONTENT');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const swiperRef = useRef(null);

  const categories = ['ALL CONTENT', 'BRAND', 'PRODUCT', 'MARKET', 'COMMONWEAL'];
  const years = yearsByCategory[activeCategory] || [];

  useEffect(() => {
    setActiveSlide(0);
  }, [selectedYear]);

  useEffect(() => {
    setActiveSlide(0);
    setIsAutoplay(true);
    if (!yearsByCategory[activeCategory]?.includes(selectedYear)) {
      setSelectedYear(yearsByCategory[activeCategory]?.[0] || '');
    }
  }, [activeCategory]);

  const currentYearData = milestonesData?.[activeCategory]?.[selectedYear] || [];
  const totalSlides = currentYearData.length;

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } },
  };

  const yearVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { delay: index * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
  };

  const handleCategoryChange = (category) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
      setSelectedYear(yearsByCategory[category]?.[0] || '');
    }
  };

  const getDummyBgImage = (index) => {
    const colors = ['#8c735d', '#b7a99a', '#c4b19c', '#524336'];
    return `linear-gradient(45deg, ${colors[index % colors.length]}, #b7a99a)`;
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 font-sans overflow-hidden">
      <header className="flex justify-between items-center py-6 px-8 md:px-20 bg-gray-100 border-b border-gray-200">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-primary-900 font-bold text-lg md:text-xl"
        >
          BRAND MILESTONES
        </motion.div>

        <nav className="hidden md:flex space-x-8">
          {categories.map((category, index) => (
            <motion.button 
              key={category} 
              onClick={() => handleCategoryChange(category)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }}
              className="text-sm hover:text-primary-900 transition-colors py-2 px-1 relative group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={activeCategory === category ? 'text-primary-900' : 'text-gray-600'}>
                {category}
              </span>
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-700"
                initial={false}
                animate={{ opacity: activeCategory === category ? 1 : 0, width: activeCategory === category ? '100%' : '0%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.button>
          ))}
        </nav>

        <div className="md:hidden">
          <select 
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="bg-white border border-gray-200 py-1 px-3 rounded-md text-sm text-primary-900"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
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
                <React.Fragment key={i}>{word}<br /></React.Fragment>
              ))}
            </motion.h2>
          </AnimatePresence>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="space-y-6"
          >
            {years.map((year, index) => (
              <motion.button
                key={year}
                custom={index}
                variants={yearVariants}
                onClick={() => setSelectedYear(year)}
                className="block text-xl text-left"
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

        <main className="flex-1">
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
                <Swiper
                  ref={swiperRef}
                  modules={[Navigation, Pagination, EffectFade, Autoplay]}
                  effect="fade"
                  speed={800}
                  slidesPerView={1}
                  onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                  pagination={{ clickable: true }}
                  autoplay={isAutoplay ? {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  } : false}
                >
                  {currentYearData.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div 
                        className="relative h-96 md:h-[500px] bg-cover bg-bottom flex items-center"
                        style={{ 
                          backgroundImage: slide.backgroundImage 
                            ? `url(${slide.backgroundImage})` 
                            : getDummyBgImage(index),
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 via-primary-900/30 to-primary-900/30"></div>
                        <div className="relative z-10 p-8 md:p-16">
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
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="h-96 md:h-[500px] bg-primary-900 flex items-center justify-center">
                  <p className="text-white text-xl">No content available for this selection</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default BrandMilestones;
