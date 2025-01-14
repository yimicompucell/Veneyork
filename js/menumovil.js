    // Elementos del DOM
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDropdownButton = document.getElementById('mobile-dropdown-button');
    const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');
    const mobileDropdownArrow = document.getElementById('mobile-dropdown-arrow');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    // Toggle del menú principal
    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            // Abrir menú
            mobileMenuOverlay.classList.remove('hidden');
            mobileMenu.classList.remove('hidden');
            requestAnimationFrame(() => {
                mobileMenu.classList.add('slide-down');
                mobileMenu.classList.remove('opacity-0', '-translate-y-10', 'scale-95');
            });
        } else {
            // Cerrar menú
            mobileMenu.classList.add('slide-up');
            mobileMenuOverlay.classList.add('hidden');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('slide-up');
                mobileMenu.classList.add('opacity-0', '-translate-y-10', 'scale-95');
            }, 300);
        }
    });

    // Toggle del menú desplegable
    mobileDropdownButton.addEventListener('click', () => {
        const isHidden = mobileDropdownMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileDropdownMenu.classList.remove('hidden');
            requestAnimationFrame(() => {
                mobileDropdownMenu.classList.remove('opacity-0', '-translate-y-3', 'scale-95');
                mobileDropdownArrow.classList.add('rotate-180');
            });
        } else {
            mobileDropdownMenu.classList.add('opacity-0', '-translate-y-3', 'scale-95');
            mobileDropdownArrow.classList.remove('rotate-180');
            setTimeout(() => {
                mobileDropdownMenu.classList.add('hidden');
            }, 300);
        }
    });

    // Cerrar al hacer click en el overlay
    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.classList.add('slide-up');
        mobileMenuOverlay.classList.add('hidden');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('slide-up');
            mobileMenu.classList.add('opacity-0', '-translate-y-10', 'scale-95');
        }, 300);
    });

    // Cerrar al redimensionar
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden');
            mobileMenuOverlay.classList.add('hidden');
            mobileDropdownMenu.classList.add('hidden');
            mobileDropdownArrow.classList.remove('rotate-180');
        }
    });
