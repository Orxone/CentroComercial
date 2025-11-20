// --- CONFIGURACIÓN ---
// Pon aquí las coordenadas reales de tu shopping (Latitud, Longitud)
const COORDENADAS_SHOPPING = "-34.603722,-58.381592"; 

// Horarios (Formato 24hs)
const HORA_APERTURA = 9; // 09:00 AM
const HORA_CIERRE = 22;   // 10:00 PM


// --- FUNCIÓN 1: ABRIR MAPA ---
function irAlMapa(modoTransporte) 
{
    // Google Maps URL Scheme
    // No ponemos 'origin' para que use la ubicación actual del usuario
    const url = `https://www.google.com/maps/dir/?api=1&destination=${COORDENADAS_SHOPPING}&travelmode=${modoTransporte}`;
    window.open(url, '_blank');
}


// --- FUNCIÓN 2: CALCULAR ESTADO (ABIERTO/CERRADO) ---
function actualizarHorario() {
    const ahora = new Date();
    const horaActual = ahora.getHours(); // Obtiene la hora actual (0-23) del usuario
    
    // Buscamos el elemento en el HTML por su ID
    const elementoTexto = document.getElementById('estado-shopping');

    if (!elementoTexto) return;

    // Lógica de comparación
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

// Ejecutamos la función al cargar
actualizarHorario();