import { motion } from 'framer-motion';
import React, { useState } from 'react';

const VisionMissionSection = ({ 
  backgroundImage = '/images/about/mountain-landscape.jpg', 
  sections = [
    {
      title: "VISIONS",
      content: "Committed to being a diversified enterprise with global influence and competitiveness"
    },
    {
      title: "MISSIONS",
      content: "Innovation-driven, striving for excellence, aspiring to become a leading company in every field we enter"
    },
    {
      title: "VALUES",
      content: [
        "Pursue Practical Innovation",
        "Commitment to Excellence",
        "People-Oriented",
        "Win-Win Cooperation"
      ]
    }
  ],
  title = '',
  description = '',
  hasDecorativeSun = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image with hover animation */}
      <motion.div 
        className="w-full min-h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundPosition: 'center center',
        }}
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.03 : 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Optional title and description */}
        {(title || description) && (
          <div className="absolute top-0 left-0 w-full py-12 px-4 text-center z-10">
            {title && <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>}
            {description && <p className="text-xl text-white/80 max-w-3xl mx-auto">{description}</p>}
          </div>
        )}
        
        {/* Decorative element - sun rays */}
        {hasDecorativeSun && (
          <motion.div 
            className="absolute top-1/4 right-1/4 pointer-events-none z-10"
            animate={{ 
              rotate: isHovered ? 45 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            <div className="relative w-16 h-16">
              <motion.div 
                className="absolute inset-0 bg-yellow-400 rounded-full opacity-90"
                animate={{ opacity: isHovered ? 1 : 0.9 }}
              />
              {[...Array(8)].map((_, index) => (
                <motion.div 
                  key={index}
                  className="absolute top-1/2 left-1/2 h-32 w-1.5 bg-yellow-400 opacity-70"
                  style={{ 
                    transform: `translate(-50%, -50%) rotate(${index * 45}deg)`,
                    transformOrigin: 'center' 
                  }}
                  animate={{ 
                    opacity: isHovered ? [0.7, 0.9, 0.7] : 0.7,
                    height: isHovered ? ['8rem', '8.5rem', '8rem'] : '8rem'
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: isHovered ? Infinity : 0,
                    repeatType: "reverse" 
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Dark semi-transparent overlay at the bottom - just a thin strip */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/30 backdrop-blur-sm z-0" />
        
        {/* Content container */}
        <div className="absolute bottom-16 left-0 right-0 z-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              
              {sections.map((section, index) => (
                <motion.div 
                  key={index} 
                  className="relative"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  {/* Individual gradient background - not full width */}
                  <motion.div 
                    className="absolute inset-0 rounded-lg"
                    style={{ 
                      background: index === 0 
                        ? 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(30,55,45,0.95))' 
                        : index === 1 
                          ? 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(25,45,55,0.95))' 
                          : 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(35,35,55,0.95))' 
                    }}
                    initial={{ opacity: 0.9, y: 0 }}
                    whileHover={{ 
                      opacity: 1,
                      y: -5,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 md:p-8">
                    <motion.h2 
                      className="text-3xl md:text-4xl font-bold text-white tracking-wider mb-6"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {section.title}
                    </motion.h2>
                    
                    {Array.isArray(section.content) ? (
                      <ul className="text-white/80 text-lg space-y-2">
                        {section.content.map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1), duration: 0.4 }}
                            viewport={{ once: true }}
                            className="flex items-start"
                          >
                            <motion.span 
                              className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: hoveredIndex === index ? [0.8, 1.2, 0.8] : 0.8 }}
                              transition={{ 
                                duration: 1, 
                                repeat: hoveredIndex === index ? Infinity : 0,
                                repeatType: "reverse" 
                              }}
                            />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <motion.p 
                        className="text-white/80 text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {section.content}
                      </motion.p>
                    )}
                    
                    {section.cta && (
                      <motion.div 
                        className="pt-6"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button 
                          onClick={section.cta.onClick} 
                          className="bg-primary hover:bg-primary-focus text-primary-content px-6 py-2 rounded-md transition-all duration-300"
                        >
                          {section.cta.label}
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VisionMissionSection;