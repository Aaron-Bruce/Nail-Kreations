const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, phone, service, message } = JSON.parse(event.body);
  const accessToken = process.env.SETMORE_ACCESS_TOKEN;  // Set this in your Netlify Environment Variables
  const staffKey = "751dea84-f3ef-4e98-b3e9-7402fe56e428";
  const serviceKey = "1234";  // Assuming this is the service key you want to use

  try {
    // Step 1: Create Customer in Setmore
    const customerResponse = await axios.post('https://developer.setmore.com/api/v1/bookingapi/customer/create', {
      first_name: name,
      email_id: email,
      cell_phone: phone,
      // Add other customer details as needed
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const customerKey = customerResponse.data.data.customer.key; // Extracting the customer key from the response

    // Step 2: Create Appointment with the new customer key, staff key, and service key
    const appointmentResponse = await axios.post('https://developer.setmore.com/api/v1/bookingapi/appointment/create', {
      staff_key: staffKey,
      service_key: serviceKey,
      customer_key: customerKey,
      start_time: "2024-03-10T14:00:00Z", // Example start time, adjust as necessary
      end_time: "2024-03-10T15:00:00Z",   // Example end time, adjust as necessary
      // Include any additional appointment details required by Setmore
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Assuming the appointment creation was successful and you want to return a success message
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Customer created and appointment booked successfully' }),
    };
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating customer/appointment' }),
    };
  }
};

