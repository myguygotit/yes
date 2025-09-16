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
    // Close mobile menu when a text link is clicked
    document.querySelectorAll('#nav-links a:not([data-lang])').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- 3. SCROLL-IN ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
    
    // --- 4. BACK TO TOP BUTTON ---
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('visible', window.scrollY > 300);
    });

    // --- 5. THEME (NIGHT MODE) SWITCHER ---
    const themeSwitch = document.getElementById('theme-switch');
    const langToggleCheckbox = document.getElementById('lang-toggle');

    // Function to set the theme
    const setTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Event listener for the theme switch button
    themeSwitch.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // On page load, check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    }

    // --- 6. LANGUAGE SWITCHER LOGIC ---
    const translatableElements = document.querySelectorAll('[data-lang-en]');

    const setLanguage = (lang) => {
        // Fade out all elements
        translatableElements.forEach(el => { el.style.opacity = '0'; });
        
        // Wait for fade-out, then change text and fade in
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
        langToggleCheckbox.checked = (lang === 'kh');
    };

    // Event listener for the language toggle checkbox
    langToggleCheckbox.addEventListener('change', () => {
        const newLang = langToggleCheckbox.checked ? 'kh' : 'en';
        setLanguage(newLang);
    });

    // On page load, check for saved language
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

});
