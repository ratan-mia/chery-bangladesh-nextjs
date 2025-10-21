"use client";

import { motion } from "framer-motion";
import {
    AlertCircle,
    Car,
    CheckCircle,
    FileText,
    Loader2,
    Send,
    User
} from "lucide-react";
import { useState } from "react";

const ComplaintFormSection = () => {
  const [formData, setFormData] = useState({
    // Complaint Information
    complaintType: "",
    priority: "",
    complaintTitle: "",
    complaintDescription: "",
    desiredResolution: "",
    
    // Vehicle Information
    vehicleModel: "",
    vehicleYear: "",
    vinNumber: "",
    purchaseDate: "",
    dealerName: "",
    previousServiceHistory: "",
    
    // Customer Information
    name: "",
    email: "",
    contactNumber: "",
    alternateNumber: "",
    address: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [complaintId, setComplaintId] = useState("");
  const [errors, setErrors] = useState({});

  const complaintTypes = [
    "Vehicle Quality Issues",
    "Service & Maintenance", 
    "Warranty Claims",
    "Billing & Payment",
    "Customer Service",
    "Documentation Issues",
    "Other"
  ];

  const priorityLevels = [
    { value: "Low", label: "Low - General inquiry or minor issue" },
    { value: "Medium", label: "Medium - Moderate impact on vehicle use" },
    { value: "High", label: "High - Significant impact on vehicle use" },
    { value: "Critical", label: "Critical - Safety concern or vehicle unusable" }
  ];

  const vehicleModels = [
    "Tiggo 8 Pro",
    "Tiggo 9 Pro", 
    "Tiggo Cross",
    "Other"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const dealers = [
    "Asian MotorspeX Limited - Dhaka",
    "Chittagong Showroom",
    "Khulna Service Center",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    if (!formData.complaintType) newErrors.complaintType = "Please select complaint type";
    if (!formData.priority) newErrors.priority = "Please select priority level";
    if (!formData.complaintTitle.trim()) newErrors.complaintTitle = "Complaint title is required";
    if (!formData.complaintDescription.trim()) newErrors.complaintDescription = "Complaint description is required";
    if (!formData.vehicleModel) newErrors.vehicleModel = "Please select vehicle model";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (Bangladesh format)
    const phoneRegex = /^(\+8801|01)[3-9]\d{8}$/;
    if (formData.contactNumber && !phoneRegex.test(formData.contactNumber.replace(/\s/g, ''))) {
      newErrors.contactNumber = "Please enter a valid Bangladesh phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setComplaintId(result.complaintId);
        setFormData({
          complaintType: "",
          priority: "",
          complaintTitle: "",
          complaintDescription: "",
          desiredResolution: "",
          vehicleModel: "",
          vehicleYear: "",
          vinNumber: "",
          purchaseDate: "",
          dealerName: "",
          previousServiceHistory: "",
          name: "",
          email: "",
          contactNumber: "",
          alternateNumber: "",
          address: ""
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus(null);
    setComplaintId("");
    setErrors({});
  };

  if (submitStatus === 'success') {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complaint Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for reaching out to us. Your complaint has been received and logged in our system.
            </p>
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Your Complaint ID
              </h3>
              <div className="text-2xl font-bold text-primary-700 mb-2">
                {complaintId}
              </div>
              <p className="text-sm text-gray-600">
                Please save this ID for future reference
              </p>
            </div>
            <div className="space-y-4 text-left mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-primary-700 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Acknowledgment (Within 4 hours)</h4>
                  <p className="text-gray-600 text-sm">You'll receive an email confirmation shortly</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-primary-700 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Investigation</h4>
                  <p className="text-gray-600 text-sm">Our team will investigate and may contact you for more details</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-primary-700 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Resolution</h4>
                  <p className="text-gray-600 text-sm">We'll work with you to resolve the issue satisfactorily</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-primary-700 text-white font-medium hover:bg-primary-800 transition-colors duration-300 rounded-md"
              >
                File Another Complaint
              </button>
              <a
                href="#contact"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-300 rounded-md"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            File Your <span className="text-primary-900">Complaint</span>
          </h2>
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg">
            Please provide detailed information about your concern. The more details you provide, 
            the better we can assist you in resolving the issue.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle size={20} className="text-red-600 mr-3" />
              <p className="text-red-700">
                There was an error submitting your complaint. Please try again or contact us directly.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Complaint Information */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText size={24} className="mr-3 text-primary-700" />
                Complaint Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complaint Type *
                  </label>
                  <select
                    name="complaintType"
                    value={formData.complaintType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 ${
                      errors.complaintType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select complaint type</option>
                    {complaintTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.complaintType && (
                    <p className="mt-1 text-sm text-red-600">{errors.complaintType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level *
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 ${
                      errors.priority ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select priority level</option>
                    {priorityLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                  {errors.priority && (
                    <p className="mt-1 text-sm text-red-600">{errors.priority}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complaint Title *
                </label>
                <input
                  type="text"
                  name="complaintTitle"
                  value={formData.complaintTitle}
                  onChange={handleInputChange}
                  placeholder="Brief summary of your complaint"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 ${
                    errors.complaintTitle ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.complaintTitle && (
                  <p className="mt-1 text-sm text-red-600">{errors.complaintTitle}</p>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="complaintDescription"
                  value={formData.complaintDescription}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Please provide detailed information about your complaint including dates, circumstances, and any relevant details..."
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 ${
                    errors.complaintDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.complaintDescription && (
                  <p className="mt-1 text-sm text-red-600">{errors.complaintDescription}</p>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Resolution
                </label>
                <textarea
                  name="desiredResolution"
                  value={formData.desiredResolution}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="What outcome are you hoping for? (e.g., repair, replacement, refund, etc.)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700"
                />
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Car size={24} className="mr-3 text-primary-700" />
                Vehicle Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Model *
                  </label>
                  <select
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 ${
                      errors.vehicleModel ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select vehicle model</option>
                    {vehicleModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                  {errors.vehicleModel && (
                    <p className="mt-1 text-sm text-red-600">{errors.vehicleModel}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Year
                  </label>
                  <select
                    name="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700"
                  >
                    <option value="">Select year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    VIN Number
                  </label>
                  <input
                    type="text"
                    name="vinNumber"
                    value={formData.vinNumber}
                    onChange={handleInputChange}
                    placeholder="Vehicle Identification Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dealer/Service Center
                  </label>
                  <select
                    name="dealerName"
                    value={formData.dealerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700"
                  >
                    <option value="">Select dealer/service center</option>
                    {dealers.map(dealer => (
                      <option key={dealer} value={dealer}>{dealer}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Service History
                  </label>
                  <textarea
                    name="previousServiceHistory"
                    value={formData.previousServiceHistory}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any previous service history, repairs, or related issues..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700"
                  />
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <User size={24} className="mr-3 text-primary-700" />
                Your Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="01XXXXXXXXX"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700 ${
                      errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.contactNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternate Number
                  </label>
                  <input
                    type="tel"
                    name="alternateNumber"
                    value={formData.alternateNumber}
                    onChange={handleInputChange}
                    placeholder="01XXXXXXXXX (Optional)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Your complete address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-700"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center px-8 py-4 bg-primary-700 text-white font-medium hover:bg-primary-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Submitting Complaint...
                  </>
                ) : (
                  <>
                    Submit Complaint
                    <Send
                      size={20}
                      className="ml-2 group-hover:ml-3 transition-all duration-300"
                    />
                  </>
                )}
              </button>
              
              <p className="mt-4 text-sm text-gray-600">
                By submitting this form, you agree to our terms of service and privacy policy. 
                We'll use this information to process and resolve your complaint.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplaintFormSection;