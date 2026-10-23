(() => {
// Core value pillars: the divider lines respond to the cursor.
// Each divider gets a --prox value (0..1) from how close the pointer is, which CSS uses to
// tint the line and brighten the pulse that flows down it.
const frame = document.querySelector(".pf");
if (frame && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const cols = [...frame.querySelectorAll(".pf-col")];
  let raf = 0, px = null;
  const update = () => {
    raf = 0;
    const fr = frame.getBoundingClientRect();
    cols.forEach((c, i) => {
      if (i === 0) return;
      const x = c.getBoundingClientRect().left - fr.left;
      const p = px === null ? 0 : Math.max(0, 1 - Math.abs(px - x) / 240);
      c.style.setProperty("--prox", (p * p).toFixed(3));
    });
  };
  frame.addEventListener("pointermove", (e) => {
    px = e.clientX - frame.getBoundingClientRect().left;
    if (!raf) raf = requestAnimationFrame(update);
  });
  frame.addEventListener("pointerleave", () => { px = null; if (!raf) raf = requestAnimationFrame(update); });
}
})();
