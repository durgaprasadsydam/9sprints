// Smooth scrolling (Lenis) + the pinned 3D services scene (GSAP ScrollTrigger).
// Everything degrades to a normal page if GSAP is missing or the visitor prefers reduced motion.
(() => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lenis = null;

  if (!reduce && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    // in-page anchors go through Lenis so they glide instead of jumping
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(id === "#top" ? 0 : el, { offset: id === "#top" ? 0 : -10 });
    });
  }

  addEventListener("load", () => ScrollTrigger.refresh());
})();
