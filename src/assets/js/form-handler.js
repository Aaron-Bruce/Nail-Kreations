document.getElementById('cs-form-1389').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById('name-1389').value,
        email: document.getElementById('email-1389').value,
        phone: document.getElementById('phone-1389').value,
        service: document.getElementById('service-1389').value,
        message: document.getElementById('message-1389').value,
    };

    // Replace '/.netlify/functions/yourFunctionName' with the path to your specific Netlify Function
    fetch('/.netlify/functions/yourFunctionName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Appointment booked successfully');
        // Clear the form or redirect the user as needed
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error booking appointment');
    });
});
