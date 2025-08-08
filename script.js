// Enhanced sticky header with scroll effects
(function(){
  const header = document.getElementById('site-header');
  let lastY = window.scrollY;
  let ticking = false;
  
  function onScroll(){
    const y = window.scrollY;
    if (Math.abs(y - lastY) < 6) return;
    
    // Add scrolled class for styling
    if (y > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (y > lastY && y > 80){
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastY = y;
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking){
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
})();

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1){
      const el = document.querySelector(id);
      if (el){
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Enhanced reveal on intersect with staggered animations
(function(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        // Add delay for staggered animations
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
})();

// Enhanced parallax elements with better performance
(function(){
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  if (parallaxEls.length === 0) return;
  
  let rafId;
  let lastY = window.scrollY;
  
  function tick(){
    const y = window.scrollY;
    const dy = y - lastY;
    
    parallaxEls.forEach(el => {
      const factor = parseFloat(el.getAttribute('data-parallax')) || 0.05;
      const current = parseFloat(el.dataset.y || '0');
      const next = current + dy * factor;
      el.style.transform = `translateY(${next}px)`;
      el.dataset.y = String(next);
    });
    
    lastY = y;
    rafId = null;
  }
  
  window.addEventListener('scroll', () => {
    if (!rafId) rafId = requestAnimationFrame(tick);
  }, { passive: true });
})();

// Add active state to navigation links
(function(){
  const navLinks = document.querySelectorAll('.nav-pill a');
  const sections = document.querySelectorAll('.section');
  
  function updateActiveLink() {
    const scrollY = window.scrollY;
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const link = navLinks[index];
      
      if (rect.top <= 100 && rect.bottom >= 100) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

// Simplified button hover effects
(function(){
  const buttons = document.querySelectorAll('.btn, .launch-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-1px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
})();


