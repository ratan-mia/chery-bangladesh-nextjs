
import AssistanceRequest from '@/models/AssistanceRequest';
import dbConnect from '@/utils/dbConnect';
import { generateAdminAssistanceEmailTemplate } from '@/utils/emailTemplates/adminAssistanceEmailTemplate';
import { generateCustomerAssistanceEmailTemplate } from '@/utils/emailTemplates/customerAssistanceEmailTemplate';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Generate reference number
    const referenceNumber = generateReferenceNumber(data);
    
    // Connect to the database
    await dbConnect();
    
    // Create a new assistance request record
    const assistanceRequest = await AssistanceRequest.create({
      ...data,
      referenceNumber,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Create a nodemailer transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // your app password for Gmail
      },
    });

    // Format date for better readability
    const formattedDate = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Send email to administrators - high priority
    await transporter.sendMail({
      from: `"Chery Roadside Assistance" <${process.env.GMAIL_USER}>`,
      to: [data.adminEmail1, data.adminEmail2],
      subject: `URGENT: Roadside Assistance Request - ${data.assistanceType}`,
      html: generateAdminAssistanceEmailTemplate({...data, referenceNumber}, formattedDate),
      priority: 'high',
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'High'
      }
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: `"Chery Bangladesh" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: 'Your Roadside Assistance Request Confirmation',
      html: generateCustomerAssistanceEmailTemplate({...data, referenceNumber}, formattedDate),
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Your assistance request has been submitted! Our team will contact you shortly.',
      assistanceId: assistanceRequest._id,
      referenceNumber
    });
  } catch (error) {
    console.error('Error processing assistance request:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: error.name === 'ValidationError' 
          ? 'Invalid request data. Please check all fields and try again.' 
          : 'Failed to process assistance request. Please call our emergency hotline directly.'
      },
      { status: error.name === 'ValidationError' ? 400 : 500 }
    );
  }
}

// Generate a pseudo-random reference number
function generateReferenceNumber(data) {
  const dateStr = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 12);
  const randomStr = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const locationCode = data.location.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'X');
  
  return `RSA-${dateStr}-${randomStr}-${locationCode}`;
}