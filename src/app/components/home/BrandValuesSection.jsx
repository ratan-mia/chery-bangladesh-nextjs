import { motion } from 'framer-motion';
import { ArrowRight, Award, Cpu, Shield, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Container animation variants following design system
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

// Item animation variants following design system
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const CheryFeaturesGrid = () => {
  // State management
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const sectionRef = useRef(null);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Feature data based on actual Chery brochure specifications
  const features = [
    {
      title: 'Advanced Performance',
      desc: 'Experience exceptional power with our turbocharged engines delivering up to 195 BHP and 290Nm of torque, paired with intelligent transmission systems and multiple driving modes for every terrain.',
      icon: Zap,
    },
    {
      title: 'Comprehensive Safety',
      desc: 'Drive with confidence featuring up to 10 airbags, 85% high-strength steel body construction, ADAS technologies including AEB, BSD, 360° HD panoramic cameras, and intelligent driver assistance.',
      icon: Shield,
    },
    {
      title: 'Smart Connectivity',
      desc: 'Stay connected with dual curved screens up to 15.6" 2.5K resolution, wireless Apple CarPlay™ & Android Auto™, intelligent voice assistant, and premium audio systems with up to 14 speakers.',
      icon: Cpu,
    },
    {
      title: 'Luxury Comfort',
      desc: 'Enjoy first-class comfort with premium leather seating, panoramic sunroof, dual-zone climate control, ambient lighting, and spacious 7-seat configurations designed for ultimate relaxation.',
      icon: Award,
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 relative overflow-hidden bg-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header following design system */}
        <div className="text-center mb-16">
          <motion.p
            className="text-primary-700 font-medium text-xs uppercase tracking-wider mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            Innovation & Excellence
          </motion.p>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Premium <span className="text-primary-900">Features</span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-primary-700 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />

          <motion.p
            className="text-gray-600 text-lg max-w-3xl mx-auto leading-normal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Experience the perfect blend of technology, safety, and luxury that defines
            every Chery vehicle - engineered for the modern driver who demands excellence.
          </motion.p>
        </div>

        {/* Features grid following design system card pattern */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Feature card following design system */}
                <div className="relative border border-gray-200 bg-white shadow-sm overflow-hidden group-hover:border-primary-700 hover:shadow-lg transition-all duration-300 h-full">
                  {/* Top accent */}
                  <div
                    className="h-1 w-full bg-primary-800 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div className="p-8">
                    {/* Icon container following design system */}
                    <div className="w-16 h-16 bg-primary-light bg-opacity-40 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary-700 group-hover:bg-opacity-20">
                      <IconComponent
                        className="text-primary-900 transition-colors duration-300 group-hover:text-primary-700"
                        size={28}
                      />
                    </div>

                    {/* Typography following design system */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-900 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 leading-normal mb-8">
                      {feature.desc}
                    </p>

                    {/* Learn more link following design system */}
                    <div className="flex items-center text-primary-700 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span>Learn more</span>
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:ml-3 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Bottom accent line following design system */}
                  <div className="h-0.5 w-full bg-gray-200 mt-auto">
                    <div className="h-full bg-primary-700 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA section following design system */}
        <motion.div
          className="bg-primary-900 text-white mt-16 p-8 lg:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Background pattern following design system */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <pattern id="cta-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" />
              </pattern>
              <rect width="100" height="100" fill="url(#cta-pattern)" />
            </svg>
          </div>

          <div className="relative z-10 text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                Experience Chery Excellence
              </h3>
              <p className="text-primary-light text-lg">
                Discover premium automotive engineering with our latest models
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:flex-shrink-0">
              {/* Primary button following design system */}
              <a
                href="/testdrive"
                className="group inline-flex items-center px-10 py-4 bg-primary-700 text-white font-medium hover:bg-primary-800 transition-colors duration-300"
                aria-label="Schedule a test drive"
              >
                Schedule Test Drive
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:ml-3 transition-all duration-300"
                />
              </a>

              {/* Secondary button following design system */}
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border border-primary-700 text-white font-medium px-10 py-4 hover:bg-primary-700 transition-colors duration-300"
                aria-label="Contact us for more information"
              >
                Contact Us

              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CheryFeaturesGrid;