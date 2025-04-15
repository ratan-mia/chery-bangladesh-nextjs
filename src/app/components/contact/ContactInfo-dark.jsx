import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import SocialLinks from './SocialLinks'

export default function ContactInfo({ officeInfo }) {
  // Using the dark theme from the design system
  const theme = {
    accent: '#e2cdb8',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.95)',
    buttonBg: '#e2cdb8',
    buttonText: '#111827',
    accentLine: '#e2cdb8',
    contentBg: 'rgba(17, 24, 39, 0.85)'
  }

  // Animation variants from the design system
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Accent line following design system */}
      <motion.div 
        variants={itemVariants}
        className="h-1.5 w-28 mb-8"
        style={{ backgroundColor: theme.accentLine }}
      ></motion.div>
      
      <motion.h2 
        variants={itemVariants}
        className="text-3xl font-bold mb-8"
        style={{ 
          color: theme.text,
          letterSpacing: '-0.01em'
        }}
      >
        Get in Touch
      </motion.h2>
      
      <motion.div 
        variants={itemVariants}
        className="mb-12"
      >
        <h3 
          className="text-2xl font-medium mb-6"
          style={{ color: theme.textSecondary }}
        >
          Our Office
        </h3>
        
        <div 
          className="backdrop-blur-sm p-8 md:p-10"
          style={{
            backgroundColor: theme.contentBg,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div 
            className="h-1 w-16 mb-6"
            style={{ backgroundColor: theme.accentLine }}
          ></div>
          
          <h4 
            className="font-bold mb-6 text-xl"
            style={{ color: theme.text }}
          >
            {officeInfo.name}
          </h4>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin style={{ color: theme.accent }} className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
              <p style={{ color: theme.textSecondary }} className="text-lg leading-relaxed">
                {officeInfo.address}
              </p>
            </div>
            
            <div className="flex items-center">
              <Phone style={{ color: theme.accent }} className="w-5 h-5 mr-3 flex-shrink-0" />
              <a 
                href={`tel:${officeInfo.phone.replace(/\s/g, '')}`} 
                className="text-lg leading-relaxed transition-colors duration-300"
                style={{ 
                  color: theme.textSecondary,
                  borderBottom: `1px solid ${theme.accent}44`
                }}
              >
                {officeInfo.phone}
              </a>
            </div>
            
            <div className="flex items-center">
              <Mail style={{ color: theme.accent }} className="w-5 h-5 mr-3 flex-shrink-0" />
              <a 
                href={`mailto:${officeInfo.email}`} 
                className="text-lg leading-relaxed transition-colors duration-300"
                style={{ 
                  color: theme.textSecondary,
                  borderBottom: `1px solid ${theme.accent}44`
                }}
              >
                {officeInfo.email}
              </a>
            </div>
            
            <div className="flex items-start">
              <Clock style={{ color: theme.accent }} className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
              <p style={{ color: theme.textSecondary }} className="text-lg leading-relaxed">
                {officeInfo.hours}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <h3 
          className="text-2xl font-medium mb-6"
          style={{ color: theme.textSecondary }}
        >
          Connect With Us
        </h3>
        <SocialLinks theme={theme} />
      </motion.div>
      
    </motion.div>
  )
}