
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateAdminEmailTemplate } from './emails/adminEmailTemplate';
import { generateCustomerEmailTemplate } from './emails/customerEmailTemplate';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Create a nodemailer transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // your app password for Gmail
      },
    });

    // Format timestamp for better readability
    const formattedTimestamp = new Date(data.timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Dhaka'
    });

    // Map vehicle model codes to display names
    const vehicleModelMap = {
      'tiggo4pro': 'Tiggo 4 Pro',
      'tiggo7pro': 'Tiggo 7 Pro',
      'tiggo8pro': 'Tiggo 8 Pro',
      'arrizo6': 'Arrizo 6',
      'omoda': 'Omoda',
      'jaccoo': 'Jaccoo',
      'other': 'Other'
    };

    // Map assistance type codes to display names
    const assistanceTypeMap = {
      'towing': 'Vehicle Recovery/Towing',
      'flat-tire': 'Flat Tire',
      'battery': 'Battery Jump Start',
      'fuel': 'Fuel Delivery',
      'lockout': 'Lockout Assistance',
      'other': 'Other Emergency'
    };

    // Prepare data for email templates
    const emailData = {
      ...data,
      formattedTimestamp,
      vehicleModelDisplay: vehicleModelMap[data.vehicleModel] || data.vehicleModel,
      assistanceTypeDisplay: assistanceTypeMap[data.assistanceType] || data.assistanceType,
      requestId: generateRequestId()
    };

    // Send email to administrators
    await transporter.sendMail({
      from: `"Chery Emergency System" <${process.env.GMAIL_USER}>`,
      to: ['info@cherybd.com', 'ratan.mia@continental-motor.com'],
      subject: `🚨 URGENT: Emergency Assistance Request - ${emailData.vehicleModelDisplay}`,
      html: generateAdminEmailTemplate(emailData),
      priority: 'high'
    });

    // Send confirmation email to customer if email is provided
    if (data.email) {
      await transporter.sendMail({
        from: `"Chery Bangladesh Support" <${process.env.GMAIL_USER}>`,
        to: data.email,
        subject: 'Your Emergency Assistance Request - Chery Bangladesh',
        html: generateCustomerEmailTemplate(emailData),
      });
    }

    // Log the emergency request (in a real app, save to database)
    console.log('Emergency assistance request received:', {
      timestamp: formattedTimestamp,
      name: data.name,
      location: data.location,
      vehicleModel: vehicleModelMap[data.vehicleModel] || data.vehicleModel,
      assistanceType: assistanceTypeMap[data.assistanceType] || data.assistanceType
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Emergency assistance request received. Our team will contact you shortly.'
    });
  } catch (error) {
    console.error('Error processing emergency request:', error);
    
    return NextResponse.json(
      { success: false, message: 'Failed to process emergency assistance request' },
      { status: 500 }
    );
  }
}

// Generate a unique request ID
function generateRequestId() {
  const timestamp = new Date().getTime().toString(36);
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ER-${timestamp}-${random}`;
}