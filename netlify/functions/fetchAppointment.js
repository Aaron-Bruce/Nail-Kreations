const axios = require('axios');

exports.handler = async (event) => {
    console.log("Incoming payload:", event.body);
    const accessToken = process.env.SETMORE_ACCESS_TOKEN; // Ensure your access token is securely stored in environment variables
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };

    if (event.httpMethod === 'POST') {
        const payload = JSON.parse(event.body); // Parse the JSON payload from the request body

        try {
            const response = await axios.post('https://developer.setmore.com/api/v1/bookingapi/slots', payload, { headers });
            return {
                statusCode: 200,
                body: JSON.stringify(response.data),
            };
        } catch (error) {
            console.error('Error fetching available time slots:', error);
            return {
                statusCode: error.response ? error.response.status : 500,
                body: JSON.stringify({ message: 'Error fetching available time slots', error: error.message }),
            };
        }
    }

    // Default response for unsupported methods
    return { statusCode: 405, body: 'Method Not Allowed' };
};
