document.addEventListener('DOMContentLoaded', function() {
    const findAppointmentButton = document.getElementById('find-appointments');

    if (findAppointmentButton) {
        findAppointmentButton.addEventListener('click', async function() {
            let daysData = [];
            const today = new Date();
            console.log("Today is the" + today);

            for (let i = 0; i < 5; i++) {
                const targetDate = new Date(today);
                targetDate.setDate(today.getDate() + i);

                try {
                    // Assuming fetchTimeSlots takes a Date object and returns data for that day
                    const data = await fetchTimeSlots(targetDate, '751dea84-f3ef-4e98-b3e9-7402fe56e428', 'bf74e196-ffa8-4e79-9ca4-b7dca8dceedb');
                    daysData.push({ date: formatDateToDDMMYYYY(targetDate), slots: data.slots });
                } catch (error) {
                    console.error(`Error fetching time slots for ${formatDateToDDMMYYYY(targetDate)}:`, error);
                    // Handle the error for this day, e.g., by continuing to the next day
                }
            }

            // Store the accumulated daysData in sessionStorage
            sessionStorage.setItem('bookingData', JSON.stringify(daysData));

            // Navigate to the booking-details page
            window.location.href = '/booking-details';
        });
    }
});
