document.addEventListener('DOMContentLoaded', async function() {
    let lastLoadedDate = new Date();
    lastLoadedDate.setDate(lastLoadedDate.getDate() + 4);

    const staff_key = '751dea84-f3ef-4e98-b3e9-7402fe56e428';
    const service_key = 'bf74e196-ffa8-4e79-9ca4-b7dca8dceedb';

    // Attempt to load stored data if it exists
    const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Ensure that parsedData is in the expected format (an array of objects)
        const daysData = Array.isArray(parsedData) ? parsedData : [parsedData];
        loadDays(daysData); // Function to load the booking details onto the page
        sessionStorage.removeItem('bookingData'); // Clear the data to prevent it from being used again on refresh
    } else {
        // If no stored data, fetch new data for the next 10 days
        const daysData = await fetchTimeSlots(lastLoadedDate, 10, staff_key, service_key);
        // Ensure daysData is an array
        loadDays(Array.isArray(daysData) ? daysData : [daysData]);
    }

    // Function to load days either from stored data or freshly fetched data
    async function loadDays(daysData) {
        const container = document.getElementById('bookingContainer');
        if (!container) {
            console.error('Container element not found');
            return;
        }

        daysData.forEach(day => {
            const bookingDay = document.createElement('div');
            bookingDay.className = 'booking-day';

            const bookingDate = document.createElement('h3');
            bookingDate.className = 'booking-date';
            bookingDate.textContent = day.date;

            const timeSlots = document.createElement('div');
            timeSlots.className = 'time-slots';

            day.slots.forEach(time => {
                const timeSlot = document.createElement('button');
                timeSlot.className = 'time-slot';
                timeSlot.textContent = time;
                timeSlots.appendChild(timeSlot);
            });

            bookingDay.appendChild(bookingDate);
            bookingDay.appendChild(timeSlots);
            container.appendChild(bookingDay);
        });
    }

    // "See More" button functionality
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', async function() {
            let daysData = [];
            for (let i = 0; i < 5; i++) {
                lastLoadedDate.setDate(lastLoadedDate.getDate() + 1);

                try {
                    const data = await fetchTimeSlots(lastLoadedDate, staff_key, service_key);
                    daysData.push({ date: formatDateToDDMMYYYY(lastLoadedDate), slots: data.slots });
                } catch (error) {
                    console.error(`Error fetching time slots for ${formatDateToDDMMYYYY(targetDate)}:`, error);
                    // Handle the error for this day, e.g., by continuing to the next day
                }
            }
            loadDays(daysData);
        });
    } else {
        console.error('See More button not found');
    }
});
