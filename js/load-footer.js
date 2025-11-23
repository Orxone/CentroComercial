// Carga el footer reutilizable y convierte data-href en href
(async function loadFooter(){
    try{
        const resp = await fetch('/html/components/footer.html');
        if(!resp.ok) throw new Error('No se pudo cargar el footer: '+resp.status);
        const html = await resp.text();
        const container = document.getElementById('site-footer');
        if(!container) return;
        container.innerHTML = html;

        // Convierte todos los enlaces con data-href a href (root-relative)
        container.querySelectorAll('a[data-href]').forEach(a => {
            const target = a.getAttribute('data-href') || '';
            if(target.startsWith('/')){
                a.setAttribute('href', target);
            } else {
                // Asegura que comience con '/'
                a.setAttribute('href', '/' + target.replace(/^\/+/, ''));
            }
            a.removeAttribute('data-href');
        });

    }catch(e){
        console.error('load-footer.js error:', e);
    }
})();
