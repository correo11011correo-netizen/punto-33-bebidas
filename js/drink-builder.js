const tragoData = {
    vodka: {
        name: "Vodka Sernova", price: 3500,
        mixes: [
            { id: "frutilla", label: "con Jugo de Frutilla", color: "#dc2626", fruit: "#ef4444" },
            { id: "durazno", label: "con Jugo de Durazno", color: "#fbbf24", fruit: "#ea580c" },
            { id: "speed", label: "con Energizante", color: "#7c3aed", fruit: "#a7f3d0" }
        ]
    },
    gin: {
        name: "Gin Gordon's", price: 4200,
        mixes: [
            { id: "clasico", label: "Tónica Clásica", color: "#f0f9ff", fruit: "#10b981" },
            { id: "frutos", label: "Tónica de Frutos Rojos", color: "#f472b6", fruit: "#9f1239" },
            { id: "pepino", label: "Tónica + Pepino", color: "#ecfdf5", fruit: "#22c55e" }
        ]
    },
    fernet: {
        name: "Fernet Branca", price: 4500,
        mixes: [
            { id: "coca", label: "con Coca-Cola", color: "#2d1606", fruit: "#422006" }
        ]
    },
    campari: {
        name: "Campari", price: 4000,
        mixes: [
            { id: "orange", label: "con Jugo de Naranja", color: "#ea580c", fruit: "#fbbf24" },
            { id: "tonic", label: "con Tónica", color: "#be123c", fruit: "#f43f5e" }
        ]
    },
    ron: {
        name: "Ron Malibu", price: 3800,
        mixes: [
            { id: "pina", label: "con Jugo de Piña", color: "#fcd34d", fruit: "#f59e0b" },
            { id: "cola", label: "con Cola", color: "#451a03", fruit: "#78350f" }
        ]
    }
};

let tragoQty = 1;

function updateTragoMixes() {
    const baseKey = document.getElementById('trago-base').value;
    const mixSelect = document.getElementById('trago-mix');
    mixSelect.innerHTML = "";
    
    tragoData[baseKey].mixes.forEach((mix, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = mix.label;
        mixSelect.appendChild(opt);
    });

    const price = tragoData[baseKey].price;
    document.getElementById('trago-price').textContent = "$" + price.toLocaleString('es-AR');
    
    renderTragoSVG();
    updateTragoTotal();
}

function changeQty(change) {
    tragoQty += change;
    if (tragoQty < 1) tragoQty = 1;
    document.getElementById('trago-qty').textContent = tragoQty;
    updateTragoTotal();
}

function updateTragoTotal() {
    const baseKey = document.getElementById('trago-base').value;
    const price = tragoData[baseKey].price;
    const total = price * tragoQty;
    document.getElementById('trago-total').textContent = total.toLocaleString('es-AR');
}

function renderTragoSVG() {
    const baseKey = document.getElementById('trago-base').value;
    const mixSelect = document.getElementById('trago-mix');
    const mixIdx = mixSelect.value || 0;
    
    const mix = tragoData[baseKey].mixes[mixIdx];
    
    const showIce = document.getElementById('trago-ice').checked;
    const showFruit = document.getElementById('trago-fruit').checked;

    const p = { cup: "rgba(0,0,0,0.15)", stroke: "#334155", ice: "#ffffff" };

    const hielos = showIce ? `
        <rect x="170" y="240" width="45" height="45" rx="8" fill="${p.ice}" opacity="0.3" transform="rotate(15 192 262)"/>
        <rect x="200" y="290" width="40" height="40" rx="8" fill="${p.ice}" opacity="0.2" transform="rotate(-10 220 310)"/>
    ` : '';

    const fruta = showFruit ? `
        <circle cx="260" cy="110" r="35" fill="none" stroke="${mix.fruit}" stroke-width="6" opacity="0.8"/>
        <line x1="260" y1="75" x2="260" y2="145" stroke="${mix.fruit}" stroke-width="2" opacity="0.5"/>
    ` : '';

    const svg = `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <path d="M 138 160 L 157 335 L 243 335 L 262 160 Z" fill="${mix.color}" opacity="0.95"/>
        ${hielos}
        <path d="M 210 160 L 250 40 L 280 50" fill="none" stroke="${p.stroke}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="250" y1="40" x2="210" y2="160" stroke="${mix.color}" stroke-width="2" opacity="0.3"/>
        ${fruta}
        <path d="M 130 80 L 155 340 A 15 15 0 0 0 170 355 L 230 355 A 15 15 0 0 0 245 340 L 270 80" fill="${p.cup}" stroke="${p.stroke}" stroke-width="8" stroke-linejoin="round"/>
        <rect x="135" y="190" width="130" height="45" rx="5" fill="#000" stroke="${p.stroke}" stroke-width="2"/>
        <text x="200" y="222" font-family="Impact" font-size="30" fill="${mix.color}" text-anchor="middle">PUNTO 33</text>
    </svg>`;

    document.getElementById('trago-svg-container').innerHTML = svg;
}

function addTragoToWhatsApp() {
    const baseKey = document.getElementById('trago-base').value;
    const mixIdx = document.getElementById('trago-mix').value;
    const baseName = tragoData[baseKey].name;
    const mixName = tragoData[baseKey].mixes[mixIdx].label;
    
    const ice = document.getElementById('trago-ice').checked ? 'Con hielo' : 'Sin hielo';
    const fruit = document.getElementById('trago-fruit').checked ? 'Con fruta' : 'Sin fruta';
    
    const total = tragoData[baseKey].price * tragoQty;

    const msg = \`🍹 Hola Punto 33! Quiero pedir:
\${tragoQty}x \${baseName} \${mixName}
Detalles: \${ice}, \${fruit}
Total aprox: $\${total.toLocaleString('es-AR')}\`;

    const url = \`https://wa.me/5491151623621?text=\${encodeURIComponent(msg)}\`;
    window.open(url, '_blank');
}

// Iniciar
updateTragoMixes();