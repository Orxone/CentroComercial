// --- CONFIGURACIÓN ---
const COORDENADAS_SHOPPING = "-34.59221382917805, -58.417339135530284"; 

// Horarios (Formato 24hs)
const HORA_APERTURA = 9; 
const HORA_CIERRE = 22;   


// --- FUNCIÓN 1: ABRIR MAPA ---
function irAlMapa(modoTransporte) 
{
    const url = `https://www.google.com/maps/dir/?api=1&destination=${COORDENADAS_SHOPPING}&travelmode=${modoTransporte}`;
    window.open(url, '_blank');
}


// --- FUNCIÓN 2: CALCULAR ESTADO (ABIERTO/CERRADO) ---
function actualizarHorario() {
    const ahora = new Date();
    const horaActual = ahora.getHours(); 
    const elementoTexto = document.getElementById('estado-shopping');

    if (!elementoTexto) return;
    if (horaActual >= HORA_APERTURA && horaActual < HORA_CIERRE) {
        // ESTÁ ABIERTO
        elementoTexto.innerHTML = `
            <span class="open">Abierto</span> - Cierra a las ${HORA_CIERRE}:00hs.
        `;
    } else {
        // ESTÁ CERRADO
        elementoTexto.innerHTML = `
            <span class="closed">Cerrado</span> - Abre mañana a las ${HORA_APERTURA}:00hs.
        `;
    }
}

actualizarHorario();
// Ejecutamos la función al cargar
actualizarHorario();

// Código para cargar components/footer.html en el placeholder #site-footer
(async function loadFooter() {
    try {
        const resp = await fetch('/components/footer.html');
        if (!resp.ok) throw new Error('No se pudo cargar el footer');
        const html = await resp.text();
        const container = document.getElementById('site-footer');
        if (container) container.innerHTML = html;
    } catch (e) {
        console.error('load-footer.js:', e);
    }
})();
