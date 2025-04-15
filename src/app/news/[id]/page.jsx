'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  Facebook,
  Linkedin,
  MessageCircle,
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
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Extract slug from the URL
    const path = window.location.pathname;
    const slugFromPath = path.split('/').pop();
    
    console.log("Path:", path);
    console.log("Extracted slug:", slugFromPath);
    
    if (slugFromPath) {
      // Find the article by slug
      const article = allNewsItems.find(item => item.slug === slugFromPath);
      
      if (article) {
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
        router.push('/news');
      }
    }
    
    setIsLoading(false);
  }, [router]);

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-center max-w-md px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article not found</h2>
          <p className="text-gray-600 mb-8">The article you're looking for may have been moved or deleted.</p>
          <Link 
            href="/news" 
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded hover:bg-primary-700 transition-all"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to News
          </Link>
        </div>
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

  // Calculate estimated read time based on content length
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const textOnly = content.replace(/<[^>]*>/g, '');
    const wordCount = textOnly.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  return (
    <section className="relative bg-white">
      {/* Hero section with featured image */}
      <div className="relative h-[50vh] min-h-[400px] max-h-[600px] w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gray-900/40 z-10"></div>
        <motion.div 
          className={`absolute inset-0 ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 5 }}
        >
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.log("Image failed to load, using fallback");
              e.target.src = "/images/environment/news/default-hero.jpg";
            }}
          />
        </motion.div>
        
        {/* Hero content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-block bg-primary-600 text-white text-xs font-semibold py-1 px-3 uppercase mb-4">
              {newsItem.category}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {newsItem.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{newsItem.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{calculateReadTime(newsItem.content)}</span>
              </div>
              <div className="flex items-center">
                <Eye size={14} className="mr-1" />
                <span>{Math.floor(Math.random() * 500) + 300} views</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/news" className="text-sm text-gray-500 hover:text-primary-600">
                  News
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm text-gray-700 truncate max-w-[200px]">{newsItem.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main content column */}
          <motion.div className="lg:col-span-8" variants={itemVariants}>
            {/* Article excerpt as intro */}
            <div className="mb-8 border-l-4 border-primary-600 pl-6 pr-2 py-2 bg-gray-50 italic text-gray-700">
              {newsItem.excerpt}
            </div>

            {/* Article content */}
            <article 
              className="prose prose-lg text-gray-500 max-w-none mb-8 prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary-600" 
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-8 mt-12">
              <Tag size={16} className="text-gray-500" />
              {newsItem.tags.map((tag, index) => (
                <Link
                  href={`/news?tag=${tag}`}
                  key={index} 
                  className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Share section */}
            <div className="border-t border-gray-200 pt-8 mb-12">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this article</h3>
              <div className="flex gap-3">
                <button className="p-3 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                  <Facebook size={18} />
                </button>
                <button className="p-3 text-sky-500 bg-sky-50 rounded-full hover:bg-sky-100 transition-colors">
                  <Twitter size={18} />
                </button>
                <button className="p-3 text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                  <Linkedin size={18} />
                </button>
                <button className="p-3 text-green-600 bg-green-50 rounded-full hover:bg-green-100 transition-colors">
                  <MessageCircle size={18} />
                </button>
              </div>
            </div>

            {/* Author info if available */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden mr-4">
                  <img 
                    src="/images/avatar-placeholder.jpg" 
                    alt="Author" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23e5e7eb'/%3E%3Cpath d='M20 20C22.7614 20 25 17.7614 25 15C25 12.2386 22.7614 10 20 10C17.2386 10 15 12.2386 15 15C15 17.7614 17.2386 20 20 20ZM20 22C14.4775 22 10 26.4775 10 32H30C30 26.4775 25.5225 22 20 22Z' fill='%239ca3af'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Chery Editorial Team</h4>
                  <p className="text-gray-600 text-sm">The official news team at Chery Automobiles, bringing you the latest updates on products, sustainability initiatives, and corporate news.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar column */}
          <motion.div className="lg:col-span-4" variants={itemVariants}>
            {/* Related Articles */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">Related Articles</h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {relatedNews.length > 0 ? (
                  relatedNews.map((item) => (
                    <div key={item.id} className="group p-6 hover:bg-gray-50 transition-colors">
                      <Link href={`/news/${item.slug}`} className="block">
                        <div className="mb-3 aspect-video w-full overflow-hidden rounded-lg">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-primary-600 font-medium">{item.category}</span>
                          <h4 className="text-base font-semibold text-gray-800 mt-1 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                            {item.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar size={12} className="mr-1" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500 text-sm">No related articles found</p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 px-6 py-4">
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
            <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-gray-300 text-sm mb-4">Get the latest news, offers and updates directly to your inbox.</p>
                
                <form className="space-y-3">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full py-3 bg-primary-600 text-white font-medium rounded hover:bg-primary-700 transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
                
                <p className="text-xs text-gray-400 mt-4">By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Navigation section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link 
              href="/news" 
              className="mb-4 md:mb-0 flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to News
            </Link>
            
            <div className="flex space-x-4">
              <Link 
                href={relatedNews.length > 0 ? `/news/${relatedNews[0].slug}` : "/news"}
                className="px-6 py-3 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
              >
                Read Related Article
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleNewsPage;