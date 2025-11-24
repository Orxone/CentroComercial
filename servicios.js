// servicios.js — marcadores interactivos y filtrado para la página de Servicios
document.addEventListener('DOMContentLoaded', () => {
  const markers = [
    { name: 'Info Desk', x: 48, y: 56 },
    { name: 'Estacionamiento', x: 12, y: 82 },
    { name: 'Baños', x: 66, y: 30 }
  ];

  const overlay = document.getElementById('servOverlay');
  const mapaImg = document.getElementById('servMapaImg');
  const liveRegion = document.getElementById('liveRegion');
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  const cards = Array.from(document.querySelectorAll('.local-card[data-name]'));

  function createMarkers() {
    if (!overlay) return;
    overlay.innerHTML = '';
    markers.forEach(m => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'map-marker servicios';
      btn.style.left = `${m.x}%`;
      btn.style.top = `${m.y}%`;
      btn.setAttribute('aria-label', `${m.name} — Servicio`);
      btn.dataset.name = m.name;

      btn.addEventListener('click', () => focusCardByName(m.name));
      btn.addEventListener('keyup', (e) => { if (e.key === 'Enter' || e.key === ' ') focusCardByName(m.name); });

      overlay.appendChild(btn);
    });
  }

  function focusCardByName(name) {
    const card = document.querySelector(`.local-card[data-name="${name}"]`);
    if (!card) return;
    card.classList.add('highlight');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.focus({ preventScroll: true });
    setTimeout(() => card.classList.remove('highlight'), 2200);
  }

  function wireCardHover() {
    cards.forEach(card => {
      const name = card.dataset.name;
      const marker = overlay.querySelector(`button[data-name="${name}"]`);
      if (!marker) return;
      card.addEventListener('mouseenter', () => marker.classList.add('hover'));
      card.addEventListener('mouseleave', () => marker.classList.remove('hover'));
      card.addEventListener('focus', () => marker.classList.add('hover'));
      card.addEventListener('blur', () => marker.classList.remove('hover'));
    });
  }

  // Filtrado simple por nombre (botones con data-filter)
  function applyFilter(filter) {
    let visible = 0;
    cards.forEach(card => {
      const name = card.dataset.name || '';
      const show = filter === 'all' ? true : (name === filter);
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (liveRegion) liveRegion.textContent = `${visible} servicios mostrados.`;
  }

  if (mapaImg && mapaImg.complete) {
    createMarkers();
    wireCardHover();
  } else if (mapaImg) {
    mapaImg.addEventListener('load', () => {
      createMarkers();
      wireCardHover();
    });
  }

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.getAttribute('data-filter') || 'all';
        applyFilter(f);
        filterBtns.forEach(b => b.classList.remove('bg-primary', 'text-white'));
        btn.classList.add('bg-primary', 'text-white');
      });
    });
  }

  // Inicial
  applyFilter('all');
});
// Servicios: crear marcadores y conectar con tarjetas
const servImg = document.getElementById('servMapaImg');
const servOverlay = document.getElementById('servOverlay');

const servMarkers = [
    { name: 'Info Desk', x: 50, y: 8 },
    { name: 'Estacionamiento', x: 94, y: 86 },
    { name: 'Baños', x: 24, y: 86 }
];

function createServMarkers() {
    if (!servOverlay) return;
    servOverlay.innerHTML = '';
    servMarkers.forEach(m => {
        const btn = document.createElement('button');
        btn.className = 'map-marker servicios';
        btn.setAttribute('aria-label', m.name + ' — servicios');
        btn.setAttribute('data-name', m.name);
        btn.style.left = m.x + '%';
        btn.style.top = m.y + '%';
        btn.textContent = m.name.charAt(0).toUpperCase();

        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = m.name;
        btn.appendChild(tooltip);

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            focusServCard(m.name);
            document.querySelectorAll('#servOverlay .map-marker').forEach(el => el.setAttribute('aria-pressed','false'));
            btn.setAttribute('aria-pressed','true');
        });

        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
        });

        servOverlay.appendChild(btn);
    });
}

function focusServCard(name) {
    const cards = Array.from(document.querySelectorAll('#serviciosGrid .local-card'));
    cards.forEach(c => c.classList.remove('highlight'));
    const target = cards.find(c => (c.dataset.name || '').toLowerCase() === name.toLowerCase());
    if (target) {
        target.classList.add('highlight');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => target.classList.remove('highlight'), 3000);
    }
}

if (servImg) {
    if (servImg.complete) createServMarkers();
    else servImg.addEventListener('load', createServMarkers);
}
