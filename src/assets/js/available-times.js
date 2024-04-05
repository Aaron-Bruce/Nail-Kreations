document.addEventListener('DOMContentLoaded', async function() {
    showLoading(); // Show the loading spinner immediately

    const urlParams = new URLSearchParams(window.location.search);
    const serviceName = urlParams.get('service');

    if(serviceName) {
        document.querySelector('.service-title h2').textContent = decodeURIComponent(serviceName) + " Availability";
    }

    const staff_key = '751dea84-f3ef-4e98-b3e9-7402fe56e428';
    const service_key = 'bf74e196-ffa8-4e79-9ca4-b7dca8dceedb';
    const daysToLoadInitially = 5;
    let lastLoadedDate = new Date();

    // Fetch new data for the next 10 days
    const daysData = await fetchTimeSlotsForMultipleDays(lastLoadedDate, daysToLoadInitially, staff_key, service_key);
    if(daysData) loadDays(daysData);

    // "See More" button functionality
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', async function() {
            const additionalDays = 5;
            const additionalDaysData = await fetchTimeSlotsForMultipleDays(lastLoadedDate, additionalDays, staff_key, service_key);
            loadDays(additionalDaysData);
        });
    } else {
        console.error('See More button not found');
    }
});

function showLoading() {
    // Hide the "See More" button and booking container while loading
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const bookingContainer = document.getElementById('bookingContainer');
    
    if (seeMoreBtn) seeMoreBtn.style.visibility = 'hidden';
    if (bookingContainer) bookingContainer.style.visibility = 'hidden';

    const spinnerContainer = document.getElementById('loadingSpinner');
    if(spinnerContainer) spinnerContainer.style.display = 'flex'; // Show the spinner
}

function hideLoading() {
    const spinnerContainer = document.getElementById('loadingSpinner');
    spinnerContainer.style.display = 'none'; // Hide the spinner

    // Show the "See More" button and booking container after loading
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const bookingContainer = document.getElementById('bookingContainer');
    
    if (seeMoreBtn) 
    {
        seeMoreBtn.style.visibility = 'visible';
        seeMoreBtn.style.display = 'block';
    }
    if (bookingContainer) bookingContainer.style.visibility = 'visible';
}


async function fetchTimeSlotsForMultipleDays(startDate, numberOfDays, staffKey, serviceKey) {
    let daysData = [];
    for (let i = 0; i < numberOfDays; i++) {
        const targetDate = new Date(startDate);
        targetDate.setDate(startDate.getDate() + i);

        try {
            const data = await fetchTimeSlots(targetDate, staffKey, serviceKey);
            daysData.push({ date: formatDateToDDMMYYYY(targetDate), slots: data.slots });

            // Update lastLoadedDate to the next day after the last loaded date
            lastLoadedDate = new Date(targetDate);
        } catch (error) {
            console.error(`Error fetching time slots for ${formatDateToDDMMYYYY(targetDate)}:`, error);
        }
    }
    return daysData;
}

function loadDays(daysData) {
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

        // Assuming day.date is in DD/MM/YYYY format
        const parts = day.date.split('/'); // Split the date into parts
        const dateObject = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`); // Convert to MM/DD/YYYY format
        const dayOfWeek = dateObject.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day of the week

        bookingDate.textContent = `${dayOfWeek}, ${day.date}`; // Set the text content to include the day of the week

        const timeSlots = document.createElement('div');
        timeSlots.className = 'time-slots';

        day.slots.forEach(time => {
            const timeSlot = document.createElement('button');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = time;

            timeSlot.addEventListener('click', function() {
                // Define the URL or action to execute when the time slot is clicked
                // For example, redirect to another page
                // You can also pass additional data in the URL if needed
                window.location.href = '/booking-details';
            });

            timeSlots.appendChild(timeSlot);
        });

        bookingDay.appendChild(bookingDate);
        bookingDay.appendChild(timeSlots);
        container.appendChild(bookingDay);
    });

    hideLoading(); // Hide the spinner once all days are loaded
}



// Keep your existing formatDateToDDMMYYYY function

