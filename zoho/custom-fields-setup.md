# Complete Setup Guide for Chery Bangladesh Integrations

This comprehensive guide covers setting up email, WhatsApp, and Zoho CRM integrations for all your customer touchpoints: document requests, test drive bookings, and contact forms.

## Prerequisites

### Required Environment Variables

Add these to your `.env.local` file:

```env
# Email Configuration
GMAIL_USER=your_gmail_email@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password

# Zoho CRM Configuration
ZOHO_CLIENT_ID=1000.CWBS2SV3ZD7MVUXPSD5TNZIZ6NJQPO
ZOHO_CLIENT_SECRET=66343526584df083705a4e4f9d35d92d6e30ba908c
ZOHO_REFRESH_TOKEN=your_refresh_token_here

# WhatsApp Configuration (Choose one option)
# Option 1: Twilio WhatsApp API
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Option 2: Meta WhatsApp Business API
META_ACCESS_TOKEN=your_meta_access_token
META_PHONE_NUMBER_ID=your_phone_number_id

# Admin WhatsApp Numbers for Notifications
ADMIN_WHATSAPP_1=8801xxxxxxxxx
ADMIN_WHATSAPP_2=8801xxxxxxxxx
```

### Required NPM Packages

```bash
npm install axios nodemailer
```

## File Structure

```
project-root/
├── app/
│   └── api/
│       ├── contact/
│       │   ├── emails/
│       │   │   ├── admin-template.js
│       │   │   └── customer-template.js
│       │   └── route.js
│       ├── send-brochure-request/
│       │   └── route.js
│       └── test-drive-booking/
│           ├── emails/
│           │   └── email-templates.js
│           └── route.js
└── utils/
    ├── zoho-crm.js
    ├── document-request-to-zoho.js
    ├── test-drive-to-zoho.js
    ├── contact-form-to-zoho.js
    └── whatsapp-service.js
```

## Zoho CRM Setup

### Step 1: Create Custom Fields

In your Zoho CRM Leads module, create these custom fields:

#### General Fields (for all lead types)

| Field Name    | Field Type       | Description                |
| ------------- | ---------------- | -------------------------- |
| Vehicle_Model | Dropdown         | Vehicle model of interest  |
| IP_Address    | Single-line text | Customer's IP address      |
| User_Agent    | Multi-line text  | Browser/device information |
| Document_Type | Dropdown         | Type of interaction        |

#### Document Request Fields

| Field Name              | Field Type       | Description          |
| ----------------------- | ---------------- | -------------------- |
| Last_Document_Requested | Single-line text | Most recent document |

#### Test Drive Fields

| Field Name          | Field Type       | Description                   |
| ------------------- | ---------------- | ----------------------------- |
| Test_Drive_Date     | Date             | Preferred test drive date     |
| Test_Drive_Time     | Single-line text | Preferred time slot           |
| Test_Drive_Location | Dropdown         | Test drive location           |
| Booking_ID          | Single-line text | Unique booking ID             |
| Driving_Experience  | Multi-line text  | Customer's driving experience |
| Special_Requests    | Multi-line text  | Special requests              |

#### Contact Form Fields

| Field Name       | Field Type       | Description              |
| ---------------- | ---------------- | ------------------------ |
| Contact_Subject  | Single-line text | Contact form subject     |
| Contact_Message  | Multi-line text  | Contact form message     |
| Reference_Number | Single-line text | Inquiry reference number |

### Step 2: Update Lead Source Values

Add these values to your Lead Source picklist:

- Website - Contact Form
- Website - Document Request
- Website - Test Drive Request

### Step 3: Create Custom Views

Set up these views for better lead management:

1. **Recent Document Requests**

   - Criteria: Document_Type contains "brochure" OR "manual"
   - Time filter: This week

2. **Upcoming Test Drives**

   - Criteria: Document_Type equals "Test Drive Request"
   - Date filter: Test_Drive_Date >= Today

3. **Unresponded Contact Forms**
   - Criteria: Document_Type equals "Contact Form" AND Lead_Status equals "New"

## WhatsApp API Setup

### Option 1: Twilio WhatsApp API

1. Sign up for a Twilio account at [twilio.com](https://www.twilio.com)
2. Enable WhatsApp sandbox for testing
3. For production, request WhatsApp Business API approval
4. Get your Account SID, Auth Token, and WhatsApp-enabled phone number

### Option 2: Meta WhatsApp Business API

1. Create a Meta Business account
2. Set up WhatsApp Business API
3. Get your access token and phone number ID
4. Create and get approval for message templates

### WhatsApp Templates (for Meta API)

You'll need to create and get approval for these templates:

1. **Document Request Confirmation**
2. **Test Drive Confirmation**
3. **Contact Form Acknowledgment**

## Implementation Steps

### Step 1: Set Up Utility Files

1. Create `utils/zoho-crm.js` - Core Zoho CRM integration
2. Create `utils/whatsapp-service.js` - WhatsApp messaging service
3. Create specific integration files:
   - `utils/document-request-to-zoho.js`
   - `utils/test-drive-to-zoho.js`
   - `utils/contact-form-to-zoho.js`

### Step 2: Update API Routes

Update your existing API routes to include the new integrations:

1. **Document Request Route** (`app/api/send-brochure-request/route.js`)

   - Add Zoho CRM integration
   - Add WhatsApp notifications
   - Maintain existing email functionality

2. **Test Drive Route** (`app/api/test-drive-booking/route.js`)

   - Add Zoho CRM integration
   - Add WhatsApp confirmations
   - Maintain existing email functionality

3. **Contact Form Route** (`app/api/contact/route.js`)
   - Add Zoho CRM integration
   - Add WhatsApp notifications
   - Maintain existing email functionality

### Step 3: Test All Integrations

#### Test Document Requests

1. Submit a document request form
2. Verify email is sent to customer and admin
3. Check that lead is created/updated in Zoho CRM
4. Confirm WhatsApp messages are sent

#### Test Test Drive Bookings

1. Submit a test drive booking
2. Verify confirmation emails are sent
3. Check that lead is created/updated in Zoho CRM
4. Confirm WhatsApp confirmations are sent

#### Test Contact Forms

1. Submit a contact form
2. Verify acknowledgment and admin emails are sent
3. Check that lead is created/updated in Zoho CRM
4. Confirm WhatsApp notifications are sent

## Error Handling and Monitoring

### Logging Strategy

All integrations include comprehensive logging:

- Success/failure of each operation
- Error details for troubleshooting
- Performance metrics
- Customer interaction tracking

### Graceful Degradation

The system is designed to continue working even if some services fail:

- If Zoho CRM is down, emails and WhatsApp still work
- If WhatsApp fails, emails and CRM integration continue
- Critical functions (like admin email notifications) are prioritized

### Monitoring Checklist

Regularly monitor:

- [ ] Email delivery rates
- [ ] WhatsApp message success rates
- [ ] Zoho CRM API limits and usage
- [ ] Error logs for pattern identification
- [ ] Customer feedback on communication quality

## Maintenance Tasks

### Weekly

- Review failed operations in logs
- Check Zoho CRM for duplicate leads
- Verify WhatsApp message templates are approved

### Monthly

- Analyze integration performance metrics
- Update lead scoring and routing rules
- Review and optimize email templates
- Check API usage limits

### Quarterly

- Review and update custom fields in Zoho CRM
- Optimize workflow automation rules
- Conduct end-to-end testing of all integrations
- Update documentation and training materials

## Troubleshooting Common Issues

### Email Issues

- Verify Gmail app passwords are current
- Check SMTP connection settings
- Monitor email delivery rates

### WhatsApp Issues

- Verify API credentials are valid
- Check message template approval status
- Monitor rate limits and quotas

### Zoho CRM Issues

- Refresh access tokens as needed
- Verify custom field API names match code
- Check CRM storage limits

This comprehensive setup will provide a robust, multi-channel communication system that captures leads, nurtures prospects, and helps convert visitors into customers.
