// Generates the 4 service inner pages from the content doc copy. Run: node scripts/build-services.mjs
// Header + footer are lifted from about.html so the shared chrome stays in one place.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const about = readFileSync(join(root, "about.html"), "utf8");
const grab = (tag) => about.match(new RegExp(`<${tag}[\\s\\S]*?</${tag}>`))[0];

const ARROW = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>`;
const ico = (d, s = 26) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  app: `<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M7 21h10M12 18v3"/>`,
  mobile: `<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>`,
  cloud: `<path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4 4 0 0 1-.5 8.5z"/><path d="m10 13 2-2 2 2M12 11v6"/>`,
  shield: `<path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>`,
  gantt: `<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="10" rx="1.5"/><rect x="17" y="4" width="4" height="13" rx="1.5"/>`,
  loop: `<path d="M20 12a8 8 0 0 1-13.7 5.6M4 12a8 8 0 0 1 13.7-5.6"/><path d="M18 3v4h-4M6 21v-4h4"/>`,
  alert: `<path d="M12 3 2.5 20h19z"/><path d="M12 10v4.5M12 17.5v.01"/>`,
  rescue: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>`,
  search: `<circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5M8.5 11h5M11 8.5v5"/>`,
  doc: `<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>`,
  data: `<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>`,
  clock: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>`,
  swap: `<path d="M4 8h13M13 4l4 4-4 4M20 16H7M11 12l-4 4 4 4"/>`,
  key: `<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v4M15 12v3"/>`,
  team: `<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.4c2.2.7 3.5 2.6 3.5 5.6"/>`,
  spark: `<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>`,
};

// Shared engine + engagement copy from the content doc (sections 4 and 5).
const ENGINE = [
  ["Discover", "Architecture audit, operational bottleneck analysis, stack assessment, and success KPI mapping."],
  ["Define", "Solution architecture blueprints, sprint schedules, backlog prioritization, and team allocation."],
  ["Deliver", "Iterative code execution, active PMO governance, automated QA testing, and risk tracking."],
  ["Optimize", "Cutover management, zero-downtime deployment, full documentation, and continuous performance tuning."],
];
const MODEL = {
  project: ["Project-Based Delivery", "Turn-key software builds, platform modernizations, custom AI tools.", "Fixed scope accountability, clear milestones, and end-to-end execution."],
  pods: ["Dedicated Team Pods", "Organizations needing managed, multi-disciplinary squads (Dev, QA, PM).", "Rapid capacity expansion without internal hiring overhead."],
  augment: ["Staff Augmentation", "Specific skill gap fulfillment (Full Stack, DevOps, AI, PM) inside existing teams.", "Vetted senior talent integrated directly into your agile workflow."],
  pmo: ["PMO Advisory", "Struggling technical initiatives requiring recovery and structural governance.", "Restored milestone visibility, dependency management, and delivery speed."],
};

const SERVICES = [
  {
    file: "software-product-development.html", nav: "services", track: 1,
    name: "Software & Product Engineering", short: "Software & Product Development",
    colors: { c1: "#023495", c2: "#0252f1", ca: "#0252f1" },
    img: "software-development",
    title: "Software & Product Development",
    desc: "Custom enterprise apps, web and native mobile, application modernization and quality engineering — complex requirements turned into high-performing digital products.",
    h1: ["Turning complex requirements into", "high-performing digital products."],
    lead: "Custom applications, cloud modernization, mobile platforms, system integrations, and QA automation — built for reliability.",
    statement: "Tailored software that solves operational friction and legacy drag — designed around business ROI, maintainability and security, not unproven tech hype.",
    capKick: "Engineering capabilities", capH: ["Built to ", "perform", " in production."],
    capLead: "Four capabilities cover the full build — from first release to modernizing what already runs your business.",
    caps: [
      ["Custom Enterprise Apps", "Tailored software solving operational friction and legacy drag.", "app"],
      ["Web & Native Mobile", "Fast, responsive, modern cross-platform applications.", "mobile"],
      ["Application Modernization", "Microservices, cloud-native migration, API-led integration.", "cloud"],
      ["Quality Engineering", "Rigorous functional, security, performance, and regression testing.", "shield"],
    ],
    focus: {
      kick: "AI-Augmented Engineering", h: ["Faster delivery, ", "human-validated."],
      lead: "AI speeds up the engineering floor. People stay accountable for every release.",
      items: [
        ["Developer Optimization", "Smart code completion and automated unit test generation.", ["Code completion", "Unit-test generation"]],
        ["Legacy Refactoring", "Automated code analysis for accelerated modernization.", ["Code analysis", "Modernization"]],
        ["Human Validation", "Enterprise security controls and IP protection built into every release.", ["Security controls", "IP protection"]],
      ],
    },
    models: ["project", "pods"],
    related: [1, 2, 3],
  },
  {
    file: "project-program-management.html", nav: "services", track: 2,
    name: "Project & Program Management", short: "Project & Program Management",
    colors: { c1: "#0284c7", c2: "#02abfe", ca: "#0369a1" },
    img: "project-program-management",
    title: "Project & Program Management",
    desc: "Full-lifecycle PMO, Agile and hybrid frameworks, active risk management and project recovery for critical technology initiatives.",
    h1: ["Structured leadership for", "critical technology initiatives."],
    lead: "PMO setup, Agile frameworks, milestone tracking, risk mitigation, and execution recovery for complex technical programs.",
    statement: "Some initiatives need governance to start right; others need it to recover. We restore milestone visibility, manage dependencies and bring delivery speed back.",
    capKick: "Program delivery pillars", capH: ["Control over ", "complex", " delivery."],
    capLead: "Four pillars keep stakeholders aligned, risks visible and milestones moving.",
    caps: [
      ["Full-Lifecycle PMO", "Milestone tracking, stakeholder alignment, resource allocation.", "gantt"],
      ["Agile & Hybrid Frameworks", "Tailored delivery methods matching client culture.", "loop"],
      ["Active Risk Management", "Proactive RAID tracking to eliminate budget and schedule threats.", "alert"],
      ["Project Recovery", "Strategic intervention and stabilization for lagging initiatives.", "rescue"],
    ],
    focus: {
      kick: "Release & Cutover Management", h: ["Launch with ", "zero disruption."],
      lead: "Coordinating UAT testing, deployment checklists, cross-functional cutovers, and operational handoffs to guarantee zero operational disruption during launch.",
      items: [
        ["UAT testing", "Acceptance testing coordinated with the business before anything goes live.", ["UAT"]],
        ["Deployment checklists", "Every release step documented, owned and signed off.", ["Checklists"]],
        ["Cross-functional cutovers", "Teams, vendors and systems switched over in one coordinated plan.", ["Cutover"]],
        ["Operational handoffs", "Clean transition to the teams who will run it day to day.", ["Handoff"]],
      ],
    },
    models: ["pmo", "project"],
    related: [0, 2, 3],
  },
  {
    file: "ai-solutions.html", nav: "ai", track: 3,
    name: "AI Solutions & Automation", short: "AI Solutions & Intelligent Automation",
    colors: { c1: "#0f9d8a", c2: "#2fd6a0", ca: "#0b7f70" },
    img: "ai-solutions",
    title: "AI Solutions & Intelligent Automation",
    desc: "Enterprise RAG search, document and workflow automation and data readiness audits — pragmatic AI engineered for real business value.",
    h1: ["Pragmatic artificial intelligence", "engineered for real business value."],
    lead: "Enterprise RAG knowledge search, automated document processing, data quality readiness, and developer workflows.",
    statement: "Value-oriented, practical AI workflows embedded into operations — judged on business ROI, security and maintainability, not hype.",
    capKick: "High-impact AI services", capH: ["AI that earns ", "its place."],
    capLead: "Three services where practical AI pays off first.",
    caps: [
      ["Enterprise RAG Search", "Instant natural-language querying across internal documents and repos.", "search"],
      ["Document & Workflow Automation", "Structured data extraction from invoices, contracts, and tickets.", "doc"],
      ["Data Readiness Audit", "Pipeline quality, privacy controls, and API preparedness evaluation.", "data"],
    ],
    focus: {
      kick: "Responsible AI Framework", h: ["Intelligent, ", "and accountable."],
      lead: "Every AI workflow ships with the controls enterprises need to trust it.",
      items: [
        ["Data Security", "Enterprise role-based access and strict data privacy safeguards.", ["Role-based access", "Privacy"]],
        ["Traceability", "RAG source-citing to eliminate AI hallucination risks.", ["Source citations"]],
        ["Human Validation", "Human-in-the-loop oversight for critical workflow decisions.", ["Human-in-the-loop"]],
      ],
    },
    models: ["project", "augment"],
    related: [0, 1, 3],
  },
  {
    file: "it-staffing-recruitment.html", nav: "services", track: 4,
    name: "IT Staffing & Talent", short: "IT Staffing & Talent Solutions",
    colors: { c1: "#0f8a4b", c2: "#34c76d", ca: "#0f7a42" },
    img: "it-staffing-recruitment",
    title: "IT Staffing & Talent Solutions",
    desc: "Contract IT staffing, contract-to-hire, direct placement and dedicated pods — precision talent matching for mission-critical engineering teams.",
    h1: ["Precision talent matching for", "mission-critical engineering teams."],
    lead: "Contract, contract-to-hire, direct placement, and specialized project squads to rapidly scale engineering capacity.",
    statement: "Unlike high-volume staffing agencies, our talent pool is evaluated by active tech leads — matched to your precise technical stack and culture.",
    capKick: "Flexible staffing models", capH: ["The right people, ", "your way."],
    capLead: "Four ways to add senior capacity — pick the one that fits the work.",
    caps: [
      ["Contract IT Staffing", "Rapid deployment for finite project cycles or workload spikes.", "clock"],
      ["Contract-to-Hire", "Production-environment evaluation before permanent hire.", "swap"],
      ["Direct Placement", "Executive and senior developer permanent talent sourcing.", "key"],
      ["Dedicated Pods", "Fully managed cross-functional squads for specialized execution.", "team"],
    ],
    focus: {
      kick: "Disciplines covered", h: ["Every role your ", "roadmap needs."],
      lead: "Engineers, PMs and AI specialists vetted by active tech leads.",
      items: [
        ["Engineering", "Full Stack, Mobile, Back-End, & Cloud Engineers.", ["Full Stack", "Mobile", "Back-End", "Cloud"]],
        ["Data & AI", "AI/ML Engineers, Data Architects, & Analysts.", ["AI/ML", "Data Architects", "Analysts"]],
        ["Program leadership", "PMO Leaders, Agile Coaches, & Scrum Masters.", ["PMO", "Agile Coaches", "Scrum Masters"]],
        ["Platform & quality", "DevOps, Cybersecurity, & QA Automation Experts.", ["DevOps", "Cybersecurity", "QA Automation"]],
      ],
    },
    models: ["augment", "pods"],
    related: [0, 1, 2],
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const num = (n) => String(n).padStart(2, "0");

function header(s) {
  let h = grab("header").replace(' aria-current="page" class="is-current"', "");
  if (s.nav === "ai") h = h.replace('<a href="ai-solutions.html">AI Solutions</a>', '<a href="ai-solutions.html" aria-current="page" class="is-current">AI Solutions</a>');
  else h = h.replace('class="nav-parent"', 'class="nav-parent is-current"');
  return h.replace(`<a href="${s.file}" role="menuitem">`, `<a href="${s.file}" role="menuitem" aria-current="page">`);
}

function page(s, all) {
  const { c1, c2, ca } = s.colors;
  const cards = s.caps.map(([t, p, i], k) => `
        <article class="ab-val" style="--c1:${c1};--c2:${c2}"><div><span class="ab-val-n">${num(k + 1)}</span><span class="ab-val-ico">${ico(I[i])}</span></div><div><h3>${esc(t)}</h3><p>${esc(p)}</p></div></article>`).join("");
  const rows = s.focus.items.map(([t, p, tags], k) => `
          <div class="sv-pt"><span class="sv-pt-i">${num(k + 1)}</span><div><h3>${esc(t)}</h3><p>${esc(p)}</p></div><ul class="sv-tags">${tags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("");
  const steps = ENGINE.map(([t, p], k) => `
        <li class="sv-step"><span class="sv-step-n">${num(k + 1)}</span><h3>${t}</h3><p>${p}</p></li>`).join("");
  const models = s.models.map((m, k) => {
    const [t, scenario, value] = MODEL[m];
    return `
          <article class="sv-eng-card spot"><span class="sv-eng-n" aria-hidden="true">${num(k + 1)}</span><h3>${t}</h3><div class="sv-eng-b"><span class="sv-eng-lb">Best for</span><p>${scenario}</p></div><div class="sv-eng-b sv-eng-v"><span class="sv-eng-lb">You get</span><p>${value}</p></div><a class="sv-eng-link" href="contact.html">Discuss this model</a></article>`;
  }).join("");
  const rel = s.related.map((i) => {
    const o = all[i];
    return `
        <a class="sv-card" href="${o.file}" style="--c:${o.colors.c2}"><img src="assets/img/home/${o.img}.webp" alt="" width="1280" height="853" loading="lazy"><span class="sv-card-in"><span class="sv-card-n">Track ${o.track}</span><span><h3>${esc(o.name)}</h3><p>${esc(o.lead)}</p></span><span class="sv-card-go">${ARROW}</span></span></a>`;
  }).join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(s.title)} | 9sprints</title>
<meta name="description" content="${esc(s.desc)}">
<link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400..700&family=Noto+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/site.css">
<link rel="stylesheet" href="css/about.css">
<link rel="stylesheet" href="css/service.css">
</head>
<body id="top" style="--c1:${c1};--c2:${c2};--ca:${ca}">

${header(s)}

<main>
  <section class="hero ab-hero sv-hero" id="hero" aria-labelledby="hero-h">
    <div class="hero-field" aria-hidden="true"><div class="hero-bg"></div><div class="hero-canvas" id="hero-canvas"></div></div>
    <div class="hero-inner">
      <h1 id="hero-h"><span class="ln"><span>${esc(s.h1[0])}</span></span><span class="ln"><span class="soft">${esc(s.h1[1])}</span></span></h1>
      <p class="sub-copy">${esc(s.lead)}</p>
      <div class="hero-btns"><a href="#" class="hbtn hbtn-light">Start a Project</a><a href="#capabilities" class="hbtn hbtn-glass">Explore capabilities</a></div>
    </div>
  </section>

  <section class="sec about ab-intro" id="about" aria-labelledby="about-h">
    <div class="wrap">
      <p class="kicker rv">${esc(s.short)}</p>
      <h2 id="about-h" class="sr-only">${esc(s.title)}</h2>
      <p class="about-statement" id="about-statement" data-words>${esc(s.statement)}</p>
    </div>
  </section>

  <section class="sec" id="capabilities" aria-labelledby="cap-h" style="padding-top:0">
    <div class="wrap">
      <div class="ab-vals-head rv"><div><p class="kicker">${esc(s.capKick)}</p><h2 class="ab-h2" id="cap-h">${esc(s.capH[0])}<em>${esc(s.capH[1])}</em>${esc(s.capH[2] ?? "")}</h2></div><p class="ab-lead">${esc(s.capLead)}</p></div>
      <div class="ab-vals sv-caps" id="ab-vals" style="--n:${s.caps.length}">${cards}
      </div>
    </div>
  </section>

  <section class="ab-why sv-focus" id="focus" aria-labelledby="focus-h">
    <div class="wrap ab-why-grid">
      <div class="ab-why-l rv">
        <p class="kicker">${esc(s.focus.kick)}</p>
        <h2 class="ab-h2" id="focus-h">${esc(s.focus.h[0])}<em>${esc(s.focus.h[1])}</em></h2>
        <p class="ab-lead">${esc(s.focus.lead)}</p>
      </div>
      <div class="sv-list" id="sv-list">${rows}
      </div>
    </div>
  </section>

  <section class="sec" id="process" aria-labelledby="proc-h">
    <div class="wrap">
      <div class="ab-vals-head rv"><div><p class="kicker">The 9sprints engine</p><h2 class="ab-h2" id="proc-h">Four steps from first call to <em>results.</em></h2></div><p class="ab-lead">The same structured path runs every engagement, so there are no messy handoffs and no unstructured execution.</p></div>
      <ol class="sv-steps" id="sv-steps">${steps}
      </ol>
    </div>
  </section>

  <section class="sec" id="engage" aria-labelledby="eng-h" style="padding-top:0">
    <div class="wrap">
      <div class="ab-eng">
        <div class="ab-eng-head rv"><div><p class="kicker">Engagement models</p><h2 class="ab-h2" id="eng-h">Start where it <em>helps most.</em></h2></div><p class="ab-lead">Flexible structures built around the way you want to work.</p></div>
        <div class="ab-eng-list" id="ab-eng">${models}
        </div>
      </div>
    </div>
  </section>
</main>

${grab("footer")}

<script src="js/vendor/gsap.min.js"></script>
<script src="js/vendor/ScrollTrigger.min.js"></script>
<script src="js/vendor/lenis.min.js"></script>
<script src="js/site.js"></script>
<script src="js/motion.js"></script>
<script src="js/footer.js"></script>
<script src="js/about-hero.js"></script>
<script src="js/about.js"></script>
<script src="js/service.js"></script>
</body>
</html>
`;
}

for (const s of SERVICES) writeFileSync(join(root, s.file), page(s, SERVICES));
console.log(`Generated ${SERVICES.length} service pages.`);
