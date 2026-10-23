// Footer interactions:
//  - a glow follows the cursor
//  - the giant wordmark's letters rise and light up near the pointer (and ripple gently when idle)
//  - the main button is magnetic
//  - the newsletter form validates and confirms inline
//  - a live Hyderabad clock
(() => {
  const ftr = document.getElementById("footer");
  if (!ftr) return;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (calm) return;

  // --- cursor glow ---
  ftr.addEventListener("pointermove", (e) => {
    const r = ftr.getBoundingClientRect();
    ftr.style.setProperty("--mx", e.clientX - r.left + "px");
    ftr.style.setProperty("--my", e.clientY - r.top + "px");
  });

  // --- magnetic CTA ---
  const mag = ftr.querySelector("[data-magnetic]");
  if (mag && typeof gsap !== "undefined") {
    const qx = gsap.quickTo(mag, "x", { duration: 0.5, ease: "power3.out" });
    const qy = gsap.quickTo(mag, "y", { duration: 0.5, ease: "power3.out" });
    ftr.addEventListener("pointermove", (e) => {
      const r = mag.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      if (d < 150) { qx(dx * 0.28); qy(dy * 0.28); } else { qx(0); qy(0); }
    });
    ftr.addEventListener("pointerleave", () => { qx(0); qy(0); });
  }

  // --- wordmark: letters react to the pointer, ripple when idle ---
  const word = document.getElementById("ftr-word");
  const letters = [...word.children];
  let px = null, visible = false, raf = 0, t = 0, last = performance.now();
  const heat = letters.map(() => 0);
  word.addEventListener("pointermove", (e) => { px = e.clientX; });
  word.addEventListener("pointerleave", () => { px = null; });
  ftr.addEventListener("pointerleave", () => { px = null; });

  const frame = (now) => {
    raf = 0;
    if (!visible) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    t += dt;
    letters.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const target = px === null
        ? 0.22 + 0.22 * Math.sin(t * 1.4 - i * 0.75)          // slow idle wave
        : Math.max(0, 1 - Math.abs(px - cx) / (r.width * 1.7)); // lift near the cursor
      heat[i] += (target - heat[i]) * 0.14;
      el.style.setProperty("--h", heat[i].toFixed(3));
    });
    raf = requestAnimationFrame(frame);
  };
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }, { rootMargin: "80px" }).observe(word);
})();
