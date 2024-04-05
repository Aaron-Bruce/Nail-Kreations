// Attach click events after the DOM content is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelectorAll('.cs-link.service-link').forEach(link => {
//         link.addEventListener('click', function(event) {
//             event.preventDefault(); // Stop the link from navigating immediately

//             const serviceName = this.dataset.service; // Get the service name from the data attribute
//             console.log('Service selected:', serviceName); // For debugging

//             // Store the service name in sessionStorage
//             sessionStorage.setItem('selectedService', serviceName);

//             // Navigate to the booking-details page
//             window.location.href = this.href; // Use the href from the link itself
//         });
//     });
// });
