# Zoho CRM Custom Fields Setup Guide

This guide provides detailed instructions for setting up the required custom fields in Zoho CRM for your Chery Bangladesh lead management.

## Accessing Field Setup

1. Log in to [Zoho CRM](https://crm.zoho.com)
2. Click on the gear icon (⚙️) in the top-right corner
3. Select **Setup** from the dropdown menu
4. In the Setup menu, click on **Customization**
5. Click on **Modules and Fields**
6. Select the **Leads** module

## Creating Custom Fields

For each field below, click the **+ Create Field** button and configure as specified.

### Vehicle Model Field

| Setting | Value |
|---------|-------|
| Field Type | Dropdown (Picklist) |
| Field Label | Vehicle Model |
| API Name | Vehicle_Model |
| Field Values | • Tiggo 4 Pro<br>• Tiggo 7 Pro<br>• Tiggo 8 Pro<br>• Arrizo 6<br>• Omoda<br>• Jaccoo<br>• Tiggo Cross |
| Required | No |
| Visible To | All profiles |

### Document Type Field

| Setting | Value |
|---------|-------|
| Field Type | Dropdown (Picklist) |
| Field Label | Document Type |
| API Name | Document_Type |
| Field Values | • Brochure<br>• User Manual<br>• Test Drive Request |
| Required | No |
| Visible To | All profiles |

### IP Address Field

| Setting | Value |
|---------|-------|
| Field Type | Single-line text |
| Field Label | IP Address |
| API Name | IP_Address |
| Max Length | 50 |
| Required | No |
| Visible To | All profiles |

### User Agent Field

| Setting | Value |
|---------|-------|
| Field Type | Multi-line text |
| Field Label | User Agent |
| API Name | User_Agent |
| Max Length | 500 |
| Required | No |
| Visible To | All profiles |

### Test Drive Date Field

| Setting | Value |
|---------|-------|
| Field Type | Date |
| Field Label | Test Drive Date |
| API Name | Test_Drive_Date |
| Required | No |
| Visible To | All profiles |

### Test Drive Time Field

| Setting | Value |
|---------|-------|
| Field Type | Dropdown (Picklist) |
| Field Label | Test Drive Time |
| API Name | Test_Drive_Time |
| Field Values | • Morning (9 AM - 12 PM)<br>• Afternoon (12 PM - 3 PM)<br>• Evening (3 PM - 6 PM) |
| Required | No |
| Visible To | All profiles |

### Test Drive Location Field

| Setting | Value |
|---------|-------|
| Field Type | Dropdown (Picklist) |
| Field Label | Test Drive Location |
| API Name | Test_Drive_Location |
| Field Values | • Showroom - Tejgaon<br>• Customer's Location<br>• Other |
| Required | No |
| Visible To | All profiles |

### Booking ID Field

| Setting | Value |
|---------|-------|
| Field Type | Single-line text |
| Field Label | Booking ID |
| API Name | Booking_ID |
| Max Length | 20 |
| Required | No |
| Visible To | All profiles |

### Driving Experience Field

| Setting | Value |
|---------|-------|
| Field Type | Multi-line text |
| Field Label | Driving Experience |
| API Name | Driving_Experience |
| Max Length | 1000 |
| Required | No |
| Visible To | All profiles |

### Special Requests Field

| Setting | Value |
|---------|-------|
| Field Type | Multi-line text |
| Field Label | Special Requests |
| API Name | Special_Requests |
| Max Length | 1000 |
| Required | No |
| Visible To | All profiles |

## Modifying Lead Status Picklist

You might also want to customize the Lead Status picklist to reflect your sales process:

1. In the Leads module customization, click on **Fields**
2. Find the **Lead Status** field and click Edit
3. Add these values (if not already present):
   - New
   - Contacted
   - Test Drive Scheduled
   - Test Drive Completed
   - Quotation Sent
   - Negotiation
   - Converted to Sales
   - Lost

## Updating Page Layouts

After creating custom fields, add them to your page layout:

1. In the Leads module customization, click on **Page Layouts**
2. Click on the standard layout (or create a new one)
3. Drag and drop your new fields into appropriate sections
4. Consider creating these sections:
   - Document Request Info (for document-related fields)
   - Test Drive Info (for test drive-related fields)
   - Tracking Info (for IP address and User Agent)
5. Save the layout

## Creating Custom Views

Create these custom views for better lead management:

1. Go to the Leads module
2. Click on **Create View** button
3. Create a view named "Document Requests" with criteria:
   - Document_Type equals Brochure OR Document_Type equals User Manual
4. Create a view named "Test Drive Bookings" with criteria:
   - Document_Type equals Test Drive Request
5. Create a view named "Upcoming Test Drives" with criteria:
   - Document_Type equals Test Drive Request AND Test_Drive_Date greater than or equal to Today

These custom views will help your sales team quickly find and follow up on different types of leads.
