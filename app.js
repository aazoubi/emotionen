/* Scroll engine, ocean canvas, ROV lamp, tree colour, HUD, navigation, modal, motion toggle.
   Vanilla JS, no dependencies. */
(function () {
  const D = window.OCEAN_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const NS = 'http://www.w3.org/2000/svg';
  const nf = new Intl.NumberFormat('de-DE');
  const nf1 = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2 });
  const root = document.documentElement;
  const finePointer = matchMedia('(pointer: fine)').matches;

  /* ── Reduce motion ─────────────────────────────────────── */
  const stored = localStorage.getItem('reduceMotion');
  let reduced = stored === null ? matchMedia('(prefers-reduced-motion: reduce)').matches : stored === '1';
  const toggle = $('#motion-toggle');
  function applyMotion() {
    root.classList.toggle('reduced', reduced);
    toggle.setAttribute('aria-pressed', String(reduced));
    $('.motion-toggle__label', toggle).textContent = reduced ? 'Bewegung reduziert' : 'Bewegung reduzieren';
    resetParallax();
    needsDraw = true;
  }
  toggle.addEventListener('click', () => {
    reduced = !reduced;
    localStorage.setItem('reduceMotion', reduced ? '1' : '0');
    applyMotion();
  });

  /* ── Generated creature art (one consistent line style) ── */
  const svgEl = (tag, attrs) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  (function school() {
    const s = $('.school');
    for (let i = 0; i < 46; i++) {
      const a = rnd() * Math.PI * 2, rad = Math.sqrt(rnd());
      const g = svgEl('g', { transform: `translate(${(210 + Math.cos(a) * rad * 180).toFixed(1)} ${(100 + Math.sin(a) * rad * 70).toFixed(1)}) scale(${(0.7 + rnd() * 0.6).toFixed(2)})` });
      const fish = svgEl('path', { class: 'fish', d: 'M0 0C6 -4.5 16 -4.5 22 0C16 4.5 6 4.5 0 0ZM21 0L29 -5.5L28 0L29 5.5Z' });
      fish.style.animationDelay = `${(-rnd() * 3).toFixed(2)}s`;
      g.appendChild(fish); s.appendChild(g);
    }
  })();
  (function siphono() {
    const s = $('.siphono');
    s.appendChild(svgEl('ellipse', { cx: 60, cy: 18, rx: 7, ry: 12 }));
    for (let i = 0; i < 6; i++) {
      const y = 40 + i * 17;
      s.appendChild(svgEl('path', { d: `M60 ${y} C 44 ${y - 4}, 38 ${y + 10}, 50 ${y + 14} L 60 ${y + 10} Z` }));
      s.appendChild(svgEl('path', { d: `M60 ${y} C 76 ${y - 4}, 82 ${y + 10}, 70 ${y + 14} L 60 ${y + 10} Z` }));
    }
    s.appendChild(svgEl('path', { class: 'detail', d: 'M60 140 C 52 200, 70 260, 58 320 C 50 360, 66 390, 60 418' }));
    for (let i = 0; i < 12; i++) {
      const c = svgEl('circle', { cx: (60 + Math.sin(i * 0.9) * 6).toFixed(1), cy: 152 + i * 21, r: 1.6, class: 'bio bio--blue bio--chain' });
      c.style.animationDelay = `${(i * 0.2).toFixed(2)}s`;
      s.appendChild(c);
    }
  })();
  (function lanterns() {
    const s = $('.lanterns');
    [[30, 30, 1], [140, 20, 0.8], [90, 80, 1.1], [200, 70, 0.9], [240, 110, 0.7]].forEach(([x, y, k], i) => {
      const g = svgEl('g', { transform: `translate(${x} ${y}) scale(${k})` });
      const inner = svgEl('g', { class: 'lantern' });
      inner.style.animationDelay = `${-i * 0.7}s`;
      inner.appendChild(svgEl('path', { d: 'M0 10C10 0 32 0 44 8L56 2L54 10L56 18L44 12C32 20 10 20 0 10Z' }));
      inner.appendChild(svgEl('circle', { cx: 8, cy: 8, r: 2.2, class: 'eye' }));
      [14, 20, 26, 32, 38].forEach((px) => inner.appendChild(svgEl('circle', { cx: px, cy: 14, r: 1.1, class: 'bio bio--blue' })));
      g.appendChild(inner); s.appendChild(g);
    });
  })();
  (function atolla() {
    const s = $('.atolla');
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      s.appendChild(svgEl('path', { class: 'detail', d: `M${(100 + Math.cos(a) * 46).toFixed(1)} ${(100 + Math.sin(a) * 18).toFixed(1)} q ${(Math.cos(a) * 20).toFixed(1)} 30 ${(Math.cos(a) * 8).toFixed(1)} 70` }));
    }
    s.appendChild(svgEl('ellipse', { cx: 100, cy: 96, rx: 52, ry: 24, class: 'atolla__bell' }));
    s.appendChild(svgEl('ellipse', { cx: 100, cy: 92, rx: 26, ry: 11, class: 'atolla__core' }));
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      const c = svgEl('circle', { cx: (100 + Math.cos(a) * 48).toFixed(1), cy: (98 + Math.sin(a) * 20).toFixed(1), r: 2, class: 'bio bio--blue bio--alarm' });
      c.style.animationDelay = `${((i / 18) * 1.8).toFixed(2)}s`;
      s.appendChild(c);
    }
  })();

  /* ── Modal ─────────────────────────────────────────────── */
  const modal = $('#modal');
  function openModal({ meta, title, ar, body, stats }) {
    $('#modal-meta').textContent = meta || '';
    $('#modal-title').textContent = title;
    $('#modal-ar').textContent = ar || '';
    $('#modal-body').innerHTML = body;
    const ul = $('#modal-stats');
    ul.innerHTML = '';
    (stats || []).forEach(([k, v]) => {
      const li = document.createElement('li');
      li.innerHTML = '<span></span><strong></strong>';
      li.firstChild.textContent = k; li.lastChild.textContent = v;
      ul.appendChild(li);
    });
    modal.showModal();
  }
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-info]');
    if (!b) return;
    const it = D.info[b.dataset.info];
    if (!it) return;
    const p = document.createElement('p'); p.textContent = it.body;
    openModal({ ...it, body: p.outerHTML });
  });

  /* ── Tree ──────────────────────────────────────────────── */
  GlassTree.build(D, (zone, emo) => {
    const a = document.createElement('p'); a.textContent = emo.text;
    const b = document.createElement('p'); b.className = 'modal__sea';
    b.innerHTML = '<span>Im Meer</span>'; b.append(document.createTextNode(emo.sea));
    openModal({ meta: emo.zone, title: emo.de, ar: emo.ar, body: a.outerHTML + b.outerHTML });
  });
  const stage = $('#tree-stage'), treeSvg = $('#tree');

  /* ── Sections, nav, measurement ────────────────────────── */
  const sections = $$('.zone').map((el) => ({ el, from: +el.dataset.from, to: +el.dataset.to, zone: el.dataset.zone || null, top: 0, h: 0 }));
  const navList = $('#zonenav-list');
  sections.forEach((s) => {
    const li = document.createElement('li');
    li.innerHTML = '<a><i aria-hidden="true"></i><span class="zn__name"></span><span class="zn__depth"></span></a>';
    s.nav = $('a', li);
    s.nav.href = `#${s.el.id}`;
    $('.zn__name', li).textContent = s.el.dataset.name;
    $('.zn__depth', li).textContent = s.el.dataset.short;
    navList.appendChild(li);
  });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const t = document.getElementById(a.getAttribute('href').slice(1));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    history.replaceState(null, '', a.getAttribute('href'));
  });

  const parallax = $$('[data-speed]').map((el) => ({ el, speed: +el.dataset.speed, center: 0 }));
  let vw = innerWidth, vh = innerHeight, docH = 1, stageRect = { left: 0, top: 0, width: 1, height: 1 };
  function resetParallax() { parallax.forEach((p) => (p.el.style.transform = '')); }
  function measure() {
    vw = innerWidth; vh = innerHeight;
    treeSvg.setAttribute('viewBox', vw < 860 ? '-80 60 960 960' : '0 0 800 1000');
    GlassTree.layout(vw < 860);
    docH = document.documentElement.scrollHeight;
    sections.forEach((s) => { const r = s.el.getBoundingClientRect(); s.top = r.top + scrollY; s.h = r.height; });
    resetParallax();
    parallax.forEach((p) => { const r = p.el.getBoundingClientRect(); p.center = r.top + scrollY + r.height / 2; });
    stageRect = stage.getBoundingClientRect();
    lamp.tx = lamp.x = stageRect.left + stageRect.width / 2;
    lamp.ty = lamp.y = vh * 0.5;
    sizeCanvas();
    needsDraw = true;
  }
  function depthAt(y) {
    const probe = y + vh * 0.5;
    let idx = 0;
    for (let i = 0; i < sections.length; i++) if (probe >= sections[i].top) idx = i;
    const s = sections[idx];
    return { depth: lerp(s.from, s.to, clamp((probe - s.top) / s.h)), idx };
  }

  /* ── Physics-ish helpers ───────────────────────────────── */
  // water colour by depth (log-spaced stops)
  const STOPS = [[0, [38, 120, 150]], [40, [27, 100, 132]], [200, [12, 62, 92]], [500, [7, 40, 66]], [1000, [4, 24, 44]],
    [2500, [2, 14, 28]], [4000, [1, 8, 18]], [6000, [0, 5, 12]], [10935, [0, 2, 6]]];
  const stopAt = (list, d) => {
    for (let i = 1; i < list.length; i++) if (d <= list[i][0]) {
      const t = (d - list[i - 1][0]) / (list[i][0] - list[i - 1][0]);
      const a = list[i - 1][1], b = list[i][1];
      return Array.isArray(a) ? a.map((v, k) => lerp(v, b[k], t)) : lerp(a, b, t);
    }
    return list[list.length - 1][1];
  };
  const TEMP = [[0, 22], [100, 18], [200, 14], [500, 8], [1000, 4.5], [2000, 3], [4000, 2], [6000, 1.5], [10935, 2.4]];
  // Absorption (1/m) for R, G, B in clear ocean water – red vanishes first, blue last.
  const KABS = [0.3, 0.06, 0.02];
  function lightTint(d) {
    const de = Math.min(d, 260);
    const t = KABS.map((k) => Math.exp(-k * de));
    const m = Math.max(...t);
    return t.map((v) => v / m);
  }
  const zoneOf = (d, idx) => (idx === 0 ? null : d < 200 ? 'epi' : d < 1000 ? 'meso' : d < 4000 ? 'bathy' : d < 6000 ? 'abysso' : 'roots');
  const zoneLabel = (d, idx) => (idx === 0 ? 'Oberfläche' : idx === sections.length - 1 ? 'Challenger-Tief' : d < 200 ? 'Sonnenzone' : d < 1000 ? 'Dämmerzone' : d < 4000 ? 'Mitternachtszone' : d < 6000 ? 'Tiefsee-Ebene' : 'Hadal-Zone');

  /* ── HUD ───────────────────────────────────────────────── */
  const hud = { depth: $('#depth-value'), zone: $('#depth-zone'), light: $('#r-light'), pres: $('#r-pressure'), temp: $('#r-temp'), fill: $('#gauge-fill') };
  const lastHud = {};
  const setText = (key, node, v) => { if (lastHud[key] !== v) { lastHud[key] = v; node.textContent = v; } };
  function updateHud(d, idx) {
    setText('d', hud.depth, nf.format(d < 1000 ? Math.round(d) : Math.round(d / 5) * 5));
    setText('z', hud.zone, zoneLabel(d, idx));
    const L = 100 * Math.exp((-d * Math.log(100)) / 200);
    setText('l', hud.light, d >= 1000 ? '0 %' : L >= 1 ? `${nf.format(Math.round(L))} %` : L >= 0.01 ? `${nf2.format(L)} %` : '< 0,01 %');
    setText('p', hud.pres, `${nf.format(Math.round(1 + d / 10))} bar`);
    const t = stopAt(TEMP, d);
    setText('t', hud.temp, `≈ ${t < 10 ? nf1.format(t) : nf.format(Math.round(t))} °C`);
    sections.forEach((s, i) => {
      const on = String(i === idx);
      if (s.nav.dataset.on !== on) { s.nav.dataset.on = on; on === 'true' ? s.nav.setAttribute('aria-current', 'step') : s.nav.removeAttribute('aria-current'); }
    });
  }

  /* ── ROV lamp: from ~600 m the tree is only seen where we shine ── */
  const lamp = { x: 0, y: 0, tx: 0, ty: 0, k: 0, px: 0, py: 0, lastMove: -1e9, open: 0 };
  if (finePointer) addEventListener('pointermove', (e) => { lamp.px = e.clientX; lamp.py = e.clientY; lamp.lastMove = performance.now(); }, { passive: true });
  // where the lamp rests: the visible emotion word (it is what this depth is about)
  let restCache = null, restFrame = 0;
  function lampRest() {
    if (restCache && ++restFrame % 12) return restCache;      // layout read only every 12th frame
    const on = document.querySelector('.label[data-state="on"] .label__dot');
    if (on) { const r = on.getBoundingClientRect(); restCache = [r.left + r.width / 2, r.top + r.height / 2 - 40]; }
    else restCache = [stageRect.left + stageRect.width / 2, vh * 0.48];
    return restCache;
  }
  let lastMask = '', lastFilmMask = '';
  function updateLamp() {
    const active = finePointer && performance.now() - lamp.lastMove < 2500;
    [lamp.tx, lamp.ty] = active ? [lamp.px, lamp.py] : lampRest();
    if (reduced) { lamp.x = lamp.tx; lamp.y = lamp.ty; }
    else { lamp.x += (lamp.tx - lamp.x) * 0.08; lamp.y += (lamp.ty - lamp.y) * 0.08; }
    // at the very bottom the whole tree becomes visible again: 'light upon light'
    const atEnd = root.dataset.section === 'grund' ? 1 : 0;
    lamp.open = reduced ? atEnd : lamp.open + (atEnd - lamp.open) * 0.02;
    if (Math.abs(atEnd - lamp.open) < 0.002) lamp.open = atEnd;
    const outside = (1 - lamp.k * 0.93 * (1 - lamp.open)).toFixed(3);
    const r = Math.round(Math.min(vw, vh) * (vw < 860 ? 0.62 : 0.42));
    // the footage is only seen where the lamp shines once the sun is gone
    const fo = (1 - lamp.k * 0.9).toFixed(3);
    const fkey = `${Math.round(lamp.x)}|${Math.round(lamp.y)}|${fo}|${r}`;
    if (fkey !== lastFilmMask) {
      lastFilmMask = fkey;
      const fg = lamp.k <= 0.001 ? '' : `radial-gradient(circle ${Math.round(r * 1.25)}px at ${Math.round(lamp.x)}px ${Math.round(lamp.y)}px, #000 0%, #000 25%, rgba(0,0,0,${fo}) 100%)`;
      film.style.webkitMaskImage = film.style.maskImage = fg;
    }
    const key = `${Math.round(lamp.x)}|${Math.round(lamp.y)}|${outside}|${r}`;
    if (key === lastMask) return;
    lastMask = key;
    if (lamp.k <= 0.001) { stage.style.webkitMaskImage = stage.style.maskImage = ''; return; }
    const g = `radial-gradient(circle ${r}px at ${Math.round(lamp.x - stageRect.left)}px ${Math.round(lamp.y - stageRect.top)}px, #000 0%, #000 30%, rgba(0,0,0,${outside}) 100%)`;
    stage.style.webkitMaskImage = g; stage.style.maskImage = g;
  }

  /* ── Tree colour: water light above, lamp-white below ─────
     Downwelling light loses red first (absorption), then everything turns into the
     muted blue of scattered daylight. The ROV lamp (white LED) restores true colour. */
  let lastTree = '';
  const WATER_SHALLOW = [176, 222, 220], WATER_DEEP = [128, 166, 204];
  function updateTreeColour(d) {
    const water = WATER_SHALLOW.map((v, i) => lerp(v, WATER_DEEP[i], clamp(d / 260)));
    const tint = lightTint(d);
    const under = clamp(d / 35);                                     // how much the water colours everything
    const amb = clamp(1 - Math.log10(1 + d) / 3.1);                   // ambient light, ~0 at 1.000 m
    const lk = lamp.k;
    const shade = (base) => base.map((v, i) => Math.round(lerp(lerp(v * lerp(1, tint[i], 0.35), water[i] * (v / 255 + 0.35), under), v, lk)));
    const edge = shade([236, 248, 252]);
    const leaf = shade([118, 176, 104]);
    const a = Math.max(amb, lk);
    const vars = `${edge}|${leaf}|${a.toFixed(2)}`;
    if (vars === lastTree) return;
    lastTree = vars;
    stage.style.setProperty('--edge', `rgba(${edge}, ${(0.7 * a + 0.1).toFixed(3)})`);
    stage.style.setProperty('--body', `rgba(${edge}, ${(0.06 * a + 0.015).toFixed(3)})`);
    stage.style.setProperty('--leaf', `rgba(${leaf}, ${(0.5 * a + 0.06).toFixed(3)})`);
    stage.style.setProperty('--leaf-edge', `rgba(${leaf}, ${(0.85 * a + 0.12).toFixed(3)})`);
  }

  /* ── Ocean canvas ──────────────────────────────────────── */
  const cv = $('#ocean'), ctx = cv.getContext('2d', { alpha: false });
  let W = 0, H = 0;
  const parts = [];
  let curDepth = 0;
  function sizeCanvas() {
    const dpr = Math.min(devicePixelRatio || 1, 1.75);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const target = Math.round(clamp((W * H) / 9000, 40, 160));
    while (parts.length < target) parts.push(spawn(Math.random() * H));
    parts.length = target;
  }
  function sprite(rgb) {
    const c = document.createElement('canvas'); c.width = c.height = 32;
    const g = c.getContext('2d'), gr = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, `rgba(${rgb},1)`); gr.addColorStop(0.3, `rgba(${rgb},0.35)`); gr.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = gr; g.fillRect(0, 0, 32, 32); return c;
  }
  const SPR = [sprite('120,210,255'), sprite('110,230,200')];    // dinoflagellate blue / blue-green
  function spawn(y) {
    const d = curDepth;
    const wB = clamp(1 - d / 260) * 1.2, wS = clamp(d / 120), wL = clamp((d - 700) / 1600) * 0.3;
    const r = Math.random() * (wB + wS + wL + 0.0001);
    const type = r < wB ? 0 : r < wB + wS ? 1 : 2;
    const z = 0.3 + Math.random() * 0.7;
    return {
      type, z, x: Math.random() * (W || innerWidth), y,
      r: type === 0 ? 1.5 + z * 4 : type === 1 ? 0.5 + z * 1.4 : 2 + z * 4,
      vy: type === 0 ? -(18 + Math.random() * 40) * z : type === 1 ? (3 + Math.random() * 8) * z : (Math.random() - 0.5) * 4,
      vx: (Math.random() - 0.5) * 4, ph: Math.random() * 6.28, f: 0.3 + Math.random() * 1.2,
      spr: SPR[Math.random() < 0.7 ? 0 : 1]
    };
  }
  function drawOcean(t, dt, scrollDelta) {
    const d = curDepth;
    const top = stopAt(STOPS, Math.max(0, d - 40)).map(Math.round), bot = stopAt(STOPS, d + Math.max(120, d * 0.35)).map(Math.round);
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, `rgb(${top})`); g.addColorStop(1, `rgb(${bot})`);
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    // sun shafts, gone by ~250 m
    const ra = clamp(1 - d / 250);
    if (ra > 0) {
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 6; i++) {
        const x0 = W * (0.05 + i * 0.17) + Math.sin(t * 0.00012 + i * 1.7) * 40;
        const w = 30 + (i % 3) * 26;
        const lg = ctx.createLinearGradient(0, 0, 0, H);
        lg.addColorStop(0, `rgba(190,235,245,${0.08 * ra})`); lg.addColorStop(1, 'rgba(190,235,245,0)');
        ctx.fillStyle = lg;
        ctx.beginPath(); ctx.moveTo(x0, 0); ctx.lineTo(x0 + w, 0); ctx.lineTo(x0 + w + H * 0.32, H); ctx.lineTo(x0 + H * 0.2, H); ctx.closePath(); ctx.fill();
      }
    }
    // ROV lamp: light scattered by the water itself (backscatter), very faint
    const lr = Math.min(W, H) * (W < 860 ? 0.62 : 0.42);
    if (lamp.k > 0) {
      ctx.globalCompositeOperation = 'lighter';
      const rg = ctx.createRadialGradient(lamp.x, lamp.y, 0, lamp.x, lamp.y, lr);
      rg.addColorStop(0, `rgba(170,190,200,${0.07 * lamp.k})`); rg.addColorStop(1, 'rgba(170,190,200,0)');
      ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
    }

    const sec = dt / 1000;
    for (let i = 0; i < parts.length; i++) {
      let p = parts[i];
      if (!reduced) {
        p.y += p.vy * sec - scrollDelta * p.z * 0.35;
        p.x += p.vx * sec + (p.type === 0 ? Math.sin(t * 0.003 + p.ph) * 0.3 : 0);
      }
      if (p.y < -40) p = parts[i] = spawn(H + 30);
      else if (p.y > H + 40) p = parts[i] = spawn(-30);
      if (p.x < -40) p.x = W + 30; else if (p.x > W + 40) p.x = -30;

      if (p.type === 0) {                       // bubbles
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.5 * p.z * clamp(1 - d / 300, 0.15, 1);
        ctx.strokeStyle = 'rgb(225,245,250)'; ctx.lineWidth = 0.9;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.stroke();
      } else if (p.type === 1) {                // marine snow – lit by sun above, by the lamp below
        const near = lamp.k > 0 ? clamp(1 - Math.hypot(p.x - lamp.x, p.y - lamp.y) / lr) : 0;
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = (0.15 + p.z * 0.35) * Math.max(clamp(1 - d / 1500, 0.12, 1), near * lamp.k);
        ctx.fillStyle = 'rgb(200,214,222)';
        ctx.fillRect(p.x, p.y, p.r, p.r);
      } else {                                  // bioluminescent plankton – brief flashes only
        const fl = reduced ? 0.5 : Math.pow(clamp(Math.sin(t * 0.001 * p.f + p.ph)), 8);
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = fl * p.z * clamp((d - 600) / 1200);
        ctx.drawImage(p.spr, p.x - p.r * 2, p.y - p.r * 2, p.r * 4, p.r * 4);
      }
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }

  const caustics = $('.caustics');

  /* ── Ayah: one span per word, revealed in reading order ── */
  $$('[data-ayah]').forEach((fig) => {
    let n = 0;
    $$('.ayah__ar', fig).forEach((ar) => {
      const words = ar.textContent.trim().split(/\s+/);
      ar.textContent = '';
      words.forEach((w, i) => {
        const span = document.createElement('span');
        span.className = 'w'; span.style.setProperty('--i', n++); span.textContent = w;
        ar.append(span, i < words.length - 1 ? ' ' : '');
      });
    });
    fig.style.setProperty('--n', n);
  });

  /* ── Film: real footage per zone, crossfaded by depth, seen through the lamp ── */
  const film = $('#film');
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const clips = $$('video', film).map((v) => ({ v, from: +v.dataset.from, to: +v.dataset.to, max: +v.dataset.max || 0.6, w: -1 }));
  const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };
  function updateFilm(d) {
    for (const c of clips) {
      const r = Math.max(60, (c.to - c.from) * 0.14);
      const w = smooth(c.from - r, c.from + r, d) * (1 - smooth(c.to - r, c.to + r, d));
      const q = Math.round(w * 100) / 100;
      if (q !== c.w) { c.w = q; c.v.style.opacity = (q * c.max).toFixed(3); }
      if (d > c.from - (c.to - c.from) * 0.6 && c.v.preload === 'none') c.v.preload = 'auto';
      const run = q > 0.01 && !reduced && !saveData && !document.hidden;
      if (run && c.v.paused) c.v.play().catch(() => {});
      else if (!run && !c.v.paused) c.v.pause();
    }
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) clips.forEach((c) => c.v.pause()); needsDraw = true; });

  /* ── Reveal ────────────────────────────────────────────── */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.2 });
  $$('[data-reveal]').forEach((n) => io.observe(n));

  /* ── Main loop ─────────────────────────────────────────── */
  let needsDraw = true, lastY = scrollY, lastT = performance.now(), lastTreeDepth = -1, tilt = 0, lastZone = '';
  function frame(t) {
    const dt = Math.min(64, t - lastT); lastT = t;
    const y = scrollY, dY = y - lastY; lastY = y;
    if (dY !== 0 || needsDraw || !reduced) {
      const { depth, idx } = depthAt(y);
      curDepth = depth;
      lamp.k = clamp((depth - 600) / 700);
      updateLamp();
      drawOcean(t, reduced ? 0 : dt, reduced ? 0 : dY);
      updateHud(depth, idx);
      updateFilm(depth);
      hud.fill.style.transform = `scaleY(${clamp(y / Math.max(1, docH - vh)).toFixed(4)})`;

      if (Math.abs(depth - lastTreeDepth) > 0.5 || needsDraw) {
        lastTreeDepth = depth;
        const zone = zoneOf(depth, idx);
        GlassTree.update(depth, zone, reduced);
        updateTreeColour(depth);
        caustics.style.opacity = clamp(1 - depth / 60).toFixed(3);
        if (zone !== lastZone) { lastZone = zone; root.dataset.zone = zone || 'surface'; }
        const sec = sections[idx].el.id;
        if (root.dataset.section !== sec) root.dataset.section = sec;
      }
      if (!reduced) {
        tilt += (clamp(dY * 0.05, -2.5, 2.5) - tilt) * 0.06;     // the current leans the tree a little
        treeSvg.style.transform = `rotate(${tilt.toFixed(3)}deg)`;
        for (const p of parallax) {
          const off = p.center - (y + vh / 2);
          if (Math.abs(off) < vh * 2) p.el.style.transform = `translate3d(0, ${(off * p.speed).toFixed(1)}px, 0)`;
        }
      } else if (treeSvg.style.transform) treeSvg.style.transform = '';
      needsDraw = false;
    }
    requestAnimationFrame(frame);
  }

  addEventListener('resize', () => { clearTimeout(measure.t); measure.t = setTimeout(measure, 120); });
  addEventListener('load', measure);
  applyMotion();
  measure();
  requestAnimationFrame(frame);
})();
