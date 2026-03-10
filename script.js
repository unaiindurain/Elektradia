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

document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookies-propio');

    // Si NO existe la marca en el navegador, mostramos el banner
    if (localStorage.getItem('cookiesAceptadas') !== 'true') {
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000); // Aparece al segundo de cargar
    }
});

function aceptarCookiesManual() {
    // 1. Guardamos en el navegador (Local Storage)
    localStorage.setItem('cookiesAceptadasElektradia', 'true');

    // 2. Enviamos los datos a TU HOST de forma invisible (Fetch API)
    fetch('guardar_cookie.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aceptado: true })
    })
    .then(response => response.json())
    .then(data => console.log("Registro guardado en el host"))
    .catch(error => console.error("Error al guardar en host:", error));

    // 3. Cerramos el banner
    document.getElementById('cookies-propio').classList.remove('show');
}
