export function generateAdminComplaintEmailTemplate(data) {
  const priorityColor = {
    'Low': '#10B981',
    'Medium': '#F59E0B', 
    'High': '#EF4444',
    'Critical': '#DC2626'
  };

  const priorityBgColor = {
    'Low': '#D1FAE5',
    'Medium': '#FEF3C7',
    'High': '#FEE2E2', 
    'Critical': '#FECACA'
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Customer Complaint</title>
      <style>
        body {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          line-height: 1.6;
          color: #374151;
          margin: 0;
          padding: 0;
          background-color: #F3F4F6;
        }
        .container {
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #524336 0%, #8c735d 100%);
          padding: 30px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          color: #FFFFFF;
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        .header p {
          color: #c4b19c;
          margin: 8px 0 0 0;
          font-size: 16px;
        }
        .content {
          background-color: #FFFFFF;
          padding: 0;
          border-radius: 0 0 8px 8px;
        }
        .priority-banner {
          background-color: ${priorityBgColor[data.priority] || '#F3F4F6'};
          border-left: 4px solid ${priorityColor[data.priority] || '#6B7280'};
          padding: 16px 20px;
          margin: 0;
        }
        .priority-banner h2 {
          color: ${priorityColor[data.priority] || '#6B7280'};
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .priority-banner p {
          margin: 4px 0 0 0;
          color: #374151;
          font-size: 14px;
        }
        .section {
          padding: 24px 20px;
          border-bottom: 1px solid #E5E7EB;
        }
        .section:last-child {
          border-bottom: none;
        }
        .section h3 {
          color: #524336;
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 600px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
        .info-item {
          background-color: #F9FAFB;
          padding: 12px;
          border-radius: 6px;
          border-left: 3px solid #8c735d;
        }
        .info-label {
          font-weight: 600;
          color: #524336;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .info-value {
          color: #374151;
          font-size: 14px;
        }
        .description-box {
          background-color: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 20px;
          margin-top: 16px;
        }
        .description-box p {
          margin: 0;
          line-height: 1.7;
          color: #374151;
        }
        .footer {
          background-color: #F9FAFB;
          padding: 20px;
          text-align: center;
          border-top: 1px solid #E5E7EB;
          border-radius: 0 0 8px 8px;
        }
        .footer p {
          margin: 8px 0;
          color: #6B7280;
          font-size: 14px;
        }
        .action-required {
          background-color: #FEF3C7;
          border: 1px solid #F59E0B;
          border-radius: 8px;
          padding: 16px;
          margin: 20px 0;
        }
        .action-required h4 {
          color: #92400E;
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 600;
        }
        .action-required p {
          color: #92400E;
          margin: 0;
          font-size: 14px;
        }
        .complaint-id {
          background: linear-gradient(135deg, #8c735d 0%, #b7a99a 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          display: inline-block;
          margin-top: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 New Customer Complaint</h1>
          <p>Complaint Management System</p>
          <div class="complaint-id">ID: ${data.complaintId}</div>
        </div>
        
        <div class="content">
          <div class="priority-banner">
            <h2>${data.priority} Priority</h2>
            <p>Complaint Type: ${data.complaintType}</p>
          </div>

          <div class="action-required">
            <h4>⏰ Action Required</h4>
            <p>This complaint requires immediate attention. Please acknowledge receipt and assign to appropriate team member within 4 hours.</p>
          </div>

          <div class="section">
            <h3>👤 Customer Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Full Name</div>
                <div class="info-value">${data.name}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email Address</div>
                <div class="info-value">${data.email}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Contact Number</div>
                <div class="info-value">${data.contactNumber}</div>
              </div>
              ${data.alternateNumber ? `
              <div class="info-item">
                <div class="info-label">Alternate Number</div>
                <div class="info-value">${data.alternateNumber}</div>
              </div>
              ` : ''}
            </div>
            ${data.address ? `
            <div class="info-item" style="margin-top: 16px;">
              <div class="info-label">Address</div>
              <div class="info-value">${data.address}</div>
            </div>
            ` : ''}
          </div>

          <div class="section">
            <h3>🚗 Vehicle Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Vehicle Model</div>
                <div class="info-value">${data.vehicleModel}</div>
              </div>
              ${data.vehicleYear ? `
              <div class="info-item">
                <div class="info-label">Vehicle Year</div>
                <div class="info-value">${data.vehicleYear}</div>
              </div>
              ` : ''}
              ${data.vinNumber ? `
              <div class="info-item">
                <div class="info-label">VIN Number</div>
                <div class="info-value">${data.vinNumber}</div>
              </div>
              ` : ''}
              ${data.purchaseDate ? `
              <div class="info-item">
                <div class="info-label">Purchase Date</div>
                <div class="info-value">${new Date(data.purchaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</div>
              </div>
              ` : ''}
              ${data.dealerName ? `
              <div class="info-item">
                <div class="info-label">Dealer Name</div>
                <div class="info-value">${data.dealerName}</div>
              </div>
              ` : ''}
            </div>
          </div>

          <div class="section">
            <h3>📋 Complaint Details</h3>
            <div class="info-item">
              <div class="info-label">Complaint Title</div>
              <div class="info-value" style="font-weight: 600; font-size: 16px;">${data.complaintTitle}</div>
            </div>
            <div class="description-box">
              <p><strong>Description:</strong></p>
              <p>${data.complaintDescription}</p>
            </div>
            ${data.desiredResolution ? `
            <div class="description-box">
              <p><strong>Desired Resolution:</strong></p>
              <p>${data.desiredResolution}</p>
            </div>
            ` : ''}
            ${data.previousServiceHistory ? `
            <div class="description-box">
              <p><strong>Previous Service History:</strong></p>
              <p>${data.previousServiceHistory}</p>
            </div>
            ` : ''}
          </div>

          <div class="section">
            <h3>📊 Submission Details</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Submission Date</div>
                <div class="info-value">${new Date(data.submissionDate).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">${data.status}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <p><strong>Chery Bangladesh Complaint Management</strong></p>
          <p>📞 Emergency: 09639-119977 | 📧 complaints@cherybd.com</p>
          <p style="font-size: 12px; color: #9CA3AF;">This is an automated notification. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}