// script.js - Código JavaScript común para todas las páginas de Veneyork

document.addEventListener('DOMContentLoaded', function() {
    const menuHamburguesa = document.getElementById('menuHamburguesa');
    const cerrarMenu = document.getElementById('cerrarMenu');
    const navMovil = document.getElementById('navMovil');
    const overlayNav = document.getElementById('overlayNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    let isMenuOpen = false;

    function abrirMenu() {
        if (isMenuOpen) return;

        // Scroll suave al inicio antes de abrir (opcional pero mejora UX)
        window.scrollTo({ top: 0, behavior: 'smooth' });

        body.classList.add('menu-abierto');
        overlayNav.classList.add('activo');
        navMovil.classList.add('activo');
        menuHamburguesa.style.opacity = '0';
        menuHamburguesa.style.visibility = 'hidden';
        menuHamburguesa.style.pointerEvents = 'none';
        isMenuOpen = true;
        body.style.overflow = 'hidden';
    }

    function cerrarElMenu() {
        if (!isMenuOpen) return;
        body.classList.remove('menu-abierto');
        overlayNav.classList.remove('activo');
        navMovil.classList.remove('activo');
        menuHamburguesa.style.opacity = '1';
        menuHamburguesa.style.visibility = 'visible';
        menuHamburguesa.style.pointerEvents = 'auto';
        isMenuOpen = false;
        setTimeout(() => {
            body.style.overflow = '';
        }, 300);
    }

    // Eventos para abrir/cerrar menú
    if (menuHamburguesa) menuHamburguesa.addEventListener('click', abrirMenu);
    if (cerrarMenu) cerrarMenu.addEventListener('click', cerrarElMenu);
    if (overlayNav) overlayNav.addEventListener('click', cerrarElMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', cerrarElMenu);
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            cerrarElMenu();
        }
    });

    // Animación al hacer hover en menú móvil
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.2s var(--easing-suave)';
        });
    });

    // Animación al desplazar (fade-in)
    const opcionesObservador = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observador = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('desvanecer-entrada');
            }
        });
    }, opcionesObservador);

    // Seleccionar elementos comunes a todas las páginas
    const elementosComunes = document.querySelectorAll(
        '.titulo-seccion, .subtitulo-seccion, .tarjeta-caracteristica, .caja-info, ' +
        '.item-estadistica, .encabezado-guia, .categoria-herramientas, .tarjeta-herramienta'
    );
    elementosComunes.forEach(el => observador.observe(el));

    // Desplazamiento suave para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            const elementoObjetivo = document.querySelector(targetId);
            if (elementoObjetivo) {
                e.preventDefault();
                window.scrollTo({
                    top: elementoObjetivo.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});