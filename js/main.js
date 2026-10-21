/* 9Sprints — core: Lenis, GSAP, preloader, header, mega menu, mobile menu, cursor, theme, buttons */
(function () {
  "use strict";
  var d = document;
  var root = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  var reduced = root.classList.contains("reduced");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var isTouch = !finePointer;

  gsap.registerPlugin(ScrollTrigger, SplitText);

  var NS = (window.NS = { reduced: reduced, isTouch: isTouch, finePointer: finePointer, lenis: null, ready: false });

  /* ---------- Lenis smooth scroll (synced with gsap.ticker) ---------- */
  if (!reduced && typeof Lenis !== "undefined") {
    NS.lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    NS.lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { NS.lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  NS.scrollTo = function (target, opts) {
    var o = opts || {};
    if (NS.lenis) NS.lenis.scrollTo(target, { offset: o.offset || 0, duration: 1.4, immediate: false });
    else {
      var el = typeof target === "string" ? $(target) : target;
      var y = typeof target === "number" ? target : el ? el.getBoundingClientRect().top + window.scrollY + (o.offset || 0) : 0;
      window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
    }
  };
  NS.stopScroll = function () { NS.lenis ? NS.lenis.stop() : (root.style.overflow = "hidden"); };
  NS.startScroll = function () { NS.lenis ? NS.lenis.start() : (root.style.overflow = ""); };

  d.addEventListener("click", function (e) {
    var a = e.target.closest("a[href^='#']");
    var b = e.target.closest("[data-scroll-to]");
    var sel = b ? b.getAttribute("data-scroll-to") : a && a.getAttribute("href");
    if (!sel || sel === "#") return;
    var t = $(sel);
    if (!t) return;
    e.preventDefault();
    NS.scrollTo(t, { offset: -20 });
    if (a && history.replaceState) history.replaceState(null, "", sel);
  });

  /* ---------- Theme toggle ---------- */
  var themeBtn = $("#theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("9s-theme", next); } catch (e) {}
      d.dispatchEvent(new Event("ns:theme"));
    });
  }

  /* ---------- Header: blur after 50px, hide on scroll down ---------- */
  var hdr = $("#hdr");
  var megaOpen = false;
  var menuOpen = false;
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY || root.scrollTop;
    hdr.classList.toggle("is-scrolled", y > 50 || megaOpen || menuOpen);
    if (!megaOpen && !menuOpen) {
      if (y > 240 && y > lastY + 4) hdr.classList.add("is-hidden");
      else if (y < lastY - 4 || y < 240) hdr.classList.remove("is-hidden");
    }
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll progress ---------- */
  var prog = $("#progress i");
  if (prog) {
    var setProg = function () {
      var h = root.scrollHeight - window.innerHeight;
      prog.style.transform = "scaleX(" + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ")";
    };
    window.addEventListener("scroll", setProg, { passive: true });
    setProg();
  }

  /* ---------- Mega menu ---------- */
  var mega = $("#mega");
  var svcBtn = $("#svc-btn");
  var closeTimer;
  function openMega() {
    clearTimeout(closeTimer);
    if (megaOpen || !mega) return;
    megaOpen = true;
    svcBtn.setAttribute("aria-expanded", "true");
    hdr.classList.add("is-scrolled");
    hdr.classList.remove("is-hidden");
    var items = $$("[data-mega-item]", mega);
    gsap.killTweensOf([mega].concat(items));
    gsap.set(mega, { visibility: "visible" });
    if (reduced) { gsap.set(mega, { clipPath: "inset(0 0 0% 0)" }); return; }
    gsap.to(mega, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.out" });
    gsap.fromTo(items, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "expo.out", delay: 0.1 });
  }
  function closeMega(immediate) {
    if (!megaOpen || !mega) return;
    megaOpen = false;
    svcBtn.setAttribute("aria-expanded", "false");
    onScroll();
    gsap.killTweensOf(mega);
    gsap.to(mega, {
      clipPath: "inset(0 0 100% 0)",
      duration: reduced || immediate ? 0 : 0.5,
      ease: "power3.out",
      onComplete: function () { gsap.set(mega, { visibility: "hidden" }); },
    });
  }
  if (mega && svcBtn) {
    svcBtn.addEventListener("click", function () { megaOpen ? closeMega() : openMega(); });
    if (finePointer) {
      svcBtn.addEventListener("mouseenter", openMega);
      hdr.addEventListener("mouseleave", function () { closeTimer = setTimeout(closeMega, 180); });
      mega.addEventListener("mouseenter", function () { clearTimeout(closeTimer); });
    }
    hdr.addEventListener("focusout", function (e) {
      if (megaOpen && !hdr.contains(e.relatedTarget)) closeMega();
    });
    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && megaOpen) { closeMega(); svcBtn.focus(); }
    });
    d.addEventListener("click", function (e) { if (megaOpen && !hdr.contains(e.target)) closeMega(); });
  }

  /* ---------- Mobile menu ---------- */
  var burger = $("#burger");
  var mm = $("#mm");
  var mmSub = $("#mm-sub");
  var mmSvc = $("#mm-svc");
  function openMenu() {
    if (menuOpen) return;
    menuOpen = true;
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");
    mm.setAttribute("aria-hidden", "false");
    hdr.classList.add("is-scrolled");
    hdr.classList.remove("is-hidden");
    NS.stopScroll();
    gsap.set(mm, { visibility: "visible" });
    var items = $$("[data-mm-item]", mm);
    if (reduced) { gsap.set(mm, { clipPath: "inset(0 0 0% 0)" }); return; }
    gsap.to(mm, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "expo.out" });
    gsap.fromTo(items, { yPercent: 100 }, { yPercent: 0, duration: 1, stagger: 0.06, ease: "expo.out", delay: 0.2 });
  }
  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    mm.setAttribute("aria-hidden", "true");
    NS.startScroll();
    onScroll();
    gsap.to(mm, {
      clipPath: "inset(0 0 100% 0)",
      duration: reduced ? 0 : 0.7,
      ease: "expo.inOut",
      onComplete: function () { gsap.set(mm, { visibility: "hidden" }); },
    });
  }
  if (burger && mm) {
    burger.addEventListener("click", function () { menuOpen ? closeMenu() : openMenu(); });
    $$("a", mm).forEach(function (a) { a.addEventListener("click", closeMenu); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 1024) closeMenu(); });
    if (mmSvc && mmSub) {
      mmSvc.addEventListener("click", function () {
        var open = mmSvc.getAttribute("aria-expanded") === "true";
        mmSvc.setAttribute("aria-expanded", String(!open));
        gsap.to(mmSub, { height: open ? 0 : "auto", duration: reduced ? 0 : 0.7, ease: "power3.out" });
      });
    }
  }

  /* ---------- Custom cursor (pointer devices only) ---------- */
  if (finePointer && !reduced) {
    root.classList.add("has-cursor");
    var dot = $("#cursor-dot");
    var ring = $("#cursor-ring");
    gsap.set([dot, ring], { xPercent: 0, opacity: 0 });
    var dx = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    var dy = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    var rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    var ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    var shown = false;
    window.addEventListener("mousemove", function (e) {
      if (!shown) { shown = true; gsap.to([dot, ring], { opacity: 1, duration: 0.3 }); }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    });
    d.addEventListener("mouseleave", function () { gsap.to([dot, ring], { opacity: 0, duration: 0.3 }); shown = false; });
    d.addEventListener("mouseover", function (e) {
      var c = e.target.closest("[data-cursor]");
      var label = c ? c.getAttribute("data-cursor") : "";
      if (label) {
        ring.textContent = label;
        ring.classList.add("is-label");
        gsap.to(ring, { scale: 2, duration: 0.5, ease: "expo.out" });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      } else {
        ring.textContent = "";
        ring.classList.remove("is-label");
        gsap.to(dot, { scale: 1, duration: 0.3 });
        gsap.to(ring, { scale: e.target.closest("a,button,input,[role='button']") ? 1.6 : 1, duration: 0.5, ease: "expo.out" });
      }
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduced) {
    $$("[data-magnetic]").forEach(function (el) {
      var mx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      var my = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      var clamp = gsap.utils.clamp(-12, 12);
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        mx(clamp((e.clientX - (r.left + r.width / 2)) * 0.3));
        my(clamp((e.clientY - (r.top + r.height / 2)) * 0.3));
      });
      el.addEventListener("mouseleave", function () {
        gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.35)", overwrite: true });
      });
    });
  }

  /* ---------- Back to top + newsletter ---------- */
  var top = $("#to-top");
  if (top) top.addEventListener("click", function () { NS.scrollTo(0); });

  var nl = $("#newsletter");
  if (nl) {
    var msg = $("#nl-msg");
    nl.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = $("#nl-email");
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
      input.setAttribute("aria-invalid", String(!ok));
      msg.style.color = ok ? "var(--success)" : "var(--error)";
      msg.textContent = ok
        ? "Thanks — you're on the list. (Demo only: no backend connected.)"
        : "Please enter a valid email address.";
      if (ok) nl.reset();
    });
  }

  /* ---------- Preloader (homepage, first visit per session) ---------- */
  function ready() {
    NS.ready = true;
    d.dispatchEvent(new Event("ns:ready"));
  }
  var pl = $("#preloader");
  if (pl && root.classList.contains("preloading")) {
    NS.stopScroll();
    var num = $("#pl-num");
    var words = $$(".pl-word > span", pl);
    var arcs = $$(".r-arc", pl);
    var heads = $$(".r-head", pl);
    var ringEl = $(".pl-ring", pl);
    var o = { v: 0 };
    gsap.set(words, { yPercent: 110 });
    gsap.set(arcs, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(heads, { opacity: 0 });
    var finish = function () {
      root.classList.remove("preloading");
      NS.startScroll();
      try { sessionStorage.setItem("9s-pl", "1"); } catch (e) {}
    };
    var tl = gsap.timeline({ onComplete: finish });
    tl.to(o, { v: 100, duration: 2.6, ease: "power2.inOut", onUpdate: function () { num.textContent = Math.round(o.v); } }, 0)
      .to(words, { yPercent: 0, duration: 0.9, stagger: 0.28, ease: "expo.out" }, 0.2);
    // the logo ring draws one arrow at a time, deep blue -> green
    arcs.forEach(function (a, i) {
      tl.to(a, { strokeDashoffset: 0, duration: 0.42, ease: "power2.out" }, 0.2 + i * 0.36)
        .to(heads[i], { opacity: 1, duration: 0.2 }, 0.5 + i * 0.36);
    });
    tl.to(ringEl, { rotation: 360, duration: 1.1, ease: "expo.inOut", transformOrigin: "50% 50%" }, "+=0.1")
      .to(pl, { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "expo.inOut" }, "-=0.2")
      .add(ready, "-=0.55");
    setTimeout(function () { if (root.classList.contains("preloading")) { finish(); ready(); } }, 10000);
  } else {
    root.classList.remove("preloading");
    ready();
  }
})();
