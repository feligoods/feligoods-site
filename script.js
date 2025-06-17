window.addEventListener("DOMContentLoaded", () => {
  // Hero text stagger fade/slide animation
  const tlHero = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.7 } });

  tlHero.to(".hero h1", { opacity: 1, y: 0, stagger: 0.15 })
        .to(".hero p", { opacity: 1, y: 0 }, "-=0.4")
        .to(".btn-primary", { opacity: 1, y: 0 }, "-=0.3");

  // Animate shapes with subtle scale/rotate loop
  gsap.to(".circle1", { scale: 1.1, rotation: 8, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut" });
  gsap.to(".circle2", { scale: 1.15, rotation: -6, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut" });
  gsap.to(".blob1", { scale: 1.05, rotation: 5, duration: 8, yoyo: true, repeat: -1, ease: "sine.inOut" });
  gsap.to(".blob2", { scale: 1.08, rotation: -4, duration: 6.5, yoyo: true, repeat: -1, ease: "sine.inOut" });

  // Features fade & slide in on scroll
  const features = gsap.utils.toArray(".feature");
  const featuresHeading = document.querySelector(".features h2");
  const pricingHeading = document.querySelector(".pricing h2");
  const pricingText = document.querySelector(".pricing p");
  const pricingBox = document.querySelector(".placeholder-box");
  const contactHeading = document.querySelector(".contact h2");
  const contactText = document.querySelector(".contact p");
  const contactBtn = document.querySelector(".contact .btn-primary");

  // Animate Features Heading
  gsap.fromTo(featuresHeading,
    { opacity: 0, y: 40 },
    {
      scrollTrigger: {
        trigger: ".features",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }
  );

  // Animate each feature block
  features.forEach((feature, i) => {
    gsap.fromTo(feature,
      { opacity: 0, y: 50 },
      {
        scrollTrigger: {
          trigger: feature,
          start: "top 85%",
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.2,
        ease: "power3.out",
      }
    );
  });

  // Animate Pricing Section
  gsap.fromTo(pricingHeading,
    { opacity: 0, y: 40 },
    {
      scrollTrigger: {
        trigger: ".pricing",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }
  );

  gsap.fromTo(pricingText,
    { opacity: 0, y: 30 },
    {
      scrollTrigger: {
        trigger: ".pricing",
        start: "top 75%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
    }
  );

  gsap.fromTo(pricingBox,
    { opacity: 0, scale: 0.9 },
    {
      scrollTrigger: {
        trigger: ".pricing",
        start: "top 70%",
      },
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
    }
  );

  // Animate Contact Section
  gsap.fromTo(contactHeading,
    { opacity: 0, y: 40 },
    {
      scrollTrigger: {
        trigger: ".contact",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }
  );

  gsap.fromTo(contactText,
    { opacity: 0, y: 30 },
    {
      scrollTrigger: {
        trigger: ".contact",
        start: "top 75%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out",
    }
  );

  gsap.fromTo(contactBtn,
    { opacity: 0, y: 30 },
    {
      scrollTrigger: {
        trigger: ".contact",
        start: "top 70%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
    }
  );

  // Highlight nav links on scroll
  const sections = document.querySelectorAll("main > section");
  const navLinks = document.querySelectorAll(".side-nav a");

  window.addEventListener("scroll", () => {
    let current = null;
    sections.forEach(section => {
      const top = section.offsetTop - window.innerHeight / 3;
      if (pageYOffset >= top) current = section.getAttribute("id");
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
