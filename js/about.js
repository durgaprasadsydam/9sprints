// About page: count-up stats, scroll-drawn rules, photo parallax, disciplines panels, spotlight on glass rows.
(() => {
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasIO = "IntersectionObserver" in window;

  // count-up numbers
  document.querySelectorAll("[data-count]").forEach((el) => {
    const to = +el.dataset.count;
    if (calm || !hasIO) { el.textContent = to; return; }
    el.textContent = "0";
    new IntersectionObserver(([e], io) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 }).observe(el);
  });

  // rules that draw in
  const blocks = document.querySelectorAll(".ab-block");
  blocks.forEach((b) => (hasIO ? 0 : b.classList.add("in")));
  if (hasIO) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.3 });
    blocks.forEach((b) => io.observe(b));
  }

  // photo parallax
  const img = document.querySelector(".ab-photo img");
  if (img && !calm && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: ".ab-photo", start: "top bottom", end: "bottom top", scrub: true } });
  }

  // disciplines: tap to open on touch / keyboard focus
  const panels = [...document.querySelectorAll(".ab-pn")];
  panels.forEach((p) => p.addEventListener("click", (e) => {
    if (!matchMedia("(hover: none)").matches) return;
    if (!p.classList.contains("is-on")) { e.preventDefault(); panels.forEach((x) => x.classList.remove("is-on")); p.classList.add("is-on"); }
  }));

  // cursor spotlight on glass rows
  document.querySelectorAll(".ab-gap-row").forEach((el) => el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", e.clientX - r.left + "px");
    el.style.setProperty("--y", e.clientY - r.top + "px");
  }));

  // staggered fade-up for grouped cards
  if (!calm && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    ["#ab-vals .ab-val", "#why-vals .ab-val", "#ab-gap .ab-gap-row", "#ab-eng .ab-row", "#ab-eng .sv-eng-card", "#ab-acc .ab-pn"].forEach((sel) => {
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
