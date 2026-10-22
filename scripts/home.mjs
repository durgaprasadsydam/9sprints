import { SERVICES, btn, icon, img, faq, ctaBlock, page, ringSvg } from "./lib.mjs";

const PILL_WORDS = ["Software", "AI", "Delivery", "Talent"];
const rep = (arr, n = 2) => Array.from({ length: n }, () => arr).flat();

const marqueeText = (items) =>
  items.map((t, i) => `<span class="outline-text${i % 3 === 2 ? " fill" : ""}">${t}</span><span class="m-star" aria-hidden="true">✦</span>`).join("");

export const homeSteps = [
  ["01", "Discover", "Goals, users and constraints. We align on what success looks like before a line of code."],
  ["02", "Plan", "Scope, backlog and a sprint roadmap you can see, estimate and sign off."],
  ["03", "Build", "Two-week sprints with a working demo at the end of every single one."],
  ["04", "Launch", "Release, monitor and hand over — with documentation and a stable team."],
  ["05", "Scale", "Optimise, extend and staff up as the product and the user base grow."],
];

export const hscroll = (steps, { id = "process", label = "Our process", title }) => `
<section class="sec !pb-0 alt" id="${id}" aria-labelledby="${id}-h">
  <div class="wrap">
    <p class="label mb-6" data-reveal>${label}</p>
    <h2 id="${id}-h" class="h2 max-w-[16ch]" data-split>${title}</h2>
  </div>
  <div class="hs" data-hscroll>
    <div class="hs-pin">
      <div class="hs-track wrap lg:!max-w-none">
        <span class="hs-line" aria-hidden="true"></span>
        ${steps
          .map(
            ([n, t, d]) => `<article class="hs-step card" data-hs-step>
          <span class="hs-num" aria-hidden="true">${n}</span>
          <div><h3 class="h3 mb-4">${t}</h3><p class="text-dim max-w-[36ch]">${d}</p></div>
        </article>`
          )
          .join("")}
      </div>
      <div class="hs-bar" aria-hidden="true"><i></i></div>
    </div>
  </div>
</section>`;


const stepImgs = ["discover", "plan", "build", "launch", "scale"];
export const processList = (steps) => `
<section class="pl-sec" id="sprint-model" aria-labelledby="sprint-model-h">
  <div class="wrap">
    <div class="pl-head">
      <div>
        <h2 class="h2 pl-h" id="sprint-model-h" data-split>How we work<br>in <span class="em">9 sprints.</span></h2>
        <p class="pl-sub" data-reveal>Discover, build and scale — one focused sprint at a time.</p>
      </div>
      <div class="pl-cta" data-reveal>${btn("Let's talk", "contact.html", "outline")}</div>
    </div>
    <div class="pl-list" data-process-list>
      <div class="rule" data-line></div>
      ${steps
        .map(
          ([n, t, d], i) => `<article class="pl-row" tabindex="0">
        ${stepImgs[i] ? `<img class="pl-img" src="assets/img/home/${stepImgs[i]}.webp" alt="" width="400" height="400" loading="lazy" decoding="async">` : `<span class="pl-ico" aria-hidden="true">${icon("code")}</span>`}
        <h3 class="pl-title">${t}</h3>
        <p class="pl-desc">${d}</p>
      </article>
      <div class="rule" data-line></div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

const chips = ["React", "Python", "LLMs", "Cloud", "Agile", "DevOps", "Data", "QA", "Mobile"];
const chipPos = [
  "left:2%;top:4%",
  "left:36%;top:0%",
  "left:50%;top:42%",
  "left:60%;top:30%",
  "left:2%;top:50%",
  "left:40%;top:90%",
  "left:70%;top:88%",
  "left:56%;top:68%",
  "left:10%;top:92%"
];

const industries = [
  ["Healthcare", "healthcare", "ind-1"],
  ["Fintech", "fintech", "ind-2"],
  ["Retail & eCommerce", "retail-ecommerce", "ind-3"],
  ["Logistics", "logistics", "ind-4"],
  ["EdTech", "edtech", "ind-5"],
  ["SaaS", "saas", "ind-6"],
  ["Manufacturing", "manufacturing", "ind-7"],
];
const indRow = (list) =>
  rep(list, 2)
    .map(
      ([n, s, i], k) =>
        `<a class="ind-tile" href="industries.html#${s}" data-cursor="View"${k % 2 ? ' tabindex="-1"' : ""}>${img(i, n + " industry placeholder", 380, 285)}<span class="cap">${n}</span></a><a class="ind-text" href="industries.html#${s}" tabindex="-1">${n}</a>`
    )
    .join("");

const cases = [
  ["case-1", "Healthcare", "Software", "Patient portal rebuilt for scale", "40% faster release cycle"],
  ["case-2", "Fintech", "AI Solutions", "Document AI for loan underwriting", "70% less manual review"],
  ["case-3", "Logistics", "Program Mgmt", "Fleet programme brought back on track", "6 weeks recovered"],
  ["case-4", "SaaS", "Staffing", "A dedicated team of 14 in 21 days", "48-hr first shortlist"],
];

const testimonials = [
  ["Priya N.", "VP Engineering", "Northwind [PLACEHOLDER]", "9Sprints felt like an extension of our team from week one. Demos every sprint meant zero surprises at launch.", "av-1"],
  ["Daniel R.", "COO", "Lumen Health [PLACEHOLDER]", "They put structure around a messy programme and got it moving. Reporting was clear enough for our board.", "av-2"],
  ["Meera K.", "Head of Product", "Paylane [PLACEHOLDER]", "The AI prototype was in front of users in three weeks. It is now part of our daily workflow.", "av-3"],
  ["Arjun S.", "CTO", "Stackwise [PLACEHOLDER]", "We hired six engineers through them in a month. Every single one passed our own technical bar.", "av-4"],
];

const logos = ["NORTHWIND", "LUMEN", "PAYLANE", "STACKWISE", "ORBITAL", "KINETIC", "BRIGHTLY", "VERTEX", "MERIDIAN", "HALCYON"];
const logoHues = ["#ff6b6b", "#4dabf7", "#ffd43b", "#69db7c", "#da77f2", "#ff922b", "#38d9a9", "#748ffc", "#f783ac", "#a9e34b"];

const posts = [
  ["blog-1", "Engineering", "Why two-week sprints beat quarterly plans", "6 min read"],
  ["blog-2", "AI", "From demo to production: shipping your first LLM feature", "8 min read"],
  ["blog-3", "Staffing", "How to vet a senior engineer in 45 minutes", "5 min read"],
];

const why = [
  ["bolt", "Speed to start", "Kickoff in days, not months. Teams are mobilised within nine days of signing."],
  ["eye", "Transparent delivery", "Demos, burndown and reports every sprint — you always know where things stand."],
  ["crown", "Senior talent", "Vetted engineers and certified PMs, not a revolving door of juniors."],
  ["layers", "One partner", "Build, manage, automate and staff under one roof — one contract, one standard."],
  ["flex", "Flexible engagement", "Fixed scope, dedicated team or staff augmentation — and you can switch as you grow."],
];

const bento = [
  ["120", "+", "Projects delivered", "code", "software-product-development.html", ""],
  ["95", "%", "Clients who come back", "refresh", "project-program-management.html", ""],
  ["300", "+", "Engineers placed", "users", "it-staffing-recruitment.html", ""],
  ["9", "", "Days to kick off your first sprint", "bolt", "contact.html", "hot"],
];

export const home = () => {
  const p = {
    key: "home",
    file: "index.html",
    swiper: true,
    title: "9Sprints — Ship Fast. Scale Smart. In Sprints. | Software, AI, Delivery & Staffing",
    desc: "9Sprints is a technology partner for companies that need to ship: product engineering, program management, applied AI and IT staffing, run in short, measurable sprints.",
    ld: { "@context": "https://schema.org", "@type": "Organization", name: "9Sprints", url: "https://www.9sprints.com", slogan: "Ship Fast. Scale Smart. In Sprints." },
  };
  const body = `
<!-- HERO -->
<section class="hero" id="hero" aria-labelledby="hero-h">
  <div class="mesh" data-hero-bg></div><div class="grid-lines" data-hero-bg></div>
  <div class="wrap hero-main" data-hero-content>
    <div class="obj" style="left:12%;bottom:4%;width:clamp(64px,7vw,124px)" data-tile="0.05"><img class="obj-in obj-img" src="assets/img/home/plan.webp" alt="" width="400" height="400" decoding="async"></div>
    <div class="obj" style="right:6%;bottom:3%;width:clamp(76px,9vw,165px)" data-tile="-0.04"><img class="obj-in obj-img" src="assets/img/home/scale.webp" alt="" width="400" height="400" decoding="async"></div>
    <div class="hero-copy">
      <h1 class="h1" id="hero-h">
        <span class="sr-only">Design, software, AI, delivery, talent and some magic</span>
        <span class="hl-mask" data-hero-line aria-hidden="true"><span class="hl-row l1">Design,
          <span class="pill" data-marquee data-speed="0.9"><span class="marquee-track"><span class="marquee-group">${PILL_WORDS.map((w) => `<span class="pill-word">${w}</span><svg class="spark pill-spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1c.7 6.3 4.7 10.3 11 11-6.3.7-10.3 4.7-11 11-.7-6.3-4.7-10.3-11-11 6.3-.7 10.3-4.7 11-11z" fill="currentColor"/></svg>`).join("")}</span></span></span></span></span>
        <span class="hl-mask" data-hero-line aria-hidden="true"><span class="hl-row"><svg class="spark h1-spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1c.7 6.3 4.7 10.3 11 11-6.3.7-10.3 4.7-11 11-.7-6.3-4.7-10.3-11-11 6.3-.7 10.3-4.7 11-11z" fill="currentColor"/></svg><span>and some <span class="em">magic</span></span></span></span>
      </h1>
    </div>
  </div>

  <div class="wrap hero-foot" data-hero-content>
    <button type="button" class="badge-spin hidden md:grid" id="scroll-badge" data-hero-in aria-label="Scroll to services" data-scroll-to="#services">
      <svg class="badge-ring" viewBox="0 0 124 124" aria-hidden="true"><defs><path id="ring-path" d="M62 62m-48 0a48 48 0 1 1 96 0a48 48 0 1 1-96 0"/></defs><text><textPath href="#ring-path">Scroll to explore • Scroll to explore • </textPath></text></svg>
      ${ringSvg({ cls: "arrow-mark", nine: false })}
    </button>
    <div class="hero-foot-copy" data-hero-in>
      <p class="mb-6">We design, build and staff the software that moves your business forward — in focused sprints.</p>
      <div class="flex flex-wrap gap-3">${btn("Start a Project", "contact.html", "accent")}${btn("Our Services", "#services", "outline")}</div>
    </div>
    <ul class="hero-links" data-hero-in aria-label="Follow us">
      ${["LinkedIn", "GitHub", "X", "Instagram"].map((s) => `<li><a href="#"><svg class="spark link-spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1c.7 6.3 4.7 10.3 11 11-6.3.7-10.3 4.7-11 11-.7-6.3-4.7-10.3-11-11 6.3-.7 10.3-4.7 11-11z" fill="currentColor"/></svg>${s}</a></li>`).join("")}
    </ul>
    <a href="#services" class="hero-thumb" data-hero-in data-cursor="View" aria-label="Explore our services">
      ${img("home/ai-solutions.webp", "Applied AI work preview", 400, 260, { eager: true })}
      <span class="hero-thumb-btn">${icon("arrow", "w-6 h-6")}</span>
    </a>
  </div>
</section>

<!-- ABOUT VISUAL -->
<section class="about-visual" aria-label="About 9Sprints">
  <div class="wrap">
    <div class="about-frame" data-about-reveal>
      <video class="about-img" poster="assets/img/about-us.jpg" width="864" height="576" muted loop playsinline preload="metadata" aria-label="Short film about 9Sprints" data-about-video><source src="assets/img/about-video.webm" type="video/webm"></video>
    </div>
  </div>
</section>

<!-- INTRO + BENTO -->
<section class="sec" aria-labelledby="intro-h">
  <div class="wrap">
    <p class="label mb-8" data-reveal id="intro-h">Who we are</p>
    <p class="font-display text-[28px] md:text-[40px] leading-[1.25] tracking-tight max-w-[34ch] md:max-w-[42ch]" data-scrub-words>9Sprints is a technology partner for companies that need to ship. We bring engineering, delivery leadership, applied AI and the right people together and run it all in short, measurable sprints.</p>
    <div class="bento-grid" data-reveal-stagger>
      <article class="bn bn-a">
        <img class="bn-img bn-star" src="assets/img/home/star-icon.webp" alt="" width="800" height="800" loading="lazy" decoding="async">
        <div class="bn-text bn-text-r">
          <div class="num"><span data-counter="120" data-suffix="+">120+</span></div>
          <p>Projects delivered</p>
        </div>
        <a href="software-product-development.html" class="pill-link bn-btn bn-btn-r">Services ${icon("arrow", "w-4 h-4")}</a>
      </article>

      <article class="bn bn-b">
        <img class="bn-img bn-people" src="assets/img/home/peoples.webp" alt="" width="1100" height="733" loading="lazy" decoding="async">
        <div class="bn-text bn-text-r bn-b-text">
          <div class="num"><span data-counter="95" data-suffix="%">95%</span></div>
          <p>Clients come back for new projects</p>
        </div>
        <a href="contact.html" class="pill-link bn-btn bn-btn-r">Contact us ${icon("arrow", "w-4 h-4")}</a>
      </article>

      <article class="bn bn-c">
        <div class="bn-text">
          <div class="num"><span data-counter="300" data-suffix="+">300+</span></div>
          <p>Engineers placed across product, data and AI teams</p>
        </div>
        <img class="bn-img bn-eng" src="assets/img/home/engineers-placed.webp" alt="" width="1100" height="733" loading="lazy" decoding="async">
        <a href="it-staffing-recruitment.html" class="pill-link bn-btn">Hire talent ${icon("arrow", "w-4 h-4")}</a>
      </article>

      <article class="bn bn-d">
        <div class="bn-text">
          <div class="num"><span data-counter="9" data-suffix="">9</span></div>
          <p>Days to kick off your first sprint</p>
        </div>
        <img class="bn-img bn-days" src="assets/img/home/9days-sprint.webp" alt="" width="400" height="400" loading="lazy" decoding="async">
        <a href="contact.html" class="pill-link bn-btn">Contact ${icon("arrow", "w-4 h-4")}</a>
      </article>
    </div>
  </div>
</section>

<!-- MARQUEE -->
<section class="py-10 border-y border-line overflow-hidden" aria-label="What we do">
  <div data-marquee data-speed="1"><div class="marquee-track"><div class="marquee-group">${marqueeText(rep(["Product Engineering", "Program Delivery", "Applied AI", "IT Staffing", "Cloud", "Data"], 1))}</div></div></div>
</section>

<!-- SERVICES: sticky heading + scrolling cards -->
<section class="sec" id="services" aria-labelledby="svc-h">
  <div class="wrap svc-split">
    <div class="svc-side">
      <p class="label mb-6" data-reveal>Services</p>
      <h2 class="h2" id="svc-h" data-split>What we put into <span class="em">motion</span></h2>
      <p class="text-dim max-w-[34ch] mt-6 mb-8" data-reveal>Four capabilities, one delivery rhythm. Use them together or on their own.</p>
      <div data-reveal>${btn("All services", "services.html", "outline")}</div>
    </div>
    <div class="svc-list">
      ${SERVICES.map(
        (s) => `<a href="${s.slug}.html" class="svc-item" style="--service:${s.color}" data-cursor="View">
        <div class="svc-media" data-img-reveal>
          ${img(s.img, "Placeholder illustration for " + s.title, 760, 640)}
          <ul class="svc-tags" aria-label="Capabilities">${s.tags.slice(0, 4).map((t) => `<li>${t}</li>`).join("")}</ul>
        </div>
        <p class="svc-cap"><strong>${s.title}</strong> ${s.short}</p>
      </a>`
      ).join("")}
    </div>
  </div>
</section>

<!-- PROCESS -->
${processList(homeSteps)}

<!-- AI SPOTLIGHT -->
<section class="sec !pt-[clamp(24px,3vw,48px)]" aria-labelledby="ai-h">
  <div class="wrap">
    <div class="ai-card grid lg:grid-cols-2 gap-12 items-center" data-reveal>
      <div>
        <p class="label mb-6">AI Solutions</p>
        <h2 class="h2 mb-8" id="ai-h">AI that <span class="em">ships,</span> not just demos.</h2>
        <ul class="space-y-4 mb-10 text-lg">
          ${["Automate repetitive work", "Unlock your data", "Add copilots to your product"]
            .map((t) => `<li class="flex gap-3 items-start"><span class="mt-1 grid place-items-center size-6 rounded-full grad-bg shrink-0">${icon("star", "w-3.5 h-3.5")}</span>${t}</li>`)
            .join("")}
        </ul>
        ${btn("See AI Solutions", "ai-solutions.html", "primary")}
      </div>
      <div class="chat" data-chat aria-label="Example AI assistant conversation">
        <div class="chat-msg u" data-text="Summarise this week's 212 support tickets and flag anything urgent."></div>
        <div class="chat-msg a" data-text="Done. 9 tickets are urgent — 6 about login failures after Tuesday's release. Drafted replies are ready for review."></div>
        <div class="chat-flow" aria-hidden="true"><span>Read tickets</span>→<span>Classify</span>→<span>Draft replies</span>→<span class="ok">Human review ✓</span></div>
      </div>
    </div>
  </div>
</section>

<!-- WHY -->
<section class="sec alt" aria-labelledby="why-h">
  <div class="wrap grid lg:grid-cols-[5fr_7fr] gap-12">
    <div class="lg:sticky lg:top-32 self-start">
      <h2 class="h2 mb-10" id="why-h" data-split>Why teams choose 9Sprints</h2>
      ${btn("Let's talk", "contact.html", "primary")}
    </div>
    <div>
      ${why
        .map(
          ([ic, t, d]) => `<div><div class="rule" data-line></div><div class="why-item" data-reveal><span class="why-ico">${icon(ic)}</span><div><h3 class="h3 !text-[clamp(1.4rem,2.2vw,2.2rem)] mb-2">${t}</h3><p class="text-dim">${d}</p></div></div></div>`
        )
        .join("")}
      <div class="rule" data-line></div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="sec t-sec overflow-hidden" aria-labelledby="t-h">
  <div class="wrap grid lg:grid-cols-[4fr_8fr] gap-x-[clamp(2rem,6vw,6rem)] gap-y-14 items-start">
    <div>
      <h2 class="h2 mb-8 max-w-[10ch]" id="t-h" data-split>What clients say</h2>
      <p class="text-dim mb-10 max-w-[34ch]" data-reveal>Long-term relationships are how we measure ourselves.</p>
      <div class="inline-flex items-center gap-3 card px-5 py-3" data-reveal><span class="text-hl" aria-hidden="true">★★★★★</span><span class="small font-bold">4.9 on Clutch [PLACEHOLDER]</span></div>
      <div class="flex gap-3 mt-10"><button type="button" class="icon-btn" id="t-prev" aria-label="Previous testimonial"><span class="rotate-[-135deg] inline-block">${icon("arrow")}</span></button><button type="button" class="icon-btn" id="t-next" aria-label="Next testimonial"><span class="rotate-45 inline-block">${icon("arrow")}</span></button></div>
    </div>
    <div class="swiper min-w-0 w-full" id="t-swiper" data-cursor="Drag" aria-label="Client testimonials">
      <div class="swiper-wrapper">
        ${testimonials
          .map(
            ([n, r, c, q, av]) => `<div class="swiper-slide !h-auto"><figure class="t-card card h-full">
          <blockquote class="font-display text-[clamp(1.1rem,1.6vw,1.5rem)] leading-snug tracking-tight">“${q}”</blockquote>
          <figcaption class="flex items-center gap-4">${img(av, "Portrait placeholder of " + n, 52, 52, { cls: "avatar" })}<div><strong>${n}</strong><p class="small text-dim">${r}, ${c}</p></div></figcaption>
        </figure></div>`
          )
          .join("")}
      </div>
    </div>
  </div>
</section>

<!-- INSIGHTS -->
<section class="sec ins-sec" aria-labelledby="blog-h">
  <div class="wrap">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[clamp(3rem,6vw,6rem)]">
      <h2 class="h2" id="blog-h" data-split>Latest insights</h2>
      ${btn("All articles", "#", "outline")}
    </div>
    <div class="grid md:grid-cols-3 gap-8" data-reveal-stagger>
      ${posts
        .map(
          ([im, cat, t, rt]) => `<a href="#" class="blog block"><div class="blog-img">${img(im, "Placeholder cover for article: " + t, 640, 440)}</div>
        <div class="flex items-center gap-3 mt-5"><span class="tag">${cat}</span><span class="small text-dim">${rt}</span></div>
        <h3 class="font-display text-xl leading-snug tracking-tight mt-4">${t}</h3></a>`
        )
        .join("")}
    </div>
  </div>
</section>

${ctaBlock()}
`;
  return page(p, body);
};
