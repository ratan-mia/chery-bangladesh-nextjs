// app/api/send-brochure-request/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define document links for each model and type combination
const documentLinks = {
  'Tiggo 8 Pro': {
    'brochure': 'https://cloud.continental-motor.com:5001/d/s/13EH29DP3ZDYnm03L2S9Bc4iCCLMOWKk/s2uL4rkJgwWA1TM1yioCzQNB6UAecoRY-abPA5-UkQQw',
    'manual': 'https://cloud.continental-motor.com:5001/d/s/13EH42HEbUG2seQ7IEIhOikPHdT1dHkf/pRCdmG5e4iVKeOWX8bjTgN8jcYB_ONx7-NrXAo_8kQQw'
  },
  'Tiggo Cross': {
    'brochure': 'https://cloud.continental-motor.com:5001/d/s/13EH21cUWk0qSNYeOzYuPHDtV4CH0Vdn/cIaSBKtEyNEw5G5BWX9PW36dMiX6LkT2-ArPgAN8kQQw',
    'manual': 'https://cloud.continental-motor.com:5001/d/s/13EH4Uifb741Vr4efuI5ukQwb8yRTVDt/IWzS7bQ4dFTiPlh8quz1br1zcCz5sq52-tLbgehUlQQw'
  }
};

// Helper function to get document type display name
const getDocumentTypeLabel = (type) => {
  return type === 'brochure' ? 'Brochure' : 'User Manual';
};

// Validate email format
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Validate Bangladeshi phone format
const validatePhone = (phone) => {
  // Basic Bangladeshi phone validation (starts with +880 or 01, followed by 8-10 digits)
  const re = /^(\+8801|01)[0-9]{8,10}$/;
  return re.test(String(phone).replace(/\s+/g, ''));
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, carModel, documentType } = body;

    // Validate required fields
    if (!name || !email || !phone || !carModel || !documentType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!validatePhone(phone.replace(/\s+/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone format. Please use a valid Bangladeshi number' },
        { status: 400 }
      );
    }

    // Get document link
    const documentLink = documentLinks[carModel]?.[documentType];
    if (!documentLink) {
      return NextResponse.json(
        { error: 'Selected document is not available' },
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

    // Format date for display
    const formattedDate = new Date().toLocaleString('en-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Dhaka'
    });

    // IP and location tracking (if available from request)
    let ipAddress = request.headers.get('x-forwarded-for') || 'Not available';
    let userAgent = request.headers.get('user-agent') || 'Not available';

    // Email HTML content for admin notification
    const adminEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #111827;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            margin-bottom: 20px;
          }
          .title {
            color: #524336;
            font-size: 24px;
            font-weight: bold;
            border-bottom: 2px solid #8c735d;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .data-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            border-radius: 8px;
            overflow: hidden;
          }
          .data-table th,
          .data-table td {
            padding: 12px;
            text-align: left;
            border: 1px solid #e5e7eb;
          }
          .data-table th {
            background-color: #f3f4f6;
            font-weight: bold;
            color: #524336;
          }
          .data-table tr:nth-child(even) {
            background-color: #f9fafb;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
            text-align: center;
          }
          .accent {
            height: 6px;
            background: linear-gradient(to right, #8c735d, #524336);
            margin-bottom: 30px;
            border-radius: 3px;
          }
          .meta-info {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="accent"></div>
          <div class="header">
            <div class="logo">
              <img src="https://www.cherybd.com/_next/image?url=%2Flogo.png&w=640&q=75" alt="Chery Logo" style="max-width: 150px;">
            </div>
            <h1 class="title">New Document Download Request</h1>
          </div>
          
          <p>A visitor has requested to download a document. Here are their details:</p>
          
          <table class="data-table">
            <tr>
              <th>Name:</th>
              <td>${name}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <th>Phone:</th>
              <td><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr>
              <th>Company:</th>
              <td>${company || 'Not provided'}</td>
            </tr>
            <tr>
              <th>Vehicle Model:</th>
              <td>${carModel}</td>
            </tr>
            <tr>
              <th>Document Type:</th>
              <td>${getDocumentTypeLabel(documentType)}</td>
            </tr>
            <tr>
              <th>Request Date:</th>
              <td>${formattedDate}</td>
            </tr>
          </table>
          
          <div class="meta-info">
            <p><strong>Technical Information:</strong></p>
            <p>IP Address: ${ipAddress}</p>
            <p>User Agent: ${userAgent}</p>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from the Chery Bangladesh website.</p>
            <p>&copy; ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email HTML content for user confirmation
    const userEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #111827;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            margin-bottom: 20px;
          }
          .accent-bar {
            height: 6px;
            background: linear-gradient(to right, #8c735d, #524336);
            margin-bottom: 30px;
            border-radius: 3px;
          }
          .title {
            color: #524336;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .subtitle {
            color: #6b7280;
            font-size: 18px;
            margin-bottom: 30px;
          }
          .content {
            padding: 0 20px;
          }
          .download-button {
            display: inline-block;
            background-color: #8c735d;
            color: #ffffff !important;
            padding: 14px 24px;
            text-decoration: none !important;
            font-weight: bold;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
          }
          .download-button:hover {
            background-color: #524336;
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
          }
          .contact-details {
            background-color: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
            border: 1px solid #e5e7eb;
          }
          .contact-item {
            margin-bottom: 10px;
          }
          .contact-item a {
            color: #8c735d;
            text-decoration: none;
          }
          .contact-item a:hover {
            text-decoration: underline;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
            text-align: center;
          }
          .model-image {
            width: 100%;
            max-width: 500px;
            height: auto;
            border-radius: 8px;
            margin: 20px 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .social-links {
            margin-top: 20px;
            text-align: center;
          }
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #8c735d;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="accent-bar"></div>
          <div class="header">
            <div class="logo">
              <img src="https://www.cherybd.com/_next/image?url=%2Flogo.png&w=640&q=75" alt="Chery Logo" style="max-width: 150px;">
            </div>
            <h1 class="title">Thank You for Your Interest</h1>
            <p class="subtitle">Your ${carModel} ${getDocumentTypeLabel(documentType)} Download</p>
          </div>
          
          <div class="content">
            <p>Dear ${name},</p>
            
            <p>Thank you for your interest in Chery vehicles. As requested, below is the link to download the ${getDocumentTypeLabel(documentType)} for the ${carModel}:</p>
            
            <div style="text-align: center;">
              <a href="${documentLink}" class="download-button">
                Download ${carModel} ${getDocumentTypeLabel(documentType)}
              </a>
            </div>
            
            <img src="https://cherybd.com/images/${carModel.toLowerCase().replace(/\s+/g, '-')}.webp" alt="${carModel}" class="model-image" />
            
            <p>If you have any questions or would like to schedule a test drive, please don't hesitate to contact us:</p>
            
            <div class="contact-details">
              <div class="contact-item"><strong>Email:</strong> <a href="mailto:info@cherybd.com">info@cherybd.com</a></div>
              <div class="contact-item"><strong>Phone:</strong> <a href="tel:+09639119977">09639119977</a></div>
              <div class="contact-item"><strong>Website:</strong> <a href="https://www.cherybd.com">www.cherybd.com</a></div>
              <div class="contact-item"><strong>Showroom:</strong> 206/1-207/1 Bir Uttam Mir Shawkat Sarak, Tejgaon Gulshan Link Road, Dhaka</div>
            </div>
            
            <p>We look forward to serving you.</p>
            
            <p>Best regards,<br>
            Chery Bangladesh Team</p>
            
            <div class="social-links">
              <a href="https://www.facebook.com/CheryBDofficial">Facebook</a>
              <a href="https://instagram.com/cherybangladesh">Instagram</a>
              <a href="https://www.youtube.com/@cherybangladesh">YouTube</a>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to admin addresses with error handling
    try {
      await transporter.sendMail({
        from: `"Chery Bangladesh" <${process.env.GMAIL_USER}>`,
        to: ['info@cherybd.com', 'ratan.mia@continental-motor.com'],
        subject: `New ${getDocumentTypeLabel(documentType)} Download Request - ${carModel}`,
        html: adminEmailContent,
      });
    } catch (error) {
      console.error('Error sending admin email:', error);
      // Continue anyway - don't fail if admin email fails
    }

    // Send confirmation email to user
    try {
      await transporter.sendMail({
        from: `"Chery Bangladesh" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `Your ${carModel} ${getDocumentTypeLabel(documentType)} Download Link`,
        html: userEmailContent,
      });
    } catch (error) {
      console.error('Error sending user email:', error);
      return NextResponse.json(
        { error: 'Failed to send confirmation email. Please try again later.' },
        { status: 500 }
      );
    }

    // Log download request for analytics
    try {
      // This could be implemented to save to a database
      console.log('Document download requested:', {
        timestamp: new Date(),
        name,
        email,
        phone,
        company,
        carModel,
        documentType,
        ip: ipAddress
      });
    } catch (error) {
      console.error('Error logging request:', error);
      // Don't fail if logging fails
    }

    return NextResponse.json({ 
      success: true,
      message: 'Document request submitted successfully. Please check your email.'
    });
  } catch (error) {
    console.error('Error processing document request:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
}