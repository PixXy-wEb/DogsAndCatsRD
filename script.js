// script.js - Interactividad suave para la landing page

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Navegación suave al hacer clic en los enlaces (scroll animado)
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Animación de aparición al hacer scroll (fade-in)
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                // Descomentar si solo queremos que ocurra una vez
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos elementos que queremos que aparezcan con fade
    const fadeElements = document.querySelectorAll('.about-card, .service-item, .campaign-content, .contact .btn-large');
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in-hidden');
        observer.observe(el);
    });

    // 3. Efecto parallax simple en el hero (opcional)
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // 4. Mensaje en consola (bienvenida)
    console.log('🐾 Dogs and Cats RD - Porque su dolor no siempre hace ruido. 🇩🇴');
    
});

// Navbar functionality
const navbar = document.querySelector('.navbar');
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

// Cambiar estilo del navbar al hacer scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle menú móvil
if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (navbarMenu.classList.contains('active')) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        }
    });
});

// Marcar enlace activo según la sección visible
function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);