// /models/Booking.js
import mongoose from 'mongoose';

/* 
  BookingSchema will correspond to the 'bookings' collection in MongoDB
  It defines the structure of the documents within that collection
*/
const BookingSchema = new mongoose.Schema({
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
  
  // Service Details
  serviceType: {
    type: String,
    required: [true, 'Please select a service type'],
    trim: true
  },
  preferredDate: {
    type: Date,
    required: [true, 'Please select a preferred date']
  },
  preferredTime: {
    type: String,
    required: [true, 'Please select a preferred time'],
    trim: true
  },
  notes: {
    type: String,
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
  
  // Booking Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  confirmationNumber: {
    type: String,
    required: true,
    unique: true
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
BookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Check if the model exists before creating a new one 
// This is important for Next.js hot reloading
export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);