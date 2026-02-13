// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Dynamic Year
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// WhatsApp Function
function contactWhatsApp(customMessage) {
    const phone = '5511973309155';
    const text = customMessage || 'Olá! Gostaria de saber mais sobre o Método LEVE para noivas.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    // Google Conversion Tracking
    if (typeof gtag_report_conversion === 'function') {
        gtag_report_conversion(url);
    } else {
        window.open(url, '_blank');
    }
}

// Google Conversion Code
function gtag_report_conversion(url) {
    var callback = function () {
        if (typeof (url) != 'undefined') {
            window.open(url, '_blank'); // Open in new tab
        }
    };
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-16494446457/zEVyCL74su0ZEPmOlbk9',
            'event_callback': callback
        });
    } else {
        window.open(url, '_blank');
    }
    return false;
}

// Testimonials Carousel Logic
const testimonialsGrid = document.getElementById('testimonialsGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (testimonialsGrid && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        const card = testimonialsGrid.querySelector('.testimonial-card');
        const gap = 30; // Standard gap
        const scrollAmount = card.offsetWidth + gap;
        const maxScroll = testimonialsGrid.scrollWidth - testimonialsGrid.clientWidth;

        // Check if we are near the end
        if (testimonialsGrid.scrollLeft >= maxScroll - 10) {
            // Loop back to start
            testimonialsGrid.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            testimonialsGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });

    prevBtn.addEventListener('click', () => {
        const card = testimonialsGrid.querySelector('.testimonial-card');
        const gap = 30; // Standard gap
        const scrollAmount = card.offsetWidth + gap;

        // Check if we are near the start
        if (testimonialsGrid.scrollLeft <= 10) {
            // Loop to end
            testimonialsGrid.scrollTo({ left: testimonialsGrid.scrollWidth, behavior: 'smooth' });
        } else {
            testimonialsGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    });
}
