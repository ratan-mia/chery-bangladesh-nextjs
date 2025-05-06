'use client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Car,
  CheckCircle,
  Download,
  FileText,
  Mail,
  Phone,
  User,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';

const BrochureDownloadModal = ({ isOpen, onClose, defaultModel = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    carModel: defaultModel || 'Tiggo 8 Pro',
    documentType: 'brochure'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const carModels = [
    { value: 'Tiggo 8 Pro', label: 'Tiggo 8 Pro' },
    { value: 'Tiggo Cross', label: 'Tiggo Cross' },
  ];

  const documentTypes = [
    { value: 'brochure', label: 'Brochure' },
    { value: 'manual', label: 'User Manual' },
  ];

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        carModel: defaultModel || 'Tiggo 8 Pro',
        documentType: 'brochure'
      }));
      setError('');
      setSuccess(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, defaultModel]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    // Basic Bangladeshi phone validation (starts with +880 or 01, followed by 8-10 digits)
    const re = /^(\+8801|01)[0-9]{8,10}$/;
    return re.test(String(phone).replace(/\s+/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid Bangladeshi phone number');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      // Real API call implementation
      const response = await fetch('/api/send-brochure-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }
      
      setSuccess(true);
      
      // Reset form and close modal after success
      setTimeout(() => {
        onClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          carModel: defaultModel || 'Tiggo 8 Pro',
          documentType: 'brochure'
        });
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

      const renderField = (field) => {
    const commonInputClasses = `
      w-full pl-12 pr-4 py-3 bg-white 
      border border-gray-200  
      text-gray-900 transition-colors duration-300
      focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent
      hover:border-primary-light rounded-md text-sm sm:text-base
    `;
    
    return (
      <div key={field.name} className="relative mb-4 sm:mb-5">
        <div 
          className={`absolute left-0 top-4 bottom-4 w-1 rounded-l-md transition-colors duration-300 ${
            focusedField === field.name ? 'bg-primary-700' : 'bg-gray-200'
          }`}
        />
        <label 
          htmlFor={field.name}
          className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 pl-4"
        >
          {field.label}
          {field.optional && (
            <span className="text-gray-500 ml-1">(Optional)</span>
          )}
        </label>
        <div className="relative pl-4">
          <field.icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
            focusedField === field.name ? 'text-primary-700' : 'text-gray-400'
          }`} />
          
          {field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              onFocus={() => setFocusedField(field.name)}
              onBlur={() => setFocusedField(null)}
              required={field.required}
              className={commonInputClasses}
              aria-label={field.label}
            >
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              onFocus={() => setFocusedField(field.name)}
              onBlur={() => setFocusedField(null)}
              placeholder={field.placeholder}
              required={field.required}
              className={commonInputClasses}
              aria-label={field.label}
              autoComplete={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'off'}
            />
          )}
        </div>
      </div>
    );
  };

  const formFields = [
    {
      name: 'carModel',
      label: 'Vehicle Model',
      type: 'select',
      icon: Car,
      options: carModels,
      required: true
    },
    {
      name: 'documentType',
      label: 'Document Type',
      type: 'select',
      icon: FileText,
      options: documentTypes,
      required: true
    },
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      icon: User,
      placeholder: 'Enter your full name',
      required: true
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      icon: Mail,
      placeholder: 'you@example.com',
      required: true
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      icon: Phone,
      placeholder: '+880 1XXX-XXXXXX',
      required: true
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      icon: Building2,
      placeholder: 'Your company name',
      optional: true
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-start md:items-center md:justify-center">
          {/* Backdrop overlay */}
          <motion.div 
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div 
            className="relative w-full md:w-auto md:max-w-md h-screen md:h-auto md:max-h-[85vh] bg-white shadow-xl overflow-hidden flex flex-col"
            initial={{ x: '-100%', y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: '-100%', y: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-700 to-primary-900"></div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-gray-100 text-gray-600 hover:text-primary-900 hover:bg-primary-light/20 transition-colors duration-300"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="bg-white px-4 sm:px-6 md:px-8 pt-10 md:pt-14 pb-4 md:pb-6 relative overflow-hidden">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center mb-4 md:mb-6">
                  <div className="flex-shrink-0 mr-4 p-3 bg-primary-light/20 rounded-lg mb-3 sm:mb-0">
                    <FileText className="w-6 h-6 text-primary-900" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Download Documents
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Complete information about our vehicles
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
            </div>

            {/* Form content */}
            <div className="px-4 sm:px-6 md:px-8 py-4 md:py-6 flex-1 overflow-y-auto">
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-4 md:mb-6 overflow-hidden"
                  >
                    <div className="bg-white p-4 border-l-4 border-l-emerald-500 border-t border-r border-b border-gray-100 shadow-sm rounded-r">
                      <div className="flex items-center text-emerald-700">
                        <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                        <p className="font-medium text-sm sm:text-base">Document request submitted successfully! Check your email for the download link.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-4 md:mb-6 overflow-hidden"
                  >
                    <div className="bg-white p-4 border-l-4 border-l-red-500 border-t border-r border-b border-gray-100 shadow-sm rounded-r">
                      <div className="flex items-center text-red-700">
                        <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                        <p className="font-medium text-sm sm:text-base">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-2">
                    {formFields.slice(0, 2).map(renderField)}
                  </div>
                  {formFields.slice(2).map(renderField)}
                </div>
              </form>
            </div>

            {/* Footer with submit button */}
            <div className="border-t border-gray-200 px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-white">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3.5 bg-primary-700 hover:bg-primary-900 text-white font-medium transition-colors duration-300 group disabled:opacity-70 disabled:cursor-not-allowed shadow-sm rounded-md text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Request Document
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                )}
              </button>

              <p className="text-xs text-gray-600 text-center mt-4">
                By downloading, you agree to our{' '}
                <a href="/privacy" className="text-primary-700 hover:text-primary-900 underline font-medium">
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Progress indicator during submission */}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BrochureDownloadModal;