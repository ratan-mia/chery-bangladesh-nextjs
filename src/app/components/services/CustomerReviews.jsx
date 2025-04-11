'use client'

import { useState } from 'react';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Mohammad Rashid",
      rating: 5,
      comment: "Outstanding service from start to finish. The team was very professional and completed the work ahead of schedule. Very impressed with their attention to detail.",
      vehicle: "Tiggo 7 Pro",
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Aminul Islam Chowdhury",
      rating: 5,
      comment: "The service center is clean, modern, and well-organized. My Tiggo 8 Pro was serviced promptly and the staff was very knowledgeable.",
      vehicle: "Tiggo 8 Pro",
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Fahmida Rahman",
      rating: 4,
      comment: "Very satisfied with the roadside assistance. When my car wouldn't start, the emergency team arrived within 30 minutes and solved the problem on-site.",
      vehicle: "Arrizo 6",
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 4,
      name: "Abdul Karim Sheikh",
      rating: 5,
      comment: "Excellent maintenance service. They explained everything they were doing and provided helpful tips to maintain my vehicle. The facility is state-of-the-art and the staff is very knowledgeable.",
      vehicle: "Tiggo 4 Pro",
      avatar: "/api/placeholder/80/80"
    }
  ];

  const [activeReview, setActiveReview] = useState(0);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg 
          key={i} 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill={i < rating ? "currentColor" : "none"} 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    }
    return stars;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Customer Reviews
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {/* Current Active Review */}
          <div className="bg-white p-8 border border-gray-100 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0 md:mr-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <img 
                    src={reviews[activeReview].avatar} 
                    alt={reviews[activeReview].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{reviews[activeReview].name}</h3>
                  <p className="text-gray-600 text-sm">{reviews[activeReview].vehicle}</p>
                </div>
              </div>
              
              <div className="flex md:ml-auto">
                {renderStars(reviews[activeReview].rating)}
              </div>
            </div>
            
            <blockquote className="text-gray-700 italic mb-4">
              "{reviews[activeReview].comment}"
            </blockquote>
          </div>
          
          {/* Review Navigation */}
          <div className="flex flex-wrap justify-center gap-3">
            {reviews.map((review, index) => (
              <button 
                key={review.id}
                onClick={() => setActiveReview(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === activeReview ? 'bg-primary-800' : 'bg-gray-300'}`}
                aria-label={`View review from ${review.name}`}
              />
            ))}
          </div>
          
          {/* Leave Review CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Share your experience with our service team</p>
            <button className="inline-flex items-center border-2 border-red-800 text-red-800 px-6 py-2 font-medium hover:bg-primary-800 hover:text-white transition-colors">
              LEAVE A REVIEW
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;