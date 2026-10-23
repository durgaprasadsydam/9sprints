// Generates the static HTML pages + placeholder assets. Run: npm run pages
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ringSvg, RING } from "./lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// ---------- vendor files (copied from node_modules so a fresh clone builds) ----------
import { copyFileSync, existsSync } from "node:fs";
const vendor = [
  ["gsap/dist/gsap.min.js", "js/vendor/gsap.min.js"],
  ["gsap/dist/ScrollTrigger.min.js", "js/vendor/ScrollTrigger.min.js"],
  ["gsap/dist/SplitText.min.js", "js/vendor/SplitText.min.js"],
  ["lenis/dist/lenis.min.js", "js/vendor/lenis.min.js"],
  ["swiper/swiper-bundle.min.js", "js/vendor/swiper-bundle.min.js"],
  ["swiper/swiper-bundle.min.css", "dist/swiper.min.css"],
];
for (const [from, to] of vendor) {
  const src = join(root, "node_modules", from);
  if (!existsSync(src)) continue;
  mkdirSync(dirname(join(root, to)), { recursive: true });
  copyFileSync(src, join(root, to));
}
const out = (rel, data) => {
  const f = join(root, rel);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, data);
};

// index.html is hand-authored (css/site.css, js/site.js); no generated pages.
const pages = [];
for (const [f, html] of pages) out(f, html);

// ---------- brand assets ----------
// NOTE: approximations of the logo (ring of six arrows + wordmark). Replace with the official files.
const wrapSvg = (inner, w, h, bg = "") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${bg}${inner}</svg>`;
const strip = (s) => s.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
const markInner = (nine) => strip(ringSvg({ nineFill: nine }));
const word = (fill) => `<text x="112" y="68" font-family="'Funnel Display',Arial,sans-serif" font-weight="800" font-style="italic" font-size="54" fill="${fill}">SPRINTS</text>`;
out("assets/logo/9sprints-mark.svg", wrapSvg(markInner("#011A39"), 100, 100));
out("assets/logo/9sprints-logo.svg", wrapSvg(markInner("#011A39") + word("#011A39"), 380, 100));
out("assets/logo/9sprints-logo-white.svg", wrapSvg(markInner("#FFFFFF") + word("#FFFFFF"), 380, 100));
out("assets/icons/favicon.svg", wrapSvg(`<g transform="translate(6 6) scale(.88)">${markInner("#FFFFFF")}</g>`, 100, 100, '<rect width="100" height="100" rx="22" fill="#011A39"/>'));

// ---------- placeholder imagery (swap for real WebP) ----------
const names = ["hero-1","hero-2","hero-3","svc-1","svc-2","svc-3","svc-4","case-1","case-2","case-3","case-4","blog-1","blog-2","blog-3","ind-1","ind-2","ind-3","ind-4","ind-5","ind-6","ind-7","av-1","av-2","av-3","av-4","og"];
const hues = Object.fromEntries(names.map((n, i) => [n, i]));
// service imagery follows the service colours
const forced = { "svc-1": 1, "svc-2": 2, "svc-3": 3, "svc-4": 5 };
const svg = (name, idx) => {
  const w = 800, ht = name.startsWith("av") ? 800 : 640;
  const ci = forced[name] ?? idx % 6;
  const c = RING[ci], c2 = RING[(ci + 2) % 6];
  const label = name.startsWith("av") ? "" : `<text x="${w / 2}" y="44" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="700" fill="#fff" fill-opacity=".7">[PLACEHOLDER] ${name}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${ht}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#010E22"/><stop offset=".55" stop-color="#011A39"/><stop offset="1" stop-color="${c}" stop-opacity=".9"/></linearGradient></defs><rect width="${w}" height="${ht}" fill="url(#g)"/><circle cx="${w * 0.72}" cy="${ht * 0.3}" r="${ht * 0.26}" fill="${c}" fill-opacity=".45"/><circle cx="${w * 0.25}" cy="${ht * 0.78}" r="${ht * 0.18}" fill="none" stroke="${c2}" stroke-opacity=".8" stroke-width="3"/><path d="M0 ${ht * 0.62} C ${w * 0.3} ${ht * 0.45}, ${w * 0.6} ${ht * 0.85}, ${w} ${ht * 0.55}" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>${label}</svg>`;
};
for (const [n, h] of Object.entries(hues)) out(`assets/img/${n}.svg`, svg(n, h));

console.log(`Generated ${pages.length} pages and ${Object.keys(hues).length} placeholder images.`);
