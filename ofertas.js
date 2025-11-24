// DATA DE EJEMPLO
const offers = [
  { id: 1, title: "2x1 en café", category: "gastronomia", img: "imagenes/Iconos/icon-food.png", desc: "Válido de 9 a 13hs." },
  { id: 2, title: "20% OFF indumentaria", category: "moda", img: "imagenes/Iconos/icon-sale.png", desc: "Locales adheridos." },
  { id: 3, title: "Combo almuerzo $3500", category: "gastronomia", img: "imagenes/Iconos/icon-food.png", desc: "Incluye bebida." },
  { id: 4, title: "Promo gaming", category: "entretenimiento", img: "imagenes/Iconos/icon-sale.png", desc: "Créditos extra." }
];

// ARIA-LIVE
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
    card.className = "group flex flex-col gap-4 overflow-hidden rounded-lg bg-card-light shadow-sm transition-shadow hover:shadow-lg dark:bg-card-dark";
    card.tabIndex = 0;

    const imgBlock = document.createElement('div');
    imgBlock.className = 'w-full overflow-hidden bg-center bg-no-repeat aspect-[4/3] bg-cover';
    if (o.img && o.img.startsWith('http')) {
      imgBlock.style.backgroundImage = `url('${o.img}')`;
    } else if (o.img) {
      // if it's a small icon, render as an <img> inside a centered container
      const wrapper = document.createElement('div');
      wrapper.className = 'flex items-center justify-center bg-secondary/5 h-48';
      const icon = document.createElement('img');
      icon.src = o.img;
      icon.alt = o.title;
      icon.className = 'h-16 w-16 object-contain';
      wrapper.appendChild(icon);
      imgBlock.appendChild(wrapper);
    }

    const body = document.createElement('div');
    body.className = 'flex flex-col gap-1 p-4 pt-0';
    body.innerHTML = `
      <p class="text-lg font-bold leading-normal text-secondary dark:text-primary">${o.title}</p>
      <p class="text-sm font-normal text-text-color/80 dark:text-text-color-dark/80">${o.desc}</p>
      <a class="mt-2 text-sm font-bold text-primary transition-colors hover:text-text-color dark:hover:text-white" href="#">Ver Oferta</a>
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
// Wire filter buttons
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category') || 'all';
      applyFilter(cat);
      // update active state
      filterBtns.forEach(b => b.classList.remove('bg-primary', 'text-background-light'));
      btn.classList.add('bg-primary', 'text-background-light');
    });
  });
}

// INICIAL
renderOffers(offers);