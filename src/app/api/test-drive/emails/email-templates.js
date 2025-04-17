
/**
 * Email template sent to dealership admin when a new test drive is booked
 */
export const adminEmailTemplate = (data) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Test Drive Booking</title>
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
          }
          .header {
            background-color: #524336;
            padding: 20px;
            text-align: center;
          }
          .header h1 {
            color: white;
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
            background-color: #ffffff;
          }
          .booking-info {
            background-color: #f9f9f9;
            border-left: 4px solid #8c735d;
            padding: 15px;
            margin-bottom: 20px;
          }
          .booking-detail {
            margin-bottom: 10px;
          }
          .label {
            font-weight: bold;
            width: 150px;
            display: inline-block;
          }
          .value {
            display: inline-block;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666666;
            background-color: #f3f3f3;
          }
          .logo {
            margin-bottom: 20px;
          }
          .note {
            background-color: #fff8e1;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
            border-left: 4px solid #ffc107;
          }
          .button {
            display: inline-block;
            background-color: #8c735d;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://www.cherybd.com/images/logo-white.png" alt="Chery Bangladesh" height="40" class="logo">
            <h1>New Test Drive Booking</h1>
          </div>
          <div class="content">
            <p>Dear Admin,</p>
            <p>A new test drive has been booked through the website. Please find the details below:</p>
            
            <div class="booking-info">
              <div class="booking-detail">
                <span class="label">Booking ID:</span>
                <span class="value">${data.bookingId}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Booking Date:</span>
                <span class="value">${data.bookingDate}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Vehicle Model:</span>
                <span class="value">${data.vehicleModel}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Customer Name:</span>
                <span class="value">${data.name}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Contact Number:</span>
                <span class="value">${data.contactNumber}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Email:</span>
                <span class="value">${data.email}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Preferred Date:</span>
                <span class="value">${data.preferredDate}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Preferred Time:</span>
                <span class="value">${data.preferredTime}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Location:</span>
                <span class="value">${data.location}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Driving Experience:</span>
                <span class="value">${data.drivingExperience}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Special Requests:</span>
                <span class="value">${data.specificRequests}</span>
              </div>
            </div>
            
            <div class="note">
              <p><strong>Please Note:</strong> The customer is expecting confirmation within 24 hours. Please confirm this booking by contacting the customer as soon as possible.</p>
            </div>
            
            <a href="https://admin.cherybd.com/test-drive-bookings" class="button">View in Admin Dashboard</a>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
            <p>Continental Motors Ltd. | Authorized Distributor of Chery Automobile in Bangladesh</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  /**
   * Email template sent to customer when they book a test drive
   */
  export const customerEmailTemplate = (data) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Test Drive Booking Confirmation</title>
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
          }
          .header {
            background-color: #524336;
            padding: 20px;
            text-align: center;
          }
          .header h1 {
            color: white;
            margin: 0;
            font-size: 24px;
          }
          .subheader {
            background-color: #8c735d;
            color: white;
            padding: 10px 20px;
            text-align: center;
          }
          .content {
            padding: 20px;
            background-color: #ffffff;
          }
          .booking-info {
            background-color: #f9f9f9;
            border-left: 4px solid #8c735d;
            padding: 15px;
            margin: 20px 0;
          }
          .booking-detail {
            margin-bottom: 10px;
          }
          .label {
            font-weight: bold;
            min-width: 150px;
            display: inline-block;
          }
          .value {
            display: inline-block;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666666;
            background-color: #f3f3f3;
          }
          .logo {
            margin-bottom: 20px;
          }
          .info-section {
            background-color: #f5f5f5;
            padding: 15px;
            margin-top: 20px;
          }
          .info-section h3 {
            margin-top: 0;
            color: #524336;
            border-bottom: 2px solid #8c735d;
            padding-bottom: 5px;
            display: inline-block;
          }
          .info-item {
            display: flex;
            margin-bottom: 10px;
          }
          .info-icon {
            margin-right: 10px;
            color: #8c735d;
            font-weight: bold;
          }
          .button {
            display: inline-block;
            background-color: #8c735d;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            margin-top: 15px;
          }
          .highlight {
            color: #524336;
            font-weight: bold;
          }
          .banner {
            width: 100%;
            max-width: 600px;
            height: auto;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://www.cherybd.com/images/logo-white.png" alt="Chery Bangladesh" height="40" class="logo">
            <h1>Test Drive Booking Confirmation</h1>
          </div>
          <div class="subheader">
            Thank you for choosing Chery Bangladesh!
          </div>
          <div class="content">
            <img src="https://www.cherybd.com/images/test-drive-banner.jpg" alt="Test Drive Experience" class="banner">
          
            <p>Dear <span class="highlight">${data.name}</span>,</p>
            
            <p>Thank you for booking a test drive with Chery Bangladesh. We're excited to have you experience the exceptional performance and comfort of the <span class="highlight">${data.vehicleModel}</span>.</p>
            
            <p>Your test drive request has been received and is being processed. A member of our team will contact you within 24 hours to confirm your appointment.</p>
            
            <div class="booking-info">
              <div class="booking-detail">
                <span class="label">Booking Reference:</span>
                <span class="value">${data.bookingId}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Vehicle Model:</span>
                <span class="value">${data.vehicleModel}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Preferred Date:</span>
                <span class="value">${data.preferredDate}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Preferred Time:</span>
                <span class="value">${data.preferredTime}</span>
              </div>
              <div class="booking-detail">
                <span class="label">Dealership Location:</span>
                <span class="value">${data.location}</span>
              </div>
            </div>
            
            <div class="info-section">
              <h3>What to Bring</h3>
              <div class="info-item">
                <div class="info-icon">→</div>
                <div>Valid driving license</div>
              </div>
              <div class="info-item">
                <div class="info-icon">→</div>
                <div>National ID card</div>
              </div>
              <div class="info-item">
                <div class="info-icon">→</div>
                <div>A copy of this confirmation email</div>
              </div>
            </div>
            
            <div class="info-section">
              <h3>Test Drive Experience</h3>
              <p>Your test drive will last approximately 30-45 minutes, during which our product specialist will guide you through the vehicle's features and capabilities. You'll have the opportunity to experience the vehicle on both urban roads and highways near the dealership.</p>
            </div>
            
            <p>If you need to reschedule or cancel your test drive, or if you have any questions, please contact us at <a href="tel:09639119977">09639119977</a> or reply to this email.</p>
            
            <a href="https://www.cherybd.com/vehicles/${data.vehicleModel.toLowerCase()}" class="button">Learn More About ${data.vehicleModel}</a>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
            <p>Continental Motors Ltd. | Authorized Distributor of Chery Automobile in Bangladesh</p>
            <p>
              <a href="https://www.cherybd.com/privacy-policy">Privacy Policy</a> | 
              <a href="https://www.cherybd.com/terms-conditions">Terms & Conditions</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  };