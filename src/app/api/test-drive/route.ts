// app/api/test-drive-booking/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { adminEmailTemplate, customerEmailTemplate } from '../../../lib/email-templates';

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      vehicleModel,
      preferredDate,
      preferredTime,
      location,
      contactNumber,
      name,
      email,
      drivingExperience,
      specificRequests
    } = data;

    // Email configuration
    const emailConfig = {
      // Sender details
      sender: {
        name: 'Chery Bangladesh',
        email: process.env.EMAIL_USER,
      },
      
      // Admin recipients
      adminRecipients: [
        'info@cherybd.com',
        'ratan.mia@continental-motor.com'
      ],
      
      // Email subjects
      subjects: {
        testDriveAdmin: 'New Test Drive Booking - Chery Bangladesh',
        testDriveCustomer: 'Your Chery Test Drive Booking Confirmation',
      }
    };

    // Create a nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Format the date for better readability
    const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Vehicle model display names map
    const vehicleModelNames = {
      'tiggo4pro': 'Tiggo 4 Pro',
      'tiggo7pro': 'Tiggo 7 Pro',
      'tiggo8pro': 'Tiggo 8 Pro',
      'arrizo6': 'Arrizo 6',
      'omoda': 'Omoda',
      'jaccoo': 'Jaccoo'
    };

    const vehicleModelName = vehicleModelNames[vehicleModel] || vehicleModel;

    // Format the booking data for email
    const bookingData = {
      name,
      email,
      contactNumber,
      vehicleModel: vehicleModelName,
      preferredDate: formattedDate,
      preferredTime,
      location,
      drivingExperience: drivingExperience || 'Not specified',
      specificRequests: specificRequests || 'None',
      bookingId: `TD-${Date.now().toString().slice(-6)}`,
      bookingDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    };

    // Send email to admin (dealership)
    await transporter.sendMail({
      from: `"${emailConfig.sender.name}" <${emailConfig.sender.email}>`,
      to: emailConfig.adminRecipients,
      subject: `${emailConfig.subjects.testDriveAdmin} - ${vehicleModelName}`,
      html: adminEmailTemplate(bookingData),
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `"${emailConfig.sender.name}" <${emailConfig.sender.email}>`,
      to: email,
      subject: emailConfig.subjects.testDriveCustomer,
      html: customerEmailTemplate(bookingData),
    });

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Test drive booking submitted successfully' 
    });
  } catch (error) {
    console.error('Error processing test drive booking:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process your booking request'
      },
      { status: 500 }
    );
  }
}