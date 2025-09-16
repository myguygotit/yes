document.addEventListener('DOMContentLoaded', function() {

    // --- 1. PRELOADER ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('loaded');
    });

    // --- 2. MOBILE MENU ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('#nav-links a:not(.lang-btn)').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- 3. SCROLL-IN ANIMATIONS WITH STAGGER ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const gridItems = entry.target.querySelectorAll('.card.hidden');
                gridItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 100}ms`;
                });
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
    
    // --- 4. BACK TO TOP BUTTON ---
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('visible', window.scrollY > 300);
    });

    // --- 5. LANGUAGE SWITCHER LOGIC ---
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-lang-en]');

    const setLanguage = (lang) => {
        // Fade out all elements
        translatableElements.forEach(el => {
            el.style.opacity = '0';
        });
        
        // Wait for the fade-out to finish, then change text and fade in
        setTimeout(() => {
            translatableElements.forEach(el => {
                const key = 'lang' + lang.charAt(0).toUpperCase() + lang.slice(1);
                if (el.dataset[key]) {
                   el.innerText = el.dataset[key];
                }
                el.style.opacity = '1';
            });
        }, 200);

        localStorage.setItem('language', lang);
        
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    };

    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (!button.classList.contains('active')) {
                setLanguage(button.dataset.lang);
            }
        });
    });

    // On page load, check for saved language and set it without animation
    const savedLang = localStorage.getItem('language') || 'en';
    translatableElements.forEach(el => {
        const key = 'lang' + savedLang.charAt(0).toUpperCase() + savedLang.slice(1);
        if (el.dataset[key]) {
            el.innerText = el.dataset[key];
        }
    });
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === savedLang);
    });
});
