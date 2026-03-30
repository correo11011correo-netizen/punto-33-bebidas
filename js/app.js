let cart = {};

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
    
    document.getElementById(`qty-${id}`).textContent = cart[id];
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total-value');
    const discountMsg = document.getElementById('discount-msg');
    
    container.innerHTML = "";
    let subtotal = 0;

    Object.keys(cart).forEach(id => {
        if (cart[id] > 0) {
            const p = products[id];
            const itemTotal = p.price * cart[id];
            subtotal += itemTotal;

            const div = document.createElement('div');
            div.className = "cart-item";
            div.innerHTML = `
                <div><span class="cart-item-qty">${cart[id]}x</span> <b>${p.name}</b></div>
                <span>$${itemTotal.toLocaleString('es-AR')}</span>
            `;
            container.appendChild(div);
        }
    });

    // Lógica del 10% de Descuento si es efectivo
    const isCash = document.getElementById('pay-cash').checked;
    let finalTotal = subtotal;

    if (isCash && subtotal > 0) {
        finalTotal = subtotal * 0.9;
        discountMsg.style.display = "block";
    } else {
        discountMsg.style.display = "none";
    }

    totalEl.textContent = finalTotal.toLocaleString('es-AR');
    
    const cartSec = document.getElementById('cart-section');
    cartSec.style.display = subtotal > 0 ? "block" : "none";
}

// Agregar listeners a los radios de pago para que el total se actualice en vivo
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', renderCart);
});

function sendOrder() {
    const phoneNumber = "5491151623621";
    let itemsText = "";
    let subtotal = 0;

    Object.keys(cart).forEach(id => {
        if (cart[id] > 0) {
            itemsText += `• ${cart[id]}x ${products[id].name}\n`;
            subtotal += products[id].price * cart[id];
        }
    });

    if (subtotal === 0) return;

    const payment = document.querySelector('input[name="payment"]:checked')?.value || "No especificado";
    const isCash = payment === "Efectivo";
    const finalTotal = isCash ? subtotal * 0.9 : subtotal;

    let discountText = isCash ? `\n🎁 *Descuento 10% Efectivo Aplicado*` : "";

    const msg = `🍻 *NUEVO PEDIDO - PUNTO 33* 🍻
--------------------------------
${itemsText}--------------------------------
💰 *TOTAL: $${finalTotal.toLocaleString('es-AR')}* ${discountText}

💳 *Medio de Pago:* ${payment}

📍 _Mi dirección es:_ `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

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

// --- LÓGICA DEL LOGO VIVO (LIQUID ENGINE V1.0) ---
(function initLiquidLogo() {
    let time = 0, scrollPct = 0;
    const waveF = document.getElementById('wave-front');
    const waveB = document.getElementById('wave-back');
    const ice = document.getElementById('ice-cubes');

    // Si por algún motivo no carga el SVG, evitar errores
    if (!waveF || !waveB || !ice) return;

    function drawWave(baseY, phase, amp) {
        let d = `M 0 400 L 0 ${baseY}`;
        for (let x = 0; x <= 400; x += 20) {
            const y = baseY + Math.sin((x / 50) + time + phase) * amp;
            d += ` L ${x} ${y}`;
        }
        return d + ` L 400 400 Z`;
    }

    function loopWaves() {
        time += 0.05;
        // Rango de llenado de 350 (vacío) a 110 (lleno)
        const y = 350 - (240 * scrollPct); 
        
        waveF.setAttribute('d', drawWave(y, 0, 10));
        waveB.setAttribute('d', drawWave(y, Math.PI, 6));
        
        // Hielos flotantes
        const iceY = y - 25 + Math.sin(time) * 5;
        ice.setAttribute('transform', `translate(0, ${iceY > 320 ? 320 : iceY})`);
        ice.style.opacity = scrollPct < 0.05 ? 0 : 1;

        requestAnimationFrame(loopWaves);
    }

    // Escuchar Scroll en toda la página
    window.addEventListener('scroll', () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll > 0) {
            scrollPct = Math.min(1, window.scrollY / maxScroll);
        }
    });

    // Iniciar bucle
    loopWaves();
})();