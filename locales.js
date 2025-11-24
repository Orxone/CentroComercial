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
            const categoriasCard = (card.dataset.category || "").split(" ");

            if (category === "todos") {
                card.style.display = "flex";
                return;
            }

            if (categoriasCard.includes(category)) {
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
const resultadoMensaje = document.getElementById("resultadoMensaje");

function filtrarPorNombre() {
    const texto = searchInput.value.toLowerCase().trim();

    if (texto === "") {
        cards.forEach(card => card.style.display = "flex");
        resultadoMensaje.textContent = ""; 
        return;
    }

    const cardsArray = Array.from(cards);

    const coincidencias = cardsArray.filter(card => {
        const nombre = (card.dataset.name || "").toLowerCase();
        return nombre.startsWith(texto);
    });

    coincidencias.sort((a, b) => {
        return a.dataset.name.toLowerCase().localeCompare(b.dataset.name.toLowerCase());
    });

    cards.forEach(card => card.style.display = "none");

    const grid = document.getElementById("localesGrid");
    coincidencias.forEach(card => {
        card.style.display = "flex";
        grid.appendChild(card);
    });

    resultadoMensaje.textContent =
        coincidencias.length > 0
            ? `Resultados encontrados: ${coincidencias.length}`
            : "No se encontraron locales.";
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

// SLIDER CAMBIO ENTRE MAPA PB Y P1 
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".mapa-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));

        slides[index].style.animation = "none";
        void slides[index].offsetWidth; 
        slides[index].style.animation = "";
        slides[index].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    showSlide(currentIndex);
});