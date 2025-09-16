// Wait until the entire HTML document is loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. PRELOADER ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('loaded');
        // Trigger the hero text animation after the preloader fades
        setTimeout(animateHeroHeadline, 500);
    });

    // --- 2. MOBILE MENU ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // --- 3. ANIMATED HERO HEADLINE ---
    function animateHeroHeadline() {
        const headline = document.getElementById('hero-headline');
        if (!headline) return; // Exit if headline isn't found
        const text = headline.textContent;
        headline.innerHTML = ''; // Clear original text
        
        text.split('').forEach((char, index) => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            // Use non-breaking space for empty spaces to ensure they animate
            charSpan.innerHTML = (char === ' ') ? '&nbsp;' : char;
            charSpan.style.transitionDelay = `${index * 30}ms`;
            headline.appendChild(charSpan);
        });

        // Add a small delay before triggering the animation
        setTimeout(() => {
            headline.querySelectorAll('.char').forEach(span => {
                span.style.transform = 'translateY(0)';
            });
        }, 100);
    }

    // --- 4. SCROLL-IN ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger animation for grid children
                const gridItems = entry.target.querySelectorAll('.card');
                gridItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 100}ms`;
                });
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
    document.querySelectorAll('.grid').forEach((el) => observer.observe(el));

    // --- 5. BACK TO TOP BUTTON ---
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('visible', window.scrollY > 300);
    });
});
