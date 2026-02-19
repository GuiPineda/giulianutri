/* 
   Corporate Consulting JS - Giulia Celli
*/

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Services Toggle (Mobile Only)
    const toggleBtn = document.getElementById('toggleServicesBtn');
    const extraServices = document.getElementById('extraServices');

    if (toggleBtn && extraServices) {
        toggleBtn.addEventListener('click', () => {
            const isExpanded = extraServices.classList.toggle('active');
            const btnText = toggleBtn.querySelector('.btn-text');
            const btnIcon = toggleBtn.querySelector('i');

            if (isExpanded) {
                btnText.textContent = 'Exibir menos';
                btnIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                btnText.textContent = 'Exibir mais';
                btnIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');

                // Optional: scroll back to services top if closing
                document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// WhatsApp Function with Conversion Tracking
function contactWhatsApp(customMessage) {
    const phone = '5511973309155';
    const text = customMessage || 'Olá! Gostaria de uma proposta personalizada para minha empresa.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
}
