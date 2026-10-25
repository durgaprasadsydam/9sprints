// Service pages: cursor spotlight on glass rows, drawing rule on the process steps, staggered fade-up for cards.
(() => {
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasIO = "IntersectionObserver" in window;

  document.querySelectorAll(".sv-pt").forEach((el) => el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", e.clientX - r.left + "px");
    el.style.setProperty("--y", e.clientY - r.top + "px");
  }));

  const steps = document.getElementById("sv-steps");
  if (steps) {
    if (!hasIO) steps.classList.add("in");
    else new IntersectionObserver(([e], io) => {
      if (e.isIntersecting) { steps.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.3 }).observe(steps);
  }

  if (!calm && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    ["#sv-list .sv-pt", "#sv-steps .sv-step", "#sv-rel .sv-card"].forEach((sel) => {
      const els = gsap.utils.toArray(sel);
      if (!els.length) return;
      gsap.set(els, { opacity: 0, y: 40 });
      ScrollTrigger.batch(els, {
        start: "top 90%", once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, clearProps: "opacity,y" }),
      });
    });
  }
})();
