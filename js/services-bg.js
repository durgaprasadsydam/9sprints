// Services background: a quiet connected-nodes network (constellation) that stays behind the cards.
//  - nodes drift slowly and link to near neighbours with faint lines
//  - the cursor draws nearby nodes toward it and lights the links around it
//  - clicking sends a pulse outward that brightens the network
//  - scrolling through the scene nudges the whole field vertically (reads data-p from motion.js)
const pin = document.getElementById("svc3d");
const sec = document.getElementById("services");
const canvas = document.getElementById("svc-bg");
const ctx = canvas.getContext("2d");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const small = matchMedia("(max-width: 768px)").matches;

const N = small ? 38 : 72;
const LINK = small ? 120 : 150;
let W = 0, H = 0, dpr = 1;
const nodes = [];
let mx = -999, my = -999, tmx = -999, tmy = -999;
let pulseX = 0, pulseY = 0, pulseAt = -10;
let clock = 0, last = performance.now(), visible = true, raf = 0, sp = 0;

const seed = () => {
  nodes.length = 0;
  for (let i = 0; i < N; i++) {
    nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18, r: 1 + Math.random() * 1.4, c: Math.random() < 0.2 ? 1 : 0 });
  }
};
const resize = () => {
  dpr = Math.min(devicePixelRatio || 1, 2);
  W = canvas.clientWidth; H = canvas.clientHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  seed();
};

const draw = () => {
  ctx.clearRect(0, 0, W, H);
  const age = clock - pulseAt;
  const ringR = age * 460, ringOn = age < 2.2;
  const off = sp * 60;

  for (let i = 0; i < N; i++) {
    const a = nodes[i];
    const ay = a.y - off;
    for (let j = i + 1; j < N; j++) {
      const b = nodes[j];
      const dx = a.x - b.x, dy = ay - (b.y - off);
      const d = Math.hypot(dx, dy);
      if (d > LINK) continue;
      let al = (1 - d / LINK) * 0.2;
      const cm = Math.hypot((a.x + b.x) / 2 - mx, (ay + b.y - off) / 2 - my);
      if (cm < 190) al += (1 - cm / 190) * 0.5;
      if (ringOn) { const rd = Math.hypot((a.x + b.x) / 2 - pulseX, (ay + b.y - off) / 2 - pulseY); al += Math.exp(-Math.pow((rd - ringR) / 50, 2)) * 0.6 * (1 - age / 2.2); }
      ctx.strokeStyle = `rgba(70,170,255,${Math.min(0.85, al)})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(a.x, ay); ctx.lineTo(b.x, b.y - off); ctx.stroke();
    }
  }
  for (const n of nodes) {
    const y = n.y - off;
    const dm = Math.hypot(n.x - mx, y - my);
    const glow = dm < 160 ? 1 - dm / 160 : 0;
    ctx.fillStyle = n.c ? `rgba(69,234,174,${0.35 + glow * 0.6})` : `rgba(127,216,255,${0.3 + glow * 0.6})`;
    ctx.beginPath(); ctx.arc(n.x, y, n.r + glow * 1.6, 0, 6.283); ctx.fill();
  }
};

const step = (dt) => {
  mx += (tmx - mx) * 0.15; my += (tmy - my) * 0.15;
  for (const n of nodes) {
    n.x += n.vx; n.y += n.vy;
    const dx = mx - n.x, dy = my - (n.y - sp * 60), d = Math.hypot(dx, dy);
    if (d < 220 && d > 1) { n.x += (dx / d) * 0.35 * (1 - d / 220); n.y += (dy / d) * 0.35 * (1 - d / 220); }
    if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
    if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;
  }
};

const frame = (now) => {
  raf = 0;
  if (!visible || document.hidden) return;
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now; clock += dt;
  sp += (parseFloat(pin.dataset.p || "0") - sp) * 0.05;
  step(dt); draw();
  raf = requestAnimationFrame(frame);
};
const kick = () => { if (!raf && !reduce) { last = performance.now(); raf = requestAnimationFrame(frame); } };
const pos = (e) => { const b = canvas.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };

resize(); draw();
addEventListener("resize", () => { resize(); if (reduce) draw(); });
if (!reduce) {
  pin.addEventListener("pointermove", (e) => { [tmx, tmy] = pos(e); if (mx < -900) { mx = tmx; my = tmy; } });
  pin.addEventListener("pointerleave", () => { tmx = tmy = mx = my = -999; });
  pin.addEventListener("pointerdown", (e) => { [pulseX, pulseY] = pos(e); pulseAt = clock; });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }, { rootMargin: "100px" }).observe(sec);
  document.addEventListener("visibilitychange", kick);
  kick();
}
sec.classList.add("bg-ready");
