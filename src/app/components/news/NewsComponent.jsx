"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    Calendar,
    ChevronRight,
    Clock,
    Filter,
    Search,
    X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { allNewsItems } from "../../news/data"; // Adjust the import path as necessary

const NewsComponent = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [visibleItems, setVisibleItems] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const [tabs, setTabs] = useState([
    { id: "all", label: "All", count: 0 },
    { id: "GLOBAL PARTNERSHIP", label: "Partnerships", count: 0 },
    { id: "CORPORATE RESPONSIBILITY", label: "Information", count: 0 },
    { id: "ESG REPORT", label: "Brand", count: 0 },
    { id: "INFRASTRUCTURE", label: "Product", count: 0 },
    { id: "ECOLOGY", label: "Ecology", count: 0 },
    { id: "RENEWABLE ENERGY", label: "Renewable Energy", count: 0 },
    { id: "COMMUNITY ENGAGEMENT", label: "Community", count: 0 },
  ]);

  // Run this effect only once on component mount
  useEffect(() => {
    const allCount = allNewsItems.length;
    const categoryCountMap = {};
    allNewsItems.forEach((item) => {
      const category = item.category;
      categoryCountMap[category] = (categoryCountMap[category] || 0) + 1;
    });
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        count: tab.id === "all" ? allCount : categoryCountMap[tab.id] || 0,
      }))
    );
  }, []); // Empty dependency array means this runs once on mount

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const getFilteredItems = () => {
    let filtered =
      activeTab === "all"
        ? allNewsItems
        : allNewsItems.filter((item) => item.category === activeTab);
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.excerpt.toLowerCase().includes(searchLower)
      );
    }
    if (sortBy === "newest") {
      filtered.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    return filtered;
  };

  const filteredNewsItems = getFilteredItems();

  const handleLoadMore = () =>
    setVisibleItems((prev) => Math.min(prev + 4, filteredNewsItems.length));

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setVisibleItems(8);
    const newsGrid = document.getElementById("news-grid");
    if (newsGrid) {
      window.scrollTo({ top: newsGrid.offsetTop - 100, behavior: "smooth" });
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSortBy("newest");
    setActiveTab("all");
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
            Stay updated with the latest happenings, product launches, and
            innovations from Chery Bangladesh
          </p>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 p-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              News & Updates
            </h2>
            <button
              className="md:hidden px-4 py-2 bg-gray-100 text-gray-700 flex items-center justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} className="mr-2" />
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </button>

            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div
            className={`${
              isFilterOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row md:items-center justify-between gap-4`}
          >
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 transition-colors duration-300 flex items-center ${
                    activeTab === tab.id
                      ? "bg-primary-100 text-primary-700 font-medium border border-primary-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-2 text-xs px-2 py-0.5 ${
                      activeTab === tab.id
                        ? "bg-primary-200 text-primary-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
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
                <span>
                  Showing{" "}
                  <b>{Math.min(visibleItems, filteredNewsItems.length)}</b> of{" "}
                  <b>{filteredNewsItems.length}</b> articles
                </span>
              )}
            </div>

            {(searchTerm || sortBy !== "newest" || activeTab !== "all") && (
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
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="mt-auto">
                      <Link
                        href={`/news/${item.slug}`}
                        className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 transition-colors duration-300 group"
                        aria-label={`Read more about ${item.title}`}
                      >
                        Read Full Article
                        <ChevronRight
                          size={16}
                          className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </Link>
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
        {/* Newsletter subscription */}
        <div className="mt-20 bg-gray-100 p-8 lg:p-12 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="lg:max-w-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Stay Updated
              </h2>
              <p className="text-gray-700 mb-4">
                Subscribe to our newsletter to receive the latest news, updates,
                and exclusive content directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow p-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="bg-primary-600 text-white py-3 px-6 hover:bg-primary-700 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </p>
            </div>
            <div className="hidden lg:block">
              <img
                src="/api/placeholder/300/200"
                alt=""
                className="h-40 w-auto object-cover"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Contact section at the bottom */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center bg-white border border-gray-200 p-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Have Questions?
            </h2>
            <p className="text-gray-600">
              Our team is ready to assist you with any inquiries.
            </p>
          </div>
          <a
            href="/contact"
            className="mt-6 md:mt-0 inline-flex items-center justify-center px-8 py-3 bg-primary-700 text-white font-medium hover:bg-primary-800 transition-colors duration-300"
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
