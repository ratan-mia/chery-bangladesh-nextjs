// File: src/app/utils/models/AssistanceRequest.js
// Description: This file defines the Mongoose schema for the AssistanceRequest model.
import mongoose from 'mongoose';

/* 
  AssistanceRequestSchema will correspond to the 'assistance_requests' collection in MongoDB
  It defines the structure of the documents within that collection
*/
const AssistanceRequestSchema = new mongoose.Schema({
  // Assistance Details
  assistanceType: {
    type: String,
    required: [true, 'Please specify the type of assistance needed'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please provide your current location'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  
  // Vehicle Information
  vehicleModel: {
    type: String,
    required: [true, 'Please provide the vehicle model'],
    trim: true
  },
  vehicleRegNumber: {
    type: String,
    required: [true, 'Please provide the vehicle registration number'],
    trim: true
  },
  
  // Customer Information
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  contactNumber: {
    type: String,
    required: [true, 'Please provide your contact number'],
    trim: true
  },
  
  // Request Status
  status: {
    type: String,
    enum: ['pending', 'dispatched', 'completed', 'cancelled'],
    default: 'pending'
  },
  referenceNumber: {
    type: String,
    required: true,
    unique: true
  },
  
  // Dispatch Information (added when assistance is dispatched)
  dispatchedAt: {
    type: Date
  },
  estimatedArrivalTime: {
    type: Date
  },
  technicianName: {
    type: String,
    trim: true
  },
  technicianContact: {
    type: String,
    trim: true
  },
  
  // Resolution Information
  resolutionNotes: {
    type: String,
    trim: true
  },
  serviceProvidedAt: {
    type: Date
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field on save
AssistanceRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Check if the model exists before creating a new one 
// This is important for Next.js hot reloading
export default mongoose.models.AssistanceRequest || mongoose.model('AssistanceRequest', AssistanceRequestSchema);