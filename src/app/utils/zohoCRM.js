// utils/zoho-crm.js
import axios from 'axios';

/**
 * Zoho CRM Integration Utility
 * This file contains functions for interacting with the Zoho CRM API
 */

// Constants
const ZOHO_ACCOUNTS_URL = 'https://accounts.zoho.com/oauth/v2/token';
const ZOHO_API_URL = 'https://www.zohoapis.com/crm/v2';

/**
 * Get access token for Zoho CRM API
 * @returns {Promise<string>} Access token
 */
async function getZohoAccessToken() {
  try {
    // Check if we have a valid token in cache
    // In a production app, you might want to use Redis or another caching solution
    if (global.zohoToken && global.zohoTokenExpiry && global.zohoTokenExpiry > Date.now()) {
      return global.zohoToken;
    }

    // No valid token in cache, get a new one
    const response = await axios.post(ZOHO_ACCOUNTS_URL, null, {
      params: {
        refresh_token: process.env.ZOHO_REFRESH_TOKEN,
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        grant_type: 'refresh_token'
      }
    });

    // Store token in global object (will be lost on server restart)
    global.zohoToken = response.data.access_token;
    // Token is valid for 1 hour (3600 seconds), subtract 5 minutes to be safe
    global.zohoTokenExpiry = Date.now() + (response.data.expires_in - 300) * 1000;

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Zoho access token:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with Zoho CRM');
  }
}

/**
 * Create a lead in Zoho CRM
 * @param {Object} leadData - Data for creating a lead
 * @returns {Promise<Object>} Created lead data
 */
export async function createZohoLead(leadData) {
  try {
    // Get access token
    const accessToken = await getZohoAccessToken();

    // Prepare the data for Zoho CRM
    const zohoLeadData = {
      data: [
        {
          Last_Name: leadData.name,
          Business_Unit: 'Chery Bangladesh',
          Email: leadData.email,
          Phone: leadData.phone,
          Company: leadData.company || 'Individual',
          Description: `Requested ${leadData.documentType} for ${leadData.carModel}`,
          Lead_Source: 'Website',
          Lead_Status: 'New',
          // Additional custom fields can be added here
          // Make sure they exist in your Zoho CRM setup
          Vehicle_Model: leadData.carModel || '',
          Document_Type: leadData.documentType || '',
          IP_Address: leadData.ipAddress || '',
          User_Agent: leadData.userAgent || ''
        }
      ],
      // Trigger defined assignment rules
      trigger: ['workflow']
    };

    // Send data to Zoho CRM
    const response = await axios.post(`${ZOHO_API_URL}/Leads`, zohoLeadData, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error creating Zoho lead:', error.response?.data || error.message);
    // Return error but don't throw, to avoid breaking the main flow
    return { error: 'Failed to create lead in Zoho CRM', details: error.message };
  }
}

/**
 * Update a lead in Zoho CRM
 * @param {string} leadId - ID of the lead to update
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated lead data
 */
export async function updateZohoLead(leadId, updateData) {
  try {
    // Get access token
    const accessToken = await getZohoAccessToken();

    // Prepare the data for Zoho CRM
    const zohoUpdateData = {
      data: [updateData],
      trigger: ['workflow']
    };

    // Send data to Zoho CRM
    const response = await axios.put(
      `${ZOHO_API_URL}/Leads/${leadId}`, 
      zohoUpdateData, 
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating Zoho lead:', error.response?.data || error.message);
    return { error: 'Failed to update lead in Zoho CRM', details: error.message };
  }
}

/**
 * Search for a lead in Zoho CRM by email
 * @param {string} email - Email to search for
 * @returns {Promise<Object>} Lead data if found
 */
export async function findZohoLeadByEmail(email) {
  try {
    // Get access token
    const accessToken = await getZohoAccessToken();

    // Search for lead by email
    const response = await axios.get(`${ZOHO_API_URL}/Leads/search`, {
      params: {
        criteria: `(Email:equals:${email})`
      },
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`
      }
    });

    return response.data.data || [];
  } catch (error) {
    console.error('Error searching for Zoho lead:', error.response?.data || error.message);
    return [];
  }
}

/**
 * Send lead data to Zoho CRM
 * This function will check if a lead with the given email already exists
 * If it does, it will update the lead, otherwise it will create a new one
 * @param {Object} leadData - Data for the lead
 * @returns {Promise<Object>} Result of the operation
 */
export async function sendToZohoCRM(leadData) {
  try {
    // Check if lead already exists
    const existingLeads = await findZohoLeadByEmail(leadData.email);
    
    if (existingLeads && existingLeads.length > 0) {
      // Lead exists, update it
      const leadId = existingLeads[0].id;
      
      const updateData = {
        Description: `${existingLeads[0].Description || ''}\nRequested ${leadData.documentType} for ${leadData.carModel} on ${new Date().toLocaleString('en-BD')}`,
        Last_Activity_Time: new Date().toISOString(),
        // Add other fields to update
        Vehicle_Model: leadData.carModel || existingLeads[0].Vehicle_Model,
        Document_Type: leadData.documentType || existingLeads[0].Document_Type
      };
      
      const result = await updateZohoLead(leadId, updateData);
      return { success: true, action: 'updated', result };
    } else {
      // Lead doesn't exist, create a new one
      const result = await createZohoLead(leadData);
      return { success: true, action: 'created', result };
    }
  } catch (error) {
    console.error('Error sending data to Zoho CRM:', error);
    return { success: false, error: error.message };
  }
}

export default {
  sendToZohoCRM,
  createZohoLead,
  updateZohoLead,
  findZohoLeadByEmail
};