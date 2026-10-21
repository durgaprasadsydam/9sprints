import { SERVICES, btn, icon, img, faq, ctaBlock, page } from "./lib.mjs";
import { hscroll } from "./home.mjs";

const steps = (list) => list.map(([t, d], i) => [String(i + 1).padStart(2, "0"), t, d]);

const DATA = {
  "software-product-development": {
    key: "services",
    title: "Software & Product Development | Web, Mobile, SaaS — 9Sprints",
    desc: "Custom web apps, mobile apps, SaaS, APIs, cloud and QA — designed, engineered and launched by 9Sprints in focused two-week sprints.",
    h1: 'Software that <span class="em">moves.</span>',
    eyebrow: "Software & Product Development",
    intro: "We design, engineer and launch web, mobile and cloud products — built to scale and delivered in focused sprints.",
    stats: [
      { n: 120, s: "+", l: "Products shipped [PLACEHOLDER]" },
      { t: "2-week", l: "Sprints" },
      { n: 99.9, s: "%", l: "Uptime targets", dec: 1 },
    ],
    overview: "Great products are not built in a single heroic push. They are shaped, tested and improved in short, visible cycles. Our product squads pair designers, engineers and QA with a delivery lead, so you see working software every two weeks — and every decision stays reversible until it is proven. Whether you are launching an MVP or modernising a platform, we bring the architecture, the discipline and the pace.",
    offer: [
      ["code", "Custom Web Applications", "Fast, accessible, maintainable web apps built on modern frameworks and clean architecture."],
      ["mobile", "Mobile Apps", "Native-quality iOS, Android and Flutter apps with offline support and smooth release pipelines."],
      ["layers", "SaaS Product Development", "Multi-tenant platforms with billing, roles, analytics and the scalability to grow."],
      ["api", "API & Integrations", "Secure REST and GraphQL APIs plus integrations with the systems you already run."],
      ["cloud", "Cloud & DevOps", "CI/CD, infrastructure as code, observability and cost-aware cloud foundations."],
      ["shield", "QA & Test Automation", "Automated regression, performance and security testing built into every sprint."],
    ],
    process: steps([
      ["Discovery", "Goals, users, constraints and a prioritised scope."],
      ["UX/UI Design", "Flows, prototypes and a design system tested with real users."],
      ["Architecture", "Stack, data model and infrastructure chosen for your scale."],
      ["Agile Build", "Two-week sprints with a working demo at the end of each."],
      ["QA & Launch", "Automated tests, load checks and a controlled release."],
      ["Support & Scale", "Monitoring, SLAs and a roadmap for what comes next."],
    ]),
    toolsTitle: "Technologies we build with",
    tools: ["React", "Next.js", "Node.js", "Python", ".NET", "Java", "Flutter", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "PostgreSQL", "MongoDB"],
    plans: [
      ["Fixed-scope project", "Clear deliverables, timeline and budget.", ["Defined scope & milestones", "Sprint demos & reports", "Handover & documentation", "Warranty period"]],
      ["Dedicated product team", "A cross-functional squad that works as your own.", ["Designers, engineers & QA", "Delivery lead included", "Scale up or down monthly", "Shared roadmap ownership"]],
      ["MVP in 8 weeks", "Validate an idea with a real, usable product.", ["Discovery workshop", "Core features only", "Launch-ready infrastructure", "Post-launch iteration plan"]],
    ],
    hot: 1,
    results: [
      { n: 120, s: "+", l: "Products shipped [PLACEHOLDER]" },
      { n: 40, s: "%", l: "Faster release cycles [PLACEHOLDER]" },
      { n: 99.9, s: "%", l: "Uptime on managed platforms [PLACEHOLDER]", dec: 1 },
    ],
    caseStudy: ["case-1", "Healthcare · [PLACEHOLDER]", "Patient portal rebuilt for scale", "Replaced a legacy portal with a modern web app, cutting release cycles by 40% and doubling concurrent users."],
    faq: [
      ["How long does a typical project take?", "An MVP usually takes 8–12 weeks. Larger platforms are planned as a series of two-week sprints with a roadmap agreed at discovery."],
      ["How is pricing structured?", "Fixed-scope for well-defined work, or a monthly rate for a dedicated team. We share an estimate after discovery, not before."],
      ["Who owns the intellectual property?", "You do. All code, designs and documentation transfer to you on payment, and are stored in repositories you control."],
      ["How do you choose the technology stack?", "We pick for your team, scale and budget — not our preferences. Choices and trade-offs are documented during architecture."],
      ["Do you offer support after launch?", "Yes. Retainers cover monitoring, bug fixes, security updates and a monthly allocation for improvements."],
      ["Can you work alongside our in-house team?", "Absolutely. We embed with your engineers, follow your workflows and can mentor as well as build."],
    ],
  },

  "project-program-management": {
    key: "services",
    title: "Project & Program Management | Agile, PMO, Delivery — 9Sprints",
    desc: "Certified PMs and delivery leaders for Agile/Scrum delivery, PMO setup, program management, risk and reporting — structure and visibility for complex tech initiatives.",
    h1: 'Delivery, <span class="em">on rhythm.</span>',
    eyebrow: "Project & Program Management",
    intro: "Certified project and program managers who bring structure, visibility and momentum to complex technology initiatives.",
    stats: [
      { n: 94, s: "%", l: "On-time delivery [PLACEHOLDER]" },
      { n: 60, s: "+", l: "Programs managed [PLACEHOLDER]" },
      { t: "PMP · CSM · SAFe", l: "Certified PMs" },
    ],
    overview: "Technology projects rarely fail because of technology. They stall on unclear scope, hidden dependencies and silence between teams. Our delivery leaders create a steady cadence — planning, execution, review — and make progress visible to everyone from developers to the board. We can run a single project, stand up a full PMO, or rescue an initiative that has lost its way.",
    offer: [
      ["kanban", "Agile & Scrum Delivery", "Experienced Scrum Masters and delivery leads who keep teams focused and unblocked."],
      ["briefcase", "PMO Setup & Governance", "Lightweight frameworks, templates and gates that bring control without bureaucracy."],
      ["layers", "Program Management", "Coordinate multiple workstreams, vendors and dependencies toward one outcome."],
      ["refresh", "Agile Transformation & Coaching", "Coach teams and leaders to adopt Agile practices that actually stick."],
      ["target", "Risk & Dependency Management", "Surface, score and mitigate risks before they become delays."],
      ["chart", "Reporting & Stakeholder Communication", "Clear dashboards and cadence-driven updates your executives will read."],
    ],
    process: steps([
      ["Assess", "Understand goals, teams, tooling and current delivery health."],
      ["Plan & Baseline", "Roadmap, scope, milestones and a baseline you can measure against."],
      ["Mobilise Team", "Roles, rituals and tools set up so work starts fast."],
      ["Execute in Sprints", "Planning, stand-ups, reviews and retros on a steady rhythm."],
      ["Track & Report", "Burndown, risks and budget reported to every stakeholder."],
      ["Close & Handover", "Retrospective, documentation and a clean transition."],
    ]),
    toolsTitle: "Tools we run delivery with",
    tools: ["Jira", "Confluence", "Azure DevOps", "MS Project", "Asana", "Monday.com", "Smartsheet", "Power BI"],
    plans: [
      ["Project manager on demand", "A certified PM embedded in your team.", ["PMP / CSM certified", "Part- or full-time", "Weekly status reporting", "Start within days"]],
      ["Managed PMO", "A full delivery office, run for you.", ["Governance & templates", "Portfolio dashboards", "Resource & risk tracking", "Executive reporting"]],
      ["Agile coaching program", "Build lasting Agile capability in-house.", ["Team & leadership coaching", "Playbooks & rituals", "Metrics that matter", "Hand-off to your leads"]],
    ],
    hot: 1,
    results: [
      { n: 94, s: "%", l: "On-time delivery [PLACEHOLDER]" },
      { n: 60, s: "+", l: "Programs managed [PLACEHOLDER]" },
      { n: 30, s: "%", l: "Fewer schedule slips [PLACEHOLDER]" },
    ],
    caseStudy: ["case-3", "Logistics · [PLACEHOLDER]", "Fleet programme brought back on track", "Re-baselined a delayed multi-vendor programme and recovered six weeks of schedule inside two quarters."],
    faq: [
      ["Which methodologies do you use?", "Agile and Scrum by default, with Kanban, SAFe or hybrid approaches where the context calls for it."],
      ["How quickly can a manager start?", "Most engagements begin within one to two weeks of agreeing scope."],
      ["What is your reporting cadence?", "Weekly status reports and sprint reviews as standard, with monthly executive summaries. Dashboards are live."],
      ["Which tools do you work with?", "Jira, Azure DevOps, MS Project, Asana, Monday.com and more. We adopt your stack or recommend one."],
      ["Can you rescue a delayed project?", "Yes. We start with a two-week assessment, re-baseline scope and schedule, and put a recovery plan in front of you."],
      ["How large a team can you manage?", "From a single squad of five to multi-team programmes with fifty or more people across vendors."],
    ],
  },

  "ai-solutions": {
    key: "ai",
    title: "AI Solutions | LLM Apps, Automation, ML — 9Sprints",
    desc: "Generative AI, chatbots and copilots, intelligent automation, machine learning and document AI — applied AI from 9Sprints that ships to production.",
    h1: 'AI, <span class="em">put to work.</span>',
    eyebrow: "AI Solutions",
    intro: "From quick-win automations to production-grade LLM applications, we build AI that solves a real business problem and plugs into the systems you already use.",
    canvas: true,
    stats: [
      { n: 5000, s: "+", l: "Hours automated / month [PLACEHOLDER]" },
      { n: 25, s: "+", l: "Models in production [PLACEHOLDER]" },
      { n: 3, s: "", l: "Weeks to first prototype [PLACEHOLDER]" },
    ],
    overview: "Most AI projects stall between a clever demo and a dependable system. We close that gap. We start from a measurable business outcome, check that your data can support it, prototype fast and then harden what works — with evaluation, guardrails and monitoring built in. The result is AI your team trusts and uses every day.",
    offer: [
      ["ai", "Generative AI & LLM Apps", "Search, summarisation and content tools grounded in your own knowledge base."],
      ["chat", "AI Chatbots & Copilots", "Assistants for customers and staff that take action inside your systems."],
      ["cog", "Intelligent Process Automation", "Combine rules, RPA and AI to remove repetitive back-office work."],
      ["chart", "Machine Learning & Predictive Analytics", "Forecasting, scoring and recommendation models tied to business KPIs."],
      ["eye", "Computer Vision & Document AI", "Extract, classify and verify data from images, forms and PDFs."],
      ["data", "Data Engineering & AI Readiness", "Pipelines, quality checks and architecture so your data is AI-ready."],
    ],
    process: steps([
      ["Use-case Discovery", "Rank ideas by value, feasibility and risk."],
      ["Data Audit", "Check quality, access and compliance of the data you have."],
      ["Prototype / PoC", "A working proof in weeks, tested with real users."],
      ["Evaluate & Harden", "Accuracy tests, guardrails and failure handling."],
      ["Integrate & Deploy", "Connect to your apps, auth and workflows."],
      ["Monitor & Improve", "Track quality, cost and drift; retrain and refine."],
    ]),
    toolsTitle: "The AI stack we work with",
    tools: ["OpenAI", "Anthropic Claude", "Google Gemini", "Open-source LLMs", "LangChain", "LlamaIndex", "Vector databases", "Python", "PyTorch", "Azure AI", "AWS Bedrock"],
    responsible: [
      ["lock", "Data privacy", "Your data stays yours. We apply minimisation, masking and region controls, and never train public models on it."],
      ["users", "Human-in-the-loop", "Review steps and approvals for high-stakes decisions, so people stay in control."],
      ["target", "Evaluation & accuracy testing", "Test sets, benchmarks and regression checks before and after every release."],
      ["shield", "Security", "Prompt-injection defences, access controls, audit logs and secure deployment patterns."],
    ],
    plans: [
      ["AI strategy workshop", "Find where AI will pay off first.", ["Use-case prioritisation", "Data & risk review", "ROI estimates", "Roadmap for 6–12 months"]],
      ["PoC sprint", "Prove the idea with a working prototype.", ["2–4 week build", "Real data, real users", "Accuracy report", "Go / no-go recommendation"]],
      ["Production build & support", "Take it live and keep it healthy.", ["Integration & deployment", "Monitoring & evaluation", "Cost optimisation", "Ongoing improvement"]],
    ],
    hot: 1,
    results: [
      { n: 5000, s: "+", l: "Hours automated / month [PLACEHOLDER]" },
      { n: 70, s: "%", l: "Less manual review [PLACEHOLDER]" },
      { n: 3, s: "wks", l: "To first prototype [PLACEHOLDER]" },
    ],
    caseStudy: ["case-2", "Fintech · [PLACEHOLDER]", "Document AI for loan underwriting", "Automated extraction and checks across 40+ document types, cutting manual review by 70% with a human sign-off step."],
    faq: [
      ["How do you keep our data secure?", "We use private deployments or enterprise APIs with no-training guarantees, mask sensitive fields and enforce role-based access with audit logs."],
      ["Which model should we use?", "The one that meets your accuracy, latency, cost and compliance needs. We benchmark options on your data rather than guessing."],
      ["What does it cost to run AI?", "We estimate usage cost up front and design for efficiency — caching, smaller models where possible and budget alerts."],
      ["How accurate will it be?", "We define accuracy targets with you, build evaluation sets and report results openly. Where risk is high we add human review."],
      ["Can AI integrate with our existing software?", "Yes. We connect through APIs, queues and your identity provider, so AI features sit inside the tools your people already use."],
      ["Who owns the models and code?", "You own the custom code, prompts, fine-tuned weights and data pipelines we create. Third-party model licences stay with their providers."],
    ],
  },

  "it-staffing-recruitment": {
    key: "services",
    title: "IT Staffing & Recruitment | Contract, Permanent, Dedicated Teams — 9Sprints",
    desc: "Vetted developers, engineers and project leaders on contract, contract-to-hire or permanent roles. 48-hour first shortlist from 9Sprints.",
    h1: 'The right people, <span class="em">right now.</span>',
    eyebrow: "IT Staffing & Recruitment",
    intro: "Vetted developers, engineers and project leaders — ready to join your team on contract, contract-to-hire or permanent roles.",
    stats: [
      { n: 300, s: "+", l: "Placements" },
      { t: "48-hour", l: "First shortlist" },
      { t: "90-day", l: "Replacement guarantee" },
    ],
    overview: "Hiring great engineers is slow, noisy and expensive. We make it fast and predictable: a deep, pre-vetted network, a technical assessment for every candidate, and a shortlist in your inbox within 48 hours. Whether you need one contractor next week or a full offshore team next quarter, we handle sourcing, screening, onboarding and compliance.",
    offer: [
      ["users", "Contract Staffing / Staff Augmentation", "Skilled engineers on flexible contracts to extend your team on demand."],
      ["refresh", "Contract-to-Hire", "Try before you commit, then convert the best performers to permanent."],
      ["userplus", "Permanent Recruitment", "Search, assess and close full-time hires with a replacement guarantee."],
      ["globe", "Dedicated Offshore Teams", "Build a managed team in India that works in your time zone and tools."],
      ["crown", "Executive & Leadership Hiring", "Confidential searches for CTOs, VPs and engineering leaders."],
      ["cog", "RPO (Recruitment Process Outsourcing)", "Hand us your hiring function and scale up without adding headcount."],
    ],
    roles: ["Frontend", "Backend", "Full-stack", "Mobile", "DevOps", "Cloud", "Data", "AI/ML", "QA", "UI/UX", "Scrum Master", "Project Manager"],
    process: steps([
      ["Share Requirement", "Tell us the role, stack, team and timeline."],
      ["Sourcing", "We tap our network and targeted outreach."],
      ["Screening & Tech Assessment", "Structured interviews and hands-on technical tests."],
      ["Shortlist", "A vetted shortlist within 48 hours."],
      ["Interviews", "We schedule and coordinate; you decide."],
      ["Onboard & Support", "Contracts, compliance and a check-in after day one."],
    ]),
    plans: [
      ["Hourly / monthly contract", "Flexible capacity, no long-term lock-in.", ["Start in days", "Scale up or down", "We handle payroll", "Replacement support"]],
      ["Contract-to-hire", "Evaluate on the job, then convert.", ["Trial period built in", "Conversion at your pace", "Reduced hiring risk", "Single point of contact"]],
      ["Permanent placement fee", "Full-time hires with a safety net.", ["Success-based fee", "90-day replacement guarantee", "Salary benchmarking", "Offer & notice support"]],
    ],
    hot: 1,
    results: [
      { n: 300, s: "+", l: "Engineers placed" },
      { n: 48, s: "h", l: "To first shortlist" },
      { n: 90, s: "%", l: "Retained after one year [PLACEHOLDER]" },
    ],
    caseStudy: ["case-4", "SaaS · [PLACEHOLDER]", "A dedicated team of 14 in 21 days", "Built a cross-functional offshore team for a scaling SaaS company, with the first engineers contributing in week two."],
    faq: [
      ["How fast can you fill a role?", "You receive a vetted shortlist within 48 hours. Contract roles typically start in one to two weeks; permanent roles in three to six."],
      ["How do you vet candidates?", "Resume and background checks, a structured technical interview and a hands-on assessment, plus communication and culture screening."],
      ["What if the hire doesn't work out?", "Every placement includes a 90-day replacement guarantee. We find a substitute at no extra fee."],
      ["Do you handle payroll and compliance?", "Yes. For contract staff we manage payroll, statutory compliance and contracts, so you receive one simple invoice."],
      ["Remote or onsite?", "Both. We place remote, hybrid and onsite engineers, and can build dedicated teams in Hyderabad."],
      ["What about notice periods?", "We screen for availability up front and negotiate buy-outs where valuable, so timelines are realistic."],
    ],
  },
};

const counter = (s) =>
  s.t
    ? `<b>${s.t}</b>`
    : `<b><span data-counter="${s.n}" data-suffix="${s.s || ""}"${s.dec ? ` data-decimals="${s.dec}"` : ""}>${s.n}${s.s || ""}</span></b>`;

const tagCloud = (list) =>
  `<ul class="flex flex-wrap gap-3" data-reveal-stagger>${list
    .map((t) => `<li class="tag !text-base !px-5 !py-2">${t}</li>`)
    .join("")}</ul>`;

export const servicePages = () =>
  SERVICES.map((svc) => {
    const d = DATA[svc.slug];
    const file = `${svc.slug}.html`;
    const p = {
      key: svc.slug === "ai-solutions" ? "ai" : "services",
      service: svc.color,
      file,
      title: d.title,
      desc: d.desc,
      ld: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: svc.title,
        provider: { "@type": "Organization", name: "9Sprints" },
        description: d.desc,
      },
    };
    const staffing = svc.slug === "it-staffing-recruitment";
    const others = SERVICES.filter((s) => s.slug !== svc.slug);

    const body = `
<!-- A. HERO -->
<section class="relative pt-[140px] pb-[clamp(60px,8vw,120px)] overflow-clip" aria-labelledby="pg-h">
  <div class="mesh" aria-hidden="true"></div><div class="grid-lines" aria-hidden="true"></div>
  <div class="wrap relative">
    <nav aria-label="Breadcrumb" class="mb-10"><ol class="crumbs"><li><a href="index.html">Home</a></li><li aria-hidden="true">/</li><li><a href="services.html">Services</a></li><li aria-hidden="true">/</li><li aria-current="page" class="text-fg">${svc.title}</li></ol></nav>
    <div class="grid lg:grid-cols-[7fr_5fr] gap-12 items-end">
      <div>
        <p class="eyebrow mb-8">${d.eyebrow}</p>
        <h1 class="h1-sm mb-8" id="pg-h" data-split>${d.h1}</h1>
        <p class="lead max-w-[56ch] mb-10" data-reveal>${d.intro}</p>
        <div class="flex flex-wrap gap-3" data-reveal>
          ${
            staffing
              ? btn("Hire Talent", "contact.html", "accent") + btn("Find a Job", "careers.html", "outline")
              : btn("Start a Project", "contact.html", "accent") + btn("See how we work", "#process", "outline")
          }
        </div>
      </div>
      <div class="page-hero-img" data-img-reveal>${
        d.canvas
          ? `<canvas id="ai-canvas" aria-label="Animated network of connected nodes" role="img"></canvas>`
          : img(svc.img, "Placeholder illustration for " + svc.title, 900, 560, { eager: true })
      }</div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16" data-reveal-stagger>
      ${d.stats.map((s) => `<div class="mini-stat">${counter(s)}<span class="small text-dim">${s.l}</span></div>`).join("")}
    </div>
  </div>
</section>

<!-- B. OVERVIEW -->
<section class="sec" aria-labelledby="ov-h">
  <div class="wrap grid lg:grid-cols-[5fr_7fr] gap-12">
    <div class="lg:sticky lg:top-32 self-start"><p class="label mb-6">Overview</p><h2 class="h2" id="ov-h" data-split>${staffing ? "Hiring, without the drag." : "Built for the long run."}</h2></div>
    <p class="font-display text-[clamp(1.3rem,2.4vw,2.4rem)] leading-[1.25] tracking-tight" data-scrub-words>${d.overview}</p>
  </div>
</section>

<!-- C. WHAT WE OFFER -->
<section class="sec !pt-0" aria-labelledby="offer-h">
  <div class="wrap">
    <p class="label mb-6">What we offer</p>
    <h2 class="h2 mb-16 max-w-[14ch]" id="offer-h" data-split>${staffing ? "Every way to add talent" : "What we deliver"}</h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-reveal-stagger>
      ${d.offer.map(([ic, t, c]) => `<article class="offer card">${icon(ic, "ico")}<h3 class="font-display text-xl leading-tight tracking-tight mb-3">${t}</h3><p class="text-dim">${c}</p></article>`).join("")}
    </div>
    ${
      staffing
        ? `<div class="mt-20"><p class="label mb-6">Roles we hire</p>${tagCloud(d.roles)}<div class="flex flex-wrap gap-3 mt-10">${btn("Hire Talent", "contact.html", "accent")}${btn("Find a Job", "careers.html", "outline")}</div></div>`
        : ""
    }
  </div>
</section>

<!-- D. PROCESS -->
${hscroll(d.process, { id: "process", label: "Process", title: "How we work, step by step." })}

${
  d.tools
    ? `<!-- E. TECH -->
<section class="sec" aria-labelledby="tech-h">
  <div class="wrap mb-12"><p class="label mb-6">Tools &amp; technology</p><h2 class="h2" id="tech-h" data-split>${d.toolsTitle}</h2></div>
  <div class="mb-4" data-marquee data-speed="0.8"><div class="marquee-track"><div class="marquee-group">${d.tools.map((t) => `<span class="tech">${t}</span>`).join("")}</div></div></div>
  <div data-marquee data-speed="0.8" data-direction="-1"><div class="marquee-track"><div class="marquee-group">${[...d.tools].reverse().map((t) => `<span class="tech">${t}</span>`).join("")}</div></div></div>
</section>`
    : ""
}

${
  d.responsible
    ? `<!-- Responsible AI -->
<section class="sec !pt-0" aria-labelledby="rai-h">
  <div class="wrap grid lg:grid-cols-[5fr_7fr] gap-12">
    <div><p class="label mb-6">Responsible AI</p><h2 class="h2" id="rai-h" data-split>AI you can trust.</h2></div>
    <div class="grid sm:grid-cols-2 gap-5" data-reveal-stagger>
      ${d.responsible.map(([ic, t, c]) => `<article class="offer card">${icon(ic, "ico")}<h3 class="font-display text-xl leading-tight tracking-tight mb-3">${t}</h3><p class="text-dim">${c}</p></article>`).join("")}
    </div>
  </div>
</section>`
    : ""
}

<!-- F. ENGAGEMENT -->
<section class="sec alt" aria-labelledby="eng-h">
  <div class="wrap">
    <p class="label mb-6">Engagement models</p>
    <h2 class="h2 mb-16 max-w-[14ch]" id="eng-h" data-split>Work with us your way.</h2>
    <div class="grid lg:grid-cols-3 gap-5 items-stretch" data-reveal-stagger>
      ${d.plans
        .map(
          ([t, sub, li], i) => `<article class="plan card ${i === d.hot ? "hot" : ""}">
        ${i === d.hot ? '<span class="tag self-start">Most popular</span>' : '<span class="tag self-start opacity-0" aria-hidden="true">·</span>'}
        <h3 class="h3 !text-[clamp(1.5rem,2.2vw,2.2rem)]">${t}</h3><p class="${i === d.hot ? "" : "text-dim"}">${sub}</p>
        <ul class="mt-2 mb-4">${li.map((x) => `<li>${x}</li>`).join("")}</ul>
        <div class="mt-auto">${btn(staffing && i === 0 ? "Hire Talent" : "Get in touch", "contact.html", i === d.hot ? "dark" : "outline")}</div>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>

<!-- G. RESULTS -->
<section class="sec !pt-0" aria-labelledby="res-h">
  <div class="wrap">
    <p class="label mb-6">Results</p>
    <h2 class="h2 mb-16" id="res-h" data-split>Outcomes, not hours.</h2>
    <div class="grid lg:grid-cols-[1fr_1fr] gap-8 items-stretch">
      <div class="grid gap-6 content-start" data-reveal-stagger>
        ${d.results.map((s) => `<div class="mini-stat">${counter(s)}<span class="small text-dim">${s.l}</span></div>`).join("")}
      </div>
      <a href="#" class="card overflow-hidden block" data-cursor="View" data-reveal>
        <div class="aspect-[16/10] overflow-hidden">${img(d.caseStudy[0], "Placeholder: " + d.caseStudy[2], 800, 500)}</div>
        <div class="p-7"><p class="label mb-3">${d.caseStudy[1]}</p><h3 class="h3 !text-[clamp(1.4rem,2.2vw,2.1rem)] mb-3">${d.caseStudy[2]}</h3><p class="text-dim">${d.caseStudy[3]}</p></div>
      </a>
    </div>
  </div>
</section>

<!-- H. FAQ -->
<section class="sec !pt-0" aria-labelledby="faq-h">
  <div class="wrap grid lg:grid-cols-[4fr_8fr] gap-12">
    <div><p class="label mb-6">FAQ</p><h2 class="h2" id="faq-h" data-split>Questions, answered.</h2></div>
    ${faq(d.faq)}
  </div>
</section>

<!-- I. RELATED -->
<section class="sec !pt-0" aria-labelledby="rel-h">
  <div class="wrap">
    <h2 class="h2 mb-16" id="rel-h" data-split>Related services</h2>
    <div class="grid md:grid-cols-3 gap-5" data-reveal-stagger>
      ${others.map((s) => `<a href="${s.slug}.html" class="rel card" style="--service:${s.color}">${icon(s.icon, "w-12 h-12 ico-svc")}<div><h3 class="font-display text-xl leading-tight tracking-tight mb-2">${s.title}</h3><p class="text-dim mb-4">${s.blurb}</p><span class="inline-flex items-center gap-1 font-bold text-hl small">Explore ${icon("arrow", "w-4 h-4")}</span></div></a>`).join("")}
    </div>
  </div>
</section>

${ctaBlock(staffing ? { title: 'Need talent? <span class="italic">Let\'s move.</span>', second: "Find a Job", secondHref: "careers.html" } : {})}
`;
    return [file, page(p, body)];
  });

export const servicesOverview = () => {
  const p = {
    key: "services",
    file: "services.html",
    title: "Services | Software, Delivery, AI & Staffing — 9Sprints",
    desc: "Explore 9Sprints services: software & product development, project & program management, AI solutions and IT staffing & recruitment.",
  };
  const body = `
<section class="relative pt-[160px] pb-[clamp(60px,8vw,120px)] overflow-clip" aria-labelledby="sv-h">
  <div class="mesh" aria-hidden="true"></div><div class="grid-lines" aria-hidden="true"></div>
  <div class="wrap relative">
    <nav aria-label="Breadcrumb" class="mb-10"><ol class="crumbs"><li><a href="index.html">Home</a></li><li aria-hidden="true">/</li><li aria-current="page" class="text-fg">Services</li></ol></nav>
    <p class="eyebrow mb-8">Services</p>
    <h1 class="h1-sm max-w-[12ch] mb-8" id="sv-h" data-split>Four ways we put you in <span class="em">motion.</span></h1>
    <p class="lead max-w-[56ch]" data-reveal>Engineering, delivery leadership, applied AI and talent — one partner, one rhythm.</p>
  </div>
</section>
<section class="sec !pt-0" aria-label="All services">
  <div class="wrap grid md:grid-cols-2 gap-5" data-reveal-stagger>
    ${SERVICES.map(
      (s) => `<a href="${s.slug}.html" class="rel card !min-h-[420px]" style="--service:${s.color}" data-cursor="View">
      <div class="flex justify-between items-start">${icon(s.icon, "w-14 h-14 ico-svc")}<span class="stack-num">${s.n}</span></div>
      <div><h2 class="h3 mb-3">${s.title}</h2><p class="text-dim mb-5 max-w-[44ch]">${s.desc}</p>
      <ul class="flex flex-wrap gap-2 mb-6">${s.tags.map((t) => `<li class="tag">${t}</li>`).join("")}</ul>
      <span class="inline-flex items-center gap-1 font-bold text-hl">Explore service ${icon("arrow", "w-5 h-5")}</span></div></a>`
    ).join("")}
  </div>
</section>
${ctaBlock()}`;
  return page(p, body);
};
