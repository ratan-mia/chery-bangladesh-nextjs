'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ChevronRight, Share2, Tag } from 'lucide-react';
import React from 'react';

const SingleNewsPage = ({ post }) => {
  // Use provided post or fallback to sample data
  const article = post || {
    id: 2,
    category: 'product',
    image: "/api/placeholder/1200/600",
    date: "March 14, 2025",
    title: "The Secret to Milestones: TIGGO 4's Path to Global Trust via Safety Excellence",
    author: "Marketing Team",
    content: `
      <p class="mb-6">The automotive industry has witnessed numerous innovations over the decades, but safety remains a cornerstone of consumer trust and brand reputation. For the TIGGO 4, safety excellence wasn't just a marketing slogan—it became the foundation of its global success story.</p>
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900">Setting New Standards</h2>
      <p class="mb-6">When the TIGGO 4 first entered development, the engineering team established ambitious safety targets that would exceed regional requirements across global markets. This forward-thinking approach meant designing for the most stringent standards worldwide, not just meeting minimum requirements.</p>
      
      <p class="mb-6">The comprehensive safety strategy encompassed multiple dimensions:</p>
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Advanced structural design with high-strength steel cage</li>
        <li>Next-generation active safety systems with predictive capabilities</li>
        <li>Intelligent driver assistance features that adapt to driving conditions</li>
        <li>Rigorous testing protocols beyond industry standards</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900">The Path to Recognition</h2>
      <p class="mb-6">The journey toward global recognition began with independent safety assessments. The TIGGO 4 consistently achieved top ratings in crash tests, electronic stability evaluations, and pedestrian protection measures across different regions.</p>
      
      <p class="mb-6">These achievements translated into tangible market outcomes:</p>
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>27% increase in consideration among safety-conscious consumers</li>
        <li>Significantly higher customer satisfaction scores compared to competitors</li>
        <li>Strong word-of-mouth recommendations based on safety features</li>
      </ul>
      
      <div class="bg-gray-100 p-6 rounded-lg mb-6">
        <blockquote class="text-gray-700 italic">
          "The TIGGO 4 represents our commitment to making advanced safety accessible to customers worldwide. We believe safety excellence should never be compromised."
        </blockquote>
        <p class="text-gray-600 mt-3">— Chief Safety Engineer</p>
      </div>
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900">Looking Forward</h2>
      <p class="mb-6">The success of the TIGGO 4's safety-first approach has influenced future product development strategies. Upcoming models will build upon this foundation with even more advanced safety innovations, integrating emerging technologies while maintaining the brand's commitment to reliability and trust.</p>
      
      <p>As global markets continue to evolve, the principles that guided the TIGGO 4's success remain constant: rigorous standards, customer-focused innovation, and an unwavering commitment to safety excellence.</p>
    `,
    tags: ['Safety', 'TIGGO 4', 'Innovation', 'Global Markets'],
    relatedArticles: [
      {
        id: 8,
        title: "Advanced Safety Features: The Technology Behind Our 5-Star Rating",
        date: "February 05, 2025",
        link: "#"
      },
      {
        id: 5,
        title: "Unveiling the Future: Highlights from the International Auto Expo",
        date: "February 22, 2025",
        link: "#"
      },
      {
        id: 9,
        title: "Global Expansion: New Markets and Growth Opportunities in 2025",
        date: "January 30, 2025",
        link: "#"
      }
    ]
  };

  // Generate meta tags for social sharing
  const generateMetaTags = () => {
    return {
      title: article.title,
      description: article.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
      image: article.image,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
  };

  const metaTags = generateMetaTags();

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="bg-gray-50 min-h-screen"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      {/* Header Image */}
      <div className="w-full h-96 relative bg-gray-800 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-gray-900 to-transparent">
          <div className="container mx-auto">
            <span className="inline-block bg-primary-600 text-white text-sm font-medium px-3 py-1 mb-4">
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{article.title}</h1>
            <div className="flex items-center text-white/80 text-sm">
              <Calendar size={16} className="mr-2" />
              <span>{article.date}</span>
              <span className="mx-3">•</span>
              <span>{article.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center text-sm text-gray-500">
          <a href="/" className="hover:text-primary-700">Home</a>
          <ChevronRight size={14} className="mx-2" />
          <a href="/news" className="hover:text-primary-700">News</a>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-700">{article.title.substring(0, 30)}...</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            {/* Back button */}
            <div className="mb-8">
              <a 
                href="/news" 
                className="inline-flex items-center text-primary-700 hover:text-primary-900 font-medium"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to News
              </a>
            </div>

            {/* Article content */}
            <motion.div 
              className="bg-white rounded-lg shadow-sm p-8"
              variants={itemVariants}
            >
              <div 
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag size={18} className="text-gray-500 mr-2" />
                  {article.tags.map((tag, index) => (
                    <a 
                      key={index} 
                      href={`/news/tag/${tag.toLowerCase()}`}
                      className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-6 flex items-center">
                <span className="text-gray-700 mr-4">Share this article:</span>
                <div className="flex space-x-3">
                  <button className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors">
                    <Share2 size={18} />
                  </button>
                  {/* Add more social share buttons as needed */}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="space-y-6">
                {article.relatedArticles.map((related) => (
                  <div key={related.id} className="group">
                    <h4 className="font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
                      <a href={related.link}>{related.title}</a>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{related.date}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Us</h3>
                <p className="text-gray-700 mb-4">Looking for more information about our products or services?</p>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-600 text-white font-medium hover:bg-primary-900 transition-colors duration-300"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Newsletter signup */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h3>
                <p className="text-gray-700">Subscribe to our newsletter for the latest news and updates.</p>
              </div>
              <div className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="border border-gray-300 rounded-md px-4 py-3 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  />
                  <button className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-900 transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleNewsPage;