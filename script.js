document.addEventListener('DOMContentLoaded',()=>{
  // year
  const yearEl=document.getElementById('year'); if(yearEl) yearEl.textContent=new Date().getFullYear();

  // Before/After slider
  const wrap=document.querySelector('.ba-wrap');
  const before=document.querySelector('.ba-before');
  const handle=document.querySelector('.ba-handle');
  if(wrap && before && handle){
    let dragging=false; const rect=()=>wrap.getBoundingClientRect();
    const update=(clientX)=>{
      const r=rect(); let x=Math.max(r.left, Math.min(clientX, r.right));
      const pct=(x - r.left)/r.width*100; before.style.width=pct + '%'; handle.style.left=pct + '%';
      // update accessibility values and live region
      handle.setAttribute('aria-valuenow', Math.round(pct));
      const status = document.getElementById('baStatus'); if(status) status.textContent = `Showing ${Math.round(pct)}% of the before image`;
    };
    handle.addEventListener('pointerdown',e=>{dragging=true; handle.setPointerCapture(e.pointerId)});
    document.addEventListener('pointermove',e=>{ if(dragging) update(e.clientX); });
    document.addEventListener('pointerup',e=>{ dragging=false; });
    // touch-friendly: allow clicking on bar to reposition
    wrap.addEventListener('click',(e)=>{ update(e.clientX); });
    // keyboard support on handle
    handle.addEventListener('keydown', (e)=>{
      const step = 5; let cur = parseFloat(handle.getAttribute('aria-valuenow') || '50');
      if(e.key === 'ArrowRight' || e.key === 'ArrowUp'){ cur = Math.min(100, cur + step); const r = rect(); const x = r.left + (cur/100)*r.width; update(x); e.preventDefault(); }
      if(e.key === 'ArrowLeft' || e.key === 'ArrowDown'){ cur = Math.max(0, cur - step); const r = rect(); const x = r.left + (cur/100)*r.width; update(x); e.preventDefault(); }
    });
  }

  // Simple contact form handler — uses mailto fallback and shows a message
  const form=document.getElementById('contactForm');
  const formMsg=document.getElementById('formMsg');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault(); const data=new FormData(form);
      const name=data.get('name')||''; const email=data.get('email')||''; const subject=data.get('subject')||'General Inquiry'; const message=data.get('message')||'';
      if(!name || !email || !message){ formMsg.textContent='Please complete required fields.'; return; }
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      const mailto = `mailto:hello@enchantedlumos.example?subject=${encodeURIComponent(subject)}&body=${body}`;
      // attempt to open mail client
      window.location.href = mailto;
      formMsg.textContent='Opening your mail client...';
      setTimeout(()=>{ form.reset(); },800);
    });
  }

  // Improve keyboard scroll for gallery
  const gallery=document.querySelector('.gallery-scroll');
  if(gallery){
    gallery.addEventListener('keydown',e=>{
      if(e.key==='ArrowRight') gallery.scrollBy({left:300,behavior:'smooth'});
      if(e.key==='ArrowLeft') gallery.scrollBy({left:-300,behavior:'smooth'});
    });
  }

    // Lightbox: click to expand photo
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('photoModalImg');
    const modalClose = document.querySelector('.photo-modal-close');
    if (modal && modalImg && modalClose) {
        const imgs = document.querySelectorAll('.gallery-scroll img');
        imgs.forEach(img => {
            img.addEventListener('click', e => {
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modal.classList.add('active');
            });
        });
        const closeModal = () => modal.classList.remove('active');
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeModal();
        });
    }
});
