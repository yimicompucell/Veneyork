function loadSection(file, placeholderId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById(placeholderId);
            placeholder.innerHTML = data;

            // Ejecutar scripts manualmente
            const scripts = placeholder.getElementsByTagName('script');
            Array.from(scripts).forEach(oldScript => {
                const newScript = document.createElement('script');
                
                // Copiar atributos
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                
                // Copiar contenido solo si es inline
                if (!oldScript.src) {
                    newScript.textContent = oldScript.textContent;
                }
                
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        })
        .catch(error => console.error('Error cargando la sección:', error));
}

// Cargar componentes
document.addEventListener('DOMContentLoaded', () => {
    loadSection('/assets/nav.html', 'nav-placeholder');
    loadSection('/assets/footer.html', 'footer-placeholder');
});