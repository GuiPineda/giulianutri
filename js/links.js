document.addEventListener('DOMContentLoaded', () => {
    // Isolated Fade-in logic if needed beyond CSS
    const container = document.querySelector('.links-container');
    if (container) {
        console.log('Links page loaded successfully.');
    }

    // Year update for footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

/**
 * Redirects to external links avoiding static detection by AdBlocks
 * @param {string} type 
 */
function openRefLink(type) {
    // Obfuscating slightly to avoid simple string matching in scripts
    const base = "https://go.hotmart.com/";
    const codes = {
        'ebook': 'H99882779L'
    };

    if (codes[type]) {
        const target = base + codes[type];
        // Open in new tab
        const win = window.open(target, '_blank');
        if (win) {
            win.focus();
        } else {
            // Fallback if popup is blocked
            window.location.href = target;
        }
    }
}
