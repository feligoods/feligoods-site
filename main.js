// GSAP Animations and Slider Logic

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll-to-section
  document.querySelectorAll('.nav-tabs button').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const section = document.getElementById(this.dataset.scroll);
      if (section) {
        window.scrollTo({
          top: section.getBoundingClientRect().top + window.scrollY - 60,
          behavior: 'smooth'
        });
      }
    });
  });

  // Toggle Switch Animation (guarded)
  const toggle = document.querySelector('.toggle-switch');
  if (toggle) {
    const knob = toggle.querySelector('.toggle-knob');
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      if (knob) {
        if (toggle.classList.contains('active')) {
          knob.style.left = '68px';
          knob.style.background = '#00e676';
        } else {
          knob.style.left = '4px';
          knob.style.background = '#3a7efd';
        }
      }
    });
    // Set initial knob position (guarded)
    if (knob) {
      knob.style.left = toggle.classList.contains('active') ? '68px' : '4px';
      knob.style.background = toggle.classList.contains('active') ? '#00e676' : '#3a7efd';
    }
  }

  // Slider Logic
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.style.display = i === idx ? 'flex' : 'none';
    });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    current = idx;
  }

  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide((current - 1 + slides.length) % slides.length);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide((current + 1) % slides.length);
    });
  }
  if (dots && dots.length) {
    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  }

  // Initial state
  showSlide(0);

  // Feature Card Hover Animations
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards && featureCards.length) {
    featureCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, y: -8, boxShadow: '0 8px 32px #0002', duration: 0.3 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, y: 0, boxShadow: '0 4px 16px #0001', duration: 0.3 });
      });
    });
  }

  // Grid/List Toggle
  const gridBtn = document.querySelector('.grid-btn');
  const listBtn = document.querySelector('.list-btn');
  const featuresGrid = document.querySelector('.features-grid');
  if (gridBtn && listBtn && featuresGrid) {
    gridBtn.addEventListener('click', () => {
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      featuresGrid.classList.remove('list-mode');
      featuresGrid.style.display = 'grid';
    });
    listBtn.addEventListener('click', () => {
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      featuresGrid.classList.add('list-mode');
      featuresGrid.style.display = 'block';
    });
  }

  // Animated Hero Text (guarded)
  if (document.querySelector('.hero h1')) {
    gsap.from('.hero h1', { y: 80, opacity: 0, duration: 1, ease: 'power4.out' });
  }
  if (document.querySelector('.toggle-switch')) {
    gsap.from('.toggle-switch', { scale: 0, opacity: 0, duration: 0.7, delay: 0.3, ease: 'back.out(1.7)' });
  }
  if (document.querySelector('.subtitle')) {
    gsap.from('.subtitle', { y: 40, opacity: 0, duration: 0.7, delay: 0.6 });
  }
  if (document.querySelector('.explore-btn')) {
    gsap.from('.explore-btn', { y: 40, opacity: 0, duration: 0.7, delay: 0.8 });
  }

  // Marquee Animation (CSS handles it, but duplicate text for seamless loop)
  const marquee = document.querySelector('.marquee');
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
  }

  // GSAP ScrollTrigger Example (guarded)
  if (window.ScrollTrigger && document.querySelector('.scroll-anim-box')) {
    gsap.to('.scroll-anim-box', {
      scrollTrigger: {
        trigger: '.scroll-anim-box',
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: true
      },
      backgroundColor: '#ffb3c6',
      scale: 1.1,
      rotate: 5,
      duration: 1
    });
  }

  // Navbar Active State on Scroll
  const sectionIds = ['flip', 'scroll-trigger', 'slider', 'inertia', 'text-effects', 'marquee'];
  const navButtons = Array.from(document.querySelectorAll('.nav-tabs button'));
  window.addEventListener('scroll', () => {
    let currentSection = sectionIds[0];
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section && window.scrollY + 80 >= section.offsetTop) {
        currentSection = id;
      }
    }
    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.scroll === currentSection);
    });
  });

  // GSAP Text Effects Example (guarded)
  if (document.querySelector('.animated-text')) {
    gsap.fromTo('.animated-text', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power2.out', repeat: -1, yoyo: true });
  }

  // GSAP Inertia Draggable Example (guarded)
  if (window.Draggable && window.InertiaPlugin && document.querySelector('.draggable-ball') && document.querySelector('.inertia-section')) {
    Draggable.create('.draggable-ball', {
      type: 'x,y',
      edgeResistance: 0.65,
      inertia: true,
      bounds: '.inertia-section',
      onPress() { this.target.style.zIndex = 10; },
      onRelease() { this.target.style.zIndex = 1; }
    });
  } else if (document.querySelector('.draggable-ball')) {
    // fallback: simple drag
    const ball = document.querySelector('.draggable-ball');
    let isDown = false, offset = {x:0, y:0};
    ball.addEventListener('mousedown', e => {
      isDown = true;
      offset.x = e.clientX - ball.offsetLeft;
      offset.y = e.clientY - ball.offsetTop;
      ball.style.transition = 'none';
    });
    document.addEventListener('mousemove', e => {
      if (isDown) {
        ball.style.left = (e.clientX - offset.x) + 'px';
        ball.style.top = (e.clientY - offset.y) + 'px';
      }
    });
    document.addEventListener('mouseup', () => {
      isDown = false;
      ball.style.transition = '';
    });
  }

  // --- Feed the Cat Game Logic ---
  let treatsFed = 0;
  const foods = [
    { selector: '[data-food="candy"]', color: '#ff4444' },
    { selector: '[data-food="milk"]', color: '#fff' },
    { selector: '[data-food="cookie"]', color: '#8B5C2A' }
  ];
  let foodIndex = 0;
  const foodEls = foods.map(f => document.querySelector(f.selector));
  const catRegular = document.querySelector('.cat-regular');
  const catEating = document.querySelector('.cat-eating');
  const counter = document.getElementById('treats-fed');
  const crumbsContainer = document.querySelector('.crumbs-container');
  let dragFood = null;
  let offsetX = 0, offsetY = 0;

  function showFood(idx) {
    foodEls.forEach((el, i) => {
      if (el) {
        el.style.display = i === idx ? '' : 'none';
        el.style.opacity = 1;
        el.style.pointerEvents = i === idx ? 'auto' : 'none';
        // Always reset position for next drag
        resetFoodPosition(el);
      }
    });
  }
  function resetFoodPosition(food) {
    if (!food) return;
    food.style.left = '0px';
    food.style.top = '30px';
    food.style.position = 'absolute';
    food.style.transition = '';
    food.style.zIndex = 10;
  }
  function spawnCrumbs(color) {
    if (!crumbsContainer) return;
    crumbsContainer.innerHTML = '';
    // Find the visible cat image (eating or regular)
    let catImg = catEating && catEating.style.display !== 'none' ? catEating : catRegular;
    if (!catImg) return;
    // Get cat image position relative to crumbsContainer
    const catRect = catImg.getBoundingClientRect();
    const crumbsRect = crumbsContainer.getBoundingClientRect();
    // Center-bottom of cat image relative to crumbsContainer
    const originX = catRect.left + catRect.width / 2 - crumbsRect.left;
    const originY = catRect.top + catRect.height * 0.75 - crumbsRect.top;
    for (let i = 0; i < 14; i++) {
      const crumb = document.createElement('div');
      crumb.className = 'crumb';
      crumb.style.background = color;
      crumb.style.border = 'none';
      crumb.style.left = originX + 'px';
      crumb.style.top = originY + 'px';
      crumb.style.position = 'absolute';
      crumb.style.zIndex = 1001;
      crumb.style.pointerEvents = 'none';
      crumb.style.willChange = 'transform, opacity';
      crumb.style.opacity = 0.85;
      crumb.style.transform = 'translate(0,0) scale(1)';
      crumbsContainer.appendChild(crumb);
      // Use requestAnimationFrame to ensure style is applied before transition
      requestAnimationFrame(() => {
        const dx = (Math.random() - 0.5) * 40;
        const dy = 40 + Math.random() * 30;
        crumb.style.transition = 'transform 0.8s cubic-bezier(.4,1.6,.6,1), opacity 0.8s';
        crumb.style.transform = `translate(${dx}px,${dy}px) scale(${0.7 + Math.random()*0.3})`;
        crumb.style.opacity = 0;
      });
    }
    setTimeout(() => { crumbsContainer.innerHTML = ''; }, 900);
  }

  function onMouseDown(e) {
    if (e.button !== undefined && e.button !== 0) return; // Only left click
    dragFood = e.target;
    dragFood.style.transition = 'none';
    dragFood.style.zIndex = 20;
    dragFood.style.pointerEvents = 'none';
    const rect = dragFood.getBoundingClientRect();
    offsetX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    offsetY = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    document.addEventListener('mousemove', onMouseMove, {passive: false});
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onMouseMove, {passive: false});
    document.addEventListener('touchend', onMouseUp);
  }
  function onMouseMove(e) {
    if (!dragFood) return;
    e.preventDefault();
    let x = (e.touches ? e.touches[0].clientX : e.clientX) - offsetX;
    let y = (e.touches ? e.touches[0].clientY : e.clientY) - offsetY;
    dragFood.style.position = 'fixed';
    dragFood.style.left = x + 'px';
    dragFood.style.top = y + 'px';
  }
  function onMouseUp(e) {
    if (!dragFood) return;
    dragFood.style.pointerEvents = 'auto';
    const foodRect = dragFood.getBoundingClientRect();
    const catRect = catRegular && catRegular.getBoundingClientRect();
    const overlap = catRect && !(foodRect.right < catRect.left || foodRect.left > catRect.right || foodRect.bottom < catRect.top || foodRect.top > catRect.bottom);
    if (overlap) {
      treatsFed++;
      if (counter) counter.textContent = treatsFed;
      if (catRegular) catRegular.style.display = 'none';
      if (catEating) catEating.style.display = '';
      spawnCrumbs(foods[foodIndex].color);
      dragFood.style.opacity = 0;
      setTimeout(() => {
        if (catRegular) catRegular.style.display = '';
        if (catEating) catEating.style.display = 'none';
        if (dragFood && document.body.contains(dragFood)) {
          resetFoodPosition(dragFood);
          dragFood.style.opacity = 1;
        }
        // Infinite food cycling
        foodIndex = (foodIndex + 1) % foods.length;
        showFood(foodIndex);
        dragFood = null;
      }, 900);
    } else {
      resetFoodPosition(dragFood);
      dragFood = null;
    }
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('touchmove', onMouseMove);
    document.removeEventListener('touchend', onMouseUp);
  }

  if (catRegular && catEating && counter && crumbsContainer && foodEls.every(Boolean)) {
    showFood(foodIndex);
    foodEls.forEach((food, idx) => {
      resetFoodPosition(food);
      food.addEventListener('mousedown', onMouseDown);
      food.addEventListener('touchstart', onMouseDown, {passive: false});
    });
  } else {
    console.error('Feed the Cat game: missing required elements.');
  }
});
