// About hero background: a dot-matrix field rippled by slow travelling waves, with a soft light that follows the cursor.
// Fades out behind the headline so copy stays readable. Pure 2D canvas; pauses off-screen, honours reduced motion.
(() => {
  const hero = document.getElementById("hero");
  const host = document.getElementById("hero-canvas");
  if (!hero || !host) return;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cv = document.createElement("canvas");
  host.appendChild(cv);
  const ctx = cv.getContext("2d");
  if (!ctx) return;

  const GAP = 26;
  let W = 0, H = 0, V = 0, dpr = 1, cols = 0, rows = 0, t = 0, raf = 0, visible = true;
  let mx = 0.7, my = 0.4, sx = 0.7, sy = 0.4;

  const size = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = host.clientWidth; H = host.clientHeight; V = Math.max(240, H - 200);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + "px"; cv.style.height = H + "px";
    cols = Math.ceil(W / GAP) + 2; rows = Math.ceil(V / GAP) + 2;
  };

  const draw = () => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    const cx = sx * W, cy = sy * V, reach = Math.max(W, V) * 0.22;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bx = c * GAP - GAP * 0.5, by = r * GAP - GAP * 0.5;
        const nx = bx / W, ny = by / V;
        // two crossing waves give the field its slow, rolling relief
        const w = Math.sin(nx * 7 + t * 0.9) * 0.5 + Math.sin(ny * 6 - nx * 3 + t * 0.7) * 0.5;
        const h = (w + 1) / 2;
        const dx = bx - cx, dy = by - cy, d = Math.hypot(dx, dy);
        const glow = Math.max(0, 1 - d / reach);
        const lift = w * 5 + glow * glow * -10;
        // keep the left (headline) side quiet, bring the right side up
        const side = (0.4 + 0.6 * Math.min(1, Math.max(0, (nx - 0.1) / 0.5))) * Math.min(1, Math.max(0, (H - 330 - by) / 200));
        const a = (0.16 + h * 0.5 + glow * 0.8) * side;
        if (a < 0.03) continue;
        const rad = 1 + h * 1.5 + glow * 2.4;
        // brand ramp: deep blue -> cyan -> teal across the field
        const k = Math.min(1, Math.max(0, nx * 0.7 + h * 0.3 + glow * 0.4));
        const R = Math.round(2 + 43 * k), G = Math.round(82 + 152 * k), B = Math.round(241 - 67 * k);
        ctx.fillStyle = `rgba(${R},${G},${B},${Math.min(a, 1)})`;
        ctx.beginPath(); ctx.arc(bx, by + lift, rad, 0, 6.283); ctx.fill();
      }
    }

    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, reach * 1.6);
    g.addColorStop(0, "rgba(3,209,246,.22)"); g.addColorStop(1, "rgba(3,209,246,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, V);
    ctx.globalCompositeOperation = "source-over";
  };

  const frame = () => {
    raf = 0;
    if (!visible || document.hidden) return;
    t += 0.016;
    // idle drift so the light moves even without a cursor
    if (!hero.matches(":hover")) { mx = 0.7 + Math.sin(t * 0.35) * 0.14; my = 0.42 + Math.cos(t * 0.28) * 0.18; }
    sx += (mx - sx) * 0.06; sy += (my - sy) * 0.06;
    draw();
    if (!calm) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  size(); frame();
  hero.classList.add("ready");
  addEventListener("resize", () => { size(); draw(); });
  hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / (r.height || 1); });
  document.addEventListener("visibilitychange", kick);
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }).observe(hero);
})();
