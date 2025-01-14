        // Animaciones con GSAP
        document.addEventListener('DOMContentLoaded', () => {
            // Animación del hero
            gsap.from('.floating', {
                opacity: 0,
                y: 100,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out"
            });

            gsap.from('h1', {
                opacity: 0,
                scale: 0.5,
                duration: 1,
                ease: "back.out(1.7)"
            });

            // Animación de los contadores
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                gsap.from(counter, {
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 80%"
                    },
                    opacity: 0,
                    y: 50,
                    duration: 1
                });
            });

            // Menú móvil
            const menuButton = document.querySelector('button');
            const navLinks = document.querySelector('.md\\:flex');
            
            menuButton.addEventListener('click', () => {
                navLinks.classList.toggle('hidden');
            });
        });