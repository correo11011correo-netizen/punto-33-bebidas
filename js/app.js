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

// --- LÓGICA DE CARRITO SIMPLE (WHATSAPP) ---
function buyProduct(title, desc, price) {
    const phoneNumber = "5491151623621";
    
    // Generar resumen estilizado
    const msg = `🍻 *Hola Punto 33! Quiero pedir:*
    
🛒 *${title}*
📝 Detalles: ${desc}
💰 *Total: $${price.toLocaleString('es-AR')}*

📍 _Mi dirección es:_ 
💳 _Mi método de pago es (Efectivo/Transferencia/MercadoPago):_ `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}
