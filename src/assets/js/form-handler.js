document.getElementById('cs-form-1389').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        name: document.getElementById('name-1389').value,
        email: document.getElementById('email-1389').value,
        phone: document.getElementById('phone-1389').value,
        //service: document.getElementById('service-1389').value, // Ensure you have this field in your form
        message: document.getElementById('message-1389').value,
    };

    // Using the correct endpoint for the Netlify function
    fetch('/.netlify/functions/createAppointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Appointment booked successfully');
        // Optionally, clear the form fields
        document.getElementById('cs-form-1389').reset();
        // Or redirect the user
        // window.location.href = 'thank-you-page.html';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error booking appointment. Please try again later.');
    });
});
