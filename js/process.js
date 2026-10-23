// Our process: staircase cards joined by SVG connectors that draw on scroll.
//  - each connector draws as you scroll; its card eases in just after
//  - a small dot keeps travelling along every finished line
//  - hovering a card tilts it toward the cursor and speeds up the line leaving it
// Without GSAP (or with reduced motion) the cards and fully drawn lines are shown as-is.
(() => {
  const flow = document.getElementById("pr-flow");
  const svg = document.getElementById("pr-lines");
  if (!flow || !svg) return;
  const cards = [...flow.querySelectorAll(".pr-card")];
  const N = cards.length;
  const NS = "http://www.w3.org/2000/svg";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";

  // one connector per gap between cards: masked dashed line + arrowhead + travelling dot
  const defs = svg.querySelector("defs");
  const links = [];
  for (let i = 0; i < N - 1; i++) {
    const mk = (tag, attrs = {}) => { const el = document.createElementNS(NS, tag); for (const k in attrs) el.setAttribute(k, attrs[k]); return el; };
    const mask = mk("mask", { id: "prm" + i, maskUnits: "userSpaceOnUse" });
    const reveal = mk("path", { stroke: "#fff", "stroke-width": 8, fill: "none", pathLength: 1 });
    reveal.style.strokeDasharray = "1";
    reveal.style.strokeDashoffset = "1";
    mask.appendChild(reveal);
    defs.appendChild(mask);
    const base = mk("path", { class: "pr-base" });
    const over = mk("path", { class: "pr-over", mask: `url(#prm${i})` });
    const arrow = mk("path", { class: "pr-arrow" });
    const dot = mk("circle", { class: "pr-dot", r: 3.2 });
    svg.append(base, over, arrow, dot);
    links.push({ base, over, reveal, arrow, dot, len: 0, p: 0, speed: 1, rate: 1 });
  }

  const R = 18; // corner radius of the elbow
  const build = () => {
    const fr = flow.getBoundingClientRect();
    const rect = (c) => { const r = c.getBoundingClientRect(); return { l: r.left - fr.left, r: r.right - fr.left, t: r.top - fr.top, b: r.bottom - fr.top, w: r.width, h: r.height }; };
    svg.setAttribute("viewBox", `0 0 ${fr.width} ${fr.height}`);
    links.forEach((L, i) => {
      const a = rect(cards[i]), b = rect(cards[i + 1]);
      const right = b.l + b.w / 2 > a.l + a.w / 2; // heading right or left?
      const sx = right ? a.r : a.l, sy = a.t + a.h * 0.5;
      const ex = b.l + b.w * 0.5, ey = b.t - 8;
      const dir = right ? 1 : -1;
      const d = `M${sx} ${sy} H${ex - dir * R} Q${ex} ${sy} ${ex} ${sy + R} V${ey}`;
      [L.base, L.over, L.reveal].forEach((p) => p.setAttribute("d", d));
      L.arrow.setAttribute("d", `M${ex - 5.5} ${ey - 7} L${ex} ${ey} L${ex + 5.5} ${ey - 7}`);
      L.len = L.over.getTotalLength();
    });
    if (!hasGsap || reduce) links.forEach((L) => { L.reveal.style.strokeDashoffset = "0"; L.arrow.style.opacity = 1; });
  };

  build();
  addEventListener("resize", build);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
  if (!hasGsap) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.addEventListener("refreshInit", build);

  if (reduce) return;

  // --- scroll-driven drawing ---
  const mm = gsap.matchMedia();
  mm.add("(min-width: 901px)", () => {
    gsap.set(cards, { opacity: 0, y: 46, scale: 0.97 });
    gsap.set(cards[0], { opacity: 1, y: 0, scale: 1 });
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    links.forEach((L, i) => {
      const at = i * 1.2;
      tl.to(L.reveal, { strokeDashoffset: 0, duration: 1, ease: "none" }, at);
      tl.to(L.arrow, { opacity: 1, duration: 0.15 }, at + 0.9);
      tl.to(L.dot, { opacity: 1, duration: 0.2 }, at + 0.95);
      tl.to(cards[i + 1], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, at + 0.75);
    });
    const st = ScrollTrigger.create({
      trigger: flow,
      start: "top 70%",
      end: "bottom 62%",
      scrub: 0.7,
      animation: tl,
      invalidateOnRefresh: true,
    });
    return () => { st.kill(); gsap.set(cards, { clearProps: "all" }); links.forEach((L) => { L.reveal.style.strokeDashoffset = "0"; L.arrow.style.opacity = 1; L.dot.style.opacity = 0; }); };
  });

  // --- travelling dots (always flowing once a line is drawn) ---
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: "80px" }).observe(flow);
  gsap.ticker.add((time, dt) => {
    if (!visible) return;
    links.forEach((L) => {
      if (!L.len || +getComputedStyle(L.dot).opacity < 0.05) return;
      L.rate += (L.speed - L.rate) * 0.08;
      L.p = (L.p + (dt / 1000) * 0.34 * L.rate) % 1;
      const pt = L.over.getPointAtLength(L.p * L.len);
      L.dot.setAttribute("cx", pt.x);
      L.dot.setAttribute("cy", pt.y);
    });
  });

  // --- hover: tilt toward the cursor, speed up + thicken the outgoing line ---
  cards.forEach((c, i) => {
    const rx = gsap.quickTo(c, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(c, "rotationY", { duration: 0.6, ease: "power3.out" });
    c.style.transformPerspective = 900;
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 8);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
    });
    const set = (on) => {
      [links[i], links[i - 1]].forEach((L) => {
        if (!L) return;
        L.speed = on ? 3.2 : 1;
        gsap.to(L.over, { strokeWidth: on ? 2.8 : 1.8, duration: 0.3 });
        gsap.to(L.dot, { attr: { r: on ? 4.6 : 3.2 }, duration: 0.3 });
      });
    };
    c.addEventListener("pointerenter", () => set(true));
    c.addEventListener("pointerleave", () => { set(false); rx(0); ry(0); });
  });

  addEventListener("load", () => { build(); ScrollTrigger.refresh(); });
})();
