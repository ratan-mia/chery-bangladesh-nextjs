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
    image: "/news-1.jpg",
    slug: "fashion-code-global-success",
    isNew: false
  },
  {
    id: 2,
    title: "The Secret to Milestones: TIGGO 4's Path to Global Trust via Safety Standards",
    summary: "TIGGO 4 achieves remarkable safety ratings across international markets",
    date: "Mar 14, 2025",
    image: "/news-2.jpg",
    slug: "tiggo4-global-trust-safety",
    isNew: true
  },
  {
    id: 3,
    title: "Allianz Partners and Chery International sign Strategic Cooperation Agreement",
    summary: "Partnership aims to enhance global warranty and service offerings",
    date: "Mar 04, 2025",
    image: "/news-3.jpg",
    slug: "allianz-partners-agreement",
    isNew: false
  }
]

export default function NewsSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-light text-gray-800"
          >
            Explore the latest news from Chery
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/news" className="text-primary hover:text-primary-hover transition-colors font-medium">
              VIEW ALL
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {newsData.map((news, index) => (
            <motion.div 
              key={news.id}
              variants={cardVariants}
              className="bg-white overflow-hidden group"
              onMouseEnter={() => setHoveredCard(news.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className={`object-cover transition-transform duration-700 
                            ${hoveredCard === news.id ? 'scale-110' : 'scale-100'}`}
                />
                {news.isNew && (
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-medium px-3 py-1 z-10">
                    NEW
                  </div>
                )}
                
                {/* Gradient overlay on hover - appears from bottom with primary colors */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-bg-primary-900/80 via-bg-primary-800/60 to-bg-primary-700/0
                              transition-all duration-500 
                              ${hoveredCard === news.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                  style={{ height: '100%' }}
                ></div>
              </div>
              
              <div className="p-4 relative bg-white transition-colors duration-300 group-hover:bg-gray-50">
                {/* Date */}
                <div className="text-gray-500 text-sm mb-2">{news.date}</div>
                
                {/* Title with line clamp */}
                <h3 className="text-xl font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {news.title}
                </h3>
                
                {/* Summary with line clamp */}
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {news.summary}
                </p>
                
                {/* Explore link with hover effect */}
                <Link 
                  href={`/news/${news.slug}`}
                  className="inline-block uppercase text-sm font-medium tracking-wider text-primary border-b border-primary pb-1 transition-all duration-300 relative group-hover:border-transparent"
                >
                  EXPLORE
                  <span className={`absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full`}></span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}