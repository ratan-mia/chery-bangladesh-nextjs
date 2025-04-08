import React, { useEffect, useRef, useState } from 'react';

const SustainabilityNewsGrid = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const newsItems = [
    {
      id: 1,
      isFeature: true,
      image: "https://placehold.co/1200x800",
      title: "Chery Automobile Signs $3.5 Million Partnership with IUCN",
      date: "October 15, 2024",
      category: "GLOBAL PARTNERSHIP",
      excerpt: "Strengthening our commitment to biodiversity conservation and sustainable development worldwide through a landmark partnership with the International Union for Conservation of Nature.",
      tags: ["Sustainability", "Conservation", "Partnership"]
    },
    {
      id: 2,
      image: "https://placehold.co/600x400",
      title: "Driving Impactful Environmental Change Through Innovation",
      date: "September 30, 2024",
      category: "INNOVATION",
      excerpt: "Our new manufacturing process reduces carbon emissions by 35% while maintaining production efficiency.",
      tags: ["Innovation", "Manufacturing", "Carbon Reduction"]
    },
    {
      id: 3,
      image: "https://placehold.co/600x500",
      title: "2023 Chery ESG Report Highlights Record Environmental Achievements",
      date: "July 30, 2024",
      category: "ESG REPORT",
      excerpt: "A Continued Commitment to Global Philanthropy: Reviewing our environmental, social, and governance achievements from the past year.",
      tags: ["ESG", "Philanthropy", "Report"]
    },
    {
      id: 4,
      image: "https://placehold.co/800x600",
      title: "Electric Vehicle Charging Network Expansion Reaches 1,000 Stations",
      date: "June 15, 2024",
      category: "INFRASTRUCTURE",
      excerpt: "Expanding our EV charging infrastructure across 12 countries to support sustainable transportation and reduce range anxiety for electric vehicle owners.",
      tags: ["Electric Vehicles", "Infrastructure"]
    },
    {
      id: 5,
      image: "https://placehold.co/600x350",
      title: "Green Supply Chain Initiative Reduces Packaging Waste by 60%",
      date: "May 22, 2024",
      category: "SUPPLY CHAIN",
      excerpt: "Our commitment to sustainable packaging has yielded impressive results in our ongoing effort to minimize environmental impact.",
      tags: ["Supply Chain", "Waste Reduction"]
    },
    {
      id: 6,
      image: "https://placehold.co/600x450",
      title: "Solar Panel Installation Completed at Three Manufacturing Plants",
      date: "April 12, 2024",
      category: "RENEWABLE ENERGY",
      excerpt: "The completion of our solar energy project marks a significant milestone in our journey toward carbon neutrality by 2030.",
      tags: ["Renewable Energy", "Manufacturing"]
    }
  ];

  // Determine layout classes based on item properties
  const getItemClasses = (item, index) => {
    let baseClasses = "transform transition-all duration-700";
    
    // Feature article spans 2 columns on larger screens
    if (item.isFeature) {
      return `${baseClasses} col-span-1 md:col-span-2 lg:col-span-2`;
    }
    
    // Alternate column spans for visual interest in masonry layout
    if (index % 3 === 0) {
      return `${baseClasses} col-span-1 md:col-span-1 lg:col-span-1`;
    }
    
    return `${baseClasses} col-span-1`;
  };

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-gray-900 text-white">
      {/* Optional pattern overlay */}
      <div className="absolute inset-0 z-10 mix-blend-soft-light opacity-10">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRoMnptMC0xMnYyYzMuODYgMCA3IDMuMTQgNyA3IDAgMy44NTktMy4xNCA3LTcgN2gtMnYySDE4di0yaC0yYy0zLjg2IDAtNy0zLjE0MS03LTcgMC0zLjg2IDMuMTQtNyA3LTdoMnYtMmgyMHptLTExLjA3MSA3LjkyOWMtLjM5MS0uMzkxLTEuMDQ3LS4zOTEtMS40MjkgMGMtLjM5MS4zODItLjM5MSAxLjAzNyAwIDEuNDI5bDIuNSAyLjVjLjM4Mi4zOTEgMS4wMzcuMzkxIDEuNDI5IDBsMi41LTIuNWMuMzkxLS4zOTEuMzkxLTEuMDQ3IDAtMS40MjljLS4zODItLjM5MS0xLjAzNy0uMzkxLTEuNDI5IDBsLTEuNzg1IDEuNzg1TDI0LjkyOSAyOS45M3oiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className={`w-12 h-1 bg-white mx-auto mb-6 transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-4'}`}
          ></div>
          
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight tracking-tight transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-4'}`}
          >
            Sustainability News
          </h2>
          
          <p 
            className={`text-xl max-w-3xl mx-auto text-white/80 transition-all duration-700 delay-100 ${isInView ? 'opacity-100' : 'opacity-0 transform translate-y-4'}`}
          >
            Discover our latest initiatives and achievements in environmental stewardship and sustainable development
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {newsItems.map((item, index) => (
            <div 
              key={item.id}
              className={`${getItemClasses(item, index)} ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="h-full bg-gray-800 group overflow-hidden">
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-primary-600 mix-blend-multiply opacity-30 z-10"></div>
                  <div 
                    className="relative h-full w-full transition-transform duration-700 group-hover:scale-105"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-primary-600 text-white text-xs font-medium px-3 py-1.5 tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 lg:p-8">
                  <div className="space-y-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-white/70 line-clamp-3">
                      {item.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="bg-gray-700 text-white/80 text-xs px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                      <span className="text-white/60 text-sm">{item.date}</span>
                      <a 
                        href="#" 
                        className="inline-flex items-center text-green-400 hover:text-green-300 text-sm font-medium transition-colors duration-300 group/link"
                      >
                        Read more
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* "View All" Button */}
        <div 
          className={`mt-12 text-center transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <a 
            href="#view-all-news" 
            className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white font-medium transition-all duration-300 hover:bg-primary-700 group"
          >
            View All News
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
    </section>
  );
};

// Add the required animations
const styles = `
  @keyframes scroll {
    0% { transform: translateY(0); }
    50% { transform: translateY(12px); }
    100% { transform: translateY(0); }
  }
  
  .animate-scroll {
    animation: scroll 1.5s infinite;
  }
`;

const SustainabilityNewsWithStyles = () => (
  <>
    <style>{styles}</style>
    <SustainabilityNewsGrid />
  </>
);

export default SustainabilityNewsWithStyles;
