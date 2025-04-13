
export function generateCustomerAssistanceEmailTemplate(data, formattedDate) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Roadside Assistance Confirmation</title>
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
          .confirmation-box {
            background-color: #dff0d8;
            border: 1px solid #d6e9c6;
            color: #3c763d;
            padding: 15px;
            margin-bottom: 20px;
            text-align: center;
          }
          .reference-number {
            font-size: 18px;
            font-weight: bold;
            color: #c20000;
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
          .assistance-steps {
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            padding: 15px;
            margin-top: 20px;
          }
          .assistance-steps h3 {
            margin-top: 0;
            color: #333;
          }
          .assistance-steps ol {
            padding-left: 20px;
          }
          .contact-info {
            margin-top: 20px;
            background-color: #eee;
            padding: 15px;
            text-align: center;
          }
          .emergency-number {
            font-size: 24px;
            font-weight: bold;
            color: #c20000;
            display: block;
            margin: 10px 0;
          }
          .tips-box {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            padding: 15px;
            margin-top: 20px;
          }
          .tips-box h3 {
            margin-top: 0;
            color: #333;
          }
          .tips-box ul {
            padding-left: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://cherybd.com/logo.png" alt="Chery Bangladesh Logo">
          </div>
          <div class="content">
            <h1>Roadside Assistance Request Confirmed</h1>
            
            <div class="confirmation-box">
              <p>We have received your request for roadside assistance and are dispatching help to your location.</p>
              <p>Reference Number: <span class="reference-number">${data.referenceNumber}</span></p>
              <p>Request Time: ${formattedDate}</p>
            </div>
            
            <div class="request-details">
              <h2>Your Request Details</h2>
              <div class="detail-row">
                <div class="detail-label">Assistance Type:</div>
                <div class="detail-value">${data.assistanceType}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Vehicle Model:</div>
                <div class="detail-value">${data.vehicleModel}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Registration Number:</div>
                <div class="detail-value">${data.vehicleRegNumber}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Location:</div>
                <div class="detail-value">${data.location}</div>
              </div>
            </div>
            
            <div class="assistance-steps">
              <h3>What Happens Next?</h3>
              <ol>
                <li>Our service team will call you within 15 minutes to confirm your request details.</li>
                <li>A qualified technician will be dispatched to your location. You will receive their estimated arrival time.</li>
                <li>The technician will assist with your ${data.assistanceType.toLowerCase()} or arrange for towing if necessary.</li>
                <li>For any status updates, please keep your reference number handy.</li>
              </ol>
            </div>
            
            <div class="tips-box">
              <h3>Safety Tips While Waiting</h3>
              <ul>
                <li>If possible, move your vehicle to a safe location away from traffic.</li>
                <li>Turn on your hazard lights to make your vehicle visible to other drivers.</li>
                <li>Stay inside your vehicle with doors locked if it's safe to do so.</li>
                <li>If you must exit your vehicle, do so from the passenger side, away from traffic.</li>
              </ul>
            </div>
            
            <div class="contact-info">
              <h3>Need Immediate Assistance?</h3>
              <p>If your situation is critical or you need to speak with someone immediately:</p>
              <a href="tel:01XXXXXXXXX" class="emergency-number">09639119977</a>
              <p>24/7 Emergency Hotline</p>
            </div>
          </div>
          <div class="footer">
            <p>Thank you for choosing Chery Bangladesh Roadside Assistance.</p>
            <p>Please do not reply to this email as it is automatically generated.</p>
            <p>&copy; ${new Date().getFullYear()} Chery Bangladesh. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }