// /app/api/book-service/route.js
import { generateAdminEmailTemplate } from '@/utils/emailTemplates/adminEmailTemplate';
import { generateCustomerEmailTemplate } from '@/utils/emailTemplates/customerEmailTemplate';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Format date for better readability
    const formattedDate = new Date(data.preferredDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Send email to administrators
    await transporter.sendMail({
      from: `"Chery Service Booking" <${process.env.GMAIL_USER}>`,
      to: [data.adminEmail1, data.adminEmail2],
      subject: `New Service Booking: ${data.vehicleModel} - ${data.serviceType}`,
      html: generateAdminEmailTemplate(data, formattedDate),
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `"Chery Bangladesh" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: 'Your Chery Service Booking Confirmation',
      html: generateCustomerEmailTemplate(data, formattedDate),
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Booking successful. Confirmation emails have been sent.'
    });
  } catch (error) {
    console.error('Error processing booking:', error);
    
    return NextResponse.json(
      { success: false, message: 'Failed to process booking request' },
      { status: 500 }
    );
  }
}