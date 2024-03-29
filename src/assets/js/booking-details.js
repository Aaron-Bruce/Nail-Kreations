document.addEventListener('DOMContentLoaded', function() {
    let lastLoadedDate = new Date(); // Start from today's date

    async function loadDays(daysToLoad) {
        const container = document.getElementById('bookingContainer');
        if (!container) {
            console.error('Container element not found');
            return;
        }

        for (let i = 0; i < daysToLoad; i++) {
            const bookingDay = document.createElement('div');
            bookingDay.className = 'booking-day';

            const bookingDate = document.createElement('h3');
            bookingDate.className = 'booking-date';
            const dateText = lastLoadedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
            bookingDate.textContent = dateText;

            const timeSlots = document.createElement('div');
            timeSlots.className = 'time-slots';

            // Fetch available time slots from the API for lastLoadedDate
            try {
                const formattedDate = formatDateToDDMMYYYY(lastLoadedDate); // Format as YYYY-MM-DD
                const response = await fetch(`/.netlify/functions/fetchAppointment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        staff_key: '751dea84-f3ef-4e98-b3e9-7402fe56e428',      
                        service_key: 'bf74e196-ffa8-4e79-9ca4-b7dca8dceedb',    
                        selected_date: formattedDate,
                        // other required fields here
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const { data } = await response.json(); // Destructure the data object from the response

                // Loop through the slots array within the data object
                data.slots.forEach(time => {
                    const timeSlot = document.createElement('button');
                    timeSlot.className = 'time-slot';
                    timeSlot.textContent = time;
                    timeSlots.appendChild(timeSlot);
                });
            } catch (error) {
                console.error('Error fetching available time slots:', error);
                // Handle error, maybe show a message to the user
            }

            bookingDay.appendChild(bookingDate);
            bookingDay.appendChild(timeSlots);

            container.appendChild(bookingDay);

            // Increment the lastLoadedDate for the next iteration
            lastLoadedDate.setDate(lastLoadedDate.getDate() + 1);
        }
    }

    // Load the initial set of days
    loadDays(10);

    const seeMoreBtn = document.getElementById('seeMoreBtn');
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function() {
            loadDays(10); // Load 10 more days on each click
        });
    } else {
        console.error('See More button not found');
    }

    function formatDateToDDMMYYYY(date) {
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        let year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }
    
});
