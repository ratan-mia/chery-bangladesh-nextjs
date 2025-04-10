import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
    
    // Configure Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Using Gmail service specifically
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // This MUST be an App Password, not your regular password
      },
    });
    
    // Log connection attempt
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

    // Create email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #b29980;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        ${formData.model ? `<p><strong>Vehicle Model:</strong> ${formData.model}</p>` : ''}
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Message:</h3>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
        </div>
        <p style="color: #777; font-size: 12px;">This email was sent from the contact form on the Chery Bangladesh website.</p>
      </div>
    `;

    // Send email to administrators
    console.log('Sending email to administrators...');
    const adminInfo = await transporter.sendMail({
      from: `"Chery Bangladesh Website" <${process.env.GMAIL_USER}>`,
      to: ['info@cherybd.com', 'ratan.mia@continental-motor.com'],
      subject: `Website Contact: ${formData.subject}`,
      html: htmlContent,
      replyTo: formData.email,
    });
    
    console.log('Admin email sent successfully:', adminInfo.messageId);

    // Send auto-response to customer
    console.log('Sending confirmation to customer...');
    const customerInfo = await transporter.sendMail({
      from: `"Chery Bangladesh" <${process.env.GMAIL_USER}>`,
      to: formData.email,
      subject: 'Thank You for Contacting Chery Bangladesh',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #b29980;">Thank You for Contacting Us</h2>
          <p>Dear ${formData.name},</p>
          <p>Thank you for reaching out to Chery Bangladesh. We have received your message and a member of our team will get back to you shortly.</p>
          ${formData.model ? `<p>We appreciate your interest in the ${formData.model} model.</p>` : ''}
          <p>If you need immediate assistance, please call us at 09639119977.</p>
          <p>Best regards,<br>The Chery Bangladesh Team</p>
          <p style="color: #777; font-size: 12px;">This is an automated response. Please do not reply to this email.</p>
        </div>
      `,
    });
    
    console.log('Customer email sent successfully:', customerInfo.messageId);

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