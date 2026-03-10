// Esperar a que el DOM esté cargado para evitar errores
document.addEventListener('DOMContentLoaded', () => {
    
    // Configuración del observador para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Si quieres que la animación solo ocurra una vez, deja de observar el elemento:
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionamos todos los elementos con la clase .reveal y los ponemos a "escuchar"
    const animatedElements = document.querySelectorAll('.reveal');
    animatedElements.forEach((el) => observer.observe(el));

});

// Función para ocultar el banner y guardar la decisión
function aceptarCookies() {
    // Guarda que el usuario aceptó
    localStorage.setItem('cookiesElektradia', 'aceptadas');
    // Oculta el banner
    document.getElementById('cookie-banner').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    // Si no ha aceptado antes, muestra el cartel
    if (localStorage.getItem('cookiesElektradia') !== 'aceptadas') {
        document.getElementById('cookie-banner').style.display = 'block';
    }
});