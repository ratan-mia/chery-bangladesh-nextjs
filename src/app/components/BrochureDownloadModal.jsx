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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-primary-900 bg-opacity-60 backdrop-blur-sm"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div 
              className="relative w-full max-w-md transform overflow-hidden bg-white shadow-2xl rounded-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Decorative top gradient */}
              <div className="h-2 bg-gradient-to-r from-primary-700 via-primary-800 to-primary-700" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Hero section */}
              <div className="relative overflow-hidden bg-gradient-to-br from-primary-light/20 via-primary-light/10 to-transparent px-8 pt-8 pb-6">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, ${String('#8c735d')} 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                  }} />
                </div>
                
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-primary-700 bg-opacity-10 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                  >
                    <FileText className="h-8 w-8 text-primary-900" />
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Download Brochure
                    </h3>
                    <p className="text-gray-600">
                      Get complete information about <span className="font-medium text-primary-900">{brochureName}</span>
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Success message with animation */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mx-8 mt-4"
                  >
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          Success! Your download is starting...
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          Check your downloads folder
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error message with animation */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mx-8 mt-4"
                  >
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">
                          {error}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form section */}
              <div className="px-8 py-6">
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Name field */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className={`h-5 w-5 ${focusedField === 'name' ? 'text-primary-700' : 'text-gray-400'} transition-colors duration-200`} />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-700 focus:border-primary-700 transition-all duration-200 outline-none"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </motion.div>

                  {/* Email field */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className={`h-5 w-5 ${focusedField === 'email' ? 'text-primary-700' : 'text-gray-400'} transition-colors duration-200`} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-700 focus:border-primary-700 transition-all duration-200 outline-none"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </motion.div>

                  {/* Phone field */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className={`h-5 w-5 ${focusedField === 'phone' ? 'text-primary-700' : 'text-gray-400'} transition-colors duration-200`} />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-700 focus:border-primary-700 transition-all duration-200 outline-none"
                        placeholder="+880 1XXX-XXXXXX"
                      />
                    </div>
                  </motion.div>

                  {/* Company field */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Company <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className={`h-5 w-5 ${focusedField === 'company' ? 'text-primary-700' : 'text-gray-400'} transition-colors duration-200`} />
                      </div>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-700 focus:border-primary-700 transition-all duration-200 outline-none"
                        placeholder="Your company name"
                      />
                    </div>
                  </motion.div>
                </motion.form>
              </div>

              {/* Footer with enhanced buttons */}
              <div className="px-8 pb-8">
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Primary action button */}
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full group relative inline-flex items-center justify-center px-8 py-4 bg-primary-700 text-white font-medium rounded-xl hover:bg-primary-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    {/* Button background animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Button content */}
                    <span className="relative flex items-center">
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
                          <Download className="mr-2 h-5 w-5" />
                          Download {brochureName} Brochure
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </span>
                  </button>

                  {/* Secondary action button */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full px-6 py-3 text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </motion.div>

                {/* Privacy notice */}
                <motion.p 
                  className="text-xs text-center text-gray-500 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  By downloading, you agree to our{' '}
                  <a href="/privacy" className="text-primary-700 hover:text-primary-900 underline">
                    Privacy Policy
                  </a>
                </motion.p>
              </div>

              {/* Loading progress bar */}
              <AnimatePresence>
                {isSubmitting && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="h-1 bg-primary-700 origin-left"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BrochureDownloadModal;