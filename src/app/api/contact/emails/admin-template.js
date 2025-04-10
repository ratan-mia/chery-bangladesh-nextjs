export function generateAdminEmailTemplate(formData, refNumber) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333333; max-width: 650px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); padding: 30px;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid #eeeeee; padding-bottom: 20px;">
          <!-- Logo would go here in production -->
          <h1 style="color: #b29980; font-size: 24px; margin-top: 15px; margin-bottom: 5px;">New Website Inquiry</h1>
          <p style="color: #666666;">A potential customer has reached out via the contact form</p>
        </div>
  
        <div style="margin-bottom: 25px;">
          <h2 style="color: #333333; font-size: 18px; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">Customer Information</h2>
          
          <div style="margin-bottom: 10px; display: flex;">
            <div style="font-weight: bold; width: 120px; color: #555555;">Name:</div>
            <div>${formData.name}</div>
          </div>
          
          <div style="margin-bottom: 10px; display: flex;">
            <div style="font-weight: bold; width: 120px; color: #555555;">Email:</div>
            <div><a href="mailto:${formData.email}" style="color: #b29980; text-decoration: none;">${formData.email}</a></div>
          </div>
          
          <div style="margin-bottom: 10px; display: flex;">
            <div style="font-weight: bold; width: 120px; color: #555555;">Phone:</div>
            <div><a href="tel:${formData.phone}" style="color: #b29980; text-decoration: none;">${formData.phone}</a></div>
          </div>
          
          ${formData.model ? `
          <div style="margin-bottom: 10px; display: flex;">
            <div style="font-weight: bold; width: 120px; color: #555555;">Vehicle Model:</div>
            <div>${formData.model}</div>
          </div>
          ` : ''}
          
          <div style="margin-bottom: 10px; display: flex;">
            <div style="font-weight: bold; width: 120px; color: #555555;">Subject:</div>
            <div>${formData.subject}</div>
          </div>
        </div>
  
        <div style="margin-bottom: 25px;">
          <h2 style="color: #333333; font-size: 18px; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">Customer Message</h2>
          <div style="background-color: #f9f9f9; border-left: 4px solid #b29980; padding: 15px; border-radius: 4px; margin-top: 15px;">
            <div style="white-space: pre-line;">${formData.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
  
        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 4px; margin-top: 25px; font-size: 14px; color: #666666;">
          <p style="margin: 0 0 8px 0;"><strong>Submission Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })}</p>
          <p style="margin: 0 0 8px 0;"><strong>Reference:</strong> ${refNumber}</p>
        </div>
  
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee; font-size: 12px; color: #999999; text-align: center;">
          <p>This is an automated email sent from the Chery Bangladesh website contact form.</p>
          <p>© ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }