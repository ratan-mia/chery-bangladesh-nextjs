# Required Custom Fields for Zoho CRM Leads Module

## Basic Fields
These are standard fields that already exist in Zoho CRM:
- Last_Name (standard field, will contain the visitor's full name)
- Email (standard field)
- Phone (standard field)
- Company (standard field)
- Description (standard field, will contain information about the document request)
- Lead_Source (standard field, will be set to "Website")
- Lead_Status (standard field, will be set to "New")

## Custom Fields to Create
You need to create these custom fields in your Zoho CRM Leads module:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| Vehicle_Model | Single-line text / Dropdown | The Chery model the visitor is interested in (e.g., "Tiggo 8 Pro", "Tiggo Cross") |
| Document_Type | Single-line text / Dropdown | Type of document requested (e.g., "brochure", "manual") |
| IP_Address | Single-line text | Visitor's IP address for analytics |
| User_Agent | Multi-line text | Visitor's browser/device information |
| Document_Request_Date | Date/Time | When the document was requested |

## Optional Additional Fields
These fields could be useful but aren't directly used in the current code:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| Last_Document_Requested | Single-line text | Most recent document the visitor downloaded |
| Total_Document_Requests | Number | Count of how many documents this lead has downloaded |
| Source_Page | Single-line text | Which page on your website the request came from |
