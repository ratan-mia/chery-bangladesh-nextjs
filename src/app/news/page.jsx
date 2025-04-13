'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronRight, Clock, Filter, Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const NewsComponent = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('information');
  const [visibleItems, setVisibleItems] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  
  // Tab options
  const tabs = [
    { id: 'information', label: 'Information', count: 0 },
    { id: 'brand', label: 'Brand', count: 0 },
    { id: 'product', label: 'Product', count: 0 },
    { id: 'show', label: 'Show', count: 0 },
    { id: 'events', label: 'Events', count: 0 },
    { id: 'partnerships', label: 'Partnerships', count: 0 }
  ];
  
  // Mock data for the news items
  const allNewsItems = [
    {
      id: 1,
      category: 'information',
      image: "/api/placeholder/800/500",
      date: "March 19, 2025",
      timestamp: new Date("2025-03-19").getTime(),
      title: "The Fashion Code of Global Success: Decoding the Aesthetic DNA Behind...",
      excerpt: "Explore how automotive design influences consumer perception and brand identity in global markets.",
      link: "#",
      readTime: "5 min read"
    },
    {
      id: 2,
      category: 'product',
      image: "/api/placeholder/800/500",
      date: "March 14, 2025",
      timestamp: new Date("2025-03-14").getTime(),
      title: "The Secret to Milestones: TIGGO 4's Path to Global Trust via Safety Excellence",
      excerpt: "How the TIGGO 4 achieved worldwide recognition through its commitment to passenger safety and innovation.",
      link: "#",
      readTime: "7 min read"
    },
    {
      id: 3,
      category: 'partnerships',
      image: "/api/placeholder/800/500",
      date: "March 04, 2025",
      timestamp: new Date("2025-03-04").getTime(),
      title: "Allianz Partners and Chery International sign Strategic Partnership Agreement",
      excerpt: "A new global partnership set to enhance customer service experiences across international markets.",
      link: "#",
      readTime: "4 min read"
    },
    {
      id: 4,
      category: 'brand',
      image: "/api/placeholder/800/500",
      date: "February 28, 2025",
      timestamp: new Date("2025-02-28").getTime(),
      title: "Sustainable Manufacturing: Our Commitment to Eco-friendly Production",
      excerpt: "Inside our factories: How we're reducing carbon footprint while maintaining production excellence.",
      link: "#",
      readTime: "6 min read"
    },
    {
      id: 5,
      category: 'show',
      image: "/api/placeholder/800/500",
      date: "February 22, 2025",
      timestamp: new Date("2025-02-22").getTime(),
      title: "Unveiling the Future: Highlights from the International Auto Expo",
      excerpt: "The most exciting reveals and innovations from this year's premier automotive exhibition.",
      link: "#",
      readTime: "8 min read"
    },
    {
      id: 6,
      category: 'events',
      image: "/api/placeholder/800/500",
      date: "February 15, 2025",
      timestamp: new Date("2025-02-15").getTime(),
      title: "Innovation Summit 2025: Connecting Global Automotive Leaders",
      excerpt: "Key takeaways from the industry's most influential gathering of thought leaders and innovators.",
      link: "#",
      readTime: "5 min read"
    },
    {
      id: 7,
      category: 'information',
      image: "/api/placeholder/800/500",
      date: "February 10, 2025",
      timestamp: new Date("2025-02-10").getTime(),
      title: "The Future of Mobility: Trends Shaping Next-Generation Transportation",
      excerpt: "From autonomous driving to alternative fuels: The technologies that will define tomorrow's journeys.",
      link: "#",
      readTime: "6 min read"
    },
    {
      id: 8,
      category: 'product',
      image: "/api/placeholder/800/500",
      date: "February 05, 2025",
      timestamp: new Date("2025-02-05").getTime(),
      title: "Advanced Safety Features: The Technology Behind Our 5-Star Rating",
      excerpt: "How our commitment to innovation has resulted in the highest safety standards for all our vehicles.",
      link: "#",
      readTime: "7 min read"
    },
    {
      id: 9,
      category: 'brand',
      image: "/api/placeholder/800/500",
      date: "January 30, 2025",
      timestamp: new Date("2025-01-30").getTime(),
      title: "Global Expansion: New Markets and Growth Opportunities in 2025",
      excerpt: "Our strategic vision for bringing quality vehicles to emerging automotive markets worldwide.",
      link: "#",
      readTime: "4 min read"
    },
    {
      id: 10,
      category: 'partnerships',
      image: "/api/placeholder/800/500",
      date: "January 25, 2025",
      timestamp: new Date("2025-01-25").getTime(),
      title: "Strategic Technology Alliance: Enhancing Electric Vehicle Capabilities",
      excerpt: "A landmark partnership set to accelerate development of next-generation EV technology.",
      link: "#",
      readTime: "5 min read"
    },
    {
      id: 11,
      category: 'show',
      image: "/api/placeholder/800/500",
      date: "January 20, 2025",
      timestamp: new Date("2025-01-20").getTime(),
      title: "Design Excellence Award: Recognition for Outstanding Innovation",
      excerpt: "Our design team receives prestigious industry award for breakthrough vehicle aesthetics.",
      link: "#",
      readTime: "3 min read"
    },
    {
      id: 12,
      category: 'events',
      image: "/api/placeholder/800/500",
      date: "January 15, 2025",
      timestamp: new Date("2025-01-15").getTime(),
      title: "Community Engagement: Supporting Local Initiatives and Education",
      excerpt: "How our corporate social responsibility programs are making a difference in communities.",
      link: "#",
      readTime: "6 min read"
    }
  ];

  // Calculate category counts
  useEffect(() => {
    tabs.forEach(tab => {
      tab.count = allNewsItems.filter(item => item.category === tab.id).length;
    });
  }, []);

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Filter and sort news items
  const getFilteredItems = () => {
    // First filter by category and search term
    let filtered = activeTab === 'all' 
      ? allNewsItems 
      : allNewsItems.filter(item => item.category === activeTab);
      
    // Apply search filter if there is a search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchLower) || 
        item.excerpt.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort the filtered items
    if (sortBy === 'newest') {
      filtered.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    return filtered;
  };

  const filteredNewsItems = getFilteredItems();
    
  // Load more handler
  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + 4, filteredNewsItems.length));
  };
  
  // Reset visible items when changing tabs
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setVisibleItems(8);
    // Scroll to top of news section
    window.scrollTo({ top: document.getElementById('news-grid').offsetTop - 100, behavior: 'smooth' });
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSortBy('newest');
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-100 to-transparent"></div>
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-primary-50 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-amber-50 opacity-30 blur-3xl"></div>
      
      {/* Content container */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with title */}
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Latest News</h1>
          <div className="w-20 h-1 bg-primary-600 mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest happenings, product launches, and innovations from Chery Bangladesh
          </p>
        </div>
        
        {/* Filters Section */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">News & Updates</h2>
            
            {/* Mobile Filter Toggle */}
            <button 
              className="md:hidden px-4 py-2 bg-gray-100 text-gray-700 rounded flex items-center justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} className="mr-2" />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {/* Search Bar - Always visible */}
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          
                      {/* Filter options - Toggleable on mobile */}
          <div className={`${isFilterOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center justify-between gap-4`}>
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 rounded-full transition-colors duration-300 flex items-center ${
                    activeTab === tab.id 
                      ? 'bg-primary-100 text-primary-700 font-medium border border-primary-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 text-xs rounded-full px-2 py-0.5 ${
                    activeTab === tab.id ? 'bg-primary-200 text-primary-800' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Sort options */}
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-2">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-200 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
          
          {/* Filter status/results */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              {filteredNewsItems.length === 0 ? (
                <span>No results found</span>
              ) : (
                <span>Showing <b>{Math.min(visibleItems, filteredNewsItems.length)}</b> of <b>{filteredNewsItems.length}</b> articles</span>
              )}
            </div>
            
            {(searchTerm || sortBy !== 'newest') && (
              <button 
                onClick={handleResetFilters}
                className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
              >
                <X size={14} className="mr-1" />
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* News grid */}
        <div id="news-grid">
          {filteredNewsItems.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={activeTab + sortBy + searchTerm} // Re-render animation when filters change
            >
              {filteredNewsItems.slice(0, visibleItems).map((item) => (
                <motion.article 
                  key={item.id} 
                  className="group flex flex-col rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                  variants={itemVariants}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-semibold py-1 px-3 z-10 uppercase rounded-br-lg">
                      {tabs.find(tab => tab.id === item.category)?.label}
                    </div>
                    <img 
                      src={item.image} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar size={14} className="mr-1" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={14} className="mr-1" />
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                    
                    <div className="mt-auto">
                      <a
                        href={item.link}
                        className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 transition-colors duration-300 group"
                        aria-label={`Read more about ${item.title}`}
                      >
                        Read Full Article
                        <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-100 shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No news articles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
              <button 
                onClick={handleResetFilters}
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Load More button - only show if there are more items to load */}
        {visibleItems < filteredNewsItems.length && (
          <div className="mt-12 text-center">
            <motion.button
              onClick={handleLoadMore}
              className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white font-medium rounded hover:bg-primary-700 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Load More News
              <ArrowRight size={16} className="ml-2" />
            </motion.button>
          </div>
        )}
        
        {/* No more results message */}
        {visibleItems >= filteredNewsItems.length && filteredNewsItems.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center bg-gray-100 rounded-full w-12 h-12 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-gray-500">You've reached the end of the news for this category.</p>
          </div>
        )}
        
        {/* Newsletter subscription */}
        <div className="mt-20 bg-gradient-to-r from-primary-50 to-amber-50 rounded-xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="lg:max-w-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
              <p className="text-gray-700 mb-4">
                Subscribe to our newsletter to receive the latest news, updates, and exclusive content directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-grow p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
            <div className="hidden lg:block">
              <img
                src="/api/placeholder/300/200"
                alt=""
                className="h-40 w-auto object-cover rounded-md"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Contact section at the bottom */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Have Questions?</h2>
            <p className="text-gray-600">Our team is ready to assist you with any inquiries.</p>
          </div>
          <a
            href="#contact"
            className="mt-6 md:mt-0 inline-flex items-center justify-center px-8 py-3 bg-amber-500 text-white font-medium rounded hover:bg-amber-600 transition-colors duration-300"
          >
            CONTACT US
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsComponent;