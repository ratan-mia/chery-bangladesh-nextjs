'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const NewsComponent = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('information');
  const [visibleItems, setVisibleItems] = useState(8);
  
  // Tab options
  const tabs = [
    { id: 'information', label: 'Information' },
    { id: 'brand', label: 'Brand' },
    { id: 'product', label: 'Product' },
    { id: 'show', label: 'Show' },
    { id: 'events', label: 'Events' },
    { id: 'partnerships', label: 'Partnerships' }
  ];
  
  // Mock data for the news items
  const allNewsItems = [
    {
      id: 1,
      category: 'information',
      image: "/api/placeholder/800/500",
      date: "March 19, 2025",
      title: "The Fashion Code of Global Success: Decoding the Aesthetic DNA Behind...",
      link: "#"
    },
    {
      id: 2,
      category: 'product',
      image: "/api/placeholder/800/500",
      date: "March 14, 2025",
      title: "The Secret to Milestones: TIGGO 4's Path to Global Trust via Safety Excellence",
      link: "#"
    },
    {
      id: 3,
      category: 'partnerships',
      image: "/api/placeholder/800/500",
      date: "March 04, 2025",
      title: "Allianz Partners and Chery International sign Strategic Partnership Agreement to...",
      link: "#"
    },
    {
      id: 4,
      category: 'brand',
      image: "/api/placeholder/800/500",
      date: "February 28, 2025",
      title: "Sustainable Manufacturing: Our Commitment to Eco-friendly Production",
      link: "#"
    },
    {
      id: 5,
      category: 'show',
      image: "/api/placeholder/800/500",
      date: "February 22, 2025",
      title: "Unveiling the Future: Highlights from the International Auto Expo",
      link: "#"
    },
    {
      id: 6,
      category: 'events',
      image: "/api/placeholder/800/500",
      date: "February 15, 2025",
      title: "Innovation Summit 2025: Connecting Global Automotive Leaders",
      link: "#"
    },
    {
      id: 7,
      category: 'information',
      image: "/api/placeholder/800/500",
      date: "February 10, 2025",
      title: "The Future of Mobility: Trends Shaping Next-Generation Transportation",
      link: "#"
    },
    {
      id: 8,
      category: 'product',
      image: "/api/placeholder/800/500",
      date: "February 05, 2025",
      title: "Advanced Safety Features: The Technology Behind Our 5-Star Rating",
      link: "#"
    },
    {
      id: 9,
      category: 'brand',
      image: "/api/placeholder/800/500",
      date: "January 30, 2025",
      title: "Global Expansion: New Markets and Growth Opportunities in 2025",
      link: "#"
    },
    {
      id: 10,
      category: 'partnerships',
      image: "/api/placeholder/800/500",
      date: "January 25, 2025",
      title: "Strategic Technology Alliance: Enhancing Electric Vehicle Capabilities",
      link: "#"
    },
    {
      id: 11,
      category: 'show',
      image: "/api/placeholder/800/500",
      date: "January 20, 2025",
      title: "Design Excellence Award: Recognition for Outstanding Innovation",
      link: "#"
    },
    {
      id: 12,
      category: 'events',
      image: "/api/placeholder/800/500",
      date: "January 15, 2025",
      title: "Community Engagement: Supporting Local Initiatives and Education",
      link: "#"
    }
  ];

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Filter news items based on active tab
  const filteredNewsItems = activeTab === 'all' 
    ? allNewsItems 
    : allNewsItems.filter(item => item.category === activeTab);
    
  // Load more handler
  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + 4, filteredNewsItems.length));
  };
  
  // Reset visible items when changing tabs
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setVisibleItems(8);
  };

  return (
    <section className="relative w-full bg-gray-50 py-16 sm:py-24 lg:py-32">
      {/* Content container */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with title and navigation */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-6">
          <h1 className="text-5xl font-bold text-gray-900">NEWS</h1>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`pb-2 transition-colors duration-300 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'text-primary-700 border-b-2 border-primary-600 font-medium' 
                    : 'text-gray-500 hover:text-primary-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          
          {/* Mobile tab selector */}
          <div className="md:hidden w-full">
            <select 
              value={activeTab} 
              onChange={(e) => handleTabChange(e.target.value)}
              className="w-full bg-white text-gray-900 border border-gray-300  p-3"
            >
              {tabs.map(tab => (
                <option key={tab.id} value={tab.id}>{tab.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* News grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeTab} // Re-render animation when tab changes
        >
          {filteredNewsItems.slice(0, visibleItems).map((item) => (
            <motion.article 
              key={item.id} 
              className="group flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              variants={itemVariants}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  aria-hidden="true"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-gray-500 text-sm mb-2">{item.date}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {item.title}
                </h3>
                <div className="mt-auto">
                  <a
                    href={item.link}
                    className="inline-flex items-center justify-center px-6 py-2 bg-primary-600 text-white font-medium  hover:bg-blue-700 transition-colors duration-300"
                    aria-label={`Read more about ${item.title}`}
                  >
                    Read More
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
        
        {/* Load More button - only show if there are more items to load */}
        {visibleItems < filteredNewsItems.length && (
          <div className="mt-12 text-center">
            <motion.button
              onClick={handleLoadMore}
              className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white font-medium  hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More News
            </motion.button>
          </div>
        )}
        
        {/* No more results message */}
        {visibleItems >= filteredNewsItems.length && filteredNewsItems.length > 0 && (
          <div className="mt-12 text-center text-gray-500">
            You've reached the end of the news for this category.
          </div>
        )}

        {/* Contact section at the bottom */}
        <div className="mt-16 flex flex-col md:flex-row justify-end items-center">
          <p className="text-gray-500 mr-4 mb-4 md:mb-0">LOOKING FORWARD TO YOUR CONTACT</p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-amber-500 text-white font-medium  hover:bg-amber-600 transition-colors duration-300"
          >
            CONTACT US
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsComponent;