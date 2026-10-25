(() => {
// Hero background: slow, flowing "silk" in brand navy / blue / cyan, drawn by a fragment shader.
// Loaded lazily from site.js; if WebGL is unavailable the CSS gradient underneath stays.
const host = document.getElementById("hero-canvas");
const hero = host.closest(".hero");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

const canvas = document.createElement("canvas");
// try the preferred options first, then progressively plainer ones (some drivers refuse "low-power")
const gl = [["webgl", { antialias: false, alpha: false, powerPreference: "low-power" }], ["webgl", { alpha: false }], ["webgl", undefined], ["experimental-webgl", undefined]]
  .map(([k, o]) => { try { return canvas.getContext(k, o); } catch (e) { return null; } })
  .find(Boolean);
if (!gl) {
  // no WebGL (hardware acceleration off / GPU blocklisted): use the CSS-only animated background
  hero.classList.add("no-gl");
  return;
}

const vs = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
const fs = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r; uniform float t; uniform vec2 m; uniform float fl;

float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1., 0.)), f.x), mix(h(i + vec2(0., 1.)), h(i + vec2(1., 1.)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0., a = .5;
  for (int i = 0; i < 4; i++) { v += a * n(p); p = p * 2.02 + 7.3; a *= .5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / r;
  vec2 p = (uv - .5) * vec2(r.x / r.y, 1.) * 1.9 + m * .12;
  float s = t * .05;

  vec2 q = vec2(fbm(p + vec2(0., s)), fbm(p + vec2(5.2, 1.3) - s));
  vec2 w = vec2(fbm(p + 3. * q + vec2(1.7, 9.2) + .6 * s), fbm(p + 3. * q + vec2(8.3, 2.8) - .5 * s));
  float f = fbm(p + 3. * w);

  // silk folds: thin bright ridges that follow the warped field
  float fold = sin(p.x * 1.4 + p.y * 1.1 + f * 4.2 + s * 4.);
  float ridge = pow(1. - abs(fold), 4.);
  float body = smoothstep(.25, .85, f);

  vec3 base = vec3(.004, .055, .135);   // #010e22-ish
  vec3 mid  = vec3(.039, .165, .322);   // #0a2a52
  vec3 blue = vec3(.008, .322, .945);   // #0252f1
  vec3 cyan = vec3(.012, .82, .965);    // #03d1f6
  vec3 mint = vec3(.27, .92, .68);      // #45eaae

  vec3 col = mix(base, mid, smoothstep(.15, .8, f));
  col += blue * body * .22;
  col += mix(cyan, mint, smoothstep(.4, .9, q.x)) * ridge * body * .5;
  col += cyan * pow(body, 3.) * .06;

  // keep the left (text) side calm, open up the right
  col *= mix(.55, 1., smoothstep(.05, .85, uv.x));
  // soft vignette + gentle fade at the bottom so the hero melts into the page
  col *= 1. - .35 * length(uv - vec2(.6, .55));
  col *= mix(.8, 1., smoothstep(0., .25, uv.y));
  // bottom: let the silk brighten through blue into the page white (no grey in between)
  float fw = 1. - smoothstep(0., fl, uv.y);
  fw = fw * fw * (3. - 2. * fw);
  vec3 tint = mix(vec3(.40, .70, 1.), vec3(1.), smoothstep(.45, 1., fw));
  col = mix(col, tint, fw);
  col += (h(gl_FragCoord.xy + t) - .5) * .012 * (1. - fw); // dither, avoids banding
  gl_FragColor = vec4(col, 1.);
}`;

const sh = (type, src) => {
  const o = gl.createShader(type);
  gl.shaderSource(o, src);
  gl.compileShader(o);
  if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o));
  return o;
};
let U;
// (re)build the GL program + buffer; also used after the browser restores a lost context
const setup = () => {
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  U = { fl: gl.getUniformLocation(prog, "fl"), r: gl.getUniformLocation(prog, "r"), t: gl.getUniformLocation(prog, "t"), m: gl.getUniformLocation(prog, "m") };
};
setup();

host.appendChild(canvas);

// render at reduced resolution: it is a soft background, and this keeps it cheap
const resize = () => {
  if (!host.clientWidth || !host.clientHeight) return;
  const k = Math.min(devicePixelRatio || 1, 1.5) * (matchMedia("(max-width: 768px)").matches ? 0.45 : 0.6);
  canvas.width = Math.max(2, Math.round(host.clientWidth * k));
  canvas.height = Math.max(2, Math.round(host.clientHeight * k));
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform2f(U.r, canvas.width, canvas.height);
  gl.uniform1f(U.fl, Math.min(0.9, 470 / host.clientHeight));
  if (reduce) draw(7);
};

let mx = 0, my = 0, tx = 0, ty = 0;
const draw = (t) => {
  gl.uniform1f(U.t, t);
  gl.uniform2f(U.m, tx, ty);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

let visible = true, raf = 0, clock = 12, last = performance.now();
const frame = (now) => {
  raf = 0;
  if (!visible || document.hidden) return;
  clock += Math.min(0.05, (now - last) / 1000);
  last = now;
  tx += (mx - tx) * 0.03;
  ty += (my - ty) * 0.03;
  draw(clock);
  raf = requestAnimationFrame(frame);
};
const kick = () => { if (!raf && !reduce) { last = performance.now(); raf = requestAnimationFrame(frame); } };

resize();
addEventListener("resize", resize);
// layout can settle after load (fonts, images, smooth scroll): follow the host's real size
if ("ResizeObserver" in window) new ResizeObserver(() => { resize(); draw(clock); }).observe(host);
draw(clock);
hero.classList.add("ready");

// GPU context lost (many tabs, page switches): stop, then rebuild when the browser restores it
canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); if (raf) cancelAnimationFrame(raf); raf = 0; });
canvas.addEventListener("webglcontextrestored", () => { setup(); resize(); draw(clock); kick(); });
// coming back via the Back button: make sure the canvas is drawn and running again
addEventListener("pageshow", (e) => { if (e.persisted) { resize(); draw(clock); kick(); } });

if (!reduce) {
  hero.addEventListener("pointermove", (e) => {
    const b = hero.getBoundingClientRect();
    mx = (e.clientX - b.left) / b.width - 0.5;
    my = -((e.clientY - b.top) / b.height - 0.5);
  });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(hero);
  document.addEventListener("visibilitychange", kick);
  kick();
}
})();
