'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Filter,
  Search,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

const NewsComponent = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [visibleItems, setVisibleItems] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const allNewsItems = [
    {
      id: 1,
      isFeature: true,
      image: "/images/environment/news/signing-ceremony.jpg",
      title: "Chery and IUCN Launch Global Partnership, Ushering in a New Chapter of Green Development Worldwide",
      date: "October 20, 2024",
      timestamp: new Date("2024-10-20").getTime(),
      category: "GLOBAL PARTNERSHIP",
      excerpt: 'On October 20th, the 2024 Chery International User Summit, themed "FOR US·FOR FUTURE," was grandly held in Wuhu, Anhui. The event attracted Chery users, media friends, and partners from around the world to witness another important milestone in Chery\'s globalization journey',
      tags: ["Partnership", "IUCN", "Sustainability"],
      link: "/news/partnership-with-iucn",
      readTime: "5 min read"
    },
    {
      id: 2,
      image: "/images/environment/news/animals.jpg",
      title: "Together, we are driving impactful change for communities, animals, and the planet.",
      date: "Sep 30,2024",
      timestamp: new Date("2024-09-30").getTime(),
      category: "CORPORATE RESPONSIBILITY",
      excerpt: `We are thrilled to welcome Megan Harvey, CEO of the Society for Animals in Distress at the Chery User Global Summit! Megan's dedication to animal welfare and her leadership in advocating for sustainable practices align perfectly with Chery's commitment to corporate social responsibility and environmental stewardship. Together, we are driving impactful change for communities, animals, and the planet.`,
      tags: [
        "CheryGlobalUserSummit2024",
        "Sustainability",
        "CorporateResponsibility",
        "AnimalWelfare",
        "ForUsForFuture",
      ],
      link: "/news/environmental-innovation",
      readTime: "7 min read"
    },
    {
      id: 3,
      image: "/images/environment/news/esg-report.jpg",
      title: "2023 Chery ESG Report Highlights Record Environmental Achievements",
      date: "July 30, 2024",
      timestamp: new Date("2024-07-30").getTime(),
      category: "ESG REPORT",
      excerpt: "In 2023, Chery's annual charitable contributions reached 46.849 million yuan. Through a series of public welfare projects, Chery actively gave back to society, achieving significant results especially in the areas of child development, environmental protection, and disaster relief.",
      tags: ["ESG", "Philanthropy", "Report"],
      link: "/news/esg-report-2023",
      readTime: "4 min read"
    },
    {
      id: 4,
      image: "/images/environment/news/dual-carbon.jpg",
      title: "Electric Vehicle Charging Network Expansion Reaches 1,000 Stations",
      date: "June 15, 2024",
      timestamp: new Date("2024-06-15").getTime(),
      category: "INFRASTRUCTURE",
      excerpt: "Expanding our EV charging infrastructure across 12 countries to support sustainable transportation and reduce range anxiety for electric vehicle owners.",
      tags: ["Electric Vehicles", "Infrastructure"],
      link: "/news/ev-charging-expansion",
      readTime: "6 min read"
    },
    {
      id: 5,
      image: "/images/environment/news/chery-eco.jpg",
      title: "Green Supply Chain Initiative Reduces Packaging Waste by 60%",
      date: "Jan 07,2024",
      timestamp: new Date("2024-01-07").getTime(),
      category: "ECOLOGY",
      excerpt: "The sight of different generations joining hands for sustainability was nothing short of awe-inspiring. Grandparents, parents, and children all geared up with smiles, united by a common goal. Our heartfelt gratitude extends to every participant, irrespective of age or background, for being the driving force behind this remarkable event. Your diverse presence turned the Eco Run into a celebration of unity.",
      tags: ["Sustainability", "Packaging", "Waste Reduction"],
      link: "/news/packaging-waste-reduction",
      readTime: "5 min read"
    },
    {
      id: 6,
      image: "/images/environment/news/recycle.jpg",
      title: "Solar Panel Installation Completed at Three Manufacturing Plants",
      date: "April 12, 2024",
      timestamp: new Date("2024-04-12").getTime(),
      category: "RENEWABLE ENERGY",
      excerpt: "The completion of our solar energy project marks a significant milestone in our journey toward carbon neutrality by 2030.",
      tags: ["Renewable Energy", "Manufacturing"],
      link: "/news/solar-panel-installation",
      readTime: "6 min read"
    },
    {
      id: 7,
      image: "/images/environment/news/plantation.jpg",
      title: "Tree Planting Campaign Reaches 1 Million Trees Planted",
      date: "March 15, 2024",
      timestamp: new Date("2024-03-15").getTime(),
      category: "COMMUNITY ENGAGEMENT",
      excerpt: "Our tree planting initiative has successfully planted over 1 million trees in partnership with local communities and NGOs.",
      tags: ["Community", "Reforestation"],
      link: "/news/tree-planting-campaign",
      readTime: "5 min read"
    },
  ];

  const [tabs, setTabs] = useState([
    { id: 'all', label: 'All', count: 0 },
    { id: 'GLOBAL PARTNERSHIP', label: 'Partnerships', count: 0 },
    { id: 'CORPORATE RESPONSIBILITY', label: 'Information', count: 0 },
    { id: 'ESG REPORT', label: 'Brand', count: 0 },
    { id: 'INFRASTRUCTURE', label: 'Product', count: 0 },
    { id: 'ECOLOGY', label: 'Ecology', count: 0 },
    { id: 'RENEWABLE ENERGY', label: 'Renewable Energy', count: 0 },
    { id: 'COMMUNITY ENGAGEMENT', label: 'Community', count: 0 }
  ]);

  // Fix: Run this effect only once on component mount by removing the dependency array item
  useEffect(() => {
    const allCount = allNewsItems.length;
    const categoryCountMap = {};
    allNewsItems.forEach(item => {
      const category = item.category;
      categoryCountMap[category] = (categoryCountMap[category] || 0) + 1;
    });
    setTabs(prevTabs =>
      prevTabs.map(tab => ({
        ...tab,
        count: tab.id === 'all' ? allCount : (categoryCountMap[tab.id] || 0)
      }))
    );
  }, []); // Empty dependency array means this runs once on mount

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const getFilteredItems = () => {
    let filtered = activeTab === 'all' ? allNewsItems : allNewsItems.filter(item => item.category === activeTab);
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.excerpt.toLowerCase().includes(searchLower)
      );
    }
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

  const handleLoadMore = () => setVisibleItems(prev => Math.min(prev + 4, filteredNewsItems.length));

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setVisibleItems(8);
    const newsGrid = document.getElementById('news-grid');
    if (newsGrid) {
      window.scrollTo({ top: newsGrid.offsetTop - 100, behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSortBy('newest');
    setActiveTab('all');
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-100 to-transparent"></div>
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-primary-50 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-amber-50 opacity-30 blur-3xl"></div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Latest News</h1>
          <div className="w-20 h-1 bg-primary-600 mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest happenings, product launches, and innovations from Chery Bangladesh
          </p>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 p-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">News & Updates</h2>
            <button
              className="md:hidden px-4 py-2 bg-gray-100 text-gray-700 flex items-center justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} className="mr-2" />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>

            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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

          <div className={`${isFilterOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center justify-between gap-4`}>
            <div className="flex flex-wrap gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 transition-colors duration-300 flex items-center ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700 font-medium border border-primary-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 text-xs px-2 py-0.5 ${
                    activeTab === tab.id ? 'bg-primary-200 text-primary-800' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-2">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              {filteredNewsItems.length === 0 ? (
                <span>No results found</span>
              ) : (
                <span>Showing <b>{Math.min(visibleItems, filteredNewsItems.length)}</b> of <b>{filteredNewsItems.length}</b> articles</span>
              )}
            </div>

            {(searchTerm || sortBy !== 'newest' || activeTab !== 'all') && (
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

        <div id="news-grid">
          {filteredNewsItems.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={activeTab + sortBy + searchTerm}
            >
              {filteredNewsItems.slice(0, visibleItems).map((item) => (
                <motion.article
                  key={item.id}
                  className="group flex flex-col overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
                  variants={itemVariants}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-semibold py-1 px-3 z-10 uppercase">
                      {item.category}
                    </div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
            <div className="text-center py-16 bg-white border border-gray-200 shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500">No news items match your filters.</p>
            </div>
          )}
        </div>

        {visibleItems < filteredNewsItems.length && (
          <div className="mt-10 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-300"
            >
              Load More
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsComponent;