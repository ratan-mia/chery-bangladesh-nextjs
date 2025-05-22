import { sendToZohoCRM } from './zoho-crm';

/**
 * Send test drive booking data to Zoho CRM
 * Creates or updates a lead with test drive information
 * 
 * @param {Object} bookingData - Test drive booking information
 * @param {string} bookingData.name - Customer's full name
 * @param {string} bookingData.email - Customer's email address
 * @param {string} bookingData.contactNumber - Customer's phone number
 * @param {string} bookingData.vehicleModel - Vehicle model requested for test drive
 * @param {string} bookingData.preferredDate - Formatted preferred date
 * @param {string} bookingData.preferredTime - Preferred time slot
 * @param {string} bookingData.location - Test drive location
 * @param {string} bookingData.drivingExperience - Customer's driving experience
 * @param {string} bookingData.specificRequests - Any special requests
 * @param {string} bookingData.bookingId - Unique booking ID
 * @param {string} ipAddress - Customer's IP address
 * @param {string} userAgent - Customer's browser/device information
 * @returns {Promise<Object>} - Result of the Zoho CRM operation
 */
export async function sendTestDriveToZoho(bookingData, ipAddress = 'Not available', userAgent = 'Not available') {
    try {
        // Format data specifically for Zoho CRM lead creation
        const zohoLeadData = {
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.contactNumber,
            company: 'Individual', // Default value if not provided
            carModel: bookingData.vehicleModel,
            // Use 'Test Drive Request' as the document type to identify lead source
            documentType: 'Test Drive Request',
            ipAddress,
            userAgent,
            // Additional test drive specific data
            testDriveData: {
                preferredDate: bookingData.preferredDate,
                preferredTime: bookingData.preferredTime,
                location: bookingData.location,
                drivingExperience: bookingData.drivingExperience || 'Not specified',
                specificRequests: bookingData.specificRequests || 'None',
                bookingId: bookingData.bookingId
            }
        };

        // Send to Zoho CRM using our utility
        const result = await sendToZohoCRM(zohoLeadData);

        // Log the result
        if (result.success) {
            console.log(`Test drive lead ${result.action} in Zoho CRM successfully.`);
        } else {
            console.error('Error in Zoho CRM operation:', result.error);
        }

        return result;
    } catch (error) {
        console.error('Exception sending test drive to Zoho CRM:', error);
        return {
            success: false,
            error: error.message || 'Unknown error occurred'
        };
    }
}

export default sendTestDriveToZoho;