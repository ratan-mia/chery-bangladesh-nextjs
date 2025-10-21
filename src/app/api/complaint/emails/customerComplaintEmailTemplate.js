export function generateCustomerComplaintEmailTemplate(data) {
  const expectedResolutionTime = {
    'Low': '7-10 business days',
    'Medium': '3-5 business days', 
    'High': '1-2 business days',
    'Critical': '24-48 hours'
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Complaint Confirmation - Chery Bangladesh</title>
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
          max-width: 650px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #524336 0%, #8c735d 100%);
          padding: 40px 30px;
          text-align: center;
          border-radius: 12px 12px 0 0;
        }
        .header h1 {
          color: #FFFFFF;
          margin: 0 0 8px 0;
          font-size: 32px;
          font-weight: 700;
        }
        .header p {
          color: #c4b19c;
          margin: 0;
          font-size: 18px;
        }
        .content {
          background-color: #FFFFFF;
          padding: 0;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .confirmation-banner {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: white;
          padding: 24px 30px;
          text-align: center;
          margin: 0;
        }
        .confirmation-banner h2 {
          margin: 0 0 8px 0;
          font-size: 24px;
          font-weight: 600;
        }
        .confirmation-banner p {
          margin: 0;
          font-size: 16px;
          opacity: 0.9;
        }
        .complaint-id-section {
          background-color: #F9FAFB;
          padding: 24px 30px;
          text-align: center;
          border-bottom: 1px solid #E5E7EB;
        }
        .complaint-id {
          background: linear-gradient(135deg, #8c735d 0%, #b7a99a 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 700;
          font-size: 18px;
          display: inline-block;
          letter-spacing: 0.05em;
        }
        .complaint-id-label {
          color: #6B7280;
          font-size: 14px;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }
        .section {
          padding: 30px;
          border-bottom: 1px solid #E5E7EB;
        }
        .section:last-child {
          border-bottom: none;
        }
        .section h3 {
          color: #524336;
          margin: 0 0 20px 0;
          font-size: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }
        .section h3 .emoji {
          margin-right: 8px;
          font-size: 24px;
        }
        .timeline-item {
          display: flex;
          align-items: center;
          padding: 16px 0;
          border-left: 3px solid #E5E7EB;
          padding-left: 20px;
          position: relative;
        }
        .timeline-item.active {
          border-left-color: #10B981;
        }
        .timeline-item::before {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #E5E7EB;
          position: absolute;
          left: -7.5px;
        }
        .timeline-item.active::before {
          background-color: #10B981;
        }
        .timeline-content h4 {
          margin: 0 0 4px 0;
          color: #374151;
          font-size: 16px;
          font-weight: 600;
        }
        .timeline-content p {
          margin: 0;
          color: #6B7280;
          font-size: 14px;
        }
        .info-box {
          background-color: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 20px;
          margin: 16px 0;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #E5E7EB;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .info-label {
          font-weight: 600;
          color: #524336;
          font-size: 14px;
        }
        .info-value {
          color: #374151;
          font-size: 14px;
        }
        .priority-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .priority-low { background-color: #D1FAE5; color: #065F46; }
        .priority-medium { background-color: #FEF3C7; color: #92400E; }
        .priority-high { background-color: #FEE2E2; color: #991B1B; }
        .priority-critical { background-color: #FECACA; color: #991B1B; }
        .contact-section {
          background-color: #F9FAFB;
          padding: 24px 30px;
          text-align: center;
        }
        .contact-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        .contact-method {
          background-color: white;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #E5E7EB;
        }
        .contact-method h4 {
          margin: 0 0 8px 0;
          color: #524336;
          font-size: 16px;
          font-weight: 600;
        }
        .contact-method p {
          margin: 0;
          color: #6B7280;
          font-size: 14px;
        }
        .footer {
          background-color: #524336;
          color: #c4b19c;
          padding: 30px;
          text-align: center;
          border-radius: 0 0 12px 12px;
        }
        .footer h4 {
          color: #FFFFFF;
          margin: 0 0 16px 0;
          font-size: 20px;
          font-weight: 600;
        }
        .footer p {
          margin: 8px 0;
          font-size: 14px;
        }
        .note-box {
          background-color: #FEF3C7;
          border: 1px solid #F59E0B;
          border-radius: 8px;
          padding: 16px;
          margin: 20px 0;
        }
        .note-box p {
          margin: 0;
          color: #92400E;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You!</h1>
          <p>Your complaint has been successfully submitted</p>
        </div>
        
        <div class="content">
          <div class="confirmation-banner">
            <h2>✅ Complaint Received</h2>
            <p>We have received your complaint and will begin processing it immediately</p>
          </div>

          <div class="complaint-id-section">
            <div class="complaint-id-label">Your Complaint Reference ID</div>
            <div class="complaint-id">${data.complaintId}</div>
            <p style="margin: 12px 0 0 0; color: #6B7280; font-size: 14px;">
              Please save this ID for future reference
            </p>
          </div>

          <div class="section">
            <h3><span class="emoji">📋</span>Complaint Summary</h3>
            <div class="info-box">
              <div class="info-row">
                <span class="info-label">Complaint Type:</span>
                <span class="info-value">${data.complaintType}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Priority Level:</span>
                <span class="priority-badge priority-${data.priority.toLowerCase()}">${data.priority}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Vehicle Model:</span>
                <span class="info-value">${data.vehicleModel}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Expected Resolution:</span>
                <span class="info-value">${expectedResolutionTime[data.priority] || '3-5 business days'}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Submission Date:</span>
                <span class="info-value">${new Date(data.submissionDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>
          </div>

          <div class="section">
            <h3><span class="emoji">🔄</span>What Happens Next?</h3>
            <div class="timeline-item active">
              <div class="timeline-content">
                <h4>Complaint Received</h4>
                <p>Your complaint has been logged in our system</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h4>Initial Review (Within 4 hours)</h4>
                <p>Our team will review and assign your complaint to the appropriate department</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h4>Investigation & Analysis</h4>
                <p>We'll investigate the issue and may contact you for additional information</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h4>Resolution & Follow-up</h4>
                <p>We'll implement the solution and follow up to ensure your satisfaction</p>
              </div>
            </div>

            <div class="note-box">
              <p><strong>Important:</strong> We will contact you within <strong>${expectedResolutionTime[data.priority] || '3-5 business days'}</strong> with an update on your complaint status.</p>
            </div>
          </div>

          <div class="contact-section">
            <h3 style="color: #524336; margin-bottom: 16px;">Need Immediate Assistance?</h3>
            <p style="color: #6B7280; margin-bottom: 20px;">
              If your matter is urgent, you can contact us directly using any of the methods below:
            </p>
            
            <div class="contact-methods">
              <div class="contact-method">
                <h4>📞 Phone Support</h4>
                <p>09639-119977</p>
                <p style="font-size: 12px;">Mon-Sat: 9AM-6PM</p>
              </div>
              <div class="contact-method">
                <h4>💬 WhatsApp</h4>
                <p>014099-60306</p>
                <p style="font-size: 12px;">24/7 Available</p>
              </div>
              <div class="contact-method">
                <h4>📧 Email</h4>
                <p>complaints@cherybd.com</p>
                <p style="font-size: 12px;">Response within 24hrs</p>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <h4>Chery Bangladesh</h4>
          <p><strong>"ONE STEP AHEAD"</strong></p>
          <p>Asian MotorspeX Limited - Official Distributor</p>
          <p>📍 206/1-207/1 Bir Uttam Mir Shawkat Sarak, Tejgaon Gulshan Link Road, Dhaka 1208</p>
          <p style="font-size: 12px; opacity: 0.8; margin-top: 16px;">
            This is an automated confirmation email. Please do not reply directly to this message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}