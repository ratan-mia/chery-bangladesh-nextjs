import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateAdminEmailTemplate } from './emails/admin-template';
import { generateCustomerEmailTemplate } from './emails/customer-template';

export async function POST(request) {
  try {
    // Parse the request body
    const formData = await request.json();
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Phone validation - accepts various formats with optional country codes
    const phoneRegex = /^\+?[0-9\s-()]{8,20}$/;
    if (!phoneRegex.test(formData.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }
    
    // Configure Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Using Gmail service specifically
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    
    console.log('Attempting to verify SMTP connection...');
    
    // Test the connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP connection failed:', verifyError);
      return NextResponse.json(
        { error: 'Email server connection failed. Please try again later.' },
        { status: 500 }
      );
    }
    
    // Create a unique reference number for this inquiry
    const refNumber = `INQ-${Date.now().toString(36).toUpperCase()}`;
    
    // Get email templates from separate files
    const adminHtmlContent = generateAdminEmailTemplate(formData, refNumber);
    const customerHtmlContent = generateCustomerEmailTemplate(formData, refNumber);

    // Send email to administrators
    console.log('Sending email to administrators...');
    try {
      const adminInfo = await transporter.sendMail({
        from: `"Chery Bangladesh Website" <${process.env.GMAIL_USER}>`,
        to: ['info@cherybd.com', 'ratan.mia@continental-motor.com'],
        subject: `Website Contact: ${formData.subject}`,
        html: adminHtmlContent,
        replyTo: formData.email,
      });
      console.log('Admin email sent successfully:', adminInfo.messageId);
    } catch (adminEmailError) {
      console.error('Error sending admin email:', adminEmailError);
      throw new Error('Failed to send notification to admins');
    }

    // Send auto-response to customer
    console.log('Sending confirmation to customer...');
    try {
      const customerInfo = await transporter.sendMail({
        from: `"Chery Bangladesh" <${process.env.GMAIL_USER}>`,
        to: formData.email,
        subject: 'Thank You for Contacting Chery Bangladesh',
        html: customerHtmlContent,
      });
      console.log('Customer email sent successfully:', customerInfo.messageId);
    } catch (customerEmailError) {
      console.error('Error sending customer email:', customerEmailError);
      // Continue even if customer email fails - at least admin was notified
    }

    // Return success response
    return NextResponse.json(
      { message: 'Your message has been sent successfully. We will contact you soon.' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error in contact form submission:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'Failed to send your message. Please try again later.' },
      { status: 500 }
    );
  }
}