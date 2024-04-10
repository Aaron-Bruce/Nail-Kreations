// functions/updateAccessToken.js
const axios = require('axios');

exports.handler = async (event) => {
    const { NETLIFY_API_TOKEN, SITE_ID } = process.env; // Ensure you have these in your Netlify environment variables

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NETLIFY_API_TOKEN}`,
    };

    const { newAccessToken } = JSON.parse(event.body); // Assuming the new access token is sent in the request's body

    try {
        await axios.patch(`https://api.netlify.com/api/v1/sites/${SITE_ID}`, {
            build_settings: {
                env: {
                    SETMORE_ACCESS_TOKEN: newAccessToken,
                },
            },
        }, { headers });

        // Trigger a redeploy by hitting the build hook URL
        const BUILD_HOOK_URL = '<Your_Build_Hook_URL>'; // Replace with your actual Build Hook URL
        await axios.post(BUILD_HOOK_URL);

        return { statusCode: 200, body: 'Access token updated and site redeployed' };
    } catch (error) {
        console.error('Error updating access token:', error);
        return { statusCode: error.response ? error.response.status : 500, body: error.message };
    }
};
