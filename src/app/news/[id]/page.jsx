'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  Facebook,
  Linkedin,
  Printer,
  Tag,
  Twitter
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { allNewsItems } from '../data';

const SingleNewsPage = () => {
  const router = useRouter();
  const [newsItem, setNewsItem] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Extract slug from the URL
    const path = window.location.pathname;
    const slugFromPath = path.split('/').pop();
    
    console.log("Path:", path);
    console.log("Extracted slug:", slugFromPath);
    console.log("Available news items:", allNewsItems.map(item => item.slug));
    
    if (slugFromPath) {
      // Find the article by slug
      const article = allNewsItems.find(item => item.slug === slugFromPath);
      
      if (article) {
        console.log("Article found:", article);
        setNewsItem(article);
        
        // Find related articles
        const related = allNewsItems
          .filter(item => 
            item.id !== article.id && 
            (item.category === article.category || 
             item.tags.some(tag => article.tags.includes(tag)))
          )
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 3);
          
        setRelatedNews(related);
      } else {
        console.log("Article not found");
        router.push('/news');
      }
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl text-gray-800 mb-4">Article not found</h2>
        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/news" 
          className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-300"
        >
          Return to News
        </Link>
      </div>
    );
  }

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Fix for image path - use original image if -full version doesn't exist
  const getImagePath = (originalPath) => {
    // Remove the file extension
    const basePath = originalPath.substring(0, originalPath.lastIndexOf('.'));
    const extension = originalPath.substring(originalPath.lastIndexOf('.'));
    return `${basePath}-full${extension}`;
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-100 to-transparent"></div>
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-primary-50 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-amber-50 opacity-30 blur-3xl"></div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/news" className="text-sm text-gray-600 hover:text-primary-600">
                    News
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-sm text-gray-500 truncate max-w-[200px]">{newsItem.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main content column */}
          <motion.div className="lg:col-span-8" variants={itemVariants}>
            {/* Article category */}
            <div className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-semibold py-1 px-3 uppercase mb-4">
              {newsItem.category}
            </div>

            {/* Article title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {newsItem.title}
            </h1>

            {/* Article metadata */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{newsItem.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{newsItem.readTime}</span>
              </div>
              <div className="flex items-center">
                <Eye size={14} className="mr-1" />
                <span>{Math.floor(Math.random() * 1000) + 100} views</span>
              </div>
            </div>

            {/* Featured image */}
            <div className="relative w-full h-[400px] mb-8 overflow-hidden rounded-lg">
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log("Image failed to load, falling back to original");
                  e.target.src = newsItem.image;
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24 pointer-events-none"></div>
            </div>

            {/* Article content */}
            <div 
              className="prose prose-lg text-gray-800 max-w-none mb-8" 
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Tag size={16} className="text-gray-400" />
              {newsItem.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 border-t border-b border-gray-200 py-6 mb-8">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                <Bookmark size={16} />
                <span>Save</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                <Printer size={16} />
                <span>Print</span>
              </button>
              
              {/* Share buttons */}
              <div className="ml-auto flex items-center">
                <span className="text-gray-700 mr-3">Share:</span>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                    <Facebook size={16} />
                  </button>
                  <button className="p-2 text-sky-500 bg-sky-50 rounded-full hover:bg-sky-100 transition-colors">
                    <Twitter size={16} />
                  </button>
                  <button className="p-2 text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                    <Linkedin size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar column */}
          <motion.div className="lg:col-span-4" variants={itemVariants}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-5 bg-primary-600 mr-2 rounded-full"></span>
                Related Articles
              </h3>
              
              <div className="space-y-6">
                {relatedNews.length > 0 ? (
                  relatedNews.map((item) => (
                    <div key={item.id} className="group">
                      <Link href={`/news/${item.slug}`} className="flex gap-4">
                        <div className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                          <div className="mt-1 text-xs text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">Read article</div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No related articles found</p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link 
                  href="/news" 
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 transition-colors duration-300 group"
                >
                  View all articles
                  <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            
            {/* Newsletter signup */}
            <motion.div 
              className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-lg p-6 mt-6"
              variants={itemVariants}
            >
              <h3 className="text-lg font-bold mb-3">Stay Updated</h3>
              <p className="text-sm text-white/90 mb-4">Subscribe to our newsletter to get the latest news and updates directly to your inbox.</p>
              
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button 
                  type="submit"
                  className="w-full py-3 bg-white text-primary-700 font-medium rounded hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Back and next navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link 
              href="/news" 
              className="mb-4 sm:mb-0 inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to all news
            </Link>
            
            <Link 
              href="/news" 
              className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-300"
            >
              Explore More News
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleNewsPage;