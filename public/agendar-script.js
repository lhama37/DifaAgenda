document.addEventListener('DOMContentLoaded', () => {
    const dateSelector = document.getElementById('dateSelector');
    const availabilitySlots = document.getElementById('availability-slots');
    const slotsGrid = document.getElementById('slots-grid');
    const bookingForm = document.getElementById('booking-form');
    const bookingDateInput = document.getElementById('bookingDate');

    dateSelector.addEventListener('change', () => {
        const selectedDate = dateSelector.value;
        if (selectedDate) {
            renderAvailability(selectedDate);
            availabilitySlots.style.display = 'block';
            bookingForm.style.display = 'none';
        }
    });

    function renderAvailability(date) {
        slotsGrid.innerHTML = '';

        const startHour = 0;
        const endHour = 24;
        const interval = 10;

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += interval) {
                const timeSlot = document.createElement('div');
                timeSlot.classList.add('time-slot');
                const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                timeSlot.textContent = timeString;

                const bookButton = document.createElement('button');
                bookButton.textContent = 'Marcar';
                bookButton.classList.add('book-button');
                bookButton.addEventListener('click', () => {
                    bookingDateInput.value = `${date} - ${timeString}`;
                    bookingForm.style.display = 'block';
                    window.scrollTo(0, document.body.scrollHeight);
                });

                const slotContainer = document.createElement('div');
                slotContainer.classList.add('slot-container');
                slotContainer.appendChild(timeSlot);
                slotContainer.appendChild(bookButton);

                slotsGrid.appendChild(slotContainer);
            }
        }
    }
});
