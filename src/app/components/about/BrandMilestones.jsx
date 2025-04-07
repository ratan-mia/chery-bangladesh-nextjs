import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BrandMilestones = () => {
  // State for the currently selected year
  const [selectedYear, setSelectedYear] = useState('2023');
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Navigation menu options
  const navOptions = ['ALL CONTENT', 'BRAND', 'PRODUCT', 'MARKET', 'COMMONWEAL'];
  
  // Years for the timeline
  const years = ['2024', '2023', '2022', '2021', '2020', '2017'];
  
  // Content data for each year with multiple slides
  const milestonesData = {
    '2023': [
      {
        title: "The Tiggo 7 Pro Earned \"Five-Star Safety Rating\" in 2023 ANCAP",
        backgroundImage: "/images/tiggo-7-pro-safety.jpg",
        logos: [
          {
            position: "top-right",
            content: (
              <div className="flex flex-col items-end">
                <div className="text-white text-sm">CHERY · TIGGO</div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-white text-4xl font-bold mt-2"
                >
                  TIGGO<span className="text-4xl">7</span>PRO
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-blue-500 text-4xl font-bold mt-2"
                >
                  5-STAR
                </motion.div>
                <div className="text-white text-lg">ANCAP SAFETY RATING</div>
              </div>
            )
          },
          {
            position: "bottom-right",
            content: (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col items-center"
              >
                <div className="bg-white p-2 rounded-full">
                  <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center">
                    <div className="w-8 h-8 bg-black rounded-tl-full"></div>
                  </div>
                </div>
                <div className="text-white text-xl font-bold mt-2">ANCAP</div>
                <div className="text-white text-sm">SAFETY</div>
                <div className="bg-yellow-400 py-1 px-3 mt-1 text-sm font-bold">TESTED 2023</div>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <motion.svg 
                      key={star} 
                      className="w-5 h-5 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
              </motion.div>
            )
          }
        ]
      },
      {
        title: "TIGGO 8 CHAMPION OF CACSI Under the Segmented Models in 2023 CACSI (China Automobile Customer Satisfaction Index)",
        backgroundImage: "/images/tiggo-8-champion.jpg",
        logos: [
          {
            position: "top-right",
            content: (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white text-4xl font-bold"
              >
                TIGGO<span className="text-4xl">8</span>
              </motion.div>
            )
          },
          {
            position: "bottom-right",
            content: (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-col items-end"
              >
                <div className="text-white text-opacity-80">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="text-yellow-200 text-4xl font-bold mb-2"
                  >
                    CHAMPION OF CACSI
                  </motion.div>
                  <div className="text-sm mb-4">Under the Segmented Models in 2023 CACSI (China Automobile Customer Satisfaction Index)</div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.7 }}
                    className="flex justify-end items-center"
                  >
                    <div className="mr-2">China Association for Quality</div>
                    <img src="/images/chery-logo.png" alt="Chery Logo" className="h-6" />
                  </motion.div>
                </div>
              </motion.div>
            )
          }
        ]
      }
    ],
    '2024': [
      {
        title: "The Millionth Export of Chery TIGGO 7 Marks Milestone in Global Expansion Strategy",
        backgroundImage: "/images/tiggo-7-export.jpg",
        logos: []
      }
    ],
    '2022': [
      {
        title: "Celebrating Two Decades of Innovation and Global Presence",
        backgroundImage: "/images/chery-2022.jpg",
        logos: []
      }
    ],
    '2021': [
      {
        title: "Launch of Next Generation Powertrain Technology",
        backgroundImage: "/images/chery-2021.jpg",
        logos: []
      }
    ],
    '2020': [
      {
        title: "Digital Transformation Initiative Begins",
        backgroundImage: "/images/chery-2020.jpg",
        logos: []
      }
    ],
    '2017': [
      {
        title: "Strategic Partnership Formation",
        backgroundImage: "/images/chery-2017.jpg",
        logos: []
      }
    ]
  };

  // Reset active slide when year changes
  useEffect(() => {
    setActiveSlide(0);
  }, [selectedYear]);

  // Get current year's data
  const currentYearData = milestonesData[selectedYear] || [];
  const totalSlides = currentYearData.length;

  // Year selection animation variants
  const yearVariants = {
    selected: {
      color: '#374151', // text-gray-700
      fontWeight: 500,
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    notSelected: {
      color: '#9CA3AF', // text-gray-400
      fontWeight: 400,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  // Fade in animation for main content
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 font-sans relative h-full overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8 md:px-20 bg-gray-200">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-700 font-bold text-lg md:text-xl"
        >
          BRAND MILESTONES
        </motion.div>
        
        <nav className="hidden md:flex space-x-8">
          {navOptions.map((option, index) => (
            <motion.a 
              key={index} 
              href="#" 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`text-sm hover:text-gray-500 transition-colors ${
                option === 'ALL CONTENT' ? 'border-b-2 border-gray-700' : ''
              }`}
            >
              {option}
            </motion.a>
          ))}
        </nav>
        
        {/* Language/settings button */}
        <motion.button 
          className="rounded-full bg-white p-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </motion.button>
      </header>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar with All Content and Year Selection */}
        <aside className="w-full md:w-64 p-8 md:py-12 md:px-20 bg-gray-200">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl font-extralight text-gray-300 mb-12"
          >
            ALL<br />CONTENT
          </motion.h2>
          
          <div className="space-y-6">
            {years.map((year, index) => (
              <motion.button
                key={year}
                variants={yearVariants}
                initial="notSelected"
                animate={selectedYear === year ? "selected" : "notSelected"}
                className="block text-xl transition-all duration-300"
                onClick={() => setSelectedYear(year)}
                whileHover={{ x: 5 }}
                custom={index}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </aside>
        
        {/* Main Content Area with Swiper */}
        <main className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedYear}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full"
            >
              <Swiper
                modules={[Navigation, Pagination, EffectFade]}
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
                className="h-full"
              >
                {currentYearData.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div 
                      className="relative h-96 md:h-[500px] bg-cover bg-center flex items-center"
                      style={{ 
                        backgroundImage: `url(${slide.backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {/* Overlay for better text visibility */}
                      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                      
                      {/* Year and title */}
                      <div className="relative z-10 p-8 md:p-16 flex flex-col justify-between h-full w-full">
                        <div>
                          <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-white text-6xl md:text-8xl font-bold mb-8"
                          >
                            {selectedYear}
                          </motion.h1>
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
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
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Custom pagination as lines instead of dots */}
              {totalSlides > 1 && (
                <div className="bg-gray-800 h-12 flex items-center justify-center">
                  <div className="custom-pagination flex space-x-4"></div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Custom CSS for line pagination */}
      <style jsx>{`
        :global(.custom-bullet) {
          width: 30px;
          height: 3px;
          background-color: rgba(255, 255, 255, 0.4);
          display: inline-block;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        :global(.custom-bullet.swiper-pagination-bullet-active) {
          background-color: white;
          width: 50px;
        }
      `}</style>
    </div>
  );
};

export default BrandMilestones;