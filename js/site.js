(() => {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  };
  burger.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });

  const items = document.querySelectorAll(".rv");
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12 }) : null;
  items.forEach((i) => (io ? io.observe(i) : i.classList.add("in")));

  document.querySelectorAll(".spot").forEach((el) => el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", e.clientX - r.left + "px");
    el.style.setProperty("--y", e.clientY - r.top + "px");
  }));

  // about: scroll-lit statement
  const st = document.getElementById("about-statement");
  if (st) {
    const key = new Set(["integrated", "technology", "software", "AI", "talent"]);
    const words = st.textContent.trim().split(/\s+/);
    st.setAttribute("aria-label", st.textContent.trim());
    st.innerHTML = words.map((w) => `<span class="w${key.has(w.replace(/[^\w]/g, "")) ? " hl" : ""}" aria-hidden="true">${w}</span>`).join(" ");
    const ws = [...st.children];
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const upd = () => {
      const r = st.getBoundingClientRect(), vh = innerHeight;
      const p = calm ? 1 : Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.5)));
      const n = Math.round(p * ws.length);
      ws.forEach((w, i) => w.classList.toggle("on", i < n));
    };
    upd();
    addEventListener("scroll", upd, { passive: true });
    addEventListener("resize", upd);
  }

  // about: bottleneck -> answer explorer (tabs, sliding highlight, auto-advance)
  const fx = document.getElementById("fx");
  if (fx) {
    const data = [
      ["One coordinated delivery engine", "Software, governance, AI, and talent run as a single operation \u2014 so nothing falls between teams.", ["Single accountable partner", "End to end, or targeted squad extension", "Software, PMO, AI and talent aligned"]],
      ["Governed agility", "Clear milestones, active risk tracking, and executive transparency restore control over complex projects.", ["Clear milestones", "Active risk management", "Executive transparency"]],
      ["Vetted talent on demand", "Senior engineers, PMs, and AI specialists deployed fast, matched to your stack and culture.", ["Vetted by active tech leads", "Matched to your stack and culture", "Engineers, PMs and AI specialists"]],
    ];
    const tabs = [...fx.querySelectorAll(".fx-row")];
    const hl = fx.querySelector(".fx-hl"), panel = document.getElementById("fx-p");
    const h = document.getElementById("fx-h"), d = document.getElementById("fx-d"), ul = document.getElementById("fx-ul");
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cur = 0, timer = null;
    const place = () => { const t = tabs[cur]; hl.style.setProperty("--y", t.offsetTop + "px"); hl.style.setProperty("--h", t.offsetHeight + "px"); };
    const select = (i, focus) => {
      if (i === cur && hl.style.getPropertyValue("--h")) return place();
      cur = i;
      tabs.forEach((t, k) => { const on = k === i; t.classList.toggle("is-on", on); t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; });
      if (focus) tabs[i].focus();
      panel.setAttribute("aria-labelledby", "fx-t" + i);
      place();
      panel.classList.add("swap");
      setTimeout(() => {
        h.textContent = data[i][0]; d.textContent = data[i][1];
        ul.innerHTML = data[i][2].map((x) => "<li>" + x + "</li>").join("");
        panel.classList.remove("swap");
      }, 230);
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(i));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); select((cur + 1) % tabs.length, true); }
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); select((cur - 1 + tabs.length) % tabs.length, true); }
      });
      t.querySelector(".fx-bar").addEventListener("animationend", () => select((cur + 1) % tabs.length));
    });
    fx.addEventListener("mouseenter", () => fx.classList.add("paused"));
    fx.addEventListener("mouseleave", () => fx.classList.remove("paused"));
    fx.addEventListener("focusin", () => fx.classList.add("paused"));
    fx.addEventListener("focusout", () => fx.classList.remove("paused"));
    addEventListener("resize", place);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
    place();
  }

  // why: horizontal slider (arrows, drag, progress) + 3D dotted globe
  const track = document.getElementById("why-track");
  if (track) {
    const prev = document.getElementById("why-prev"), next = document.getElementById("why-next");
    const bars = [...document.querySelectorAll("#why-prog i")];
    const cards = [...track.children];
    const step = () => cards[0].getBoundingClientRect().width + 16;
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      const idx = max <= 0 ? 0 : Math.round((track.scrollLeft / max) * (bars.length - 1));
      bars.forEach((b, i) => b.classList.toggle("on", i === idx));
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft > max - 4;
    };
    prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    track.addEventListener("scroll", sync, { passive: true });
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
    });
    let down = false, sx = 0, sl = 0, moved = 0;
    track.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; moved = 0; sx = e.clientX; sl = track.scrollLeft; });
    addEventListener("pointermove", (e) => {
      if (!down) return;
      moved = e.clientX - sx;
      if (Math.abs(moved) > 4) track.classList.add("drag");
      track.scrollLeft = sl - moved;
    });
    addEventListener("pointerup", () => {
      if (!down) return;
      down = false;
      if (track.classList.contains("drag")) {
        track.classList.remove("drag");
        const i = Math.round(track.scrollLeft / step());
        track.scrollTo({ left: i * step(), behavior: "smooth" });
      }
    });
    addEventListener("resize", sync);
    sync();

    // 3D dotted globe behind the panel (canvas 2D, projected fibonacci sphere)
    const cv = document.getElementById("why-orb");
    const ctx = cv.getContext("2d");
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = matchMedia("(max-width: 768px)").matches ? 520 : 1100;
    const pts = [];
    const g = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = g * i;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r, Math.random()]);
    }
    let W = 0, H = 0, ang = 0.6, tilt = 0.35, tx = 0, ty = 0, on = true, raf = 0, last = performance.now();
    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * d; cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const R = Math.min(W, H) * 0.42, cx = W / 2, cy = H / 2;
      const ca = Math.cos(ang), sa = Math.sin(ang), ct = Math.cos(tilt + ty), st = Math.sin(tilt + ty);
      for (const p of pts) {
        let x = p[0] * ca + p[2] * sa, z = -p[0] * sa + p[2] * ca, y = p[1];
        const y2 = y * ct - z * st, z2 = y * st + z * ct;
        const k = 1 / (1 + (1 - z2) * 0.18);
        const a = 0.14 + 0.62 * ((z2 + 1) / 2);
        const s = (0.9 + 1.7 * ((z2 + 1) / 2)) * (W > 500 ? 1 : 0.8);
        ctx.fillStyle = p[3] > 0.82 ? `rgba(3,160,230,${a})` : `rgba(2,82,241,${a * 0.85})`;
        ctx.beginPath();
        ctx.arc(cx + (x + tx) * R * k, cy + y2 * R * k, s, 0, 6.2832);
        ctx.fill();
      }
    };
    const loop = (now) => {
      raf = 0;
      if (!on || document.hidden) return;
      ang += Math.min(0.05, (now - last) / 1000) * 0.16;
      last = now;
      draw();
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf && !calm) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    size(); draw();
    addEventListener("resize", () => { size(); draw(); });
    const panel = cv.parentElement;
    if (!calm) {
      panel.addEventListener("pointermove", (e) => {
        const r = panel.getBoundingClientRect();
        tx += (((e.clientX - r.left) / r.width - 0.5) * 0.12 - tx) * 0.1;
        ty += (((e.clientY - r.top) / r.height - 0.5) * 0.3 - ty) * 0.1;
      });
      new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) kick(); }).observe(panel);
      document.addEventListener("visibilitychange", kick);
      kick();
    }
  }

  // pillars: cursor glow inside the hovered block, tap-to-open on touch screens
  const pfs = [...document.querySelectorAll(".pf-col")];
  pfs.forEach((col) => {
    const card = col.querySelector(".pf-card");
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", e.clientX - r.left + "px");
      card.style.setProperty("--y", e.clientY - r.top + "px");
    });
    col.addEventListener("click", () => {
      if (!matchMedia("(hover: none)").matches) return;
      const open = col.classList.contains("is-on");
      pfs.forEach((x) => x.classList.remove("is-on"));
      if (!open) col.classList.add("is-on");
    });
  });

  // header state, CTA card visibility, lazy 3D hero
  const top = document.getElementById("top-bar");
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    top.classList.toggle("scrolled", y > 40);
    const menuOpen = document.getElementById("nav") && document.getElementById("nav").classList.contains("open");
    if (y > 120 && y > lastY + 4 && !menuOpen) top.classList.add("nav-hide");
    else if (y < lastY - 4 || y <= 120) top.classList.remove("nav-hide");
    lastY = y;
  };
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });

  const hero = document.getElementById("hero");
  const card = document.getElementById("cta-card");
  if (hero && card && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => card.classList.toggle("hide", !e.isIntersecting), { threshold: 0.15 }).observe(hero);
  }

})();
