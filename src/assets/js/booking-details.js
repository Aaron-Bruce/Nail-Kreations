document.addEventListener('DOMContentLoaded', function() {
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', loadAppointments);
    } else {
        console.error('See More button not found');
    }

    // Initially load appointments
    loadAppointments();
});

async function loadAppointments() {
    const startDate = formatDate(new Date());
    const endDate = formatDate(addDays(new Date(), 10)); // Adjust the range as needed

    try {
        const response = await fetch(`/netlify/functions/fetchAppointments?startDate=${startDate}&endDate=${endDate}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayAppointments(data.data.appointments);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayAppointments(appointments) {
    const container = document.getElementById('bookingContainer');
    appointments.forEach(appointment => {
        const bookingDay = document.createElement('div');
        bookingDay.className = 'booking-day';

        const bookingDate = document.createElement('h3');
        bookingDate.className = 'booking-date';
        bookingDate.textContent = new Date(appointment.start_time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

        const timeSlot = document.createElement('button');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = new Date(appointment.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        bookingDay.appendChild(bookingDate);
        bookingDay.appendChild(timeSlot);

        container.appendChild(bookingDay);
    });
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

