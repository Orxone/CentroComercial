const params = new URLSearchParams(window.location.search);
let filtroURL = params.get("filter");

const filterBtn = document.querySelector(".filter-btn");
const dropdown = document.getElementById("filterDropdown");
const cards = document.querySelectorAll(".local-card");

function aplicarFiltro(category) {
    cards.forEach(card => {
        if (category === "todos" || card.dataset.category === category) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

if (filtroURL) {
    aplicarFiltro(filtroURL);
}

filterBtn.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Elegir una categoría
dropdown.querySelectorAll("p").forEach(option => {
    option.addEventListener("click", () => {
        const category = option.dataset.filter;

        cards.forEach(card => {
            if (category === "todos" || card.dataset.category === category) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });

        dropdown.style.display = "none";
    });
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".locales-header")) {
        dropdown.style.display = "none";
    }
});


// BÚSQUEDA POR NOMBRE

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function filtrarPorNombre() {
    const texto = searchInput.value.toLowerCase().trim();

    if (texto === "") {
        cards.forEach(card => card.style.display = "flex");
        return;
    }

    const cardsArray = Array.from(cards);

    const coincidencias = cardsArray.filter(card =>
        (card.dataset.name || "").toLowerCase().includes(texto)
    );

    coincidencias.sort((a, b) => {
        const nameA = a.dataset.name.toLowerCase();
        const nameB = b.dataset.name.toLowerCase();

        const startsA = nameA.startsWith(texto);
        const startsB = nameB.startsWith(texto);

        if (startsA && !startsB) return -1;
        if (!startsA && startsB) return 1;

        return nameA.localeCompare(nameB);
    });

    cards.forEach(card => card.style.display = "none");

    const grid = document.getElementById("localesGrid");
    coincidencias.forEach(card => {
        card.style.display = "flex";
        grid.appendChild(card);
    });
}

searchBtn.addEventListener("click", filtrarPorNombre);

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        filtrarPorNombre();
    }
});

searchInput.addEventListener("input", filtrarPorNombre);


// ORDEN ALFABÉTICO

const sortBtn = document.getElementById("sortBtn");
const grid = document.getElementById("localesGrid");

let ascendente = true; 

sortBtn.addEventListener("click", () => {

    const cardsArray = Array.from(cards);

    cardsArray.sort((a, b) => {
        const nameA = a.dataset.name.toLowerCase();
        const nameB = b.dataset.name.toLowerCase();

        if (ascendente) {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA); 
        }
    });

    cardsArray.forEach(card => grid.appendChild(card));

    sortBtn.textContent = ascendente ? "Z - A" : "A - Z";

    ascendente = !ascendente;
});

// BOTÓN "VER MAPA"

const mapBtn = document.getElementById("mapBtn");
const mapaSection = document.getElementById("mapaSection");

mapBtn.addEventListener("click", () => {
    mapaSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

/* ----------------------- */
/* MAPA: marcadores y pestañas */
/* ----------------------- */

const mapaImg = document.getElementById('mapaImg');
const mapOverlay = document.getElementById('mapOverlay');
const allTab = document.getElementById('allTab');
const gastronomyTab = document.getElementById('gastronomiaTab');
const servicesTab = document.getElementById('serviciosTab');

// Lista de marcadores: coordenadas en porcentaje (left, top)
const markers = [
    { name: 'Nahue', category: 'gastronomía', x: 22, y: 28 },
    { name: 'Havanna', category: 'gastronomía', x: 68, y: 36 },
    { name: 'Starbucks', category: 'gastronomía', x: 48, y: 62 },

    { name: 'Nike', category: 'indumentaria', x: 10, y: 20 },
    { name: 'Adidas', category: 'indumentaria', x: 18, y: 38 },
    { name: 'Zara', category: 'indumentaria', x: 80, y: 22 },

    { name: 'NovaPC', category: 'tecnología', x: 40, y: 20 },
    { name: 'Logitech', category: 'tecnología', x: 52, y: 18 },
    { name: 'Samsung', category: 'tecnología', x: 72, y: 52 },

    { name: 'Chronos', category: 'accesorios', x: 30, y: 40 },
    { name: 'Pandora', category: 'accesorios', x: 36, y: 48 },
    { name: 'RayBan', category: 'accesorios', x: 76, y: 46 },

    { name: 'Morfeo', category: 'hogar', x: 56, y: 28 },
    { name: 'Aether', category: 'hogar', x: 62, y: 12 },
    { name: 'Landmark', category: 'hogar', x: 88, y: 68 },

    // Servicios (pestaña servicios)
    { name: 'Info Desk', category: 'servicios', x: 50, y: 8 },
    { name: 'Estacionamiento', category: 'servicios', x: 94, y: 86 },
    { name: 'Baños', category: 'servicios', x: 24, y: 86 }
];

function normalizeCategory(cat) {
    if (!cat) return 'other';
    const n = cat.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (/gastronom/i.test(n)) return 'gastronomia';
    if (/servic/i.test(n)) return 'servicios';
    return 'other';
}

function createMapMarkers() {
    if (!mapOverlay || !mapOverlay.parentElement) return;
    mapOverlay.innerHTML = '';

    markers.forEach((m, idx) => {
        const catClass = normalizeCategory(m.category);
        const btn = document.createElement('button');
        btn.className = `map-marker ${catClass}`;
        btn.setAttribute('aria-label', `${m.name} — ${m.category}`);
        btn.setAttribute('data-name', m.name);
        btn.setAttribute('data-category', m.category);
        btn.setAttribute('tabindex', '0');
        btn.style.left = m.x + '%';
        btn.style.top = m.y + '%';

        // small label inside marker (optional: first letter)
        btn.textContent = m.name.charAt(0).toUpperCase();

        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = m.name;
        btn.appendChild(tooltip);

        // Click: highlight corresponding card and scroll
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            focusCardByName(m.name);
            // mark pressed for visual feedback
            document.querySelectorAll('.map-marker').forEach(el => el.setAttribute('aria-pressed', 'false'));
            btn.setAttribute('aria-pressed', 'true');
        });

        // Keyboard support: Enter/Space
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });

        mapOverlay.appendChild(btn);
    });
}

function focusCardByName(name) {
    const cardsArray = Array.from(document.querySelectorAll('.local-card'));
    const target = cardsArray.find(c => (c.dataset.name || '').toLowerCase() === name.toLowerCase());
    // remove existing highlights
    cardsArray.forEach(c => c.classList.remove('highlight'));
    if (target) {
        target.style.display = 'flex';
        target.classList.add('highlight');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // remove highlight after a short time to avoid persistent outline
        setTimeout(() => target.classList.remove('highlight'), 3000);
    }
}

function filterMapBy(filter) {
    const norm = normalizeCategory(filter);
    document.querySelectorAll('.map-marker').forEach(marker => {
        const mcat = normalizeCategory(marker.getAttribute('data-category'));
        if (filter === 'all' || norm === mcat) {
            marker.style.display = 'flex';
        } else {
            marker.style.display = 'none';
        }
    });
}

// Hook tabs
function setActiveTab(selectedBtn) {
    document.querySelectorAll('.map-tab').forEach(b => {
        b.classList.toggle('active', b === selectedBtn);
        b.setAttribute('aria-selected', b === selectedBtn ? 'true' : 'false');
    });
}

allTab.addEventListener('click', () => { setActiveTab(allTab); filterMapBy('all'); });
gastronomyTab.addEventListener('click', () => { setActiveTab(gastronomyTab); filterMapBy('gastronomía'); });
servicesTab.addEventListener('click', () => { setActiveTab(servicesTab); filterMapBy('servicios'); });

// Highlight marker when hovering a card
document.querySelectorAll('.local-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const name = card.dataset.name;
        const marker = document.querySelector(`.map-marker[data-name="${name}"]`);
        if (marker) marker.classList.add('hover');
    });
    card.addEventListener('mouseleave', () => {
        const name = card.dataset.name;
        const marker = document.querySelector(`.map-marker[data-name="${name}"]`);
        if (marker) marker.classList.remove('hover');
    });
});

// Wait for map image to load to create markers (so overlay aligns)
if (mapaImg) {
    if (mapaImg.complete) createMapMarkers();
    else mapaImg.addEventListener('load', createMapMarkers);
    // Recreate markers on resize to keep positions accurate (percentages remain fine)
    window.addEventListener('resize', () => { /* no-op for percent positions, but safe */ });
}
