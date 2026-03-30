// Lógica para determinar si está abierto o cerrado
function updateStatus() {
    const statusBadge = document.getElementById('store-status');
    const statusText = document.getElementById('status-text');
    
    const now = new Date();
    const hour = now.getHours();
    
    // Abierto de 19:00 a 04:00
    const isOpen = hour >= 19 || hour < 4;

    if (isOpen) {
        statusBadge.className = 'status-badge status-open';
        statusText.textContent = 'ABIERTO AHORA';
    } else {
        statusBadge.className = 'status-badge status-closed';
        statusText.textContent = 'CERRADO (Abre 19:00hs)';
    }
}

// Ejecutar al cargar y actualizar cada minuto
updateStatus();
setInterval(updateStatus, 60000);