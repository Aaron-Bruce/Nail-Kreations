async function fetchTimeSlots(startDate, staffKey, serviceKey) {
    const formattedDate = formatDateToDDMMYYYY(startDate); // Format the start date

    try {
        const response = await fetch(`/.netlify/functions/fetchAppointment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                staff_key: staffKey,
                service_key: serviceKey,
                selected_date: formattedDate,
                // Include other required fields here
            })
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok for date: ${formattedDate}`);
        }

        const { data } = await response.json(); // Destructure the data object from the response
        return { date: formattedDate, slots: data.slots };
    } catch (error) {
        console.error('Error fetching available time slots for', formattedDate, ':', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

function formatDateToDDMMYYYY(date) {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    let year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
}
