const axios = require('axios');

exports.handler = async (event) => {
    const accessToken = process.env.SETMORE_ACCESS_TOKEN; // Ensure your access token is securely stored in environment variables
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };

    if (event.httpMethod === 'GET') {
        const { startDate, endDate } = event.queryStringParameters; // Get startDate and endDate from query parameters

        try {
            const response = await axios.get(`https://developer.setmore.com/api/v1/bookingapi/appointments?startDate=${startDate}&endDate=${endDate}&customerDetails=true`, { headers });
            return {
                statusCode: 200,
                body: JSON.stringify(response.data),
            };
        } catch (error) {
            console.error('Error fetching appointments:', error);
            return {
                statusCode: error.response ? error.response.status : 500,
                body: JSON.stringify({ message: 'Error fetching appointments' }),
            };
        }
    }

    // Default response for unsupported methods
    return { statusCode: 405, body: 'Method Not Allowed' };
};
