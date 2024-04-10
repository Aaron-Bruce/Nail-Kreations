const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Log the entire event body at the beginning to see what's being sent to the function
  console.log("Received event body:", event.body);

  // Destructure the necessary attributes from the request body
  const { staffKey, serviceKey, customerKey, startTime, endTime } = JSON.parse(event.body);
  const accessToken = process.env.SETMORE_ACCESS_TOKEN; // Set this in your Netlify Environment Variables

  try {
    // Create Appointment with the provided keys and times
    const appointmentResponse = await axios.post('https://developer.setmore.com/api/v1/bookingapi/appointment/create', {
      staff_key: staffKey,
      service_key: serviceKey,
      customer_key: customerKey,
      start_time: startTime,
      end_time: endTime,
      // Add any additional appointment details required by Setmore here
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Check if the appointment creation was successful
    if (appointmentResponse.data && appointmentResponse.data.data && appointmentResponse.data.data.appointment) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Appointment booked successfully', appointmentDetails: appointmentResponse.data.data.appointment }),
      };
    } else {
      throw new Error('Failed to create appointment');
    }
  } catch (error) {
    // Log the variables in the catch block
    console.error('Error details:', {
      staffKey: staffKey,
      serviceKey: serviceKey,
      customerKey: customerKey,
      startTime: startTime,
      endTime: endTime,
      error: error.response ? error.response.data : error.message
    });

    const timeInfo = startTime ? ` for time ${startTime}` : ''; // Provides fallback text if startTime is undefined
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({
        message: `Error creating appointment${timeInfo}`,
        error: error.response ? error.response.data : error.message,
      }),
    };
  }
};
