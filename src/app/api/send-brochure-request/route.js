// app/api/send-brochure-request/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, carModel } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email HTML content for admin notification
    const adminEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Brochure Download Request</h2>
          
          <p>A visitor has requested to download a brochure. Here are their details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9fafb;"><strong>Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9fafb;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9fafb;"><strong>Phone:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9fafb;"><strong>Company:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${company || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9fafb;"><strong>Brochure:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${carModel}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; background-color: #f9fafb;"><strong>Request Date:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          
          <p style="color: #6b7280; font-size: 14px;">This is an automated notification from the Chery BD website.</p>
        </div>
      </body>
      </html>
    `;

    // Send email to admin addresses
    await transporter.sendMail({
      from: `"Chery BD Website" <${process.env.GMAIL_USER}>`,
      to: ['info@cherybd.com', 'ratan.mia@continental-motors.com'],
      subject: `New Brochure Download Request - ${carModel}`,
      html: adminEmailContent,
    });

    // Email HTML content for user confirmation
    const userEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Thank You for Your Interest</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for downloading our ${carModel} brochure. We appreciate your interest in Chery vehicles.</p>
          
          <p>If you have any questions or would like to schedule a test drive, please don't hesitate to contact us:</p>
          
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;">Email: info@cherybd.com</li>
            <li style="margin-bottom: 10px;">Phone: [Your Phone Number]</li>
            <li style="margin-bottom: 10px;">Website: www.cherybd.com</li>
          </ul>
          
          <p>We look forward to serving you.</p>
          
          <p>Best regards,<br>
          Chery BD Team</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
        </div>
      </body>
      </html>
    `;

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Chery BD" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Your ${carModel} Brochure Download`,
      html: userEmailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}