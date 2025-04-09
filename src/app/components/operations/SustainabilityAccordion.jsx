// SustainabilityAccordion.jsx
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const SustainabilityAccordion = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);
  
  // Enhanced committee data with icons and additional fields
  const committees = [
    {
      id: 1,
      title: "Strategy and Sustainability Committee",
      description: "The Strategy and Sustainable Development Committee, under the Board of Directors, oversees ESG management and provides recommendations to ensure effective governance.",
      icon: "strategy",
      highlight: "Board-level oversight",
      members: "7 directors"
    },
    {
      id: 2,
      title: "Sustainability Management Committee",
      description: "The Sustainable Development Management Committee, under the Executive Management Committee, guides ESG and \"Dual Carbon\" strategy planning and policy-making.",
      icon: "management",
      highlight: "Cross-functional leadership",
      members: "12 executives"
    },
    {
      id: 3,
      title: "Sustainability Execution Team",
      description: "The Sustainable Development Management Task Force, under the Sustainable Development Management Committee, supervises the implementation of ESG policies and strategic disclosures, driving deep integration with corporate strategy.",
      icon: "execution",
      highlight: "Day-to-day implementation",
      members: "25 team members"
    }
  ];

  // Intersection observer to detect when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Scroll-based activation
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far we've scrolled through the container as a percentage
      const scrollProgress = Math.max(0, Math.min(1, 
        (viewportHeight / 2 - containerTop) / (containerHeight - viewportHeight / 2)
      ));
      
      // Map scroll progress to active section
      const sectionCount = committees.length;
      const sectionIndex = Math.floor(scrollProgress * sectionCount);
      
      if (sectionIndex >= 0 && sectionIndex < sectionCount) {
        setActiveSection(sectionIndex);
      } else if (scrollProgress <= 0) {
        setActiveSection(null); // Before first section
      } else if (scrollProgress >= 1) {
        setActiveSection(sectionCount - 1); // After last section
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [committees.length]);

  // Manual toggle function for accessibility and mobile
  const toggleSection = (index) => {
    setActiveSection(prevActive => prevActive === index ? null : index);
  };

  // Icon component
  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'strategy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        );
      case 'management':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        );
      case 'execution':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="relative flex flex-col md:flex-row min-h-screen"
      ref={containerRef}
    >
      {/* Left side - Enhanced Image Section */}
      <div className="md:w-3/5 h-[50vh] md:h-screen md:sticky top-0 relative overflow-hidden">
        {/* Multiple layered gradients for better visual depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#524336]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#524336]/60 to-transparent z-10" />
        
        <Image
          src="/images/operations/skyscrapers.jpg"
          alt="Modern skyscrapers viewed from below, representing corporate sustainability governance"
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
          className="object-cover"
        />
        
        {/* Overlay content on image */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Sustainability Governance
            </h1>
            <div className="h-1 w-24 bg-[#c4b19c] mb-6" />
            <p className="text-white/90 text-lg mb-8 max-w-sm">
              Our comprehensive governance structure ensures sustainability is integrated at every level of our organization.
            </p>
            <div className="hidden md:block">
              <a 
                href="/sustainability-report" 
                className="inline-flex items-center px-6 py-3  bg-[#c4b19c] text-[#524336] font-medium hover:bg-white transition-colors duration-300"
              >
                View Sustainability Report
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Right side - Enhanced Content Section */}
      <div className="md:w-2/5 bg-[#524336] text-white py-16 px-6 md:px-10">
        <div className="max-w-xl mx-auto">
          <div className="mb-12 md:hidden">
            <a 
              href="/sustainability-report" 
              className="inline-flex items-center px-6 py-3  bg-[#c4b19c] text-[#524336] font-medium hover:bg-white transition-colors duration-300"
            >
              View Sustainability Report
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
          <div className="md:hidden mb-8">
            <h2 className="text-3xl font-bold text-[#c4b19c] mb-4">Governance Structure</h2>
            <p className="text-white/80">
              Our three-tiered approach ensures sustainability is embedded from strategic planning to daily operations.
            </p>
          </div>
          
          <div className="py-8 md:py-16 space-y-12 md:space-y-24">
            {committees.map((committee, index) => (
              <motion.div 
                key={committee.id}
                ref={el => sectionRefs.current[index] = el}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isInView ? 1 : 0, 
                  y: isInView ? 0 : 20 
                }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                <button 
                  className="w-full text-left focus:outline-none focus:ring-2 focus:ring-[#c4b19c] focus:ring-opacity-50  p-2 -m-2"
                  onClick={() => toggleSection(index)}
                  aria-expanded={activeSection === index}
                  aria-controls={`committee-content-${committee.id}`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`mr-4 p-2  transition-colors duration-300 ${
                      activeSection === index ? 'bg-[#c4b19c] text-[#524336]' : 'bg-[#8c735d]/30 text-[#c4b19c]'
                    }`}>
                      {renderIcon(committee.icon)}
                    </div>
                    <h2 className={`text-2xl md:text-3xl font-bold transition-all duration-300 ${
                      activeSection === index ? 'text-white' : 'text-[#c4b19c]'
                    }`}>
                      {committee.title}
                    </h2>
                  </div>
                  
                  <div className="flex items-center ml-14 mb-4">
                    <span className="text-sm text-[#c4b19c]/80">{committee.highlight}</span>
                    <span className="mx-2 text-[#8c735d]">•</span>
                    <span className="text-sm text-[#c4b19c]/80">{committee.members}</span>
                  </div>
                  
                  <div className={`h-1 bg-[#8c735d] mb-4 transition-all duration-500 ease-in-out ml-14 ${
                    activeSection === index ? 'w-full' : 'w-1/4'
                  }`} />
                </button>
                
                <AnimatePresence>
                  {activeSection === index && (
                    <motion.div 
                      id={`committee-content-${committee.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-14 overflow-hidden"
                    >
                      <p className="text-lg text-white/80 mb-6 leading-relaxed">
                        {committee.description}
                      </p>
                      
                      {/* Additional content that appears when expanded */}
                      <div className="p-4  bg-[#8c735d]/20 border border-[#8c735d]/30">
                        <div className="flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#c4b19c] mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <h3 className="font-medium text-[#c4b19c]">Key responsibilities:</h3>
                        </div>
                        <ul className="list-disc list-inside text-white/80 ml-7 space-y-1">
                          {index === 0 ? (
                            <>
                              <li>Review and approve sustainability strategy and policies</li>
                              <li>Monitor implementation progress and performance</li>
                              <li>Ensure alignment with business objectives</li>
                            </>
                          ) : index === 1 ? (
                            <>
                              <li>Develop sustainability policies and procedures</li>
                              <li>Oversee implementation across business units</li>
                              <li>Report on sustainability performance metrics</li>
                            </>
                          ) : (
                            <>
                              <li>Implement sustainability initiatives</li>
                              <li>Collect and analyze sustainability data</li>
                              <li>Engage with stakeholders on sustainability issues</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Vertical line connecting committees */}
                {index < committees.length - 1 && (
                  <div className="absolute left-5 top-16 w-0.5 bg-[#8c735d]/30 h-24 md:h-40" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityAccordion;