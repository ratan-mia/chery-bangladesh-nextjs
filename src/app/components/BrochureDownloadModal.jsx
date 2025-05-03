// components/BrochureDownloadModal.js
"use client";

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle,
  Download,
  FileText,
  Mail,
  Phone,
  User,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';

const BrochureDownloadModal = ({ isOpen, onClose, brochureUrl, brochureName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    carModel: brochureName || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        carModel: brochureName || ''
      }));
      setError('');
      setSuccess(false);
    }
  }, [isOpen, brochureName]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/send-brochure-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSuccess(true);
      
      // Trigger download after successful submission
      const link = document.createElement('a');
      link.href = brochureUrl;
      link.download = brochureName || 'brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Close modal after short delay
      setTimeout(() => {
        onClose();
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          carModel: brochureName || ''
        });
        setSuccess(false);
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      x: '-100%',
      opacity: 0
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.5
      }
    },
    exit: { 
      x: '-100%',
      opacity: 0,
      transition: { 
        duration: 0.3 
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div 
            className="fixed inset-y-0 left-0 w-full max-w-md bg-white shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="h-full flex flex-col">
              {/* Header with close button */}
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Decorative header */}
              <div className="relative bg-gradient-to-r from-primary-700 to-primary-900 px-8 pt-16 pb-20">
                <div className="relative z-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6"
                  >
                    <FileText className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-white mb-2"
                  >
                    Download Brochure
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/80"
                  >
                    Get complete information about {brochureName}
                  </motion.p>
                </div>
                
                {/* Decorative bottom edge */}
                <div className="absolute bottom-0 left-0 right-0">
                  <svg 
                    viewBox="0 0 1440 120" 
                    className="w-full h-12 fill-white"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,0 L1440,0 L1440,60 Q1080,120 720,60 Q360,0 0,60 Z"></path>
                  </svg>
                </div>
              </div>

              {/* Form content */}
              <div className="flex-1 overflow-y-auto px-8 py-6">
                {/* Success message */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-6"
                    >
                      <div className="bg-green-50 border-l-4 border-green-500 p-4">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <div>
                            <h3 className="text-green-800 font-medium">Success!</h3>
                            <p className="text-green-700 text-sm">Your download is starting...</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mb-6"
                    >
                      <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <div className="flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                          <div>
                            <h3 className="text-red-800 font-medium">Error</h3>
                            <p className="text-red-700 text-sm">{error}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div className="relative">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                      focusedField === 'name' ? 'bg-primary-700' : 'bg-gray-200'
                    }`}></div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 pl-4">
                      Full Name
                    </label>
                    <div className="relative pl-4">
                      <User className={`absolute left-8 top-3 w-5 h-5 transition-colors duration-200 ${
                        focusedField === 'name' ? 'text-primary-700' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:border-primary-700 focus:ring-0 outline-none transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="relative">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                      focusedField === 'email' ? 'bg-primary-700' : 'bg-gray-200'
                    }`}></div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 pl-4">
                      Email Address
                    </label>
                    <div className="relative pl-4">
                      <Mail className={`absolute left-8 top-3 w-5 h-5 transition-colors duration-200 ${
                        focusedField === 'email' ? 'text-primary-700' : 'text-gray-400'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:border-primary-700 focus:ring-0 outline-none transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div className="relative">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                      focusedField === 'phone' ? 'bg-primary-700' : 'bg-gray-200'
                    }`}></div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 pl-4">
                      Phone Number
                    </label>
                    <div className="relative pl-4">
                      <Phone className={`absolute left-8 top-3 w-5 h-5 transition-colors duration-200 ${
                        focusedField === 'phone' ? 'text-primary-700' : 'text-gray-400'
                      }`} />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:border-primary-700 focus:ring-0 outline-none transition-colors"
                        placeholder="+880 1XXX-XXXXXX"
                      />
                    </div>
                  </div>

                  {/* Company field */}
                  <div className="relative">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                      focusedField === 'company' ? 'bg-primary-700' : 'bg-gray-200'
                    }`}></div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 pl-4">
                      Company <span className="text-gray-400">(Optional)</span>
                    </label>
                    <div className="relative pl-4">
                      <Building2 className={`absolute left-8 top-3 w-5 h-5 transition-colors duration-200 ${
                        focusedField === 'company' ? 'text-primary-700' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 focus:border-primary-700 focus:ring-0 outline-none transition-colors"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 px-8 py-6 bg-gray-50">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-4 bg-primary-700 hover:bg-primary-800 text-white font-medium transition-all duration-300 group ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download {brochureName} Brochure
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By downloading, you agree to our{' '}
                  <a href="/privacy" className="text-primary-700 hover:text-primary-800">
                    Privacy Policy
                  </a>
                </p>
              </div>

              {/* Loading bar */}
              <AnimatePresence>
                {isSubmitting && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 2 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary-700 origin-left"
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BrochureDownloadModal;