const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, phone, service, message } = JSON.parse(event.body);
  const accessToken = process.env.SETMORE_ACCESS_TOKEN;  // Set this in your Netlify Environment Variables

  // Example: Create a customer in Setmore
  // Adapt this to your needs, including creating an appointment
  try {
    const response = await axios.post('https://developer.setmore.com/api/v1/bookingapi/customer/create', {
      first_name: name,
      email_id: email,
      cell_phone: phone,
      // Add other customer details as needed
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Check response and proceed to create an appointment
    // You'll need to handle this part according to your requirements

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Customer created and appointment booked successfully' }),
    };
  } catch (error) {
    console.error('Error creating customer/appointment:', error.response.data);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating customer/appointment' }),
    };
  }
};
