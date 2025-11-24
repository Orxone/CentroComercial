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

// LÓGICA DE FILTRADO
function applyFilter(category) {
  // Si es 'all' mostramos todo, sino filtramos por la propiedad 'category'
  const result = category === 'all' ? offers : offers.filter(o => o.category === category);
  renderOffers(result);
}

// EVENTOS DE LOS BOTONES
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Obtener la categoría del botón clickeado
      const cat = btn.getAttribute('data-category') || 'all';
      
      // 2. Aplicar el filtro
      applyFilter(cat);
      
      // 3. Cambiar el color del botón (Clase 'active')
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// INICIALIZAR (Mostrar todo al cargar la página)
// Asegúrate de agregar el script AL FINAL del body en el HTML
renderOffers(offers);