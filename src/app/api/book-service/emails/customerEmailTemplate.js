// /utils/emailTemplates/customerEmailTemplate.js

export function generateCustomerEmailTemplate(data, formattedDate) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Service Booking Confirmation</title>
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
            background-color: #1a1a1a;
            padding: 20px;
            text-align: center;
          }
          .header img {
            max-width: 150px;
          }
          .content {
            padding: 20px;
            background-color: #f9f9f9;
          }
          h1 {
            color: #c20000;
            margin-top: 0;
            font-size: 24px;
          }
          .booking-details {
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 20px;
          }
          .booking-details h2 {
            margin-top: 0;
            color: #333;
            font-size: 18px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          .detail-row {
            display: flex;
            margin-bottom: 10px;
          }
          .detail-label {
            width: 40%;
            font-weight: bold;
            color: #555;
          }
          .detail-value {
            width: 60%;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #777;
          }
          .confirmation-box {
            background-color: #dff0d8;
            border: 1px solid #d6e9c6;
            color: #3c763d;
            padding: 15px;
            margin-bottom: 20px;
            text-align: center;
          }
          .confirmation-number {
            font-size: 18px;
            font-weight: bold;
            color: #c20000;
          }
          .what-next {
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            padding: 15px;
            margin-top: 20px;
          }
          .what-next h3 {
            margin-top: 0;
            color: #333;
          }
          .what-next ul {
            padding-left: 20px;
          }
          .contact-info {
            margin-top: 20px;
            background-color: #eee;
            padding: 15px;
            text-align: center;
          }
          .social-links {
            text-align: center;
            margin-top: 15px;
          }
          .social-links a {
            display: inline-block;
            margin: 0 5px;
            text-decoration: none;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #c20000;
            color: white;
            text-decoration: none;
            text-align: center;
            border-radius: 3px;
            font-weight: bold;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://cherybd.com/logo.png" alt="Chery Bangladesh Logo">
          </div>
          <div class="content">
            <h1>Your Service Booking is Confirmed!</h1>
            
            <div class="confirmation-box">
              <p>Thank you for choosing Chery Bangladesh for your vehicle service needs.</p>
              <p>Your booking has been received and is being processed.</p>
              <p>Confirmation Number: <span class="confirmation-number">${generateConfirmationNumber(data)}</span></p>
            </div>
            
            <div class="booking-details">
              <h2>Booking Details</h2>
              <div class="detail-row">
                <div class="detail-label">Vehicle Model:</div>
                <div class="detail-value">${data.vehicleModel}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Registration Number:</div>
                <div class="detail-value">${data.vehicleRegNumber}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Service Type:</div>
                <div class="detail-value">${data.serviceType}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Scheduled Date:</div>
                <div class="detail-value">${formattedDate}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Scheduled Time:</div>
                <div class="detail-value">${data.preferredTime}</div>
              </div>
            </div>
            
            <div class="what-next">
              <h3>What Happens Next?</h3>
              <ul>
                <li>Our service team will call you within 2 hours to confirm your appointment.</li>
                <li>You'll receive a reminder email one day before your scheduled service.</li>
                <li>Please bring your vehicle registration documents when you visit.</li>
                <li>Our service center offers complimentary refreshments and Wi-Fi while you wait.</li>
              </ul>
            </div>
            
            <div class="what-next">
              <h3>Service Center Location</h3>
              <p>Chery Bangladesh Service Center<br>
              123 Service Road, Dhaka<br>
              Bangladesh</p>
              
              <a href="https://maps.google.com/?q=Chery+Bangladesh+Service+Center" class="button">View on Map</a>
            </div>
            
            <div class="contact-info">
              <h3>Need to Make Changes?</h3>
              <p>If you need to reschedule or have any questions, please contact our service center:</p>
              <p>Phone: 09639119977<br>
              Email: service@cherybd.com</p>
            </div>
            
            <div class="social-links">
              <p>Follow us for updates and maintenance tips:</p>
              <a href="https://facebook.com/cherybangladesh">Facebook</a> |
              <a href="https://instagram.com/cherybangladesh">Instagram</a> |
              <a href="https://youtube.com/cherybangladesh">YouTube</a>
            </div>
          </div>
          <div class="footer">
            <p>Thank you for choosing Chery Bangladesh for your service needs.</p>
            <p>&copy; ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  
  // Generate a pseudo-random confirmation number
  function generateConfirmationNumber(data) {
    const dateStr = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 8);
    const randomStr = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const initialsStr = data.name.split(' ').map(name => name[0]).join('').toUpperCase();
    
    return `SRV-${dateStr.slice(2)}-${randomStr}-${initialsStr}`;
  }