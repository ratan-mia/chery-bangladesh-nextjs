export function generateCustomerEmailTemplate(formData, refNumber) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Chery Bangladesh</title>
    </head>
    <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333333; max-width: 650px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); padding: 30px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <!-- Logo would go here in production -->
          <h1 style="color: #b29980; font-size: 24px; margin-top: 20px;">Thank You for Contacting Us</h1>
        </div>
  
        <div style="margin-bottom: 30px;">
          <p>Dear ${formData.name},</p>
          
          <p>Thank you for reaching out to Chery Bangladesh. We have received your inquiry regarding <strong>"${formData.subject}"</strong> and a member of our team will get back to you shortly.</p>
          
          <div style="background-color: #f8f4f0; border-left: 4px solid #b29980; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin-top: 0;">Your request has been assigned a reference number: <strong>${refNumber}</strong></p>
            <p style="margin-bottom: 0;">Please save this for future correspondence.</p>
          </div>
          
          ${formData.model ? `
          <p>We appreciate your interest in the <strong>${formData.model}</strong> model. Our team is excited to provide you with all the information you need.</p>
          ` : ''}
          
          <p>Here's what you can expect next:</p>
          <ul>
            <li>A dedicated representative will review your inquiry</li>
            <li>You will receive a personal response within 24-48 business hours</li>
            <li>We may contact you via phone for additional information</li>
          </ul>
        </div>
  
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin-top: 20px; text-align: center;">
          <h3 style="color: #333333; margin-top: 0;">Need Immediate Assistance?</h3>
          <p>Call us: <a href="tel:09639119977" style="color: #b29980; text-decoration: none;">09639119977</a></p>
          <p>Email: <a href="mailto:info@cherybd.com" style="color: #b29980; text-decoration: none;">info@cherybd.com</a></p>
          <p>Visit our showroom: 206/1-207/1 Bir Uttam Mir Shawkat Sarak<br>Tejgaon Gulshan Link Road, Dhaka</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p>Connect with us:</p>
          <div>
            <a href="https://www.facebook.com/CheryBDofficial" style="display: inline-block; background-color: #f0f0f0; width: 32px; height: 32px; line-height: 32px; text-align: center; border-radius: 50%; margin: 0 5px; text-decoration: none; color: #333333;" title="Facebook">FB</a>
            <a href="https://www.linkedin.com/company/chery-bangladesh/" style="display: inline-block; background-color: #f0f0f0; width: 32px; height: 32px; line-height: 32px; text-align: center; border-radius: 50%; margin: 0 5px; text-decoration: none; color: #333333;" title="LinkedIn">LI</a>
            <a href="https://www.youtube.com/@cherybangladesh" style="display: inline-block; background-color: #f0f0f0; width: 32px; height: 32px; line-height: 32px; text-align: center; border-radius: 50%; margin: 0 5px; text-decoration: none; color: #333333;" title="YouTube">YT</a>
          </div>
        </div>
  
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee; font-size: 12px; color: #999999; text-align: center;">
          <p>This is an automated response. Please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
          <p>Your inquiry was received on ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })}</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }