'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Enhanced color palette with richer brown tones
const colors = {
  brown100: '#f5efe6',
  brown200: '#e8dccb',
  brown300: '#d8bd9e',
  brown400: '#c79e73',
  brown500: '#b98352',
  brown600: '#a06a3a',
  brown700: '#865728',
  brown800: '#6b461e',
  textDark: '#2d2417',
  textLight: '#f8f5f1'
}

const newsData = [
  {
    id: 1,
    title: "The Fashion Code of Global Success: Decoding the Aesthetic DNA Behind Chery's Design",
    summary: "How innovative design philosophy is shaping Chery's global appeal",
    date: "Mar 19, 2025",
    category: "Design",
    image: "/images/news/1.jpg",
    slug: "fashion-code-global-success",
    isNew: false
  },
  {
    id: 2,
    title: "The Secret to Milestones: TIGGO 4's Path to Global Trust via Safety Standards",
    summary: "TIGGO 4 achieves remarkable safety ratings across international markets",
    date: "Mar 14, 2025",
    category: "Safety",
    image: "/images/news/2.jpg",
    slug: "tiggo4-global-trust-safety",
    isNew: true
  },
  {
    id: 3,
    title: "Allianz Partners and Chery International sign Strategic Cooperation Agreement",
    summary: "Partnership aims to enhance global warranty and service offerings",
    date: "Mar 04, 2025",
    category: "Partnership",
    image: "/images/news/3.jpg",
    slug: "allianz-partners-agreement",
    isNew: false
  }
]

export default function NewsSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Handle window resize for responsive design
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation variants with improved effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        mass: 1,
        duration: 0.7
      }
    }
  };
  
  // Responsive column count based on window width
  const getColumnCount = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1280) return 2;
    return 3;
  };

  return (
    <section className="py-36 px-0 bg-white w-full overflow-hidden">
      <div className="w-full max-w-none px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <motion.div 
              className="w-16 h-1.5 mb-5" 
              style={{ backgroundColor: colors.brown600 }}
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            ></motion.div>
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ color: colors.textDark }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Latest News
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl max-w-xl"
              style={{ color: colors.brown800 + 'cc' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Stay updated with the latest developments, innovations, and milestones from Chery International
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              href="/news" 
              className="mt-8 md:mt-0 group inline-flex items-center text-sm font-semibold tracking-wider transition-all duration-300 relative overflow-hidden"
              style={{ color: colors.brown600 }}
            >
              <span className="relative z-10">VIEW ALL NEWS</span>
              <div 
                className="absolute bottom-0 left-0 h-0.5 w-full transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                style={{ backgroundColor: colors.brown500 }}
              ></div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-3 transform group-hover:translate-x-1.5 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={`grid grid-cols-1 sm:grid-cols-${getColumnCount()} gap-4 md:gap-4 lg:gap-6 xl:gap-12`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {newsData.map((news, index) => (
            <motion.div 
              key={news.id}
              variants={cardVariants}
              className="group w-full h-full"
              style={{
                opacity: 1,
                transform: 'none'
              }}
            >
              <div 
                className="relative overflow-hidden h-full transition-all duration-500 ease-out rounded-sm hover:shadow-xl"
                style={{ 
                  transform: hoveredCard === news.id ? 'translateY(-5px)' : 'none',
                  transition: 'transform 0.5s ease-out, shadow 0.5s ease-out',
                  backgroundColor: hoveredCard === news.id ? colors.brown300 : 'transparent'
                }}
                onMouseEnter={() => setHoveredCard(news.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Removed the gradient overlay that was on top of the content */}
                
                <div className="flex flex-col h-full">
                  {/* Image container with enhanced hover effects */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/11] md:aspect-[16/12] lg:aspect-[16/13] w-full overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 ease-out will-change-transform"
                      style={{
                        transform: hoveredCard === news.id ? 'scale(1.12)' : 'scale(1.01)',
                      }}
                    />
                    {/* Added overlay directly on top of the image with fade to top effect */}
                    <div 
                      className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                      style={{
                        opacity: hoveredCard === news.id ? 1 : 0,
                        background: `linear-gradient(to top, 
                          ${colors.brown400}ee 0%, 
                          ${colors.brown400}dd 40%, 
                          ${colors.brown400}99 70%, 
                          ${colors.brown400}55 85%,
                          transparent 100%)`,
                      }}
                    ></div>
                    
                    {/* Enhanced "New" tag with better positioning and styling */}
                    {news.isNew && (
                      <div 
                        className="absolute top-4 right-4 py-1.5 px-4 z-20 rounded-sm shadow-md"
                        style={{ 
                          backgroundColor: colors.brown600,
                          transition: 'transform 0.3s ease-out',
                          transform: hoveredCard === news.id ? 'translateY(-2px)' : 'none'
                        }}
                      >
                        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: colors.textLight }}>New</span>
                      </div>
                    )}
                    
                    {/* Enhanced category label with better positioning and styling */}
                    <div 
                      className="absolute bottom-0 left-0 py-2 px-5 z-20"
                      style={{ 
                        backgroundColor: 'white',
                        transition: 'transform 0.3s ease-out',
                        transform: hoveredCard === news.id ? 'translateY(-2px)' : 'none'
                      }}
                    >
                      <span 
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ 
                          transition: 'color 0.3s ease-out',
                          color: hoveredCard === news.id ? colors.brown700 : colors.brown600
                        }}
                      >
                        {news.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Enhanced content area with smooth hover transitions - MODIFIED: Text color changes on hover */}
                  <div 
                    className="flex flex-col p-6 sm:p-8 lg:p-10 flex-grow border-l border-r border-b rounded-b-sm relative overflow-hidden transition-all duration-500"
                    style={{ 
                      borderColor: hoveredCard === news.id ? colors.brown300 : '#e5e5e5',
                      backgroundColor: hoveredCard === news.id ? colors.brown300 : 'white',
                      position: 'relative', 
                      zIndex: '1'
                    }}
                  >
                    {/* Background decorative element that appears on hover */}
                    <div 
                      className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full transition-opacity duration-700 opacity-0 pointer-events-none"
                      style={{ 
                        background: `radial-gradient(circle, ${colors.brown200}40 0%, transparent 70%)`,
                        opacity: hoveredCard === news.id ? 0.5 : 0,
                      }}
                    ></div>
                    
                    {/* Date with enhanced styling - MODIFIED: Color changes to white on hover */}
                    <div 
                      className="text-sm font-medium mb-3 transition-colors duration-300"
                      style={{ 
                        color: hoveredCard === news.id ? colors.textLight : colors.brown400
                      }}
                    >
                      {news.date}
                    </div>
                    
                    {/* Title with enhanced typography and hover effects - MODIFIED: Text changes to white on hover */}
                    <h3 
                      className="text-xl sm:text-2xl font-bold mb-4 leading-snug line-clamp-2 transition-colors duration-300" 
                      style={{ 
                        color: hoveredCard === news.id ? colors.textLight : colors.textDark
                      }}
                    >
                      {news.title}
                    </h3>
                    
                    {/* Summary with improved typography - MODIFIED: Text changes to white on hover */}
                    <p 
                      className="text-base sm:text-lg mb-8 md:mb-10 line-clamp-2 flex-grow transition-colors duration-300"
                      style={{ 
                        color: hoveredCard === news.id ? colors.textLight + 'dd' : '#666666'
                      }}
                    >
                      {news.summary}
                    </p>
                    
                    {/* Enhanced explore link with better hover effects - MODIFIED: Text changes to white on hover */}
                    <div className="mt-auto">
                      <Link 
                        href={`/news/${news.slug}`}
                        className="inline-flex items-center text-sm font-semibold uppercase tracking-wider transition-all duration-300 relative"
                        style={{ 
                          color: hoveredCard === news.id ? colors.textLight : colors.brown500,
                        }}
                      >
                        <span className="relative">
                          EXPLORE
                          <span 
                            className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300"
                            style={{ 
                              backgroundColor: hoveredCard === news.id ? colors.textLight : colors.brown500,
                              transform: hoveredCard === news.id ? 'scaleX(1)' : 'scaleX(0)',
                              transformOrigin: 'left',
                              opacity: hoveredCard === news.id ? 1 : 0
                            }}
                          ></span>
                        </span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 ml-2 transition-all duration-300"
                          style={{
                            transform: hoveredCard === news.id ? 'translateX(6px)' : 'translateX(0)',
                          }}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced mobile view all button */}
        <motion.div 
          className="mt-16 text-center sm:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link 
            href="/news" 
            className="inline-block py-3.5 px-8 text-sm font-medium uppercase tracking-wider transition-all duration-300 relative overflow-hidden"
            style={{ 
              backgroundColor: colors.brown100,
              color: colors.brown700,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: colors.brown300,
            }}
          >
            <span className="relative z-10">View All News</span>
            <div className="absolute inset-0 w-full h-full transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0" 
              style={{ backgroundColor: colors.brown200 }}></div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}