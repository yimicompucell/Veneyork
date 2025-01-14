function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    // Pequeño delay para asegurar que la transición se vea
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    // Esperar a que termine la animación antes de ocultar
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300); // 300ms = duración de la transición
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal-overlay');
    for(let modal of modals) {
        if (event.target == modal) {
            closeModal(modal.id);
        }
    }
}