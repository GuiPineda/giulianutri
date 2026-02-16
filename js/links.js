/* 
   Links Page JS - Giulia Celli
*/

document.addEventListener('DOMContentLoaded', () => {
    // Isolated Fade-in logic if needed beyond CSS
    const container = document.querySelector('.links-container');
    if (container) {
        console.log('Links page loaded successfully.');
    }

    // Feedback visual on button click
    const linkItems = document.querySelectorAll('.links-item');
    linkItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Optional: Add some analytics or visual feedback
            // For now, let the CSS :active handle the scale effect
        });
    });
});
