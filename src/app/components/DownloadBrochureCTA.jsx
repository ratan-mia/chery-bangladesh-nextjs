
"use client";

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Download, FileText } from 'lucide-react';
import Image from 'next/image';
import BrochureDownloadButton from './BrochureDownloadButton';

const DownloadBrochureCTA = ({
  title = "Get Complete|Information",
  subtitle = "Download our comprehensive brochure to explore features, specifications, and pricing",
  brochureUrl,
  brochureName,
  backgroundImage,
  variant = "default", // default, compact, feature, split
  features = [],
  relatedLinks = [],
  className = "",
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
        return 'py-16 md:py-24';
      default:
        return 'py-16 md:py-24';
    }
  };

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
      {/* Accent Line */}
      <motion.div
        variants={itemVariants}
        className="h-1 w-24 bg-primary-700 mx-auto mb-6"
      />

      {/* Title */}
      <motion.h2
        variants={itemVariants}
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
          backgroundImage ? 'text-white' : 'text-gray-900'
        }`}
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
          className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto ${
            backgroundImage ? 'text-gray-200' : 'text-gray-600'
          }`}
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
          buttonClassName="inline-flex items-center px-10 py-4 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-900 transition-all duration-300 group"
        />
      </motion.div>

      {/* Features List */}
      {variant === 'compact' && displayFeatures.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 text-sm"
        >
          {displayFeatures.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center ${
                backgroundImage ? 'text-gray-200' : 'text-gray-600'
              }`}
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
        className="h-0.5 w-32 bg-primary-800 bg-opacity-60 mx-auto mt-12"
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
            className="h-1 w-24 bg-primary-700 mb-6"
          />
          
          <motion.h2
            variants={itemVariants}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
              backgroundImage ? 'text-white' : 'text-gray-900'
            }`}
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
            className={`text-lg mb-8 ${
              backgroundImage ? 'text-gray-200' : 'text-gray-600'
            }`}
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
                <div className="w-8 h-8 bg-primary-light bg-opacity-40 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={18} className="text-primary-700" />
                </div>
                <span className={backgroundImage ? 'text-white' : 'text-gray-900'}>
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
              buttonClassName="inline-flex items-center px-10 py-4 bg-primary-700 text-white font-medium rounded-lg hover:bg-primary-900 transition-all duration-300 group"
            />
          </motion.div>
        </div>

        {/* Right Content - Preview Card */}
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <div className="relative border border-gray-200 bg-white p-8 rounded-lg shadow-lg group hover:border-primary-700 transition-all duration-300">
            {/* Top accent */}
            <div className="h-1 w-full bg-primary-800 opacity-40 absolute top-0 left-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-primary-light bg-opacity-40 rounded-lg flex items-center justify-center">
                <FileText size={40} className="text-primary-900" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {brochureName} Brochure
            </h3>
            
            <p className="text-gray-600 text-center mb-6">
              Complete information package including specifications, features, and pricing
            </p>
            
            <div className="flex items-center justify-center text-primary-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Download size={20} className="mr-2" />
              <span>Click to download</span>
            </div>
            
            {/* Bottom accent line */}
            <div className="h-0.5 w-full bg-gray-200 absolute bottom-0 left-0">
              <div className="h-full bg-primary-700 w-0 group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // Split content layout
  const renderSplitContent = () => (
    <div className="grid lg:grid-cols-2 gap-0">
      {/* Left side - Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-primary-900 text-white p-8 md:p-12 lg:p-16"
      >
        <motion.div
          variants={itemVariants}
          className="h-1 w-24 bg-primary-700 mb-6"
        />
        
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          {title.includes('|') ? (
            <>
              {title.split('|')[0]}
              <span className="text-primary-light"> {title.split('|')[1]}</span>
            </>
          ) : (
            title
          )}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-gray-200 text-lg mb-8"
        >
          {subtitle}
        </motion.p>

        <motion.div variants={itemVariants}>
          <BrochureDownloadButton
            brochureUrl={brochureUrl}
            brochureName={brochureName}
            buttonText={`Download ${brochureName} Brochure`}
            buttonClassName="inline-flex items-center px-10 py-4 bg-white text-primary-900 font-medium rounded-lg hover:bg-primary-light transition-all duration-300 group"
          />
        </motion.div>

        {/* Related Links */}
        {relatedLinks.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-primary-800"
          >
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4 text-primary-light">
              Related Information
            </h4>
            <div className="space-y-3">
              {relatedLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="group inline-flex items-center text-white hover:text-primary-light transition-colors duration-300"
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
      <div className="relative h-64 lg:h-auto">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={`${brochureName} Preview`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full bg-primary-light bg-opacity-10 flex items-center justify-center">
            <div className="text-center p-8">
              <FileText size={64} className="text-primary-700 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">
                {brochureName} Brochure
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className={`relative overflow-hidden ${getPaddingClasses()} ${className}`}>
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/80 to-primary-900/70"></div>
        </div>
      )}

      {/* Content Container */}
      <div className={variant === 'split' ? '' : 'container mx-auto px-4'}>
        {renderContent()}
      </div>
    </section>
  );
};

export default DownloadBrochureCTA;