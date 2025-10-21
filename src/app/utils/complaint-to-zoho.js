import axios from 'axios';

const sendComplaintToZoho = async (complaintData) => {
  try {
    // Prepare data for Zoho CRM
    const zohoData = {
      data: [
        {
          // Custom fields for complaint management
          Complaint_ID: complaintData.complaintId,
          Complaint_Type: complaintData.complaintType,
          Priority: complaintData.priority,
          Status: complaintData.status || 'Submitted',
          
          // Customer information
          First_Name: complaintData.name.split(' ')[0],
          Last_Name: complaintData.name.split(' ').slice(1).join(' ') || 'N/A',
          Email: complaintData.email,
          Phone: complaintData.contactNumber,
          Alternate_Phone: complaintData.alternateNumber || null,
          Mailing_Street: complaintData.address || null,
          
          // Vehicle information
          Vehicle_Model: complaintData.vehicleModel,
          Vehicle_Year: complaintData.vehicleYear || null,
          VIN_Number: complaintData.vinNumber || null,
          Purchase_Date: complaintData.purchaseDate || null,
          Dealer_Name: complaintData.dealerName || null,
          
          // Complaint details
          Subject: complaintData.complaintTitle,
          Description: complaintData.complaintDescription,
          Desired_Resolution: complaintData.desiredResolution || null,
          Previous_Service_History: complaintData.previousServiceHistory || null,
          
          // System fields
          Lead_Source: 'Website Complaint Form',
          Submission_Date: complaintData.submissionDate,
          
          // Tags for filtering
          Tag: [`Complaint_${complaintData.complaintType}`, `Priority_${complaintData.priority}`]
        }
      ]
    };

    // Get access token (refresh if needed)
    const accessToken = await getValidAccessToken();

    // Send to Zoho CRM Leads module
    const response = await axios.post(
      'https://www.zohoapis.com/crm/v2/Leads',
      zohoData,
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Complaint sent to Zoho CRM:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error sending complaint to Zoho CRM:', error.response?.data || error.message);
    throw error;
  }
};

const getValidAccessToken = async () => {
  try {
    // Check if current access token is valid
    const currentToken = process.env.ZOHO_ACCESS_TOKEN;
    
    // If token exists, try to use it first
    if (currentToken) {
      try {
        // Test the token with a simple API call
        await axios.get('https://www.zohoapis.com/crm/v2/settings/modules', {
          headers: {
            'Authorization': `Zoho-oauthtoken ${currentToken}`
          }
        });
        return currentToken;
      } catch (error) {
        console.log('Current access token expired, refreshing...');
      }
    }

    // Refresh the access token
    const refreshResponse = await axios.post(
      'https://accounts.zoho.com/oauth/v2/token',
      null,
      {
        params: {
          refresh_token: process.env.ZOHO_REFRESH_TOKEN,
          client_id: process.env.ZOHO_CLIENT_ID,
          client_secret: process.env.ZOHO_CLIENT_SECRET,
          grant_type: 'refresh_token'
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const newAccessToken = refreshResponse.data.access_token;
    console.log('New access token obtained');
    
    // In production, you might want to update the environment variable
    // or store this in a database
    process.env.ZOHO_ACCESS_TOKEN = newAccessToken;
    
    return newAccessToken;

  } catch (error) {
    console.error('Error refreshing Zoho access token:', error.response?.data || error.message);
    throw new Error('Failed to get valid Zoho access token');
  }
};

export default sendComplaintToZoho;