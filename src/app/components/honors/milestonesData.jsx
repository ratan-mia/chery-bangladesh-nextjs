import { motion } from 'framer-motion';
import React from 'react';

// Years available for each category
export const yearsByCategory = {
  'ALL CONTENT': ['2024', '2023', '2022', '2021', '2020', '2017'],
  'BRAND': ['2024', '2023', '2021', '2018'],
  'PRODUCT': ['2023', '2022', '2020', '2017'],
  'MARKET': ['2024', '2023', '2022', '2019'],
  'COMMONWEAL': ['2024', '2022', '2021', '2019']
};

// Content data organized by category and year
export const milestonesData = {
  'ALL CONTENT': {
    '2024': [
      {
        title: "The Tiggo 7 Pro Earned \"Five-Star Safety Rating\" in 2023 ANCAP",
        backgroundImage: "/images/brandmilestones/2024/2024_01.jpg",
        logos: [
          {
            position: "top-right",
            content: (
              <div className="flex flex-col items-end">
                <div className="text-white text-sm">CHERY · TIGGO</div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-white text-4xl font-bold mt-2"
                >
                  TIGGO<span className="text-4xl">7</span>PRO
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-blue-500 text-4xl font-bold mt-2"
                >
                  5-STAR
                </motion.div>
                <div className="text-white text-lg">ANCAP SAFETY RATING</div>
              </div>
            )
          },
          {
            position: "bottom-right",
            content: (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col items-center"
              >
                <div className="bg-white p-2 rounded-full">
                  <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center">
                    <div className="w-8 h-8 bg-black rounded-tl-full"></div>
                  </div>
                </div>
                <div className="text-white text-xl font-bold mt-2">ANCAP</div>
                <div className="text-white text-sm">SAFETY</div>
                <div className="bg-yellow-400 py-1 px-3 mt-1 text-sm font-bold">TESTED 2023</div>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <motion.svg 
                      key={star} 
                      className="w-5 h-5 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
              </motion.div>
            )
          }
        ]
      },
      {
        title: "TIGGO 8 CHAMPION OF CACSI Under the Segmented Models in 2023 CACSI (China Automobile Customer Satisfaction Index)",
        backgroundImage: "/images/brandmilestones/2024/2024_02.jpg",
        logos: [
          {
            position: "top-right",
            content: (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white text-4xl font-bold"
              >
                TIGGO<span className="text-4xl">8</span>
              </motion.div>
            )
          },
          {
            position: "bottom-right",
            content: (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-col items-end"
              >
                <div className="text-white text-opacity-80">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="text-yellow-200 text-4xl font-bold mb-2"
                  >
                    CHAMPION OF CACSI
                  </motion.div>
                  <div className="text-sm mb-4">Under the Segmented Models in 2023 CACSI (China Automobile Customer Satisfaction Index)</div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.7 }}
                    className="flex justify-end items-center"
                  >
                    <div className="mr-2">China Association for Quality</div>
                    <img src="/images/chery-logo.png" alt="Chery Logo" className="h-6" />
                  </motion.div>
                </div>
              </motion.div>
            )
          }
        ]
      }
    ],
    '2023': [
      {
        title: "The Millionth Export of Chery TIGGO 7 Marks Milestone in Global Expansion Strategy",
        backgroundImage: "/images/tiggo-7-export.jpg",
        logos: [
          {
            position: "top-right",
            content: (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white text-lg font-bold"
              >
                CHERY · Global Milestone
              </motion.div>
            )
          }
        ]
      }
    ],
    '2022': [
      {
        title: "Celebrating Two Decades of Innovation and Global Presence",
        backgroundImage: "/images/chery-2022.jpg",
        logos: []
      }
    ],
    '2021': [
      {
        title: "Launch of Next Generation Powertrain Technology",
        backgroundImage: "/images/chery-2021.jpg",
        logos: []
      }
    ],
    '2020': [
      {
        title: "Digital Transformation Initiative Begins",
        backgroundImage: "/images/chery-2020.jpg",
        logos: []
      }
    ],
    '2017': [
      {
        title: "Strategic Partnership Formation",
        backgroundImage: "/images/chery-2017.jpg",
        logos: []
      }
    ]
  },
  'BRAND': {
    '2024': [
      {
        title: "Chery Brand Value Exceeds 100 Billion Yuan",
        backgroundImage: "/images/chery-brand-2024.jpg",
        logos: []
      }
    ],
    '2023': [
      {
        title: "International Brand Recognition Award",
        backgroundImage: "/images/chery-brand-2023.jpg",
        logos: []
      }
    ],
    '2021': [
      {
        title: "Brand Transformation and New Logo Launch",
        backgroundImage: "/images/chery-rebrand-2021.jpg",
        logos: []
      }
    ],
    '2018': [
      {
        title: "Global Brand Strategy Unveiled",
        backgroundImage: "/images/chery-global-2018.jpg",
        logos: []
      }
    ]
  },
  'PRODUCT': {
    '2023': [
      {
        title: "The Tiggo 7 Pro Earned \"Five-Star Safety Rating\" in 2023 ANCAP",
        backgroundImage: "/images/tiggo-7-pro-safety.jpg",
        logos: [
          {
            position: "top-right",
            content: (
              <div className="flex flex-col items-end">
                <div className="text-white text-sm">CHERY · TIGGO</div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-white text-4xl font-bold mt-2"
                >
                  TIGGO<span className="text-4xl">7</span>PRO
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-blue-500 text-4xl font-bold mt-2"
                >
                  5-STAR
                </motion.div>
                <div className="text-white text-lg">ANCAP SAFETY RATING</div>
              </div>
            )
          },
          {
            position: "bottom-right",
            content: (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col items-center"
              >
                <div className="bg-white p-2 rounded-full">
                  <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center">
                    <div className="w-8 h-8 bg-black rounded-tl-full"></div>
                  </div>
                </div>
                <div className="text-white text-xl font-bold mt-2">ANCAP</div>
                <div className="text-white text-sm">SAFETY</div>
                <div className="bg-yellow-400 py-1 px-3 mt-1 text-sm font-bold">TESTED 2023</div>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <motion.svg 
                      key={star} 
                      className="w-5 h-5 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
              </motion.div>
            )
          }
        ]
      },
      {
        title: "TIGGO 8 CHAMPION OF CACSI Under the Segmented Models in 2023 CACSI",
        backgroundImage: "/images/tiggo-8-champion.jpg",
        logos: [
          {
            position: "top-right",
            content: (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white text-4xl font-bold"
              >
                TIGGO<span className="text-4xl">8</span>
              </motion.div>
            )
          }
        ]
      }
    ],
    '2022': [
      {
        title: "Launch of Next Generation Hybrid Technology",
        backgroundImage: "/images/chery-hybrid-2022.jpg",
        logos: []
      }
    ],
    '2020': [
      {
        title: "New Tiggo 7 Pro Global Launch",
        backgroundImage: "/images/tiggo-7-launch.jpg",
        logos: []
      }
    ],
    '2017': [
      {
        title: "Introduction of the First Tiggo Model",
        backgroundImage: "/images/first-tiggo.jpg",
        logos: []
      }
    ]
  },
  'MARKET': {
    '2024': [
      {
        title: "Expansion to 80+ Global Markets",
        backgroundImage: "/images/global-markets-2024.jpg",
        logos: []
      }
    ],
    '2023': [
      {
        title: "European Market Entry Strategy",
        backgroundImage: "/images/europe-entry-2023.jpg",
        logos: []
      }
    ],
    '2022': [
      {
        title: "Surpassed 1 Million Annual Export Volume",
        backgroundImage: "/images/export-milestone-2022.jpg",
        logos: []
      }
    ],
    '2019': [
      {
        title: "Establishment of Regional Headquarters in Middle East",
        backgroundImage: "/images/middle-east-hq.jpg",
        logos: []
      }
    ]
  },
  'COMMONWEAL': {
    '2024': [
      {
        title: "Global Environmental Protection Initiative",
        backgroundImage: "/images/environmental-2024.jpg",
        logos: []
      }
    ],
    '2022': [
      {
        title: "Educational Support Program in Developing Markets",
        backgroundImage: "/images/education-2022.jpg",
        logos: []
      }
    ],
    '2021': [
      {
        title: "Pandemic Relief Efforts Across Global Markets",
        backgroundImage: "/images/pandemic-relief.jpg",
        logos: []
      }
    ],
    '2019': [
      {
        title: "Establishment of Chery Foundation for Social Responsibility",
        backgroundImage: "/images/foundation-2019.jpg",
        logos: [
          {
            position: "top-right",
            content: (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white text-lg font-bold"
              >
                Chery Foundation
              </motion.div>
            )
          },
          {
            position: "bottom-right",
            content: (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-col items-end"
              >
                <div className="text-white text-opacity-80">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="text-teal-400 text-xl font-bold mb-2"
                  >
                    BUILDING A BETTER FUTURE
                  </motion.div>
                  <div className="text-sm mb-4">Corporate social responsibility initiative</div>
                </div>
              </motion.div>
            )
          }
        ]
      }
    ]
  }
};

// Helper functions
export const getLogoComponent = (logo, logoType) => {
  if (!logo) return null;
  
  // Standard logo components that can be reused across different data entries
  switch (logoType) {
    case 'ancap-rating':
      return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="bg-white p-2 rounded-full">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center">
              <div className="w-8 h-8 bg-black rounded-tl-full"></div>
            </div>
          </div>
          <div className="text-white text-xl font-bold mt-2">ANCAP</div>
          <div className="text-white text-sm">SAFETY</div>
          <div className="bg-yellow-400 py-1 px-3 mt-1 text-sm font-bold">TESTED 2023</div>
          <div className="flex mt-2">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <motion.svg 
                key={star} 
                className="w-5 h-5 text-white" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>
        </motion.div>
      );
    
    case 'tiggo7-pro-logo':
      return (
        <div className="flex flex-col items-end">
          <div className="text-white text-sm">CHERY · TIGGO</div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white text-4xl font-bold mt-2"
          >
            TIGGO<span className="text-4xl">7</span>PRO
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-blue-500 text-4xl font-bold mt-2"
          >
            5-STAR
          </motion.div>
          <div className="text-white text-lg">ANCAP SAFETY RATING</div>
        </div>
      );
    
    default:
      return null;
  }
};

// Export utility functions for working with the data
export const getMilestonesForYear = (category, year) => {
  return milestonesData[category]?.[year] || [];
};

export const getAllYears = () => {
  const allYears = new Set();
  
  Object.values(yearsByCategory).forEach(yearArray => {
    yearArray.forEach(year => allYears.add(year));
  });
  
  return Array.from(allYears).sort((a, b) => b - a); // Sort descending
};

export const getAllCategories = () => {
  return Object.keys(yearsByCategory);
};