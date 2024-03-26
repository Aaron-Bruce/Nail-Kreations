document.addEventListener('DOMContentLoaded', function() {
    let lastLoadedDate = new Date(); // Start from today's date

    function loadDays(daysToLoad) {
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
            bookingDate.textContent = lastLoadedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

            const timeSlots = document.createElement('div');
            timeSlots.className = 'time-slots';

            ['10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].forEach(time => {
                const timeSlot = document.createElement('button');
                timeSlot.className = 'time-slot';
                timeSlot.textContent = time;
                timeSlots.appendChild(timeSlot);
            });

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
});
