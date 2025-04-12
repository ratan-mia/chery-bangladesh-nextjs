
export function generateAdminAssistanceEmailTemplate(data, formattedDate) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>URGENT: Roadside Assistance Request</title>
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
            background-color: #c20000;
            padding: 20px;
            text-align: center;
          }
          .header img {
            max-width: 150px;
          }
          .urgent-banner {
            background-color: #ff0000;
            color: white;
            padding: 15px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
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
          .request-details {
            background-color: #fff;
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 20px;
          }
          .request-details h2 {
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
          .emergency {
            background-color: #fff0f0;
            border: 2px solid #ff0000;
            padding: 15px;
            margin-bottom: 20px;
          }
          .emergency h3 {
            color: #ff0000;
            margin-top: 0;
          }
          .map-link {
            display: inline-block;
            background-color: #4285F4;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 3px;
            font-weight: bold;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://cherybd.com/logo.png" alt="Chery Bangladesh Logo">
          </div>
          
          <div class="urgent-banner">
            URGENT: ROADSIDE ASSISTANCE REQUIRED
          </div>
          
          <div class="content">
            <h1>Emergency Assistance Request</h1>
            
            <div class="emergency">
              <h3>IMMEDIATE ACTION REQUIRED</h3>
              <p>A customer is stranded and requires urgent roadside assistance. Please dispatch the nearest technician immediately.</p>
              <p><strong>Reference Number:</strong> ${data.referenceNumber}</p>
              <p><strong>Request Time:</strong> ${formattedDate}</p>
            </div>
            
            <div class="request-details">
              <h2>Assistance Details</h2>
              <div class="detail-row">
                <div class="detail-label">Assistance Type:</div>
                <div class="detail-value">${data.assistanceType}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Location:</div>
                <div class="detail-value">${data.location}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Map:</div>
                <div class="detail-value">
                  <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location)}" class="map-link" target="_blank">View on Google Maps</a>
                </div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Problem Description:</div>
                <div class="detail-value">${data.description || 'No additional description provided'}</div>
              </div>
            </div>
            
            <div class="request-details">
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
            
            <div class="request-details">
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
            
            <p>Please contact the customer immediately to confirm assistance is on the way and update the status in the system.</p>
          </div>
          <div class="footer">
            <p>This is an automated message from the Chery Bangladesh Roadside Assistance System.</p>
            <p>&copy; ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }