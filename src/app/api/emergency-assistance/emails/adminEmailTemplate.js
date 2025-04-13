export function generateAdminEmailTemplate(data) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emergency Assistance Request</title>
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
      .emergency-alert {
        background-color: #c20000;
        color: white;
        padding: 10px 15px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
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
      .footer {
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
        color: #666;
      }
      .button {
        display: inline-block;
        background-color: #c20000;
        color: #ffffff;
        padding: 12px 25px;
        text-decoration: none;
        font-weight: bold;
        border-radius: 4px;
        margin-top: 15px;
      }
      .timestamp {
        color: #666;
        font-size: 14px;
        margin-top: 15px;
        font-style: italic;
      }
      .location-map {
        width: 100%;
        max-width: 100%;
        height: auto;
        border: 1px solid #e0e0e0;
        margin-top: 10px;
      }
      .request-id {
        font-family: monospace;
        font-size: 16px;
        color: #c20000;
        font-weight: bold;
        margin-bottom: 10px;
        background-color: #f5f5f5;
        padding: 5px 10px;
        border-radius: 4px;
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://cherybd.com/logo.png" alt="Chery Bangladesh Logo" class="logo">
        <h1>Emergency Assistance Request</h1>
      </div>
      
      <div class="content">
        <div class="emergency-alert">
          IMMEDIATE ATTENTION REQUIRED
        </div>
        
        <div class="request-id">
          Request ID: ${data.requestId}
        </div>
        
        <p>A customer has requested emergency roadside assistance through the website. Please coordinate immediate support.</p>
        
        <div class="details">
          <h3>Request Details:</h3>
          <table>
            <tr>
              <td>Customer Name:</td>
              <td>${data.name}</td>
            </tr>
            <tr>
              <td>Contact Number:</td>
              <td>${data.contactNumber}</td>
            </tr>
            <tr>
              <td>Email Address:</td>
              <td>${data.email || 'Not provided'}</td>
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
              <td>Service Needed:</td>
              <td>${data.assistanceTypeDisplay}</td>
            </tr>
            <tr>
              <td>Current Location:</td>
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
        
        <p>Please ensure immediate dispatch of the nearest available technician to the customer's location.</p>
        
        <div style="text-align: center;">
          <a href="https://admin.cherybd.com/emergencies/${data.requestId}" class="button">VIEW IN ADMIN DASHBOARD</a>
        </div>
        
        <p class="timestamp">Request received on: ${data.formattedTimestamp}</p>
        
        <!-- Map of customer location would go here in a real implementation -->
        <img src="https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(data.location)}&zoom=14&size=600x300&markers=color:red%7C${encodeURIComponent(data.location)}&key=YOUR_API_KEY" alt="Customer Location Map" class="location-map">
      </div>
      
      <div class="footer">
        <p>This is an automated notification from the Chery Bangladesh emergency response system.</p>
        <p>© ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
    `;
  }