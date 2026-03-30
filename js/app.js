let cart = {};

// Productos base (IDs deben coincidir con los del HTML)
const products = {
    combo1: { name: "Combo Previa Pro", price: 14800 },
    combo2: { name: "Pack Cerveza Premium", price: 9500 },
    combo3: { name: "Combo Campari", price: 11200 },
    vino1: { name: "Vino Rutini Malbec", price: 15000 },
    gin1: { name: "Gin Bombay Sapphire", price: 22000 },
    hielo1: { name: "Bolsa de Hielo", price: 1500 }
};

function updateQty(id, delta) {
    if (!cart[id]) cart[id] = 0;
    cart[id] += delta;
    if (cart[id] < 0) cart[id] = 0;
    
    // Actualizar visualmente el número en la tarjeta
    document.getElementById(`qty-${id}`).textContent = cart[id];
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total-value');
    container.innerHTML = "";
    let total = 0;

    Object.keys(cart).forEach(id => {
        if (cart[id] > 0) {
            const p = products[id];
            const subtotal = p.price * cart[id];
            total += subtotal;

            const div = document.createElement('div');
            div.className = "cart-item";
            div.innerHTML = `
                <span><b>${cart[id]}x</b> ${p.name}</span>
                <span>$${subtotal.toLocaleString('es-AR')}</span>
            `;
            container.appendChild(div);
        }
    });

    totalEl.textContent = total.toLocaleString('es-AR');
    
    // Mostrar/Ocultar sección carrito si está vacío
    const cartSec = document.getElementById('cart-section');
    cartSec.style.display = total > 0 ? "block" : "none";
}

function sendOrder() {
    const phoneNumber = "5491151623621";
    let itemsText = "";
    let total = 0;

    Object.keys(cart).forEach(id => {
        if (cart[id] > 0) {
            itemsText += `• ${cart[id]}x ${products[id].name}\n`;
            total += products[id].price * cart[id];
        }
    });

    if (total === 0) {
        alert("¡El carrito está vacío!");
        return;
    }

    const payment = document.querySelector('input[name="payment"]:checked')?.value || "No especificado";

    const msg = `🍻 *NUEVO PEDIDO - PUNTO 33* 🍻
--------------------------------
${itemsText}
💰 *TOTAL: $${total.toLocaleString('es-AR')}*
--------------------------------
💳 *Medio de Pago:* ${payment}

📍 _Mi dirección es:_ `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

// Lógica de estado Abierto/Cerrado
function updateStatus() {
    const statusBadge = document.getElementById('store-status');
    const statusText = document.getElementById('status-text');
    const hour = new Date().getHours();
    const isOpen = hour >= 19 || hour < 4;
    if (isOpen) {
        statusBadge.className = 'status-badge status-open';
        statusText.textContent = 'ABIERTO AHORA';
    } else {
        statusBadge.className = 'status-badge status-closed';
        statusText.textContent = 'CERRADO (Abre 19:00hs)';
    }
}

updateStatus();
setInterval(updateStatus, 60000);
renderCart();