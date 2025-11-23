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
const filterSelect = document.getElementById("filterCategory");
const scrollBtn = document.getElementById("scrollTopBtn");

// RENDER
function renderOffers(filtered) {
  offersList.innerHTML = "";

  filtered.forEach(o => {
    const card = document.createElement("article");
    card.className = "offer-card";
    card.tabIndex = 0;

    card.innerHTML = `
      <img class="icon" src="${o.img}" alt="">
      <div>
        <h3>${o.title}</h3>
        <p>${o.desc}</p>
      </div>
    `;

    offersList.appendChild(card);
  });

  liveRegion.textContent = `${filtered.length} ofertas encontradas.`;
}

// FILTRAR
function applyFilter() {
  const val = filterSelect.value;
  const result = val === "all"
    ? offers
    : offers.filter(o => o.category === val);
  renderOffers(result);
}

// SCROLL TOP BUTTON
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// EVENTOS
filterSelect.addEventListener("change", applyFilter);

// INICIAL
renderOffers(offers);