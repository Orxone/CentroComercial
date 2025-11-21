const filterBtn = document.querySelector(".filter-btn");
const dropdown = document.getElementById("filterDropdown");
const cards = document.querySelectorAll(".local-card");

// Abrir / cerrar dropdown
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

// Cerrar dropdown si clicás afuera
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
            return nameA.localeCompare(nameB);  // A → Z
        } else {
            return nameB.localeCompare(nameA);  // Z → A
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


// CAMBIO ENTRE MAPA PB Y P1

const mapaImg = document.getElementById("mapaImg");
const btnPB = document.getElementById("btnPB");
const btnP1 = document.getElementById("btnP1");

btnPB.addEventListener("click", () => {
    mapaImg.src = "imagenes/MapaPB.png";

    btnPB.classList.add("active");
    btnP1.classList.remove("active");
});

btnP1.addEventListener("click", () => {
    mapaImg.src = "imagenes/MapaP1.png";

    btnP1.classList.add("active");
    btnPB.classList.remove("active");
});