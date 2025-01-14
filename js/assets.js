function loadSection(file, placeholderId) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById(placeholderId).innerHTML = data;
      })
      .catch(error => console.error('Error cargando la sección:', error));
  }
  
  // Incluir el header y el footer
  loadSection('/assets/nav.html', 'nav-placeholder');
  loadSection('/assets/footer.html', 'footer-placeholder');