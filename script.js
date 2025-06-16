document.addEventListener("DOMContentLoaded", () => {
  // Draggable police tape button
  Draggable.create('#dragBtn', {
    type: 'x', bounds: '.slider-container', 
    onDrag: function() {
      gsap.to('.police-tape', { x: this.x / 2 });
    }
  });

  // List/grid toggle
  const listBtn = document.getElementById('listView');
  const gridBtn = document.getElementById('gridView');
  const flipArea = document.getElementById('flipArea');

  gridBtn.onclick = () => {
    flipArea.classList.remove('list-view');
    flipArea.classList.add('grid-view');
  };
  listBtn.onclick = () => {
    flipArea.classList.remove('grid-view');
    flipArea.classList.add('list-view');
  };

  // Scroll-trigger animations
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('#buildText', {
    scrollTrigger: { trigger: '#buildText', start: 'top 80%' },
    opacity: 0,
    y: 50,
    duration: 1
  });

  gsap.from('#growImg', {
    scrollTrigger: { trigger: '#growImg', start: 'top 80%' },
    scale: 0,
    duration: 1
  });

  // Simple slider
  let current = 0;
  const slides = document.querySelector('.slides');

  document.getElementById('next').onclick = () => {
    current = (current + 1) % slides.children.length;
    slides.style.transform = `translateX(-${current * 100}%)`;
  };
  document.getElementById('prev').onclick = () => {
    current = (current - 1 + slides.children.length) % slides.children.length;
    slides.style.transform = `translateX(-${current * 100}%)`;
  };
});
