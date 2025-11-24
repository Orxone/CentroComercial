// gastronomia.js
(function(){
  // All logic runs after DOM is ready
  function ready(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(()=>{
    const overlay = document.getElementById('gastroOverlay');
    const img = document.getElementById('gastroMapaImg');
    const live = document.getElementById('liveRegion');
    // overlay/img are optional. If missing, we still enable filtering.

    // Markers for the cards present in the HTML
    const markers = [
      { name: 'La Trattoria del Centro', x: 32, y: 28, color: '#C94B4B', category: 'restaurants' },
      { name: 'The Daily Grind Cafe', x: 22, y: 38, color: '#8B5CF6', category: 'cafes' },
      { name: 'Oasis Juice Bar', x: 44, y: 42, color: '#10B981', category: 'juices' },
      { name: 'The Sweet Spot', x: 60, y: 30, color: '#F59E0B', category: 'desserts' },
      { name: 'Gourmet Burger House', x: 52, y: 46, color: '#EF4444', category: 'american' },
      { name: 'El Fuego Cantina', x: 70, y: 40, color: '#EA580C', category: 'mexican' }
    ];

    function renderMarkers(){
      if(!overlay || !img) return;
      overlay.innerHTML = '';
      markers.forEach(m => {
        const btn = document.createElement('button');
        btn.className = 'gastro-marker';
        btn.style.position = 'absolute';
        btn.style.left = m.x + '%';
        btn.style.top = m.y + '%';
        btn.style.transform = 'translate(-50%, -100%)';
        btn.style.width = '18px';
        btn.style.height = '18px';
        btn.style.borderRadius = '50%';
        btn.style.border = '2px solid white';
        btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.25)';
        btn.style.background = m.color;
        btn.setAttribute('aria-label', m.name + ' — Marker');
        btn.dataset.name = m.name;
        btn.dataset.category = m.category;
        btn.tabIndex = 0;
        btn.addEventListener('click', () => focusCardByName(m.name));
        btn.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); focusCardByName(m.name); } });
        overlay.appendChild(btn);
      });
    }

    function focusCardByName(name){
      const cards = document.querySelectorAll('.local-card');
      for(const c of cards){
        if(c.dataset.name === name){
          c.scrollIntoView({behavior: 'smooth', block: 'center'});
          c.classList.add('highlight');
          setTimeout(()=> c.classList.remove('highlight'), 2000);
          c.focus();
          updateLiveRegion(name + ' seleccionado');
          break;
        }
      }
    }

    function updateLiveRegion(text){ if(!live) return; live.textContent = text; }

    // init markers when image loaded (if image exists)
    if(img){
      img.addEventListener('load', renderMarkers);
      if(img.complete) renderMarkers();
    }

    // hover linking from cards -> markers
    document.addEventListener('mouseover', (e)=>{
      const card = e.target.closest('.local-card');
      if(!card || !overlay) return;
      const name = card.dataset.name;
      const btn = overlay.querySelector("button[data-name='"+CSS.escape(name)+"']");
      if(btn) btn.classList.add('hover');
    });
    document.addEventListener('mouseout', (e)=>{
      const card = e.target.closest('.local-card');
      if(!card || !overlay) return;
      const name = card.dataset.name;
      const btn = overlay.querySelector("button[data-name='"+CSS.escape(name)+"']");
      if(btn) btn.classList.remove('hover');
    });

    // Filtering support
    const filterBtns = document.querySelectorAll('.filter-btn');
    if(filterBtns && filterBtns.length){
      filterBtns.forEach(b => b.addEventListener('click', ()=>{
        const cat = b.dataset.category || b.getAttribute('data-category') || 'all';
        applyFilter(cat);
        filterBtns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
      }));

      // set initial filter to 'all'
      const defaultBtn = document.querySelector('.filter-btn[data-category="all"]') || filterBtns[0];
      if(defaultBtn){
        defaultBtn.classList.add('active');
        applyFilter(defaultBtn.dataset.category || 'all');
      }
    }

    function applyFilter(category){
      const cards = document.querySelectorAll('.local-card');
      let shown = 0;
      cards.forEach(c => {
        // normalize category values (some cards may have spanish values)
        const cardCat = (c.dataset.category || '').toString().toLowerCase();
        if(category === 'all' || cardCat === category){
          c.style.display = '';
          shown++;
        } else {
          c.style.display = 'none';
        }
      });
      updateLiveRegion(shown + ' locales visibles.');
    }

  });

})();
