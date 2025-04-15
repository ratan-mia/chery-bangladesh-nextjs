// OperationsParallax.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const OperationsParallax = () => {
  const containerRef = useRef(null);
  
  // First section content
  const firstSectionContent = {
    title: "Excellent Operations",
    description: "We actively implement rigorous governance standards and procedures, striving for business growth while driving sustainable transformation. Our goal is to align user value with corporate value, fostering co-creation and mutual integration."
  };
  
  // Second section content - 2023 achievements
  const achievements = [
    "Enhanced governance with 1 General shareholders' Meeting, 6 Extraordinary Meetings, and 37 proposals reviewed.",
    "Promoted board diversity with 9 directors, including 1 female, from accounting, finance, and engineering backgrounds.",
    "Ensured transparency with 100% integrity commitment signed by key employees and suppliers.",
    "Strengthened ethical awareness, ensuring 100% participation in business ethics training for all employees and board members.",
    "Ensured information security with zero major incidents related to privacy and data breaches."
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values for parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const firstSectionOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const secondSectionOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ height: "250vh" }}
    >
      {/* Fixed container for all content */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Background image with parallax effect */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/images/operations/building.jpg')",
            y: backgroundY
          }}
        >
          {/* Dark overlay using SustainabilityAccordion colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#524336]/20 to-[#524336]/10" />
        </motion.div>
        
        {/* Content container */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 py-16">
            {/* Glass panels layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* First section - Main content */}
              <motion.div 
                className="lg:col-span-2 overflow-hidden"
                style={{ opacity: firstSectionOpacity }}
              >
                <div className="backdrop-blur-md bg-[#524336]/70 border border-[#c4b19c]/20 p-8 shadow-2xl ">
                  <div className="flex items-center mb-6">
                    <div className="w-1 h-12 bg-[#c4b19c] mr-4"></div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white">
                      {firstSectionContent.title}
                    </h1>
                  </div>
                  
                  <p className="text-lg text-white/90 leading-relaxed mb-8">
                    {firstSectionContent.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a href="#learn-more" className="px-6 py-3 bg-[#c4b19c] text-[#524336] font-semibold  hover:bg-white transition-colors">
                      Learn More
                    </a>
                    <a href="#contact" className="px-6 py-3 border border-[#c4b19c]/50 text-white font-semibold  hover:bg-[#8c735d]/30 transition-colors">
                      Contact Us
                    </a>
                  </div>
                </div>
              </motion.div>
              
              {/* First section - Stats panel */}
              <motion.div 
                className="hidden lg:block"
                style={{ opacity: firstSectionOpacity }}
              >
                <div className="backdrop-blur-md bg-[#524336]/70 border border-[#c4b19c]/20 p-8 shadow-2xl h-full ">
                  <h2 className="text-2xl font-semibold text-[#c4b19c] mb-8">Key Stats</h2>
                  
                  <div className="space-y-6">
                    <div className="group">
                      <div className="flex justify-between mb-2">
                        <span className="text-white/80">Governance Meetings</span>
                        <span className="text-[#c4b19c] font-semibold">7</span>
                      </div>
                      <div className="w-full h-2 bg-[#8c735d]/30  overflow-hidden">
                        <div className="h-full bg-[#c4b19c] group-hover:bg-white transition-colors duration-500" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <div className="flex justify-between mb-2">
                        <span className="text-white/80">Board Directors</span>
                        <span className="text-[#c4b19c] font-semibold">9</span>
                      </div>
                      <div className="w-full h-2 bg-[#8c735d]/30  overflow-hidden">
                        <div className="h-full bg-[#c4b19c] group-hover:bg-white transition-colors duration-500" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <div className="flex justify-between mb-2">
                        <span className="text-white/80">Ethics Training</span>
                        <span className="text-[#c4b19c] font-semibold">100%</span>
                      </div>
                      <div className="w-full h-2 bg-[#8c735d]/30  overflow-hidden">
                        <div className="h-full bg-[#c4b19c] group-hover:bg-white transition-colors duration-500" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <div className="flex justify-between mb-2">
                        <span className="text-white/80">Security Incidents</span>
                        <span className="text-[#c4b19c] font-semibold">0</span>
                      </div>
                      <div className="w-full h-2 bg-[#8c735d]/30  overflow-hidden">
                        <div className="h-full bg-[#c4b19c] group-hover:bg-white transition-colors duration-500" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Second section - 2023 Achievements */}
              <motion.div 
                className="lg:col-span-3"
                style={{ opacity: secondSectionOpacity }}
              >
                <div className="backdrop-blur-md bg-[#524336]/70 border border-[#c4b19c]/20 p-8 shadow-2xl ">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="w-12 h-12  border-4 border-[#c4b19c] flex items-center justify-center mr-4 text-[#c4b19c]">
                        <span className="font-bold">23</span>
                      </div>
                      <h2 className="text-3xl font-bold text-[#c4b19c]">2023 Achievements</h2>
                    </div>
                    
                    <div className="hidden md:block">
                      <a href="/annual-report" className="flex items-center gap-2 text-[#c4b19c]/80 hover:text-[#c4b19c] transition-colors">
                        <span>Full Report</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex group">
                        <div className="flex-shrink-0 w-10 h-10  bg-[#8c735d]/30 group-hover:bg-[#8c735d]/50 flex items-center justify-center text-[#c4b19c] font-semibold mr-4 transition-colors">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-white/90 group-hover:text-white transition-colors">{achievement}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 md:hidden">
                    <a href="/annual-report" className="flex items-center justify-center gap-2 text-[#c4b19c]/80 hover:text-[#c4b19c] transition-colors">
                      <span>View Full Annual Report</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsParallax;