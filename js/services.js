// Services bento: each card tilts toward the cursor with a moving highlight, and fades up on scroll.
(() => {
  const grid = document.getElementById("sv-grid");
  if (!grid) return;
  const cards = [...grid.querySelectorAll(".sv")];
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hover = matchMedia("(hover: hover)").matches;

  cards.forEach((c) => {
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      c.style.setProperty("--x", x + "px");
      c.style.setProperty("--y", y + "px");
      if (calm || !hover) return;
      const ry = (x / r.width - 0.5) * 7, rx = -(y / r.height - 0.5) * 7;
      c.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    });
    c.addEventListener("pointerleave", () => { c.style.transform = ""; });
  });

  if (calm || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(cards, { opacity: 0, y: 40 });
  ScrollTrigger.batch(cards, {
    start: "top 88%",
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, clearProps: "opacity,y" }),
  });
})();
