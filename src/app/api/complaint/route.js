import sendComplaintToZoho from '@/utils/complaint-to-zoho';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateAdminComplaintEmailTemplate } from './emails/adminComplaintEmailTemplate';
import { generateCustomerComplaintEmailTemplate } from './emails/customerComplaintEmailTemplate';

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      complaintType,
      priority,
      vehicleModel,
      vehicleYear,
      vinNumber,
      purchaseDate,
      dealerName,
      name,
      email,
      contactNumber,
      alternateNumber,
      address,
      complaintTitle,
      complaintDescription,
      previousServiceHistory,
      desiredResolution,
      attachments
    } = data;

    // Email configuration
    const emailConfig = {
      // Sender details
      sender: {
        name: 'Chery Bangladesh Complaint System',
        email: process.env.GMAIL_USER,
      },
      
      // Admin recipients
      adminRecipients: [
        process.env.GMAIL_USER,
        'customer.service@cherybd.com',
        'complaints@cherybd.com'
      ],
      
      // Email subject
      adminSubject: `New Customer Complaint: ${complaintType} - ${priority} Priority`,
      customerSubject: 'Your Chery Bangladesh Complaint Submission Confirmation',
    };

    // Create nodemailer transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Generate complaint ID (timestamp + random)
    const complaintId = `CHR-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Prepare complaint data with ID
    const complaintData = {
      ...data,
      complaintId,
      submissionDate: new Date().toISOString(),
      status: 'Submitted'
    };

    // Send to Zoho CRM
    try {
      await sendComplaintToZoho(complaintData);
      console.log('Complaint sent to Zoho CRM successfully');
    } catch (zohoError) {
      console.error('Error sending to Zoho CRM:', zohoError);
      // Continue with email sending even if Zoho fails
    }

    // Send admin notification email
    try {
      await transporter.sendMail({
        from: `"${emailConfig.sender.name}" <${emailConfig.sender.email}>`,
        to: emailConfig.adminRecipients,
        subject: emailConfig.adminSubject,
        html: generateAdminComplaintEmailTemplate(complaintData),
      });
      console.log('Admin complaint notification sent successfully');
    } catch (emailError) {
      console.error('Error sending admin email:', emailError);
    }

    // Send customer confirmation email
    try {
      await transporter.sendMail({
        from: `"Chery Bangladesh" <${emailConfig.sender.email}>`,
        to: email,
        subject: emailConfig.customerSubject,
        html: generateCustomerComplaintEmailTemplate(complaintData),
      });
      console.log('Customer complaint confirmation sent successfully');
    } catch (emailError) {
      console.error('Error sending customer email:', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Complaint submitted successfully. We will contact you within 24-48 hours.',
      complaintId: complaintId
    });

  } catch (error) {
    console.error('Error processing complaint:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit complaint. Please try again or contact us directly.',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}