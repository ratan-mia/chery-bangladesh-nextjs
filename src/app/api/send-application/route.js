// app/api/send-application/route.js

import { randomUUID } from 'crypto';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

// Create HTML email template for HR
function createHREmailTemplate(data) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Job Application</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #e0e0e0;
    }
    .header {
      background-color: #8B0000;
      padding: 20px;
      text-align: center;
      color: white;
    }
    .content {
      padding: 20px;
      background-color: #ffffff;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      border: 1px solid #e0e0e0;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #f5f5f5;
    }
    .message-box {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Job Application Received</h1>
    </div>
    <div class="content">
      <p>A new application has been submitted through the Chery Bangladesh careers page.</p>
      
      <table>
        <tr>
          <th>Field</th>
          <th>Information</th>
        </tr>
        <tr>
          <td>Name</td>
          <td>${data.name}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>${data.email}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>${data.phone}</td>
        </tr>
        <tr>
          <td>Department</td>
          <td>${data.department}</td>
        </tr>
      </table>
      
      <h3>Cover Letter/Additional Information:</h3>
      <div class="message-box">
        ${data.message ? data.message.replace(/\n/g, '<br>') : 'No additional information provided.'}
      </div>
      
      <p>Please find the applicant's resume attached to this email.</p>
      <p>This application was received on ${new Date().toLocaleString()}.</p>
    </div>
    <div class="footer">
      <p>This is an automated message from the Chery Bangladesh website.</p>
      <p>&copy; ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

// Create HTML email template for Manager
function createManagerEmailTemplate(data) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Job Application Notification</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #e0e0e0;
    }
    .header {
      background-color: #8B0000;
      padding: 20px;
      text-align: center;
      color: white;
    }
    .content {
      padding: 20px;
      background-color: #ffffff;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
    .highlight {
      background-color: #ffeb3b;
      padding: 2px 5px;
      font-weight: bold;
    }
    .applicant-info {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background-color: #8B0000;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Application Alert</h1>
    </div>
    <div class="content">
      <p>Dear Manager,</p>
      
      <p>A new candidate has applied for the <span class="highlight">${data.department}</span> department.</p>
      
      <div class="applicant-info">
        <p><strong>Applicant:</strong> ${data.name}</p>
        <p><strong>Contact:</strong> ${data.email} | ${data.phone}</p>
      </div>
      
      <p>The complete application details and resume have been sent to the HR department.</p>
      
      <p>Please coordinate with HR if you would like to schedule an interview with this candidate.</p>
      
      <p>This application was received on ${new Date().toLocaleString()}.</p>
      
      <a href="mailto:${data.email}" class="button">Contact Applicant</a>
    </div>
    <div class="footer">
      <p>This is an automated message from the Chery Bangladesh website.</p>
      <p>&copy; ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

// Helper function to read the form data
async function readFormData(request) {
  const formData = await request.formData();
  const data = {};
  
  // Extract all fields except file
  for (const [key, value] of formData.entries()) {
    if (key !== 'resume') {
      data[key] = value;
    }
  }
  
  // Get file data
  const resumeFile = formData.get('resume');
  
  return { formData: data, file: resumeFile };
}

// Helper function to save file to disk
async function saveFileToDisk(file) {
  // Create temp directory if it doesn't exist
  const tmpDir = path.join(process.cwd(), 'tmp');
  try {
    await fs.promises.mkdir(tmpDir, { recursive: true });
  } catch (err) {
    console.error('Error creating temp directory:', err);
  }
  
  // Generate a unique filename
  const filename = `${randomUUID()}-${file.name}`;
  const filepath = path.join(tmpDir, filename);
  
  // Convert file to buffer and save
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Write file to disk
  await writeFile(filepath, buffer);
  
  return { filepath, originalFilename: file.name };
}

// API route handler
export async function POST(request) {
  try {
    // Parse the multipart form data
    const { formData, file } = await readFormData(request);
    
    // Check if we have all required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.department || !file) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Save file to disk
    const { filepath, originalFilename } = await saveFileToDisk(file);
    
    // Create mail transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Set these in your .env file
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Generate department name for email subject
    const departmentNames = {
      sales: 'Sales',
      service: 'Service & After-Sales',
      marketing: 'Marketing',
      admin: 'Administration',
      parts: 'Parts & Logistics',
      other: 'Other Department'
    };
    
    const departmentName = departmentNames[formData.department] || 'Unspecified Department';
    
    // Read the file content
    const fileContent = fs.readFileSync(filepath);

    // Email options for HR
    const hrMailOptions = {
      from: process.env.GMAIL_USER,
      to: 'hr@cherybd.com',
      subject: `New Job Application: ${formData.name} - ${departmentName}`,
      html: createHREmailTemplate(formData),
      attachments: [
        {
          filename: originalFilename,
          content: fileContent
        }
      ]
    };

    // Email options for Manager
    const managerMailOptions = {
      from: process.env.GMAIL_USER,
      to: 'ratan.mia@continental-motor.com',
      subject: `New Applicant Alert: ${formData.name} for ${departmentName}`,
      html: createManagerEmailTemplate(formData),
      attachments: [
        {
          filename: originalFilename,
          content: fileContent
        }
      ]
    };

    // Send emails
    await transporter.sendMail(hrMailOptions);
    await transporter.sendMail(managerMailOptions);

    // Clean up: remove the temporary file after sending
    fs.unlinkSync(filepath);

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully' 
    });
    
  } catch (error) {
    console.error('Error processing application:', error);
    
    return NextResponse.json(
      { success: false, error: 'Failed to process application' },
      { status: 500 }
    );
  }
}