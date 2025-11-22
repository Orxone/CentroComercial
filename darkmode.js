var theme = document.getElementById("mode-btn");

if (localStorage.getItem("modo") === "oscuro"){
    document.body.classList.add("dark-mode");
}

theme.onclick = function(){
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")){
        localStorage.setItem("modo", "oscuro");
    }

    else{
        localStorage.setItem("modo", "claro");
    }
}