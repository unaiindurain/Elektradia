// ESPERAR A QUE EL DOM ESTÉ CARGADO
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ANIMACIONES AL HACER SCROLL (.reveal) ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.reveal');
    animatedElements.forEach((el) => observer.observe(el));


    // --- 2. LÓGICA DEL MENÚ HAMBURGUESA ---
    // --- LÓGICA DEL MENÚ HAMBURGUESA Y SUBMENÚ ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const especialidadesToggle = document.getElementById('toggle-especialidades');

    if (mobileMenuBtn && navList) {
        // 1. Abrir/Cerrar menú principal
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // IMPORTANTE: evita que el clic "atraviese" el botón
            navList.classList.toggle('show');
            mobileMenuBtn.classList.toggle('is-active');
        });

        // 2. Control del submenú Especialidades
        if (especialidadesToggle) {
            especialidadesToggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation(); // ESTO EVITA QUE EL MENÚ SE CIERRE AL PULSAR
                    const parent = especialidadesToggle.parentElement;
                    parent.classList.toggle('open');
                }
            });
        }

        // 3. Cerrar al pinchar fuera (CORREGIDO)
        document.addEventListener('click', (e) => {
            // Si el menú está abierto Y el clic NO es dentro del menú ni en el botón
            if (navList.classList.contains('show')) {
                if (!navList.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    navList.classList.remove('show');
                    mobileMenuBtn.classList.remove('is-active');
                }
            }
        });
    }
});
