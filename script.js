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
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el evento 'click' del documento lo cierre al abrirlo
            navList.classList.toggle('show');
            mobileMenuBtn.classList.toggle('is-active');
        });

        // Cerrar al pinchar fuera del menú
        document.addEventListener('click', (e) => {
            if (!navList.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navList.classList.remove('show');
                mobileMenuBtn.classList.remove('is-active');
            }
        });

        // Cerrar si pinchan en un enlace del menú
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('show');
                mobileMenuBtn.classList.remove('is-active');
            });
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

// Lógica para desplegar submenú en móvil
const especialidadesToggle = document.getElementById('toggle-especialidades');

if (especialidadesToggle) {
    especialidadesToggle.addEventListener('click', (e) => {
        // Solo queremos este comportamiento en móviles
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Evita cualquier salto
            const parent = especialidadesToggle.parentElement;
            parent.classList.toggle('open'); // Añade o quita la clase que lo muestra
        }
    });
}
