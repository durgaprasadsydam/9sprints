// Shared markup helpers for the static page generator.
export const SITE = {
  name: "9Sprints",
  url: "https://www.9sprints.com",
  email: "hello@9sprints.com", // [PLACEHOLDER]
  phone: "+91 00000 00000", // [PLACEHOLDER]
  office: "Hyderabad, India",
  tagline: "Ship Fast. Scale Smart. In Sprints.",
};

export const SERVICES = [
  {
    slug: "software-product-development",
    color: "#0252F1",
    n: "01",
    icon: "code",
    title: "Software & Product Development",
    short: "From idea to production-grade product.",
    blurb: "Web, mobile and cloud products engineered to scale.",
    desc: "We design, engineer and launch web, mobile and SaaS products — built on clean architecture and shipped in focused two-week sprints.",
    tags: ["Web apps", "Mobile", "SaaS", "APIs", "Cloud", "QA"],
    img: "home/software-development.webp",
  },
  {
    slug: "project-program-management",
    color: "#02ABFE",
    n: "02",
    icon: "kanban",
    title: "Project & Program Management",
    short: "Delivery you can see, sprint by sprint.",
    blurb: "Certified PMs who bring structure and visibility.",
    desc: "Certified project and program managers bring structure, governance and weekly visibility to complex technology initiatives.",
    tags: ["Agile/Scrum", "PMO", "Roadmaps", "Risk", "Reporting"],
    img: "home/project-program-management.webp",
  },
  {
    slug: "ai-solutions",
    color: "#03D1F6",
    n: "03",
    icon: "ai",
    title: "AI Solutions",
    short: "Applied AI that earns its place in your workflow.",
    blurb: "LLM apps, automation and ML that ship to production.",
    desc: "From quick-win automations to production LLM applications — AI that solves a real business problem and plugs into your existing systems.",
    tags: ["LLM apps", "Automation", "ML models", "Data pipelines", "Copilots"],
    img: "home/ai-solutions.webp",
  },
  {
    slug: "it-staffing-recruitment",
    color: "#34DC6D",
    n: "04",
    icon: "users",
    title: "IT Staffing & Recruitment",
    short: "The right engineers, right when you need them.",
    blurb: "Vetted engineers on contract, hire or dedicated teams.",
    desc: "Vetted developers, engineers and project leaders ready to join your team on contract, contract-to-hire or permanent roles.",
    tags: ["Contract", "Contract-to-hire", "Permanent", "Dedicated teams"],
    img: "home/it-staffing-recruitment.jpg",
  },
];

export const NAV = [
  { key: "home", label: "Home", href: "index.html" },
  { key: "services", label: "Services", href: "services.html", mega: true },
  { key: "ai", label: "AI Solutions", href: "ai-solutions.html" },
  { key: "industries", label: "Industries", href: "industries.html" },
  { key: "about", label: "About Us", href: "about.html" },
  { key: "careers", label: "Careers", href: "careers.html" },
  { key: "contact", label: "Contact", href: "contact.html" },
];

const ICONS = {
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  kanban: '<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="10" rx="1.5"/><rect x="17" y="4" width="4" height="13" rx="1.5"/>',
  ai: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.4c2.2.7 3.5 2.6 3.5 5.6"/>',
  arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  mobile: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5"/>',
  api: '<path d="M9 4C6 4 6 6 6 8s0 3-3 4c3 1 3 2 3 4s0 4 3 4M15 4c3 0 3 2 3 4s0 3 3 4c-3 1-3 2-3 4s0 4-3 4"/>',
  cloud: '<path d="M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 9.5a4.2 4.2 0 0 1-.5 8.5z"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  chart: '<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-8"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  data: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  flex: '<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  star: '<path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8z"/>',
  userplus: '<circle cx="10" cy="8" r="3.5"/><path d="M3 20c0-3.6 3-6 7-6s7 2.4 7 6M19 8v6M16 11h6"/>',
  crown: '<path d="m3 8 4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 13h18"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14-4M4 5v3h3M4 13a8 8 0 0 0 14 4M20 19v-3h-3"/>',
  rocket: '<path d="M5 19c0-3 1-4 3-5M14 5c3-1 5-1 6-1 0 1 0 3-1 6l-5 5-4-4zM9 15l-2 4 4-2M15 8.5h.01"/>',
};

export const sprite = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">${Object.entries(ICONS)
    .map(
      ([k, v]) =>
        `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`
    )
    .join("")}</svg>`;

export const icon = (name, cls = "") =>
  `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;

export const RING = ["#023495", "#0252F1", "#02ABFE", "#03D1F6", "#45EAAE", "#34DC6D"];
// Ring of six arrows flowing deep blue -> green (the logo mark). `draw` adds hooks for the preloader.
export const ringSvg = ({ cls = "", nine = true, draw = false, nineFill = "currentColor" } = {}) => {
  const P = (deg, r) => {
    const a = (deg * Math.PI) / 180;
    return [(50 + r * Math.cos(a)).toFixed(2), (50 + r * Math.sin(a)).toFixed(2)];
  };
  const parts = RING.map((c, i) => {
    const a0 = -90 + i * 60 + 3, a1 = a0 + 40;
    const [x0, y0] = P(a0, 38), [x1, y1] = P(a1, 38);
    const [b1x, b1y] = P(a1, 28), [b2x, b2y] = P(a1, 48), [tx, ty] = P(a1 + 13, 38);
    return `<path class="${draw ? "r-arc" : ""}" pathLength="1" d="M${x0} ${y0}A38 38 0 0 1 ${x1} ${y1}" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="butt"/><path class="${draw ? "r-head" : ""}" d="M${b1x} ${b1y}L${tx} ${ty}L${b2x} ${b2y}Z" fill="${c}"/>`;
  }).join("");
  const nineEl = nine
    ? `<text x="50" y="52" text-anchor="middle" dominant-baseline="central" font-family="'Funnel Display',Arial,sans-serif" font-weight="800" font-style="italic" font-size="40" fill="${nineFill}">9</text>`
    : "";
  return `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${parts}${nineEl}</svg>`;
};

export const logo = (cls = "") =>
  `<a href="index.html" class="logo ${cls}" aria-label="9Sprints home"><img class="logo-img logo-on-light" src="assets/logo/logo.webp" alt="9Sprints" width="900" height="595"><img class="logo-img logo-on-dark" src="assets/logo/logo-white.webp" alt="" width="900" height="595" aria-hidden="true"></a>`;

// rolling pill button
export const btn = (label, href = "#", variant = "accent", extra = "") => {
  const cls =
    variant === "ghost"
      ? "btn btn-ghost"
      : `btn btn-${variant}${/\bsm\b/.test(extra) ? " btn-sm" : ""}`;
  const mag = variant === "ghost" ? "" : " data-magnetic";
  const rest = extra.replace(/\bsm\b/, "").trim();
  const arrow = variant === "ghost" ? icon("arrow", "btn-arrow") : "";
  return `<a href="${href}" class="${cls}"${mag} ${rest}><span class="btn-label"><span>${label}</span><span aria-hidden="true">${label}</span></span>${arrow}</a>`;
};

export const btnEl = (label, variant = "accent", attrs = "") =>
  `<button type="submit" class="btn btn-${variant}" data-magnetic ${attrs}><span class="btn-label"><span>${label}</span><span aria-hidden="true">${label}</span></span></button>`;

export const img = (name, alt, w, h, opts = {}) =>
  `<img src="assets/img/${name}${name.includes(".") ? "" : ".svg"}" alt="${alt}" width="${w}" height="${h}" ${
    opts.eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'
  }${opts.cls ? ` class="${opts.cls}"` : ""}${opts.attrs ? " " + opts.attrs : ""}>`;

const head = (p) => {
  const url = `${SITE.url}/${p.file}`;
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="9Sprints">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}/assets/img/og.svg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#011A39">
<link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Noto+Sans:wght@100..900&display=swap" rel="stylesheet">
<script>
(function(){var d=document.documentElement;d.classList.add('js');
var t=null;try{t=localStorage.getItem('9s-theme');}catch(e){}if(t!=='light'&&t!=='dark'){try{t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}catch(e){t='dark';}}d.setAttribute('data-theme',t);
try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduced');}catch(e){}
${
  p.key === "home"
    ? "try{if(!sessionStorage.getItem('9s-pl')&&!d.classList.contains('reduced'))d.classList.add('preloading');}catch(e){}"
    : ""
}})();
</script>
<link rel="stylesheet" href="dist/output.css">
${p.swiper ? '<link rel="stylesheet" href="dist/swiper.min.css">' : ""}
${p.ld ? `<script type="application/ld+json">${JSON.stringify(p.ld)}</script>` : ""}
</head>`;
};

const header = (key) => `
<a href="#main" class="sr-only-focus btn btn-accent z-[999] left-4 top-4">Skip to content</a>
<header class="hdr" id="hdr">
  <div class="wrap hdr-inner">
    ${logo()}
    <div class="flex items-center gap-2 sm:gap-3">
      <button type="button" class="icon-btn" id="theme-toggle" aria-label="Toggle light and dark theme">
        ${icon("moon", "theme-ico-moon")}${icon("sun", "theme-ico-sun")}
      </button>
      <a href="contact.html" class="btn btn-accent btn-sm hidden sm:inline-flex" data-magnetic><span class="btn-label"><span>Say Hello</span><span aria-hidden="true">Say Hello</span></span>${icon("arrow", "btn-arrow")}</a>
      <button type="button" class="icon-btn burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mm"><i></i><i></i></button>
    </div>
  </div>
</header>
<div class="mm" id="mm" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden="true">
  <span class="mm-bg-glow" aria-hidden="true"></span>
  <div class="mm-top">
    <p class="mm-tag"><span class="mm-dot" aria-hidden="true"></span><span class="mm-mask"><span data-mm-tag>MENU</span></span></p>
    <button type="button" class="mm-close" id="mm-close" aria-label="Close menu"><i></i><i></i></button>
  </div>
  <div class="mm-body">
    <nav aria-label="Menu">
      <ul class="mm-list" data-lenis-prevent>
        ${NAV.map((n) =>
          n.mega
            ? `<li class="mm-row">
              <button type="button" class="mm-link mm-toggle" id="mm-svc" aria-expanded="false" aria-controls="mm-sub"><span class="mm-mask"><span data-mm-item>${n.label}</span></span><span class="mm-plus" aria-hidden="true"></span></button>
              <div class="mm-sub" id="mm-sub"><div>${SERVICES.map((s) => `<span class="mm-mask"><a href="${s.slug}.html" data-mm-sub>${s.title}</a></span>`).join("")}<span class="mm-mask"><a href="services.html" data-mm-sub>All services</a></span></div></div></li>`
            : `<li class="mm-row"><a class="mm-link${key === n.key ? " is-current" : ""}" href="${n.href}"><span class="mm-mask"><span data-mm-item>${n.label}</span></span></a></li>`
        ).join("")}
      </ul>
    </nav>
    <aside class="mm-aside">
      <p class="mm-note"><span class="mm-mask"><span data-mm-note><strong>Got an idea? We'll ship it.</strong></span></span><span class="mm-mask"><span data-mm-note>Tell us what you're building and a</span></span><span class="mm-mask"><span data-mm-note>team can be sprinting in 9 days.</span></span></p>
      <a href="contact.html" class="mm-card" data-cursor="View">
        <video class="mm-video" muted loop playsinline preload="none" poster="assets/img/about-us.jpg" aria-hidden="true" tabindex="-1"><source src="assets/img/about-video.webm" type="video/webm"></video>
        <span class="mm-card-cap">Start a project <span class="mm-card-ico">${icon("arrow", "w-5 h-5")}</span></span>
      </a>
    </aside>
  </div>
  <div class="mm-foot">
    <a href="mailto:${SITE.email}">${SITE.email}</a>
    <span>© 2026 9Sprints</span>
  </div>
</div>`;

const footer = () => `
<footer class="ftr" id="footer">
  <div class="wrap sec !pb-12">
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
      <h2 class="h2 max-w-[14ch]" data-split>Let's put your idea into <span class="em">motion.</span></h2>
      <div>${btn("Start a Project", "contact.html", "accent")}</div>
    </div>
    <div class="rule my-16" data-line></div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
      <div class="ftr-col"><h4>Services</h4><ul>${SERVICES.map((s) => `<li><a href="${s.slug}.html">${s.title}</a></li>`).join("")}</ul></div>
      <div class="ftr-col"><h4>Company</h4><ul>
        <li><a href="about.html">About Us</a></li><li><a href="industries.html">Industries</a></li><li><a href="careers.html">Careers</a></li><li><a href="contact.html">Contact</a></li></ul></div>
      <div class="ftr-col col-span-2 lg:col-span-1"><h4>Contact</h4><ul>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li><a href="tel:+910000000000">${SITE.phone}</a></li>
        <li>${SITE.office}</li></ul></div>
      <div class="ftr-col col-span-2 lg:col-span-1"><h4>Newsletter</h4>
        <form class="flex flex-col gap-3" id="newsletter" novalidate>
          <label for="nl-email" class="sr-only">Email address</label>
          <input class="ftr-input" id="nl-email" type="email" name="email" placeholder="you@company.com" autocomplete="email" required>
          ${btnEl("Subscribe", "outline")}
          <p class="small min-h-[1.5em]" id="nl-msg" role="status" aria-live="polite"></p>
        </form></div>
    </div>
    <div class="rule mt-16 mb-6" data-line></div>
    <div class="flex flex-wrap items-center justify-between gap-4 small text-dim">
      <p>© 2026 9Sprints. All rights reserved.</p>
      <div class="flex gap-6"><a href="#">Privacy Policy</a><a href="#">Terms</a></div>
      <div class="flex gap-5 font-bold"><a href="#" aria-label="LinkedIn">LinkedIn</a><a href="#" aria-label="X">X</a><a href="#" aria-label="GitHub">GitHub</a><a href="#" aria-label="Instagram">Instagram</a></div>
      <button type="button" class="icon-btn" id="to-top" aria-label="Back to top">${icon("up")}</button>
    </div>
  </div>
  <div class="wordmark" id="wordmark" aria-hidden="true">${["wm-base", "wm-fill"].map((c) => `<div class="${c}">${"9SPRINTS".split("").map((l) => `<span>${l}</span>`).join("")}</div>`).join("")}</div>
</footer>`;

export const page = (p, body) => `${head(p)}
<body data-page="${p.key}"${p.service ? ` style="--service:${p.service}"` : ""}>
<div id="progress" aria-hidden="true"><i></i></div>
${sprite()}
${
  p.key === "home"
    ? `<div class="preloader" id="preloader" aria-hidden="true">
  <p class="font-display text-[clamp(1.1rem,2.6vw,2.5rem)] tracking-tight max-w-[18ch] leading-tight" id="pl-words">${SITE.tagline
    .split(" ")
    .map((w) => `<span class="pl-word"><span>${w}&nbsp;</span></span>`)
    .join("")}</p>
  ${ringSvg({ cls: "pl-ring", draw: true, nineFill: "#fff" })}
  <div class="pl-count"><span id="pl-num">0</span></div>
</div>`
    : ""
}
<div class="cursor-dot" id="cursor-dot"></div><div class="cursor-ring" id="cursor-ring"></div>
${header(p.nav || p.key)}
<main id="main">
${body}
</main>
${footer()}
<script src="js/vendor/gsap.min.js"></script>
<script src="js/vendor/ScrollTrigger.min.js"></script>
<script src="js/vendor/SplitText.min.js"></script>
<script src="js/vendor/lenis.min.js"></script>
${p.swiper ? '<script src="js/vendor/swiper-bundle.min.js"></script>' : ""}
<script src="js/main.js"></script>
<script src="js/animations.js"></script>
</body>
</html>
`;

export const faq = (items) => `
<div class="max-w-[1100px]" data-faq>
  ${items
    .map(
      ([q, a], i) => `<div class="faq-item" data-reveal>
    <h3><button type="button" class="faq-q" id="faq-q${i}" aria-expanded="false" aria-controls="faq-a${i}"><span>${q}</span><span class="faq-plus" aria-hidden="true"></span></button></h3>
    <div class="faq-a" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}"><div>${a}</div></div>
  </div>`
    )
    .join("")}
</div>`;

export const ctaBlock = (opts = {}) => `
<section class="sec !pt-[clamp(64px,9vw,140px)] !pb-[clamp(24px,3vw,48px)]" aria-labelledby="cta-h">
  <div class="wrap">
    <div class="cta-panel" data-cta>
      <div class="cta-ripples" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="cta-icons" aria-hidden="true">
        <img class="cta-ico ci1" src="assets/img/home/launch.webp" alt="" width="400" height="400" loading="lazy" data-parallax="0.25">
        <img class="cta-ico ci2" src="assets/img/home/scale.webp" alt="" width="400" height="400" loading="lazy" data-parallax="0.18">
      </div>
      <h2 id="cta-h" class="h2 relative" data-split>${opts.title || "Have a project? Let's <span class=\"italic\">sprint.</span>"}</h2>
      <div class="relative flex flex-wrap justify-center gap-3 mt-10">
        ${btn("Start a Project", "contact.html", "dark")}
        ${btn(opts.second || "Hire Talent", opts.secondHref || "it-staffing-recruitment.html", "ink-outline")}
      </div>
    </div>
  </div>
</section>`;
