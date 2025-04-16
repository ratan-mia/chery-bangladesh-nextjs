'use client'

import { motion } from 'framer-motion';

/**
 * Reusable section header component with animation
 * Follows Chery Bangladesh Design System Guidelines:
 * - Clean, uncluttered layout with ample white space
 * - Typography follows design system font scale
 * - Uses proper primary colors from the brand palette
 * 
 * @param {Object} props
 * @param {string} props.title - Main heading text
 * @param {string} props.subtitle - Smaller text displayed above the title
 * @param {string} props.description - Supporting text below the title
 * @param {boolean} props.centered - Whether to center the text (default: true)
 */
const SectionHeader = ({ 
  title, 
  subtitle, 
  description, 
  centered = true,
}) => {
  // Animation variants from design guidelines
  const headerAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } // Medium duration per guidelines
    }
  };

  return (
    <motion.div 
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      variants={headerAnimation}
      className={`bg-white mb-16 ${centered ? 'text-center' : ''}`}
    >
      {/* Accent divider - follows design system example on page 8 */}
      <div 
        className="w-24 h-1 bg-primary-700 mb-8"
        style={{ margin: centered ? '0 auto' : '0' }}
      />
      
      {/* Subtitle with uppercase and tracking as shown in examples */}
      {subtitle && (
        <span
          className="inline-block text-sm uppercase tracking-wider mb-3 text-primary-700 font-medium"
        >
          {subtitle}
        </span>
      )}
      
      {/* Heading with proper font sizes from typography scale */}
      <h2 
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight ${centered ? 'text-center' : ''}`}
      >
        {title}
      </h2>
      
      {/* Description text with proper body sizing and color */}
      {description && (
        <p
          className={`text-lg text-gray-600 leading-normal ${centered ? 'max-w-3xl mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeader