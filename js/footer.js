// Footer interactions:
//  - the giant wordmark fills with a WebGL fluid smoke simulation (clipped to the letters) that follows the cursor
//  - the main button is magnetic
//  - the newsletter form validates and confirms inline
//  - a live Hyderabad clock
(() => {
  const ftr = document.getElementById("footer");
  if (!ftr) return;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (calm) return;

  // --- magnetic CTA ---
  const mag = ftr.querySelector("[data-magnetic]");
  if (mag && typeof gsap !== "undefined") {
    const qx = gsap.quickTo(mag, "x", { duration: 0.5, ease: "power3.out" });
    const qy = gsap.quickTo(mag, "y", { duration: 0.5, ease: "power3.out" });
    ftr.addEventListener("pointermove", (e) => {
      const r = mag.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      if (d < 150) { qx(dx * 0.28); qy(dy * 0.28); } else { qx(0); qy(0); }
    });
    ftr.addEventListener("pointerleave", () => { qx(0); qy(0); });
  }


  // --- wordmark smoke: WebGL fluid simulation (stable fluids), clipped to the letter shapes by a CSS mask ---
  const word = document.getElementById("ftr-word");
  if (!word) return;
  const spans = [...word.querySelectorAll("span")];
  const probes = spans.map((s) => { const p = document.createElement("i"); p.style.cssText = "display:inline-block;width:0;height:0"; s.appendChild(p); return p; });
  const cv = document.createElement("canvas"); cv.className = "ftr-smoke"; word.appendChild(cv);
  const gl = cv.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
  if (!gl || !gl.getExtension("EXT_color_buffer_float")) { cv.remove(); return; }

  const CFG = { dyeDecay: 0.7, velDecay: 0.25, pressure: 0.8, iters: 20, curl: 28, radius: 0.17, force: 6000 };
  const PALETTE = [[0.04, 0.42, 1.0], [0.01, 0.82, 0.96], [0.0, 0.3, 0.95], [0.27, 0.92, 0.68]];

  const VS = `#version 300 es
in vec2 aPosition; out vec2 vUv, vL, vR, vT, vB; uniform vec2 texelSize;
void main(){ vUv = aPosition * .5 + .5; vL = vUv - vec2(texelSize.x, 0.); vR = vUv + vec2(texelSize.x, 0.); vT = vUv + vec2(0., texelSize.y); vB = vUv - vec2(0., texelSize.y); gl_Position = vec4(aPosition, 0., 1.); }`;
  const FS = (body, uniforms = "") => `#version 300 es
precision highp float; precision highp sampler2D;
in vec2 vUv, vL, vR, vT, vB; out vec4 o; ${uniforms}
void main(){ ${body} }`;
  const SRC = {
    clear: FS("o = value * texture(uTexture, vUv);", "uniform sampler2D uTexture; uniform float value;"),
    splat: FS("vec2 p = vUv - point; p.x *= aspect; o = vec4(texture(uTarget, vUv).xyz + exp(-dot(p, p) / radius) * color, 1.);", "uniform sampler2D uTarget; uniform float aspect, radius; uniform vec3 color; uniform vec2 point;"),
    advect: FS("vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize; o = texture(uSource, coord) / (1. + dissipation * dt);", "uniform sampler2D uVelocity, uSource; uniform vec2 texelSize; uniform float dt, dissipation;"),
    divergence: FS("float L = texture(uVelocity, vL).x, R = texture(uVelocity, vR).x, T = texture(uVelocity, vT).y, B = texture(uVelocity, vB).y; vec2 C = texture(uVelocity, vUv).xy; if (vL.x < 0.) L = -C.x; if (vR.x > 1.) R = -C.x; if (vT.y > 1.) T = -C.y; if (vB.y < 0.) B = -C.y; o = vec4(.5 * (R - L + T - B), 0., 0., 1.);", "uniform sampler2D uVelocity;"),
    curl: FS("float L = texture(uVelocity, vL).y, R = texture(uVelocity, vR).y, T = texture(uVelocity, vT).x, B = texture(uVelocity, vB).x; o = vec4(.5 * (R - L - T + B), 0., 0., 1.);", "uniform sampler2D uVelocity;"),
    vorticity: FS("float L = texture(uCurl, vL).x, R = texture(uCurl, vR).x, T = texture(uCurl, vT).x, B = texture(uCurl, vB).x, C = texture(uCurl, vUv).x; vec2 f = .5 * vec2(abs(T) - abs(B), abs(R) - abs(L)); f /= length(f) + .0001; f *= curl * C; f.y *= -1.; vec2 v = texture(uVelocity, vUv).xy + f * dt; o = vec4(clamp(v, -1000., 1000.), 0., 1.);", "uniform sampler2D uVelocity, uCurl; uniform float curl, dt;"),
    pressure: FS("float L = texture(uPressure, vL).x, R = texture(uPressure, vR).x, T = texture(uPressure, vT).x, B = texture(uPressure, vB).x; o = vec4((L + R + B + T - texture(uDivergence, vUv).x) * .25, 0., 0., 1.);", "uniform sampler2D uPressure, uDivergence;"),
    gradient: FS("float L = texture(uPressure, vL).x, R = texture(uPressure, vR).x, T = texture(uPressure, vT).x, B = texture(uPressure, vB).x; vec2 v = texture(uVelocity, vUv).xy - vec2(R - L, T - B); o = vec4(v, 0., 1.);", "uniform sampler2D uPressure, uVelocity;"),
    display: FS("vec3 d = clamp(texture(uTexture, vUv).rgb, 0., 1.); vec3 c = pow(d, vec3(.75)) * 1.15; float a = smoothstep(0., .85, max(d.r, max(d.g, d.b))); o = vec4(min(c, vec3(a)), a);", "uniform sampler2D uTexture;"),
  };

  let progs, quad, velocity, dye, pressure, divergenceT, curlT, W = 0, H = 0, dpr = 1;
  try {
    const compile = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const vs = compile(gl.VERTEX_SHADER, VS);
    progs = {};
    for (const [name, src] of Object.entries(SRC)) {
      const p = gl.createProgram();
      gl.attachShader(p, vs); gl.attachShader(p, compile(gl.FRAGMENT_SHADER, src));
      gl.bindAttribLocation(p, 0, "aPosition"); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
      const u = {};
      for (let i = 0, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS); i < n; i++) { const nm = gl.getActiveUniform(p, i).name; u[nm] = gl.getUniformLocation(p, nm); }
      progs[name] = { p, u };
    }
    quad = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  } catch (err) { cv.remove(); return; }

  const makeFBO = (w, h) => {
    const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
    for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
    const fbo = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    return { tex, fbo, w, h, texel: [1 / w, 1 / h] };
  };
  const makeDouble = (w, h) => { let a = makeFBO(w, h), b = makeFBO(w, h); return { get read() { return a; }, get write() { return b; }, swap() { [a, b] = [b, a]; } }; };
  const bind = (t, unit) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t.tex || t); return unit; };
  const blit = (target) => {
    if (target) { gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo); gl.viewport(0, 0, target.w, target.h); }
    else { gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, cv.width, cv.height); }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  const use = (name, texel) => { const pr = progs[name]; gl.useProgram(pr.p); if (texel && pr.u.texelSize) gl.uniform2f(pr.u.texelSize, texel[0], texel[1]); return pr.u; };

  const initSim = () => {
    const aspect = W / H, sw = 256, sh = Math.max(24, Math.round(sw / aspect));
    const dw = 1024, dh = Math.max(64, Math.round(dw / aspect));
    velocity = makeDouble(sw, sh); pressure = makeDouble(sw, sh); dye = makeDouble(dw, dh);
    divergenceT = makeFBO(sw, sh); curlT = makeFBO(sw, sh);
  };

  const step = (dt) => {
    const t = velocity.read.texel;
    let u = use("curl", t); gl.uniform1i(u.uVelocity, bind(velocity.read, 0)); blit(curlT);
    u = use("vorticity", t); gl.uniform1i(u.uVelocity, bind(velocity.read, 0)); gl.uniform1i(u.uCurl, bind(curlT, 1)); gl.uniform1f(u.curl, CFG.curl); gl.uniform1f(u.dt, dt); blit(velocity.write); velocity.swap();
    u = use("divergence", t); gl.uniform1i(u.uVelocity, bind(velocity.read, 0)); blit(divergenceT);
    u = use("clear", t); gl.uniform1i(u.uTexture, bind(pressure.read, 0)); gl.uniform1f(u.value, CFG.pressure); blit(pressure.write); pressure.swap();
    u = use("pressure", t); gl.uniform1i(u.uDivergence, bind(divergenceT, 1));
    for (let i = 0; i < CFG.iters; i++) { gl.uniform1i(u.uPressure, bind(pressure.read, 0)); blit(pressure.write); pressure.swap(); }
    u = use("gradient", t); gl.uniform1i(u.uPressure, bind(pressure.read, 0)); gl.uniform1i(u.uVelocity, bind(velocity.read, 1)); blit(velocity.write); velocity.swap();
    u = use("advect", t); gl.uniform1i(u.uVelocity, bind(velocity.read, 0)); gl.uniform1i(u.uSource, bind(velocity.read, 0)); gl.uniform1f(u.dt, dt); gl.uniform1f(u.dissipation, CFG.velDecay); blit(velocity.write); velocity.swap();
    gl.uniform1i(u.uVelocity, bind(velocity.read, 0)); gl.uniform1i(u.uSource, bind(dye.read, 1)); gl.uniform1f(u.dissipation, CFG.dyeDecay); blit(dye.write); dye.swap();
  };
  const render = () => { const u = use("display"); gl.uniform1i(u.uTexture, bind(dye.read, 0)); blit(null); };

  const splat = (x, y, dx, dy, color) => {
    const u = use("splat");
    gl.uniform1f(u.aspect, W / H); gl.uniform2f(u.point, x, y); gl.uniform1f(u.radius, CFG.radius * CFG.radius);
    gl.uniform1i(u.uTarget, bind(velocity.read, 0)); gl.uniform3f(u.color, dx, dy, 0); blit(velocity.write); velocity.swap();
    gl.uniform1i(u.uTarget, bind(dye.read, 0)); gl.uniform3f(u.color, color[0], color[1], color[2]); blit(dye.write); dye.swap();
  };

  // glyph mask: draw the letters on a 2D canvas, hand it to the GL canvas as a CSS mask
  const build = () => {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    const wr = word.getBoundingClientRect();
    W = Math.max(1, Math.round(wr.width)); H = Math.max(1, Math.round(wr.height));
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    const mask = document.createElement("canvas"); mask.width = cv.width; mask.height = cv.height;
    const m = mask.getContext("2d"); m.setTransform(dpr, 0, 0, dpr, 0, 0); m.fillStyle = "#000";
    spans.forEach((s, i) => {
      const cs = getComputedStyle(s), r = s.getBoundingClientRect();
      m.font = cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily; m.textBaseline = "alphabetic";
      m.fillText(s.dataset.l, r.left - wr.left, probes[i].getBoundingClientRect().bottom - wr.top);
    });
    const url = "url(" + mask.toDataURL() + ")";
    for (const k of ["maskImage", "webkitMaskImage"]) cv.style[k] = url;
    for (const k of ["maskSize", "webkitMaskSize"]) cv.style[k] = "100% 100%";
    initSim();
  };

  let raf = 0, prevT = 0, activeUntil = 0, last = null;
  const frame = (now) => {
    raf = 0;
    const dt = Math.min((now - prevT) / 1000, 1 / 30) || 1 / 60; prevT = now;
    step(dt); render();
    if (now < activeUntil) raf = requestAnimationFrame(frame);
  };
  const wake = () => { activeUntil = performance.now() + 7000; if (!raf) { prevT = performance.now(); raf = requestAnimationFrame(frame); } };

  word.addEventListener("pointermove", (e) => {
    if (!velocity) return;
    const r = word.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    if (last) {
      const dx = x - last.x, dy = y - last.y, n = Math.max(1, Math.min(6, (Math.hypot(dx, dy) / 20) | 0));
      const ph = performance.now() / 1400, i0 = Math.floor(ph) % 4, f = ph - Math.floor(ph), A = PALETTE[i0], B = PALETTE[(i0 + 1) % 4];
      const col = [0, 1, 2].map((k) => (A[k] + (B[k] - A[k]) * f) * 0.13);
      for (let s = 1; s <= n; s++) {
        const px = last.x + dx * s / n, py = last.y + dy * s / n;
        splat(px / W, 1 - py / H, (dx / n) / W * CFG.force, -(dy / n) / W * CFG.force, col);
      }
      wake();
    }
    last = { x, y };
  });
  word.addEventListener("pointerleave", () => { last = null; });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);
  addEventListener("resize", () => { build(); });
})();
