// assets.js
function loadSection(file, placeholderId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(placeholderId).innerHTML = data;
            // Ejecutar los scripts manualmente
            const scripts = document.getElementById(placeholderId).getElementsByTagName('script');
            for (let script of scripts) {
                eval(script.innerHTML);
            }
        })
        .catch(error => console.error('Error cargando la sección:', error));
}

// Incluir el nav y el footer
loadSection('/assets/nav.html', 'nav-placeholder');
loadSection('/assets/footer.html', 'footer-placeholder');