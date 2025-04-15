'use client'

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useState } from 'react';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Mohammad Rashid",
      rating: 5,
      comment: "Outstanding service from start to finish. The team was very professional and completed the work ahead of schedule. Very impressed with their attention to detail.",
      vehicle: "Tiggo 7 Pro"
    },
    {
      id: 2,
      name: "Aminul Islam Chowdhury",
      rating: 5,
      comment: "The service center is clean, modern, and well-organized. My Tiggo 8 Pro was serviced promptly and the staff was very knowledgeable.",
      vehicle: "Tiggo 8 Pro"
    },
    {
      id: 3,
      name: "Fahmida Rahman",
      rating: 4,
      comment: "Very satisfied with the roadside assistance. When my car wouldn't start, the emergency team arrived within 30 minutes and solved the problem on-site.",
      vehicle: "Arrizo 6"
    },
    {
      id: 4,
      name: "Abdul Karim Sheikh",
      rating: 5,
      comment: "Excellent maintenance service. They explained everything they were doing and provided helpful tips to maintain my vehicle. The facility is state-of-the-art and the staff is very knowledgeable.",
      vehicle: "Tiggo 4 Pro"
    }
  ];

  const [activeReview, setActiveReview] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to handle review change with animation
  const changeReview = (index) => {
    if (index === activeReview || isAnimating) return;
    
    setIsAnimating(true);
    setActiveReview(index);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    const nextIndex = (activeReview + 1) % reviews.length;
    changeReview(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeReview - 1 + reviews.length) % reviews.length;
    changeReview(prevIndex);
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i}
          size={20}
          fill={i < rating ? "currentColor" : "none"}
          className={`${i < rating ? 'text-primary-600' : 'text-gray-700'}`}
        />
      );
    }
    return stars;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/texture-dots.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Customer <span className="text-primary-600">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover what our valued customers have to say about their Chery service experience
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {/* Current Active Review */}
          <div className="relative">
            <motion.div 
              key={activeReview}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-[#0f0f0f] border border-gray-800 p-8 shadow-2xl mb-8 relative"
            >
              {/* Quotation Mark */}
              <div className="absolute -top-6 left-8 bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <Quote size={24} className="text-white" />
              </div>
              
              {/* Vehicle Badge */}
              <div className="absolute -top-4 right-8 bg-black border border-gray-800 px-4 py-2 shadow-lg">
                <span className="text-primary-600 font-medium text-sm">{reviews[activeReview].vehicle}</span>
              </div>
              
              <blockquote className="text-gray-300 italic leading-relaxed mb-6 mt-4 pt-2">
                "{reviews[activeReview].comment}"
              </blockquote>
              
              <div className="flex items-center justify-between border-t border-gray-800 pt-6">
                <div>
                  <h3 className="font-bold text-white">{reviews[activeReview].name}</h3>
                  <div className="flex mt-1">
                    {renderStars(reviews[activeReview].rating)}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={handlePrev} 
                    className="w-10 h-10 border border-gray-800 flex items-center justify-center hover:bg-black hover:bg-opacity-50 transition-colors duration-300"
                    disabled={isAnimating}
                  >
                    <ChevronLeft size={20} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="w-10 h-10 border border-gray-800 flex items-center justify-center hover:bg-black hover:bg-opacity-50 transition-colors duration-300"
                    disabled={isAnimating}
                  >
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Review Progress Indicator */}
            <div className="flex justify-between items-center px-2 mb-8">
              <div className="flex-1 h-1 bg-gray-800">
                {reviews.map((_, index) => (
                  <div 
                    key={index}
                    style={{ 
                      width: `${100/reviews.length}%`, 
                      transform: `translateX(${activeReview * 100}%)` 
                    }}
                    className={`h-1 bg-primary-600 transition-transform duration-500 ${index === activeReview ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm ml-4">{activeReview + 1}/{reviews.length}</span>
            </div>
          </div>
          
          {/* Leave Review CTA */}
          <div className="text-center mt-12 bg-black bg-opacity-50 border border-gray-800 p-8">
            <h3 className="text-white font-bold text-lg mb-2">Share Your Experience</h3>
            <p className="text-gray-400 mb-6">We value your feedback about our service team</p>
            <button className="inline-flex items-center border-2 border-primary-600 text-primary-600 px-8 py-3 font-medium hover:bg-primary-600 hover:text-white transition-colors duration-300 group">
              LEAVE A REVIEW
              <Star size={16} className="ml-2 transform group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;