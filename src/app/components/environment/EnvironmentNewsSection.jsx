import React, { useEffect, useRef, useState } from 'react';

const EnvironmentNewsSection = () => {
  const [activeTab, setActiveTab] = useState('news');
  const tabsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const newsItems = [
    {
      id: 1,
      isFeature: true,
      image: "/images/signing-ceremony.jpg",
      title: "Chery Automobile Signs $3.5 Million Partnership with IUCN",
      date: "October 15, 2024",
      category: "GLOBAL PARTNERSHIP",
      excerpt: "Strengthening our commitment to biodiversity conservation and sustainable development worldwide through a landmark partnership with the International Union for Conservation of Nature.",
      tags: ["Sustainability", "Conservation", "Partnership"],
      logoOne: "/images/chery-logo.svg",
      logoTwo: "/images/iucn-logo.svg",
    },
    {
      id: 2,
      image: "/images/animal-conservation.jpg",
      title: "Together, Driving Impactful Change",
      date: "September 30, 2024",
      category: "COMMUNITY INITIATIVE",
      excerpt: "Together, we are driving impactful change for communities, animals, and the planet through our expanded conservation programs.",
      tags: ["Conservation", "Community"]
    },
    {
      id: 3,
      image: "/images/esg-report.jpg",
      title: "2023 Chery ESG Report Highlights",
      date: "July 30, 2024",
      category: "ESG REPORT",
      excerpt: "A Continued Commitment to Global Philanthropy: Reviewing our environmental, social, and governance achievements from the past year.",
      tags: ["ESG", "Philanthropy", "Report"]
    }
  ];
  
  const milestones = [
    { year: "2018", title: "Initial Commitment", description: "First environmental commitment to reduce manufacturing emissions by 15%." },
    { year: "2020", title: "Green Factory Initiative", description: "Implemented sustainable manufacturing practices across all production plants." },
    { year: "2022", title: "Carbon Neutral Pledge", description: "Committed to carbon neutrality in operations by 2040." },
    { year: "2023", title: "Electric Vehicle Expansion", description: "Expanded EV fleet with 5 new models reducing environmental impact." },
    { year: "2024", title: "IUCN Partnership", description: "$3.5M investment in global conservation efforts with IUCN." }
  ];
  
  const metrics = [
    { value: "$3.5M", label: "IUCN Partnership Value", icon: "💼" },
    { value: "27", label: "Conservation Projects", icon: "🌿" },
    { value: "18", label: "Countries Impacted", icon: "🌎" },
    { value: "38%", label: "Carbon Footprint Reduction", icon: "🍃" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = tabsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-green-50" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-100 rounded-tr-full" aria-hidden="true"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="block text-green-600 text-sm font-medium tracking-widest uppercase mb-3">
            Corporate Sustainability
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Driving Global Change Through Partnerships
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">
            Our commitment to environmental stewardship and social responsibility through strategic partnerships and initiatives.
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div ref={tabsRef} className="mb-12 border-b border-gray-200">
          <div className="flex overflow-x-auto hide-scrollbar space-x-8 justify-center">
            {['news', 'milestones', 'impact'].map((tab, index) => (
              <button
                key={tab}
                className={`
                  relative pb-4 text-sm sm:text-base font-medium tracking-wide transition-colors
                  ${activeTab === tab 
                    ? 'text-green-600 border-b-2 border-green-500' 
                    : 'text-gray-500 hover:text-gray-700'}
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transitionProperty: 'transform, opacity',
                  transitionDuration: '600ms'
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'news' ? 'Latest News' : tab === 'milestones' ? 'Sustainability Journey' : 'Global Impact'}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="relative">
          {/* News Tab */}
          <div className={`transition-opacity duration-500 ${activeTab === 'news' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Feature Article */}
              <div className="lg:col-span-7 group">
                <div className="relative h-full flex flex-col bg-white shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <img 
                      src={newsItems[0].image} 
                      alt={newsItems[0].title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Partnership logos */}
                    <div className="absolute top-4 left-4 flex items-center bg-white/90 px-3 py-2">
                      <img src={newsItems[0].logoOne} alt="Chery Automobile" className="h-6" />
                      <div className="mx-2 text-gray-400">×</div>
                      <img src={newsItems[0].logoTwo} alt="IUCN" className="h-6" />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <span className="inline-block bg-green-500 text-white text-xs tracking-wider px-3 py-1 mb-3">
                        {newsItems[0].category}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {newsItems[0].title}
                      </h3>
                      <div className="flex items-center text-white/80 text-sm">
                        <span className="mr-3">{newsItems[0].date}</span>
                        <div className="w-1 h-1 bg-white/60 mr-3"></div>
                        <span>SIGNING CEREMONY</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-gray-600 mb-5 flex-grow">
                      {newsItems[0].excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {newsItems[0].tags.map((tag, index) => (
                          <span key={index} className="text-xs text-gray-500 border border-gray-200 px-2 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-green-600 font-medium flex items-center text-sm transition-all hover:text-green-800 group">
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smaller News Articles */}
              <div className="lg:col-span-5 flex flex-col h-full space-y-8">
                {newsItems.slice(1).map((item, index) => (
                  <div key={item.id} className="flex flex-col bg-white shadow-lg transition-all duration-300 hover:shadow-xl group h-full">
                    <div className="relative overflow-hidden aspect-video sm:aspect-[16/9]">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 w-full">
                        <span className="inline-block bg-green-500 text-white text-xs tracking-wider px-2 py-1 mb-2">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-bold text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <div className="text-xs text-gray-500 mb-2">{item.date}</div>
                      <p className="text-gray-600 text-sm mb-3 flex-grow">
                        {item.excerpt}
                      </p>
                      <button className="text-green-600 text-xs font-medium flex items-center transition-all hover:text-green-800 group mt-auto">
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Milestones Tab */}
          <div className={`transition-opacity duration-500 ${activeTab === 'milestones' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-green-200" aria-hidden="true"></div>
              
              {/* Timeline entries */}
              <div className="space-y-0">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index} 
                    className={`relative md:grid md:grid-cols-2 md:gap-8 py-8 items-center ${
                      index % 2 === 0 ? '' : 'md:justify-items-end'
                    }`}
                  >
                    <div 
                      className={`
                        relative pb-6 md:pb-0 
                        ${index % 2 === 0 ? 'md:text-right md:order-1' : 'md:order-2'}
                      `}
                    >
                      <div className="inline-block md:block mb-3">
                        <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-green-600 text-white text-lg md:text-xl font-bold absolute left-0 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-1/2 top-0 z-10">
                          {index % 2 === 0 ? index + 1 : milestone.year.substring(2)}
                        </span>
                      </div>
                      <h3 className={`text-xl font-bold text-green-700 mb-2 ml-10 md:ml-0`}>
                        {milestone.title}
                      </h3>
                      <p className={`text-gray-600 ml-10 md:ml-0 md:max-w-sm ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                        {milestone.description}
                      </p>
                    </div>
                    
                    <div 
                      className={`
                        relative md:flex ${index % 2 === 0 ? 'md:justify-start md:order-2' : 'md:justify-end md:order-1'}
                      `}
                    >
                      <div className={`
                        bg-green-50 p-4 border-l-4 border-green-500 
                        ${index % 2 === 0 ? 'ml-10 md:ml-0' : 'ml-10 md:ml-0'}
                      `}>
                        <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                          {milestone.year}
                        </div>
                        <div className={`w-16 h-0.5 bg-green-300 mb-3 ${index % 2 === 0 ? '' : 'md:ml-auto'}`}></div>
                        <p className="text-sm text-gray-500">
                          Advancing our sustainability journey
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Impact Tab */}
          <div className={`transition-opacity duration-500 ${activeTab === 'impact' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
            <div className="bg-green-50 border border-green-100 p-8 md:p-12 mb-12">
              <div className="max-w-3xl mx-auto text-center mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Global Impact</h3>
                <p className="text-gray-600">
                  Through our partnership with the International Union for Conservation of Nature (IUCN), 
                  Chery is making a significant difference across multiple countries and communities, 
                  supporting biodiversity conservation and sustainable development.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {metrics.map((metric, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 transform-gpu hover:-translate-y-1 transition-transform"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 text-2xl rounded-full mb-4">
                      {metric.icon}
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-2">{metric.value}</div>
                    <p className="text-gray-600 text-sm">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Geographic Reach</h3>
                <div className="aspect-video bg-gray-100 flex items-center justify-center mb-4">
                  {/* Placeholder for map visualization */}
                  <div className="text-gray-400 text-sm">Geographic Impact Map</div>
                </div>
                <p className="text-gray-600 text-sm">
                  Our conservation efforts span 18 countries across 4 continents, focusing on 
                  biodiversity hotspots and areas with endangered species.
                </p>
              </div>
              
              <div className="bg-white shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Project Types</h3>
                <div className="aspect-video bg-gray-100 flex items-center justify-center mb-4">
                  {/* Placeholder for chart visualization */}
                  <div className="text-gray-400 text-sm">Project Distribution Chart</div>
                </div>
                <p className="text-gray-600 text-sm">
                  We support a diverse range of projects including habitat protection, species conservation, 
                  community development, and environmental education.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <a 
            href="/sustainability" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 transition-colors duration-300 group"
          >
            <span className="flex items-center">
              Explore Our Sustainability Initiatives
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentNewsSection;