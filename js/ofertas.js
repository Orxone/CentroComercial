// Filtrado accesible para la página de ofertas
(function(){
  const btns = Array.from(document.querySelectorAll('.filtro-btn'));
  const cards = Array.from(document.querySelectorAll('.oferta-card'));

  // Crear una región aria-live si no existe (para comunicar resultados)
  let live = document.getElementById('ofertas-live');
  if(!live){
    live = document.createElement('div');
    live.id = 'ofertas-live';
    live.setAttribute('aria-live','polite');
    live.setAttribute('aria-atomic','true');
    live.style.position = 'absolute';
    live.style.left = '-9999px';
    document.body.appendChild(live);
  }

  function updateLive(count){
    live.textContent = `${count} oferta${count===1?'':'s'} mostrada${count===1?'' :'s'}`;
  }

  function applyFilter(category){
    let shown = 0;
    cards.forEach(card => {
      const cat = (card.dataset.categoria || '').toLowerCase();
      const match = category === 'todas' || category === 'all' || category === '' || cat === category;
      if(match){
        card.style.display = '';
        card.setAttribute('aria-hidden','false');
        shown++;
      } else {
        card.style.display = 'none';
        card.setAttribute('aria-hidden','true');
      }
    });
    updateLive(shown);
  }

  function clearActive(){
    btns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed','false');
    });
  }

  function onActivateButton(ev){
    const btn = ev.currentTarget;
    const cat = (btn.dataset.categoria || btn.getAttribute('data-categoria') || 'todas').toLowerCase();
    clearActive();
    btn.classList.add('active');
    btn.setAttribute('aria-pressed','true');
    applyFilter(cat);
  }

  // Inicializar botones
  if(btns.length){
    btns.forEach(b => {
      // ensure accessible role
      b.setAttribute('role','button');
      b.setAttribute('tabindex','0');
      if(!b.hasAttribute('aria-pressed')) b.setAttribute('aria-pressed','false');
      b.addEventListener('click', onActivateButton);
      b.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivateButton(e);
        }
      });
    });

    // Activar el que ya tenga clase .active o el primero
    const initial = btns.find(b=>b.classList.contains('active')) || btns[0];
    if(initial){
      initial.classList.add('active');
      initial.setAttribute('aria-pressed','true');
      const cat = (initial.dataset.categoria || 'todas').toLowerCase();
      applyFilter(cat);
    }
  } else {
    // Si no hay botones, mostrar todo
    applyFilter('todas');
  }

  // Optional: smooth scroll to top button if present
  const scrollBtn = document.getElementById('scrollTopBtn');
  if(scrollBtn){
    window.addEventListener('scroll', () => {
      scrollBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  }

})();
