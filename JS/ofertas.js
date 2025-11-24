// 1. DATA REAL (Con las rutas de tus nuevas fotos)
const offers = [
  { 
    id: 1, 
    title: "2x1 en café", 
    category: "gastronomia", 
    img: "imagenes/Ofertas/Cafe.jpg", 
    desc: "Válido de 9 a 13hs." 
  },
  { 
    id: 2, 
    title: "20% OFF indumentaria", 
    category: "moda", 
    img: "imagenes/Ofertas/Indumentaria.jpg", 
    desc: "Locales adheridos." 
  },
  { 
    id: 3, 
    title: "Combo almuerzo $3500", 
    category: "gastronomia", 
    img: "imagenes/Ofertas/Comida.jpg", 
    desc: "Incluye bebida." 
  },
  { 
    id: 4, 
    title: "Promo gaming", 
    category: "entretenimiento", 
    img: "imagenes/Ofertas/Gaming.jpg", 
    desc: "Créditos extra." 
  }
];

// ELEMENTOS DOM
const liveRegion = document.getElementById("liveRegion");
const offersList = document.getElementById("offersList");
const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));

// RENDER (DIBUJAR LAS CARTAS)
function renderOffers(filtered) {
  if (!offersList) return;
  
  // Limpiamos lo que haya antes
  offersList.innerHTML = "";

  // Si no hay ofertas (por ej. seleccionas Hogar y no hay nada)
  if (filtered.length === 0) {
    offersList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; opacity: 0.7;">No hay ofertas en esta categoría por el momento.</p>';
    return;
  }

  filtered.forEach(o => {
    // Creamos el articulo principal
    const card = document.createElement("article");
    card.className = "offer-card"; 
    card.tabIndex = 0;

    // Creamos la estructura interna EXACTA para que el CSS funcione
    card.innerHTML = `
        <div class="offer-img-container">
            <div class="offer-icon-wrapper">
                <img src="${o.img}" alt="${o.title}">
            </div>
        </div>
        <div class="offer-body">
            <p class="offer-title">${o.title}</p>
            <p class="offer-desc">${o.desc}</p>
            <a class="offer-link" href="#">Ver Oferta</a>
        </div>
    `;

    // Lo agregamos al contenedor
    offersList.appendChild(card);
  });

  if (liveRegion) liveRegion.textContent = `${filtered.length} ofertas encontradas.`;
}


//FILTRO
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".offer-card");

  // Normalizar texto (quita acentos y pasa a minúsculas)
  const normalize = str =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Cambiar estado visual
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const category = normalize(button.dataset.category);

      cards.forEach(card => {
        const categoriasCard = (card.dataset.category || "")
          .split(" ")
          .map(normalize);

        if (category === "all" || categoriasCard.includes(category)) {
          card.style.display = "flex"; // o "block" según tu grid
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

// BOTÓN "Ver Ofertas"

const mapBtn = document.getElementById("hero-btn");
const mapaSection = document.getElementById("filters-header");

mapBtn.addEventListener("click", () => {
    mapaSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});