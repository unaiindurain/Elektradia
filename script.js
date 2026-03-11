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


    // --- 3. MOSTRAR BANNER DE COOKIES ---
    const banner = document.getElementById('cookies-propio');
    // Comprobamos si ya aceptó (usamos la misma llave para no liarnos)
    if (banner && !localStorage.getItem('cookiesElektradia')) {
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000);
    }
});

// --- 4. FUNCIONES GLOBALES (FUERA DEL DOMCONTENTLOADED) ---

function toggleAjustes() {
    const ajustes = document.getElementById('cookie-ajustes');
    if (ajustes) {
        ajustes.style.display = ajustes.style.display === 'none' ? 'block' : 'none';
    }
}

// UNIFICADA: Solo una función para aceptar cookies
function aceptarCookiesManual(todo) {
    const banner = document.getElementById('cookies-propio');
    const chkStats = document.getElementById('chk-stats');

    let preferencias = {
        necesarias: true,
        estadisticas: todo ? true : (chkStats ? chkStats.checked : false)
    };

    // 1. Guardar localmente
    localStorage.setItem('cookiesElektradia', JSON.stringify(preferencias));

    // 2. Enviar al host (PHP) para el registro legal
    fetch('guardar_cookie.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            aceptado: true,
            preferencias: preferencias
        })
    })
        .then(response => response.json())
        .then(data => console.log("Registro guardado en el host"))
        .catch(error => console.error("Error al guardar en host:", error));

    // 3. Quitar el banner de la vista
    if (banner) {
        banner.classList.remove('show');
    }
}
