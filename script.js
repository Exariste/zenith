  // Particles
  const container = document.getElementById('particles');
  for(let i=0; i<30; i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100 + '%';
    p.style.bottom = Math.random()*20 + '%';
    p.style.animationDelay = Math.random()*8 + 's';
    p.style.animationDuration = (6 + Math.random()*6) + 's';
    container.appendChild(p);
  }

  // Nav scroll effect
  window.addEventListener('scroll', ()=>{
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));

  // Counter animation
  function animateCounter(el, target, suffix=''){
    let start = 0;
    const dur = 2000;
    const step = target / (dur/16);
    const timer = setInterval(()=>{
      start += step;
      if(start >= target){ start = target; clearInterval(timer); }
      el.textContent = Math.floor(start) + (suffix || (target===100 ? '+' : '+'));
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold:0.5 });

  document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));

  // Fix 100% stat display
  document.querySelectorAll('.stat-number').forEach(el=>{
    if(el.dataset.target==='100'){
      const origAnimate = animateCounter;
    }
  });

  // Testimonial slider
  let currentSlide = 0;
  function goToSlide(n){
    currentSlide = n;
    document.getElementById('testimonialTrack').style.transform = `translateX(-${n*100}%)`;
    document.querySelectorAll('.slider-dot').forEach((d,i)=> d.classList.toggle('active', i===n));
  }
  setInterval(()=> goToSlide((currentSlide+1)%3), 5000);

  // Gallery filter
  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Scroll to contact
  function scrollToContact(){ document.getElementById('contact').scrollIntoView({behavior:'smooth'}); }

  // Form submit
  document.querySelector('.form-submit').addEventListener('click', ()=>{
    alert('Thank you for your enquiry! We will contact you shortly via WhatsApp or phone.');
  });
</script>
