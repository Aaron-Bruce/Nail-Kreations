// This script listens for a click on elements with the class 'book-appointment'
// and then redirects to the services page.
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.book-appointment');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            window.location.href = '/projects#booking';
        });
    });
});
