var theme = document.getElementById("mode-btn");

function setModeButtonState(button, isDark){
    if (!button) return;
    button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
}

// Inicializar modo desde localStorage
var stored = localStorage.getItem("modo");
if (stored === "oscuro"){
    document.body.classList.add("dark-mode");
    document.documentElement.classList.add('dark');
}

setModeButtonState(theme, document.body.classList.contains('dark-mode'));
// Emit initial theme state so components can react
(function(){
    try{
        var initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: initialTheme } }));
    }catch(e){ /* ignore in older browsers */ }
})();

if (theme) {
    theme.addEventListener('click', function(){
        document.body.classList.toggle("dark-mode");
        // Keep Tailwind 'dark' class on <html> in sync
        document.documentElement.classList.toggle('dark');
        var isDark = document.body.classList.contains("dark-mode") || document.documentElement.classList.contains('dark');
        localStorage.setItem("modo", isDark ? "oscuro" : "claro");
        setModeButtonState(theme, isDark);
        // notify other scripts/components that theme changed
        try{
            var newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
        }catch(e){ /* ignore */ }
    });

    // keyboard support: Enter / Space
    theme.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            theme.click();
        }
    });
}

let burgerBtn = document.getElementById('burger-btn');
let navbar = document.getElementById('nav-menu');

burgerBtn.onclick = () => {
    navbar.classList.toggle('active');
};

//Cierra el menú si el usuario scrollea 
window.onscroll = () => {
    navbar.classList.remove('active');
};