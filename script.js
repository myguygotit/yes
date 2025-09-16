document.addEventListener('DOMContentLoaded', function() {
    
    // --- CONFIGURATION ---
    // To disable the language switcher, change this value to false
    const languageFeatureEnabled = true;

    // --- 1. PRELOADER ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('loaded');
    });

    // --- 2. THEME (NIGHT MODE) SWITCHER ---
    const themeSwitches = document.querySelectorAll('.theme-switch');

    const setTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    const handleThemeClick = () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };
    
    themeSwitches.forEach(s => s.addEventListener('click', handleThemeClick));

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    }

    // --- 3. LANGUAGE SWITCHER ---
    const langSwitches = document.querySelectorAll('.lang-switch');
    
    if (languageFeatureEnabled) {
        const langToggles = document.querySelectorAll('.lang-toggle-checkbox');
        const translatableElements = document.querySelectorAll('[data-lang-en]');

        const setLanguage = (lang, isInitialLoad = false) => {
            const delay = isInitialLoad ? 0 : 200;
            const finalOpacity = isInitialLoad ? '1' : '0';

            translatableElements.forEach(el => { el.style.opacity = finalOpacity; });
            
            setTimeout(() => {
                translatableElements.forEach(el => {
                    const key = 'lang' + lang.charAt(0).toUpperCase() + lang.slice(1);
                    if (el.dataset[key]) {
                       el.innerText = el.dataset[key];
                    }
                    el.style.opacity = '1';
                });
            }, delay);

            localStorage.setItem('language', lang);
            langToggles.forEach(toggle => {
                toggle.checked = (lang === 'kh');
            });
        };

        const handleLangChange = (checkbox) => {
             const newLang = checkbox.checked ? 'kh' : 'en';
             setLanguage(newLang);
        };
        
        langToggles.forEach(toggle => {
            toggle.addEventListener('change', () => handleLangChange(toggle));
        });

        const savedLang = localStorage.getItem('language') || 'en';
        setLanguage(savedLang, true);

    } else {
        langSwitches.forEach(s => s.style.display = 'none');
    }

    // --- 4. MOBILE MENU ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });
    document.querySelectorAll('#nav-links a:not([data-lang])').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        });
    });
    
    // --- 5. SCROLL-IN ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
    
    // --- 6. BACK TO TOP BUTTON ---
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('visible', window.scrollY > 300);
    });
});
