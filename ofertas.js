// DATA DE EJEMPLO
const offers = [
  { id: 1, title: "2x1 en café", category: "gastronomia", img: "imagenes/Iconos/icon-food.png", desc: "Válido de 9 a 13hs." },
  { id: 2, title: "20% OFF indumentaria", category: "moda", img: "imagenes/Iconos/icon-sale.png", desc: "Locales adheridos." },
  { id: 3, title: "Combo almuerzo $3500", category: "gastronomia", img: "imagenes/Iconos/icon-food.png", desc: "Incluye bebida." },
  { id: 4, title: "Promo gaming", category: "entretenimiento", img: "imagenes/Iconos/icon-sale.png", desc: "Créditos extra." }
];

// ELEMENTOS DOM
const liveRegion = document.getElementById("liveRegion");
const offersList = document.getElementById("offersList");
const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
const scrollBtn = document.getElementById("scrollTopBtn");

// RENDER
function renderOffers(filtered) {
  if (!offersList) return;
  offersList.innerHTML = "";

  filtered.forEach(o => {
    const card = document.createElement("article");
    // CAMBIO: Usamos clase CSS normal, no Tailwind
    card.className = "offer-card"; 
    card.tabIndex = 0;

    const imgBlock = document.createElement('div');
    imgBlock.className = 'offer-img-container';

    if (o.img && o.img.startsWith('http')) {
      imgBlock.style.backgroundImage = `url('${o.img}')`;
    } else if (o.img) {
      // Si es icono pequeño
      const wrapper = document.createElement('div');
      wrapper.className = 'offer-icon-wrapper';
      
      const icon = document.createElement('img');
      icon.src = o.img;
      icon.alt = o.title;
      
      wrapper.appendChild(icon);
      imgBlock.appendChild(wrapper);
    }

    const body = document.createElement('div');
    body.className = 'offer-body';
    
    // CAMBIO: HTML interno con clases semánticas
    body.innerHTML = `
      <p class="offer-title">${o.title}</p>
      <p class="offer-desc">${o.desc}</p>
      <a class="offer-link" href="#">Ver Oferta</a>
    `;

    card.appendChild(imgBlock);
    card.appendChild(body);
    offersList.appendChild(card);
  });

  if (liveRegion) liveRegion.textContent = `${filtered.length} ofertas encontradas.`;
}

// FILTRAR
function applyFilter(category) {
  const result = category === 'all' ? offers : offers.filter(o => o.category === category);
  renderOffers(result);
}

// SCROLL TOP BUTTON
window.addEventListener("scroll", () => {
  if (!scrollBtn) return;
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// EVENTOS
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category') || 'all';
      applyFilter(cat);
      
      // UPDATE ACTIVE STATE
      // Removemos la clase 'active' de todos
      filterBtns.forEach(b => b.classList.remove('active'));
      // Agregamos 'active' al clickeado (El CSS se encarga del color)
      btn.classList.add('active');
    });
  });
}

// INICIAL
renderOffers(offers);