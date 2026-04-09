/**
 * Google Reviews Integration for Giulia Celli
 * Author: Antigravity AI
 * Date: 2026-04-09
 */

const GOOGLE_CONFIG = {
    apiKey: 'AIzaSyCu4fy7DW8mnfseR6x1R5BX3CIo9j6ZXho',
    placeId: 'ChIJ99Gn-2yLxZQR3OiF7PViSSU', // Place ID for Nutricionista Giulia Celli
    maxReviews: 5
};

async function initGoogleReviews() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_CONFIG.apiKey}&libraries=places&callback=loadReviews`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

window.loadReviews = function () {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (!testimonialsGrid) return;

    const service = new google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({
        placeId: GOOGLE_CONFIG.placeId,
        fields: ['reviews', 'user_ratings_total', 'rating']
    }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            
            // Sort reviews by rating descending and then time
            const sortedReviews = place.reviews
                .sort((a, b) => b.rating - a.rating || b.time - a.time)
                .slice(0, GOOGLE_CONFIG.maxReviews);

            sortedReviews.forEach(review => {
                const card = createReviewCard(review);
                testimonialsGrid.appendChild(card);
            });

            console.log(`Successfully loaded ${sortedReviews.length} reviews from Google.`);
        } else {
            console.error('Failed to fetch Google reviews:', status);
        }
    });
};

function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'testimonial-card google-review';

    // Badge
    const badge = document.createElement('div');
    badge.className = 'google-badge';
    badge.innerHTML = '<i class="fa fa-google"></i> Google Review';
    card.appendChild(badge);

    // Profile Image
    const imgContainer = document.createElement('div');
    imgContainer.className = 'testimonial-img';
    const img = document.createElement('img');
    img.src = review.profile_photo_url || 'https://lh3.googleusercontent.com/a/default-user=s80-p';
    img.alt = review.author_name;
    img.loading = 'lazy';
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);

    // Content
    const content = document.createElement('div');
    content.className = 'testimonial-content';

    const name = document.createElement('h4');
    name.textContent = review.author_name;
    content.appendChild(name);

    // Stars
    const stars = document.createElement('div');
    stars.className = 'testimonial-stars';
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.className = i < review.rating ? 'fa fa-star' : 'fa fa-star-o';
        stars.appendChild(star);
    }
    content.appendChild(stars);

    const text = document.createElement('p');
    // Truncate long reviews if necessary
    const maxLength = 180;
    let reviewText = review.text;
    if (reviewText.length > maxLength) {
        reviewText = reviewText.substring(0, maxLength) + '...';
    }
    text.textContent = `"${reviewText}"`;
    content.appendChild(text);

    const date = document.createElement('span');
    date.className = 'testimonial-date';
    date.textContent = timeSince(review.time * 1000);
    content.appendChild(date);

    card.appendChild(content);

    // Add click to open Google Maps
    card.style.cursor = 'pointer';
    card.title = 'Ver avaliação original no Google';
    card.onclick = () => {
        window.open('https://www.google.com/maps/place/Nutricionista+Giulia+Celli/@-23.5089947,-47.4603543,17z/data=!4m8!3m7!1s0x94c58b6cfba7d1f7:0x254962f5ec85e8dc!8m2!3d-23.5089947!4d-47.4603543!9m1!1b1!16s%2Fg%2F11vwdr40y0', '_blank');
    };

    return card;
}

function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " ano atrás" : " anos atrás");
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " mês atrás" : " meses atrás");
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + (Math.floor(interval) === 1 ? " dia atrás" : " dias atrás");
    
    return "recentemente";
}

// Start integration
document.addEventListener('DOMContentLoaded', initGoogleReviews);
