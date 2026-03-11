document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const menuBtn = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const especialidadesToggle = document.getElementById('toggle-especialidades');

    if (menuBtn && navList) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navList.classList.toggle('show');
            menuBtn.classList.toggle('is-active');
        });

        if (especialidadesToggle) {
            especialidadesToggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    especialidadesToggle.parentElement.classList.toggle('open');
                }
            });
        }

        document.addEventListener('click', (e) => {
            if (!navList.contains(e.target) && !menuBtn.contains(e.target)) {
                navList.classList.remove('show');
                menuBtn.classList.remove('is-active');
            }
        });
    }
});
