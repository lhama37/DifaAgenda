document.addEventListener('DOMContentLoaded', () => {
    const monthYear = document.getElementById('monthYear');
    const daysGrid = document.getElementById('daysGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const appointmentsList = document.getElementById('appointments-list');
    const appointmentsUl = document.getElementById('appointments-ul');
    const selectedDateDisplay = document.getElementById('selected-date-display');

    let currentDate = new Date();

    // Obtém o ID da empresa a partir da URL (ex: /empresa.html?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');

    if (!companyId) {
        alert("ID da empresa não encontrado na URL.");
        return;
    }

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayIndex = firstDay.getDay();

        monthYear.textContent = new Date(year, month).toLocaleString('pt-br', { month: 'long', year: 'numeric' });
        daysGrid.innerHTML = '';

        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'empty-day');
            daysGrid.appendChild(emptyDay);
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            const dayNumber = document.createElement('span');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = i;
            day.appendChild(dayNumber);

            day.addEventListener('click', () => {
                const selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                fetchAppointments(selectedDate);
            });

            daysGrid.appendChild(day);
        }
    }

    async function fetchAppointments(date) {
        const response = await fetch(`/get_appointments?date=${date}&company_id=${companyId}`);
        const appointments = await response.json();
        displayAppointments(date, appointments);
    }

    function displayAppointments(date, appointments) {
        appointmentsUl.innerHTML = '';
        if (appointments.length === 0) {
            appointmentsUl.innerHTML = `<li>Nenhum agendamento para este dia.</li>`;
        } else {
            appointments.forEach(appt => {
                const li = document.createElement('li');
                li.textContent = `Nome: ${appt.name} | Horário: ${appt.date.split(' - ')[1]} | Assunto: ${appt.description}`;
                appointmentsUl.appendChild(li);
            });
        }
        selectedDateDisplay.textContent = new Date(date).toLocaleDateString('pt-BR');
        appointmentsList.style.display = 'block';
    }

    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
