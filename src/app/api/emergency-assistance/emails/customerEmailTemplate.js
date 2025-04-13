
export function generateCustomerEmailTemplate(data) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Emergency Assistance Request - Chery Bangladesh</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #000000;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        border-top: 5px solid #c20000;
      }
      .logo {
        max-width: 180px;
        margin-bottom: 15px;
      }
      .content {
        padding: 20px;
        background-color: #f9f9f9;
      }
      .confirmation-box {
        background-color: #4CAF50;
        color: white;
        padding: 10px 15px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
        border-radius: 4px;
      }
      .details {
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        padding: 15px;
        margin-bottom: 20px;
      }
      .details table {
        width: 100%;
        border-collapse: collapse;
      }
      .details table td {
        padding: 8px;
        border-bottom: 1px solid #e0e0e0;
      }
      .details table td:first-child {
        font-weight: bold;
        width: 40%;
      }
      .what-next {
        background-color: #f5f5f5;
        border-left: 4px solid #c20000;
        padding: 15px;
        margin-bottom: 20px;
      }
      .contact-info {
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        padding: 15px;
        margin-top: 20px;
        text-align: center;
      }
      .contact-info h3 {
        margin-top: 0;
        color: #c20000;
      }
      .contact-number {
        font-size: 24px;
        font-weight: bold;
        color: #c20000;
        margin: 10px 0;
      }
      .footer {
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
        color: #666;
      }
      .social-links {
        margin-top: 15px;
      }
      .social-links a {
        display: inline-block;
        margin: 0 5px;
        color: #666;
        text-decoration: none;
      }
      .social-links a:hover {
        color: #c20000;
      }
      .app-promo {
        margin-top: 20px;
        padding: 15px;
        background-color: #f0f0f0;
        border-radius: 4px;
        text-align: center;
      }
      .app-buttons {
        margin-top: 10px;
      }
      .app-buttons img {
        height: 40px;
        margin: 0 5px;
      }
      .request-id {
        font-family: monospace;
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://cherybd.com/logo.png" alt="Chery Bangladesh Logo" class="logo">
        <h1>Emergency Assistance Confirmation</h1>
      </div>
      
      <div class="content">
        <div class="confirmation-box">
          YOUR REQUEST HAS BEEN RECEIVED
        </div>
        
        <p>Dear ${data.name},</p>
        
        <p>We have received your emergency assistance request and our team has been notified. A Chery certified technician will contact you shortly to provide assistance.</p>
        
        <div class="request-id">Reference Number: ${data.requestId}</div>
        
        <div class="details">
          <h3>Your Request Details:</h3>
          <table>
            <tr>
              <td>Request Time:</td>
              <td>${data.formattedTimestamp}</td>
            </tr>
            <tr>
              <td>Vehicle Model:</td>
              <td>${data.vehicleModelDisplay}</td>
            </tr>
            <tr>
              <td>Registration Number:</td>
              <td>${data.vehicleRegNumber}</td>
            </tr>
            <tr>
              <td>Assistance Type:</td>
              <td>${data.assistanceTypeDisplay}</td>
            </tr>
            <tr>
              <td>Your Location:</td>
              <td>${data.location}</td>
            </tr>
            ${data.description ? `
            <tr>
              <td>Problem Description:</td>
              <td>${data.description}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div class="what-next">
          <h3>What happens next?</h3>
          <ol>
            <li>Our emergency team will call you at <strong>${data.contactNumber}</strong> within 5-10 minutes</li>
            <li>A certified technician will be dispatched to your location</li>
            <li>You'll receive updates on the technician's arrival time</li>
          </ol>
        </div>
        
        <p>For faster assistance, you can also directly call our 24/7 emergency support line.</p>
        
        <div class="contact-info">
          <h3>24/7 EMERGENCY SUPPORT</h3>
          <div class="contact-number">01XXX-XXXXXX</div>
          <p>Available 24 hours a day, 7 days a week</p>
        </div>
        
        <div class="app-promo">
          <h3>Download Chery Bangladesh App</h3>
          <p>For easier emergency assistance and service booking in the future</p>
          <div class="app-buttons">
            <a href="#"><img src="https://cherybd.com/images/app-store.png" alt="App Store"></a>
            <a href="#"><img src="https://cherybd.com/images/play-store.png" alt="Play Store"></a>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>Thank you for choosing Chery Bangladesh.</p>
        <p>If you have any questions, please contact our customer service at info@cherybd.com</p>
        
        <div class="social-links">
          <a href="https://facebook.com/cherybd">Facebook</a> |
          <a href="https://instagram.com/cherybd">Instagram</a> |
          <a href="https://youtube.com/cherybd">YouTube</a>
        </div>
        
        <p>© ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
    `;
  }