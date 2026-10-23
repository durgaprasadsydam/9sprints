// Hero centrepiece: a hollow branching "vessel" made of instanced glossy spheres.
// Loaded lazily from site.js; failure leaves the CSS/SVG fallback in place.
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const host = document.getElementById("hero-canvas");
const hero = host.closest(".hero");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const small = matchMedia("(max-width: 768px)").matches;
const COUNT = small ? 2400 : 6000;

const renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
host.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x2b1e8c, 16, 34); // far particles sink into the background
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
const group = new THREE.Group();
scene.add(group);

scene.add(new THREE.HemisphereLight(0xcdbfff, 0x3a2ab8, 1.1));
const key = new THREE.DirectionalLight(0xffe0b0, 2.6);
key.position.set(5, 8, 9);
scene.add(key);
const rim = new THREE.DirectionalLight(0x9a86ff, 1.4);
rim.position.set(-8, -3, -4);
scene.add(rim);

// ---- paths: one trunk entering from the left, then a Y-split rising to the top-right ----
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const trunk = [V(-13, -2.8, 0), V(-8.5, -3.1, -0.6), V(-4, -2.6, 0.4), V(-0.5, -1.8, 0), V(2, -1, 0)];
const branchA = [V(4.2, 0.6, -0.4), V(6.2, 2.8, 0.5), V(8.6, 5, 0), V(12, 7.4, 0)];
const branchB = [V(4.4, -1.2, 0.4), V(6.6, -0.5, -0.3), V(9.2, 0.9, 0.2), V(12.5, 2.2, 0)];
const SAMPLES = 700;
const split = V(2, -1, 0);

const makePath = (branch) => {
  const curve = new THREE.CatmullRomCurve3([...trunk, ...branch], false, "catmullrom", 0.5);
  const pts = curve.getSpacedPoints(SAMPLES);
  const fr = curve.computeFrenetFrames(SAMPLES, false);
  let splitIdx = 0, best = Infinity;
  pts.forEach((p, i) => { const d = p.distanceTo(split); if (d < best) { best = d; splitIdx = i; } });
  return { pts, n: fr.normals, b: fr.binormals, splitU: splitIdx / SAMPLES };
};
const paths = [makePath(branchA), makePath(branchB)];
const radiusAt = (u, splitU) => (u < splitU ? 0.95 : 0.95 - 0.33 * Math.min(1, (u - splitU) / 0.08));

// ---- particles ----
const shell = [0x6b4eff, 0x6b4eff, 0x7a5cff, 0xb9a6ff, 0xb9a6ff];
const warm = [0xffd86b, 0xff9a4d, 0xff6b6b, 0xffd86b];
const geo = new THREE.SphereGeometry(1, small ? 8 : 12, small ? 6 : 10);
const mat = new THREE.MeshStandardMaterial({ roughness: 0.22, metalness: 0.05 });
const mesh = new THREE.InstancedMesh(geo, mat, COUNT);
group.add(mesh);

const P = [];
const col = new THREE.Color();
for (let i = 0; i < COUNT; i++) {
  const pi = i % 2;
  let u = Math.random();
  if (pi === 1 && u < paths[1].splitU) u = paths[1].splitU + Math.random() * (1 - paths[1].splitU);
  const inner = Math.random() > 0.72;
  const r = inner ? Math.random() * 0.55 : 0.86 + Math.random() * 0.16;
  const white = !inner && Math.random() < 0.035;
  const c = white ? 0xffffff : inner || Math.random() < 0.08 ? warm[(Math.random() * warm.length) | 0] : shell[(Math.random() * shell.length) | 0];
  col.setHex(c);
  mesh.setColorAt(i, col);
  P.push({
    pi, u, r, th: Math.random() * Math.PI * 2,
    s: (inner ? 0.035 : 0.05) + Math.random() * (inner ? 0.05 : 0.07),
    v: 0.012 + Math.random() * 0.012,
    ph: Math.random() * 6.28,
  });
}
mesh.instanceColor.needsUpdate = true;

const dummy = new THREE.Object3D();
const place = (t, dt) => {
  for (let i = 0; i < COUNT; i++) {
    const p = P[i], path = paths[p.pi];
    p.u = (p.u + p.v * dt) % 1;
    const k = Math.min(SAMPLES, (p.u * SAMPLES) | 0);
    const R = radiusAt(p.u, path.splitU) * p.r;
    const c = Math.cos(p.th) * R, s = Math.sin(p.th) * R;
    const pt = path.pts[k], n = path.n[k], b = path.b[k];
    const j = Math.sin(t * 1.3 + p.ph) * 0.018;
    dummy.position.set(pt.x + n.x * c + b.x * s + j, pt.y + n.y * c + b.y * s + j, pt.z + n.z * c + b.z * s);
    dummy.scale.setScalar(p.s);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
};

// ---- sizing ----
const resize = () => {
  const w = hero.clientWidth, h = hero.clientHeight;
  renderer.setSize(w, h);
  const aspect = w / h;
  camera.aspect = aspect;
  camera.position.set(0, 0, Math.max(14, 13.7 / aspect));
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  group.position.y = aspect < 1 ? -1.2 : 0;
  if (reduce) renderer.render(scene, camera);
};
resize();
addEventListener("resize", resize);

// ---- loop ----
let mx = 0, my = 0, tx = 0, ty = 0, visible = true, last = performance.now(), t = 0, raf = 0;
hero.addEventListener("pointermove", (e) => {
  const r = hero.getBoundingClientRect();
  mx = (e.clientX - r.left) / r.width - 0.5;
  my = (e.clientY - r.top) / r.height - 0.5;
});
const frame = (now) => {
  raf = 0;
  if (!visible || document.hidden) return;
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now; t += dt;
  tx += (mx - tx) * 0.04; ty += (my - ty) * 0.04;
  group.rotation.y = tx * 0.1;  // ~3deg either way
  group.rotation.x = ty * 0.07;
  group.position.y = (camera.aspect < 1 ? -1.2 : 0) + Math.sin(t * 0.45) * 0.14;
  place(t, dt);
  renderer.render(scene, camera);
  raf = requestAnimationFrame(frame);
};
const kick = () => { if (!raf && !reduce) { last = performance.now(); raf = requestAnimationFrame(frame); } };

place(0, 0);
renderer.render(scene, camera);
hero.classList.add("ready");

if (!reduce) {
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(hero);
  document.addEventListener("visibilitychange", kick);
  kick();
}
