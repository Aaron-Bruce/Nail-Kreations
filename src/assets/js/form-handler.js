document.addEventListener('DOMContentLoaded', function() {
    // Event listener for 'Find Appointments' button click
    document.getElementById('find-appointments').addEventListener('click', function() {
        const timeSlotsContainer = document.getElementById('time-slots');
        timeSlotsContainer.innerHTML = '';  // Clear existing time slots
        
        // Dummy data for available time slots
        const availableTimeSlots = ['9:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'];

        // Create clickable widgets for each time slot
        availableTimeSlots.forEach(timeSlot => {
            const button = document.createElement('button');
            button.textContent = timeSlot;
            button.classList.add('time-slot');
            button.onclick = () => {
                // Redirect to the details page with the selected time slot as a query parameter
                window.location.href = `/booking-details?time=${encodeURIComponent(timeSlot)}`;
            };
            timeSlotsContainer.appendChild(button);
        });

        timeSlotsContainer.style.display = 'block';  // Show the container with time
    });
});

