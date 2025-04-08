'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

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

  // Animation variants - simplified for cleaner transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <div className="w-10 h-1 bg-primary mb-4"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Latest News
            </h2>
            <p className="text-gray-600 max-w-lg">
              Stay updated with the latest developments, innovations, and milestones from Chery International
            </p>
          </div>
          
          <Link 
            href="/news" 
            className="mt-4 md:mt-0 group inline-flex items-center text-sm font-medium text-gray-900 tracking-wider hover:text-primary transition-colors duration-200"
          >
            VIEW ALL NEWS
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {newsData.map((news, index) => (
            <motion.article 
              key={news.id}
              variants={cardVariants}
              className="group flex flex-col h-full"
              onMouseEnter={() => setHoveredCard(news.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image container with gradient overlay */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`object-cover transition-transform duration-500 ${hoveredCard === news.id ? 'scale-105' : 'scale-100'}`}
                />
                
                {/* Gradient overlay that appears from bottom to top on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent transition-all duration-300 ease-in-out ${
                    hoveredCard === news.id ? 'opacity-100' : 'opacity-0 translate-y-16'
                  }`}
                ></div>
                
                {/* Category label */}
                <div className="absolute bottom-0 left-0 bg-white py-1 px-3 z-10">
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-900">{news.category}</span>
                </div>
                
                {/* New tag - flat design */}
                {news.isNew && (
                  <div className="absolute top-0 right-0 bg-primary py-1 px-3 z-10">
                    <span className="text-xs font-medium uppercase tracking-wider text-white">New</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col flex-grow p-5 border-l border-r border-b border-gray-200 bg-white transition-colors duration-200 group-hover:border-gray-300">
                {/* Date with minimal styling */}
                <div className="text-sm text-gray-500 mb-2">{news.date}</div>
                
                {/* Title with clean typography */}
                <h3 className="text-lg font-medium text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {news.title}
                </h3>
                
                {/* Summary with improved spacing */}
                <p className="text-gray-600 mb-6 line-clamp-2 flex-grow">
                  {news.summary}
                </p>
                
                {/* Read more link with cleaner animation */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link 
                    href={`/news/${news.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary-dark transition-colors duration-200"
                  >
                    READ ARTICLE
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Mobile view all button */}
        <div className="mt-10 text-center md:hidden">
          <Link 
            href="/news" 
            className="inline-block py-3 px-6 border border-gray-300 text-sm font-medium text-gray-900 hover:border-primary hover:text-primary transition-colors duration-200"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  )
}