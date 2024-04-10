const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { firstName, lastName, email, phone } = JSON.parse(event.body);
  const accessToken = process.env.SETMORE_ACCESS_TOKEN; // Set this in your Netlify Environment Variables

  try {
    const customerResponse = await axios.post('https://developer.setmore.com/api/v1/bookingapi/customer/create', {
      first_name: firstName,
      last_name: lastName,
      email_id: email,
      cell_phone: phone,
      // Include any additional customer details here
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Assuming the customer creation was successful and you want to return the created customer details or a success message
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Customer created successfully', customer: customerResponse.data.data.customer }),
    };
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating customer', error: error.response ? error.response.data : error.message }),
    };
  }
};
