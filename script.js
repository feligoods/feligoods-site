// Animate hero text and button on page load
window.addEventListener('DOMContentLoaded', () => {
  const timeline = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

  timeline.to(".hero h1", { opacity: 1, y: 0 })
          .to(".hero p", { opacity: 1, y: 0 }, "-=0.5")
          .to(".btn-primary", { opacity: 1, y: 0 }, "-=0.5");

  // Animate section headings and paragraphs on scroll using Intersection Observer + GSAP
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const revealSection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;

        gsap.to(section.querySelector("h2"), {opacity: 1, y: 0, duration: 0.8, ease: "power3.out"});
        gsap.to(section.querySelector("p"), {opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.15});
        // Reveal placeholders in section if any
        const placeholders = section.querySelectorAll(".placeholder-img");
        gsap.to(placeholders, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.15,
          delay: 0.3,
        });

        observer.unobserve(section);
      }
    });
  };

  const observer = new IntersectionObserver(revealSection, observerOptions);
  sections.forEach(section => observer.observe(section));

  // Smooth scroll on nav link clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80, // offset for fixed header
          behavior: 'smooth',
        });
      }
    });
  });
});
