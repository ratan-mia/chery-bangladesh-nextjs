
export function generateAdminEmailTemplate(data, formattedDate) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Service Booking</title>
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
          .priority {
            display: inline-block;
            padding: 5px 10px;
            background-color: #c20000;
            color: white;
            font-weight: bold;
            border-radius: 3px;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://cherybd.com/logo.png" alt="Chery Bangladesh Logo">
          </div>
          <div class="content">
            <h1>New Service Booking</h1>
            <div class="priority">ADMIN NOTIFICATION</div>
            <p>A new service booking has been submitted. Please review the details below and contact the customer to confirm their appointment.</p>
            
            <div class="booking-details">
              <h2>Vehicle Information</h2>
              <div class="detail-row">
                <div class="detail-label">Vehicle Model:</div>
                <div class="detail-value">${data.vehicleModel}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Registration Number:</div>
                <div class="detail-value">${data.vehicleRegNumber}</div>
              </div>
            </div>
            
            <div class="booking-details">
              <h2>Service Details</h2>
              <div class="detail-row">
                <div class="detail-label">Service Type:</div>
                <div class="detail-value">${data.serviceType}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Preferred Date:</div>
                <div class="detail-value">${formattedDate}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Preferred Time:</div>
                <div class="detail-value">${data.preferredTime}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Additional Notes:</div>
                <div class="detail-value">${data.notes || 'No additional notes provided'}</div>
              </div>
            </div>
            
            <div class="booking-details">
              <h2>Customer Information</h2>
              <div class="detail-row">
                <div class="detail-label">Name:</div>
                <div class="detail-value">${data.name}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Email:</div>
                <div class="detail-value">${data.email}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Phone:</div>
                <div class="detail-value">${data.contactNumber}</div>
              </div>
            </div>
            
            <p>Please schedule this appointment in the service calendar and contact the customer to confirm the booking.</p>
          </div>
          <div class="footer">
            <p>This is an automated message from the Chery Bangladesh Service Booking System. Please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }