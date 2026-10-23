/* 9Sprints — data-attribute animation system + page sections. Requires main.js (window.NS). */
(function () {
  "use strict";
  var d = document;
  var NS = window.NS;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var reduced = NS.reduced;
  var finePointer = NS.finePointer;
  var EXPO = "expo.out";
  var P3 = "power3.out";
  var fmt = function (v, dec) {
    return v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  };

  /* ---------- Accordion (kept outside motion-gated code: works in reduced mode too) ---------- */
  function initFaq() {
    $$("[data-faq]").forEach(function (wrap) {
      var qs = $$(".faq-q", wrap);
      function toggle(q, open) {
        var panel = d.getElementById(q.getAttribute("aria-controls"));
        q.setAttribute("aria-expanded", String(open));
        gsap.to(panel, {
          height: open ? "auto" : 0,
          duration: reduced ? 0 : 0.8,
          ease: P3,
          onComplete: function () { ScrollTrigger.refresh(); },
        });
      }
      qs.forEach(function (q, i) {
        q.addEventListener("click", function () {
          var open = q.getAttribute("aria-expanded") !== "true";
          qs.forEach(function (o) { if (o !== q && o.getAttribute("aria-expanded") === "true") toggle(o, false); });
          toggle(q, open);
        });
        q.addEventListener("keydown", function (e) {
          var n = e.key === "ArrowDown" ? i + 1 : e.key === "ArrowUp" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? qs.length - 1 : null;
          if (n === null) return;
          e.preventDefault();
          qs[(n + qs.length) % qs.length].focus();
        });
      });
    });
  }

  /* ---------- Chat typing helper ---------- */
  function initChat() {
    $$("[data-chat]").forEach(function (chat) {
      var msgs = $$(".chat-msg", chat);
      var flow = $(".chat-flow", chat);
      if (reduced) {
        msgs.forEach(function (m) { m.textContent = m.dataset.text; });
        return;
      }
      msgs.forEach(function (m) {
        m.textContent = m.dataset.text;
        m.style.minHeight = m.offsetHeight + "px";
        m.textContent = "";
        m.style.opacity = 0;
      });
      gsap.set(flow, { opacity: 0, y: 10 });
      var tl = gsap.timeline({ scrollTrigger: { trigger: chat, start: "top 75%", once: true } });
      msgs.forEach(function (m) {
        var text = m.dataset.text;
        var o = { n: 0 };
        tl.set(m, { opacity: 1 })
          .add(function () { m.classList.add("caret"); })
          .to(o, {
            n: text.length,
            duration: Math.max(1, text.length * 0.025),
            ease: "none",
            onUpdate: function () { m.textContent = text.slice(0, Math.round(o.n)); },
          })
          .add(function () { m.classList.remove("caret"); })
          .to({}, { duration: 0.35 });
      });
      tl.to(flow, { opacity: 1, y: 0, duration: 0.9, ease: EXPO });
    });
  }

  /* ---------- Testimonial slider ---------- */
  function initSwiper() {
    var el = $("#t-swiper");
    if (!el || typeof Swiper === "undefined") return;
    var sw = new Swiper(el, {
      slidesPerView: 1.08,
      spaceBetween: 20,
      speed: 900,
      grabCursor: true,
      rewind: true,
      keyboard: { enabled: true },
      a11y: { enabled: true },
      breakpoints: { 700: { slidesPerView: 1.5 }, 1200: { slidesPerView: 2.05 } },
    });
    var p = $("#t-prev"), n = $("#t-next");
    if (p) p.addEventListener("click", function () { sw.slidePrev(); });
    if (n) n.addEventListener("click", function () { sw.slideNext(); });
  }

  /* ---------- AI network canvas ---------- */
  function initCanvas() {
    var c = $("#ai-canvas");
    if (!c) return;
    var ctx = c.getContext("2d");
    var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var mouse = { x: -999, y: -999, ox: 0.5, oy: 0.5 };
    var nodes = [];
    var colors = {};
    var visible = true;
    function readColors() {
      var cs = getComputedStyle(d.documentElement);
      colors.accent = cs.getPropertyValue("--accent").trim() || "#03D1F6";
      colors.fg = cs.getPropertyValue("--text").trim() || "#FFFFFF";
      colors.bg = cs.getPropertyValue("--surface").trim() || "#011A39";
    }
    function resize() {
      var r = c.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(Math.min(70, Math.max(28, (w * h) / 6500)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: 1.5 + Math.random() * 2 });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, w, h);
      // orb that follows the pointer
      var gx = w * (0.35 + mouse.ox * 0.3), gy = h * (0.35 + mouse.oy * 0.3);
      var g = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.55);
      g.addColorStop(0, colors.accent + "55");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      var i, j, a, b, dd;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        if (!reduced) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
          var mx = a.x - mouse.x, my = a.y - mouse.y, md = Math.sqrt(mx * mx + my * my);
          if (md < 110 && md > 0) { a.x += (mx / md) * 1.2; a.y += (my / md) * 1.2; }
        }
      }
      ctx.lineWidth = 1;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j];
          dd = Math.hypot(a.x - b.x, a.y - b.y);
          if (dd < 120) {
            ctx.globalAlpha = (1 - dd / 120) * 0.5;
            ctx.strokeStyle = colors.fg;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        var near = Math.hypot(a.x - mouse.x, a.y - mouse.y) < 140;
        ctx.globalAlpha = 1;
        ctx.fillStyle = near ? colors.accent : colors.fg;
        ctx.beginPath(); ctx.arc(a.x, a.y, near ? a.r + 1.5 : a.r, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    readColors(); resize(); draw();
    d.addEventListener("ns:theme", function () { readColors(); draw(); });
    if (reduced) return;
    window.addEventListener("resize", function () { resize(); });
    c.addEventListener("mousemove", function (e) {
      var r = c.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      mouse.ox = mouse.x / r.width; mouse.oy = mouse.y / r.height;
    });
    c.addEventListener("mouseleave", function () { mouse.x = mouse.y = -999; });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(c);
    }
    gsap.ticker.add(function () { if (visible) draw(); });
  }

  /* ---------- Marquees: scroll-velocity reactive, reverse on scroll up ---------- */
  var scrollBoost = 0;
  var scrollDir = 1;
  function initMarquees() {
    var els = $$("[data-marquee]");
    if (!els.length) return;
    if (reduced) {
      els.forEach(function (el) { el.style.overflowX = "auto"; });
      return;
    }
    ScrollTrigger.create({
      onUpdate: function (self) {
        scrollDir = self.direction;
        scrollBoost = Math.min(Math.abs(self.getVelocity()) / 350, 6);
      },
    });
    els.forEach(function (el) {
      var track = $(".marquee-track", el);
      var group = $(".marquee-group", track);
      var base = (+el.dataset.speed || 1) * 90; // px / s
      var d0 = +el.dataset.direction || 1;
      var pausable = el.hasAttribute("data-pause");
      var w = 0, pos = 0, cur = d0, hovered = false, onscreen = true;
      var set = gsap.quickSetter(track, "x", "px");
      function build() {
        $$("[data-clone]", track).forEach(function (n) { n.remove(); });
        w = group.getBoundingClientRect().width;
        if (!w) return;
        var n = Math.ceil(el.clientWidth / w) + 1;
        for (var i = 0; i < n; i++) {
          var c = group.cloneNode(true);
          c.setAttribute("aria-hidden", "true");
          c.setAttribute("data-clone", "");
          $$("a,button", c).forEach(function (x) { x.tabIndex = -1; });
          track.appendChild(c);
        }
      }
      build();
      var lastW = window.innerWidth, t;
      window.addEventListener("resize", function () {
        clearTimeout(t);
        t = setTimeout(function () { if (window.innerWidth !== lastW) { lastW = window.innerWidth; build(); } }, 200);
      });
      if (pausable) {
        el.addEventListener("mouseenter", function () { hovered = true; });
        el.addEventListener("mouseleave", function () { hovered = false; });
      }
      if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { onscreen = e[0].isIntersecting; }).observe(el);
      gsap.ticker.add(function (time, dt) {
        scrollBoost *= 0.93;
        if (!onscreen || !w) return;
        var target = d0 * (1 + scrollBoost); // always flows right-to-left (reading direction); scroll only adds speed
        if (hovered) target = 0;
        cur += (target - cur) * 0.08;
        pos += cur * base * (dt / 1000);
        set(-(((pos % w) + w) % w));
      });
    });
  }

  /* ---------- Hero (homepage) — hero-wave.js owns the pin ("hero-pin") ---------- */
  function initHero() {
    var hero = $("#hero");
    if (!hero) return;
    var q = function (s) { return hero.querySelectorAll(s); };
    var split = new SplitText(q(".hero-title .line"), { type: "lines", linesClass: "hl" });
    if (reduced) return;

    gsap.set(q('[data-hero-anim="eyebrow"]'), { y: 20, autoAlpha: 0 });
    gsap.set(split.lines, { yPercent: 110 });
    gsap.set(q('[data-hero-anim="text"]'), { y: 30, autoAlpha: 0 });
    gsap.set(q('[data-hero-anim="btns"] > *'), { scale: 0.9, autoAlpha: 0 });
    gsap.set(q(".scroll-hint"), { autoAlpha: 0 });

    var intro = function () {
      return gsap.timeline()
        .to(q('[data-hero-anim="eyebrow"]'), { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" }, 0)
        .to(split.lines, { yPercent: 0, duration: 1.1, stagger: 0.12, ease: "expo.out" }, 0.1)
        .to(q('[data-hero-anim="text"]'), { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0.5)
        .to(q('[data-hero-anim="btns"] > *'), { scale: 1, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.6)" }, 0.7)
        .to(q(".scroll-hint"), { autoAlpha: 1, duration: 0.5, stagger: 0.05 }, 0.9);
    };
    if (NS.preloaderDone) intro();
    else window.addEventListener("preloader:done", intro, { once: true });

    // scroll-out, same range as the pin (no pin here)
    gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "+=120%", scrub: 0.6 } })
      .to({}, { duration: 0.55 })
      .to(".hero-content, .scroll-hint", { y: -80, autoAlpha: 0, duration: 0.35, ease: "none" })
      .to(".hero-shade", { opacity: 1, backgroundColor: "rgba(1,14,34,.6)", duration: 0.35, ease: "none" }, "<")
      .to({}, { duration: 0.1 });
  }

  /* ---------- Stacking service cards ---------- */
  function initStack() {
    var stack = $("[data-stack]");
    if (!stack || reduced || !finePointer) return;
    var cards = $$("[data-stack-card]", stack);
    cards.forEach(function (card, i) {
      var inner = $(".stack-inner", card);
      var dim = $(".stack-dim", card);
      var im = $(".stack-img img", card);
      if (i < cards.length - 1) {
        var stopTop = 88 + (i + 1) * 18;
        var st = { trigger: cards[i + 1], start: "top 92%", end: "top " + stopTop + "px", scrub: true };
        gsap.to(inner, { scale: 0.92, ease: "none", scrollTrigger: st });
        gsap.to(dim, { opacity: 0.5, ease: "none", scrollTrigger: st });
        gsap.to(im, { scale: 1.18, ease: "none", scrollTrigger: st });
      }
    });
  }

  /* ---------- Horizontal pinned process / vertical timeline ---------- */
  function initHScroll() {
    var blocks = $$("[data-hscroll]");
    if (!blocks.length) return;
    if (reduced) {
      blocks.forEach(function (b) { $(".hs-line", b).style.transform = "scaleY(1)"; });
      return;
    }
    var mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (hover: hover)", function () {
      blocks.forEach(function (b) {
        var pin = $(".hs-pin", b), track = $(".hs-track", b), bar = $(".hs-bar i", b);
        var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
        gsap.to(track, {
          x: function () { return -dist(); },
          ease: "none",
          scrollTrigger: {
            trigger: b,
            start: "top top",
            end: function () { return "+=" + dist(); },
            pin: pin,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: function (self) { gsap.set(bar, { scaleX: self.progress }); },
          },
        });
      });
    });
    mm.add("(max-width: 1023px), (hover: none)", function () {
      blocks.forEach(function (b) {
        var track = $(".hs-track", b);
        gsap.to($(".hs-line", b), { scaleY: 1, ease: "none", scrollTrigger: { trigger: track, start: "top 70%", end: "bottom 70%", scrub: true } });
        $$(".hs-step", b).forEach(function (s) {
          gsap.from(s, { opacity: 0, y: 40, duration: 1, ease: P3, scrollTrigger: { trigger: s, start: "top 88%", once: true } });
        });
      });
    });
  }

  /* ---------- Generic data-attribute system ---------- */
  function initGeneric() {
    var once = function (el, start) { return { trigger: el, start: start || "top 88%", once: true }; };

    // data-split — lines rise
    $$("[data-split]").forEach(function (el) {
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: function (self) {
          return gsap.from(self.lines, { yPercent: 100, duration: 1.1, stagger: 0.08, ease: EXPO, scrollTrigger: once(el, "top 85%") });
        },
      });
    });

    // data-scrub-words
    $$("[data-scrub-words]").forEach(function (el) {
      var split = SplitText.create(el, { type: "words" });
      gsap.fromTo(split.words, { opacity: 0.15 }, {
        opacity: 1, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 55%", scrub: true },
      });
    });

    // data-reveal / data-reveal-stagger
    $$("[data-reveal]").forEach(function (el) {
      gsap.from(el, { opacity: 0, y: 50, duration: 1, ease: P3, scrollTrigger: once(el) });
    });
    $$("[data-reveal-stagger]").forEach(function (el) {
      gsap.from(el.children, { opacity: 0, y: 50, duration: 1, stagger: 0.1, ease: P3, scrollTrigger: once(el, "top 85%") });
    });

    // data-img-reveal
    $$("[data-img-reveal]").forEach(function (el) {
      var im = $("img, canvas", el);
      var tl = gsap.timeline({ scrollTrigger: once(el, "top 88%") });
      tl.fromTo(el, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: EXPO });
      if (im) tl.fromTo(im, { scale: 1.25 }, { scale: 1, duration: 1.4, ease: EXPO }, 0);
    });

    // data-about-reveal: frame grows 0.8 -> 1 and its corners tighten 48 -> 24px while the media drifts
    $$("[data-about-reveal]").forEach(function (frame) {
      var im = $(".about-img", frame);
      gsap.fromTo(frame, { scale: 0.8, borderRadius: 48 }, { scale: 1, borderRadius: 24, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "center center", scrub: true } });
      gsap.fromTo(im, { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // data-parallax
    $$("[data-parallax]").forEach(function (el) {
      var f = parseFloat(el.dataset.parallax) || 0.2;
      gsap.fromTo(el, { yPercent: -f * 50 }, { yPercent: f * 50, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // data-counter
    $$("[data-counter]").forEach(function (el) {
      var end = parseFloat(el.dataset.counter);
      var dec = parseInt(el.dataset.decimals || "0", 10);
      var pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
      var o = { v: 0 };
      el.textContent = pre + fmt(0, dec) + suf;
      gsap.to(o, {
        v: end, duration: 1.8, ease: "power3.out",
        scrollTrigger: once(el, "top 90%"),
        onUpdate: function () { el.textContent = pre + fmt(o.v, dec) + suf; },
      });
    });

    // data-line
    $$("[data-line]").forEach(function (el) {
      gsap.from(el, { scaleX: 0, duration: 1.2, ease: EXPO, scrollTrigger: once(el, "top 92%") });
    });

    // data-tilt (pointer devices)
    if (finePointer) {
      $$("[data-tilt]").forEach(function (el) {
        el.addEventListener("mousemove", function (e) {
          var r = el.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(el, { rotationY: x * 10, rotationX: -y * 10, transformPerspective: 900, duration: 0.6, ease: P3 });
        });
        el.addEventListener("mouseleave", function () {
          gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.9, ease: EXPO });
        });
      });
    }

    // final CTA panel
    $$("[data-cta]").forEach(function (el) {
      gsap.fromTo(el, { scale: 0.9 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: true } });
    });

    // footer wordmark — letters rise in on scroll
    var wm = $("#wordmark");
    if (wm) {
      var wst = { trigger: wm, start: "top 105%", end: "bottom 85%", scrub: true };
      gsap.from($("span", wm), { yPercent: 110, stagger: 0.06, ease: "none", scrollTrigger: wst });
      // the gradient fill is spread over the whole footer scroll, so it grows gradually and only completes at the very bottom
      gsap.fromTo($(".wm-fill", wm), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: "#footer", start: "top bottom", end: "bottom bottom", scrub: 0.5 } });
    }
  }

  // about video: play only while on screen, and never autoplay with reduced motion
  function initAboutVideo() {
    var v = $("[data-about-video]");
    if (!v) return;
    v.muted = true;
    if (reduced || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else v.pause();
    }, { threshold: 0.15 }).observe(v);
  }

  function boot() {
    initAboutVideo();
    initFaq();
    initSwiper();
    initChat();
    initCanvas();
    if (!reduced) {
      initGeneric();
      initMarquees();
      initStack();
      initHScroll();
    } else {
      initMarquees();
      initHScroll();
    }
    initHero();
    var refresh = function () { ScrollTrigger.refresh(); };
    window.addEventListener("load", refresh);
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(refresh);
  }

  // wait for fonts so SplitText measures real line breaks
  var go = function () { boot(); };
  if (d.fonts && d.fonts.ready) Promise.race([d.fonts.ready, new Promise(function (r) { setTimeout(r, 1500); })]).then(go);
  else go();
})();
