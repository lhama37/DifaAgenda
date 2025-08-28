document.addEventListener('DOMContentLoaded', () => {
    const agendarBtn = document.getElementById('agendarBtn');
    const empresaBtn = document.getElementById('empresaBtn');
    const ctaButton = document.querySelector('.cta-button');

    if (agendarBtn) {
        agendarBtn.addEventListener('click', () => {
            window.location.href = 'agendar.html';
        });
    }

    if (empresaBtn) {
        empresaBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            window.location.href = 'agendar.html';
        });
    }
});
