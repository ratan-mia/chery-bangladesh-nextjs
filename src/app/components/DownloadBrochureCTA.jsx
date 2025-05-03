// components/BrochureCTASection.js
"use client";

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Download, FileText, Sparkles } from 'lucide-react';
import Image from 'next/image';
import BrochureDownloadButton from './BrochureDownloadButton';

const BrochureCTASection = ({
  title = "Get Complete|Information",
  subtitle = "Download our comprehensive brochure to explore features, specifications, and pricing",
  brochureUrl,
  brochureName,
  backgroundImage,
  variant = "default", // default, compact, feature, split
  features = [],
  relatedLinks = [],
  className = "",
  theme = "light" // light or dark
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.7,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Default features for brochure
  const defaultFeatures = [
    "Detailed specifications",
    "Interior & exterior gallery",
    "Available colors & trims",
    "Pricing & financing options",
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  // Variant-specific padding
  const getPaddingClasses = () => {
    switch (variant) {
      case 'compact':
        return 'py-12 md:py-16';
      case 'feature':
        return 'py-20 md:py-32';
      case 'split':
        return '';
      default:
        return 'py-16 md:py-24';
    }
  };

  // Theme-specific colors
  const getThemeColors = () => {
    if (theme === 'dark') {
      return {
        bg: 'bg-primary-900',
        text: 'text-white',
        subtext: 'text-gray-300',
        border: 'border-primary-800',
        featureBg: 'bg-primary-800/50',
        featureIcon: 'text-primary-400',
        accent: 'bg-primary-700',
        cardBg: 'bg-primary-800',
        cardBorder: 'border-primary-700'
      };
    }
    return {
      bg: 'bg-white',
      text: 'text-gray-900',
      subtext: 'text-gray-600',
      border: 'border-gray-200',
      featureBg: 'bg-primary-light/10',
      featureIcon: 'text-primary-700',
      accent: 'bg-primary-700',
      cardBg: 'bg-white',
      cardBorder: 'border-gray-200'
    };
  };

  const colors = getThemeColors();

  // Render the CTA based on variant
  const renderContent = () => {
    switch (variant) {
      case 'split':
        return renderSplitContent();
      case 'feature':
        return renderFeatureContent();
      default:
        return renderDefaultContent();
    }
  };

  // Default content layout
  const renderDefaultContent = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-4xl mx-auto text-center"
    >
      {/* Decorative element */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center mb-6"
      >
        <div className="relative">
          <div className={`absolute inset-0 blur-xl ${colors.accent} opacity-30 rounded-full`}></div>
          <Sparkles className={`relative w-8 h-8 ${colors.featureIcon}`} />
        </div>
      </motion.div>

      {/* Accent Line */}
      <motion.div
        variants={itemVariants}
        className={`h-1 w-24 ${colors.accent} mx-auto mb-6`}
      />

      {/* Title */}
      <motion.h2
        variants={itemVariants}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${colors.text}`}
      >
        {title.includes('|') ? (
          <>
            {title.split('|')[0]}
            <span className="text-primary-700"> {title.split('|')[1]}</span>
          </>
        ) : (
          title
        )}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto ${colors.subtext}`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Download Button */}
      <motion.div variants={itemVariants} className="mb-8">
        <BrochureDownloadButton
          brochureUrl={brochureUrl}
          brochureName={brochureName}
          buttonText={`Download ${brochureName} Brochure`}
          buttonClassName="inline-flex items-center px-10 py-4 bg-primary-700 text-white font-medium  hover:bg-primary-800 transition-all duration-300 group shadow-sm hover:shadow-md"
        />
      </motion.div>

      {/* Features List for compact variant */}
      {variant === 'compact' && displayFeatures.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 text-sm"
        >
          {displayFeatures.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center ${colors.subtext}`}
            >
              <CheckCircle size={16} className="mr-2 text-primary-700" />
              {feature}
            </div>
          ))}
        </motion.div>
      )}

      {/* Bottom accent */}
      <motion.div
        variants={itemVariants}
        className={`h-0.5 w-32 ${colors.accent} opacity-60 mx-auto mt-12`}
      />
    </motion.div>
  );

  // Feature content layout
  const renderFeatureContent = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-6xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <motion.div
            variants={itemVariants}
            className={`h-1 w-24 ${colors.accent} mb-6`}
          />
          
          <motion.h2
            variants={itemVariants}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${colors.text}`}
          >
            {title.includes('|') ? (
              <>
                {title.split('|')[0]}
                <span className="text-primary-700"> {title.split('|')[1]}</span>
              </>
            ) : (
              title
            )}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-lg mb-8 ${colors.subtext}`}
          >
            {subtitle}
          </motion.p>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
          >
            {displayFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3"
              >
                <div className={`w-8 h-8 ${colors.featureBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <CheckCircle size={18} className="text-primary-700" />
                </div>
                <span className={colors.text}>
                  {feature}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <BrochureDownloadButton
              brochureUrl={brochureUrl}
              brochureName={brochureName}
              buttonText={`Download ${brochureName} Brochure`}
              buttonClassName="inline-flex items-center px-10 py-4 bg-primary-700 text-white font-medium rounded-xl hover:bg-primary-800 transition-all duration-300 group shadow-sm hover:shadow-md"
            />
          </motion.div>
        </div>

        {/* Right Content - Preview Card */}
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <div className={`relative border ${colors.cardBorder} ${colors.cardBg} p-8 rounded-xl shadow-lg group hover:border-primary-700 transition-all duration-300`}>
            {/* Top accent */}
            <div className={`h-1 w-full ${colors.accent} opacity-40 absolute top-0 left-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl`} />
            
            <div className="flex items-center justify-center mb-6">
              <div className={`w-20 h-20 ${colors.featureBg} rounded-xl flex items-center justify-center`}>
                <FileText size={40} className="text-primary-700" />
              </div>
            </div>
            
            <h3 className={`text-xl font-bold ${colors.text} text-center mb-2`}>
              {brochureName} Brochure
            </h3>
            
            <p className={`${colors.subtext} text-center mb-6`}>
              Complete information package including specifications, features, and pricing
            </p>
            
            <div className="flex items-center justify-center text-primary-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Download size={20} className="mr-2" />
              <span>Click to download</span>
            </div>
            
            {/* Bottom accent line */}
            <div className={`h-0.5 w-full ${colors.border} absolute bottom-0 left-0 rounded-b-xl`}>
              <div className="h-full bg-primary-700 w-0 group-hover:w-full transition-all duration-700 ease-out rounded-b-xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // Split content layout
  const renderSplitContent = () => (
    <div className="grid lg:grid-cols-2">
      {/* Left side - Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`${theme === 'dark' ? 'bg-primary-900' : 'bg-gray-50'} p-8 md:p-12 lg:p-16`}
      >
        <motion.div
          variants={itemVariants}
          className={`h-1 w-24 ${colors.accent} mb-6`}
        />
        
        <motion.h2
          variants={itemVariants}
          className={`text-3xl md:text-4xl font-bold mb-6 ${colors.text}`}
        >
          {title.includes('|') ? (
            <>
              {title.split('|')[0]}
              <span className="text-primary-700"> {title.split('|')[1]}</span>
            </>
          ) : (
            title
          )}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className={`${colors.subtext} text-lg mb-8`}
        >
          {subtitle}
        </motion.p>

        <motion.div variants={itemVariants}>
          <BrochureDownloadButton
            brochureUrl={brochureUrl}
            brochureName={brochureName}
            buttonText={`Download ${brochureName} Brochure`}
            buttonClassName={`inline-flex items-center px-10 py-4 ${
              theme === 'dark' 
                ? 'bg-white text-primary-900 hover:bg-primary-100' 
                : 'bg-primary-700 text-white hover:bg-primary-800'
            } font-medium rounded-xl transition-all duration-300 group shadow-sm hover:shadow-md`}
          />
        </motion.div>

        {/* Related Links */}
        {relatedLinks.length > 0 && (
          <motion.div
            variants={itemVariants}
            className={`mt-12 pt-8 border-t ${colors.border}`}
          >
            <h4 className={`text-sm font-medium uppercase tracking-wider mb-4 ${colors.subtext}`}>
              Related Information
            </h4>
            <div className="space-y-3">
              {relatedLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`group inline-flex items-center ${colors.text} hover:text-primary-700 transition-colors duration-300`}
                >
                  {link.text}
                  <ArrowRight size={16} className="ml-2 group-hover:ml-3 transition-all duration-300" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Right side - Image */}
      <div className="relative h-64 lg:h-auto min-h-[400px]">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={`${brochureName} Preview`}
            fill
            className="object-cover"
          />
        ) : (
          <div className={`h-full ${theme === 'dark' ? 'bg-primary-800' : 'bg-primary-light/10'} flex items-center justify-center`}>
            <div className="text-center p-8">
              <FileText size={64} className="text-primary-700 mx-auto mb-4" />
              <p className={`${colors.subtext} font-medium`}>
                {brochureName} Brochure
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className={`relative overflow-hidden ${getPaddingClasses()} ${colors.bg} ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Background Image (for non-split variants) */}
      {backgroundImage && variant !== 'split' && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={backgroundImage}
            alt="CTA Background"
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-primary-900/90 via-primary-900/80 to-primary-900/70'
              : 'bg-gradient-to-r from-white/90 via-white/80 to-white/70'
          }`}></div>
        </div>
      )}

      {/* Content Container */}
      <div className={variant === 'split' ? '' : 'container mx-auto px-4 relative'}>
        {renderContent()}
      </div>
    </section>
  );
};

export default BrochureCTASection;