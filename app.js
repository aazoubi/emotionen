/* Scroll engine, ocean canvas, tree layer, HUD, navigation, modal, motion toggle. Vanilla JS, no deps. */
(function () {
  const D = window.OCEAN_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const nf = new Intl.NumberFormat('de-DE');
  const nf1 = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  const root = document.documentElement;

  /* ── Reduce motion ─────────────────────────────────────── */
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  const stored = localStorage.getItem('reduceMotion');
  let reduced = stored === null ? mq.matches : stored === '1';
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

  /* ── Emotion chips per zone ────────────────────────────── */
  $$('.zone[data-emotions]').forEach((zone) => {
    const key = zone.dataset.emotions;
    const wrap = $('.chips', zone);
    if (!wrap || !D.emotions[key]) return;
    D.emotions[key].forEach((emo) => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.innerHTML = `<b></b><i lang="ar" dir="rtl"></i>`;
      chip.firstChild.textContent = emo.de;
      chip.lastChild.textContent = emo.ar;
      chip.title = emo.text;
      wrap.appendChild(chip);
    });
  });

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
      li.innerHTML = `<span></span><strong></strong>`;
      li.firstChild.textContent = k; li.lastChild.textContent = v;
      ul.appendChild(li);
    });
    modal.showModal();
  }
  function showInfo(key) {
    const it = D.info[key];
    if (!it) return;
    const p = document.createElement('p'); p.textContent = it.body;
    openModal({ ...it, body: p.outerHTML });
  }
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-info]');
    if (el) showInfo(el.dataset.info);
  });
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset && e.target.dataset.info) {
      e.preventDefault();
      showInfo(e.target.dataset.info);
    }
  });

  /* ── Sections, nav, measurement ────────────────────────── */
  const sections = $$('.zone').map((el) => ({ el, from: +el.dataset.from, to: +el.dataset.to, top: 0, h: 0 }));
  const navList = $('#zonenav-list');
  sections.forEach((s) => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#${s.el.id}"><i aria-hidden="true"></i><span class="zn__name"></span><span class="zn__depth"></span></a>`;
    $('.zn__name', li).textContent = s.el.dataset.name;
    $('.zn__depth', li).textContent = s.el.dataset.short;
    s.nav = $('a', li);
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
  let vw = innerWidth, vh = innerHeight, docH = 1;
  function resetParallax() { parallax.forEach((p) => (p.el.style.transform = '')); }
  function measure() {
    vw = innerWidth; vh = innerHeight;
    docH = document.documentElement.scrollHeight;
    sections.forEach((s) => { const r = s.el.getBoundingClientRect(); s.top = r.top + scrollY; s.h = r.height; });
    resetParallax();
    parallax.forEach((p) => { const r = p.el.getBoundingClientRect(); p.center = r.top + scrollY + r.height / 2; });
    sizeCanvas();
    needsDraw = true;
  }

  function depthAt(y) {
    const probe = y + vh * 0.5;
    let idx = 0;
    for (let i = 0; i < sections.length; i++) if (probe >= sections[i].top) idx = i;
    const s = sections[idx];
    const p = clamp((probe - s.top) / s.h);
    return { depth: lerp(s.from, s.to, p), idx };
  }

  /* ── Colour + readouts by depth ────────────────────────── */
  const STOPS = [[0, [16, 42, 66]], [60, [12, 40, 62]], [200, [8, 30, 50]], [500, [5, 20, 38]],
    [1000, [3, 13, 27]], [2500, [2, 9, 19]], [4000, [1, 5, 13]], [6000, [0, 3, 8]], [10935, [0, 1, 4]]];
  function colorAt(d) {
    for (let i = 1; i < STOPS.length; i++) {
      if (d <= STOPS[i][0]) {
        const [d0, c0] = STOPS[i - 1], [d1, c1] = STOPS[i];
        const t = (d - d0) / (d1 - d0);
        return c0.map((v, k) => Math.round(lerp(v, c1[k], t)));
      }
    }
    return STOPS[STOPS.length - 1][1];
  }
  const TEMP = [[0, 22], [100, 18], [200, 14], [500, 8], [1000, 4.5], [2000, 3], [4000, 2], [6000, 1.5], [10935, 2.4]];
  function tempAt(d) {
    for (let i = 1; i < TEMP.length; i++) if (d <= TEMP[i][0]) {
      const t = (d - TEMP[i - 1][0]) / (TEMP[i][0] - TEMP[i - 1][0]);
      return lerp(TEMP[i - 1][1], TEMP[i][1], t);
    }
    return 2.4;
  }
  const zoneLabel = (d, idx) => (idx === 0 ? 'Oberfläche' : idx === sections.length - 1 ? 'Challenger-Tief' : d < 200 ? 'Sonnenzone' : d < 1000 ? 'Dämmerzone' : d < 4000 ? 'Mitternachtszone' : d < 6000 ? 'Tiefsee-Ebene' : 'Hadal-Zone');

  const hud = { depth: $('#depth-value'), zone: $('#depth-zone'), light: $('#r-light'), pres: $('#r-pressure'), temp: $('#r-temp'), fill: $('#gauge-fill') };
  let lastHud = {};
  function setText(key, node, v) { if (lastHud[key] !== v) { lastHud[key] = v; node.textContent = v; } }
  function updateHud(d, idx) {
    setText('d', hud.depth, nf.format(d < 1000 ? Math.round(d) : Math.round(d / 5) * 5));
    setText('z', hud.zone, zoneLabel(d, idx));
    const L = 100 * Math.exp((-d * Math.log(100)) / 200);
    setText('l', hud.light, d >= 1000 ? '0 %' : L >= 1 ? `${nf.format(Math.round(L))} %` : L >= 0.01 ? `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2 }).format(L)} %` : '< 0,01 %');
    setText('p', hud.pres, `${nf.format(Math.round(1 + d / 10))} bar`);
    const t = tempAt(d);
    setText('t', hud.temp, `≈ ${t < 10 ? nf1.format(t) : nf.format(Math.round(t))} °C`);
    sections.forEach((s, i) => {
      const on = i === idx;
      if (s.nav.dataset.on !== String(on)) { s.nav.dataset.on = on; on ? s.nav.setAttribute('aria-current', 'step') : s.nav.removeAttribute('aria-current'); }
    });
  }

  /* ── Tree layer: a real photo sinking, dissolving ──────── */
  const treeLayer = $('#tree-layer');
  function updateTree(d) {
    // opacity: 1 at surface → gone by the abyss (clamp before pow to avoid NaN past 6200 m)
    const op = Math.pow(clamp(1 - d / 6200), 1.15);
    const blur = clamp(d / 1800) * 9;
    const bright = lerp(1, 0.35, clamp(d / 5000));
    const sat = lerp(1, 0.4, clamp(d / 5000));
    const ty = clamp(d / 500) * 60;
    treeLayer.style.opacity = (op * 0.92).toFixed(3);
    treeLayer.style.transform = `translateY(${ty.toFixed(1)}px)`;
    treeLayer.style.filter = `blur(${blur.toFixed(2)}px) brightness(${bright.toFixed(3)}) saturate(${sat.toFixed(3)})`;
    $('.tree-layer__tint', treeLayer).style.opacity = (0.45 + clamp(d / 3000) * 0.5).toFixed(3);
  }

  /* ── Ocean canvas: gradient + particles ────────────────── */
  const cv = $('#ocean'), ctx = cv.getContext('2d', { alpha: false });
  let dpr = 1, W = 0, H = 0;
  function sizeCanvas() {
    dpr = Math.min(devicePixelRatio || 1, 1.75);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const target = Math.round(clamp((W * H) / 9000, 40, 170));
    while (parts.length < target) parts.push(spawn(Math.random() * H));
    parts.length = target;
  }
  function sprite(rgb) {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.18, `rgba(${rgb},0.9)`);
    gr.addColorStop(0.5, `rgba(${rgb},0.22)`); gr.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return c;
  }
  const SPR = [sprite('120,245,224'), sprite('150,255,176'), sprite('110,160,255')];
  const parts = [];
  let curDepth = 0;
  function spawn(y) {
    const d = curDepth;
    const wB = clamp(1 - d / 260) * 1.2, wS = clamp(d / 120) * 1.0, wL = clamp((d - 700) / 1600) * 0.9;
    const r = Math.random() * (wB + wS + wL + 0.0001);
    const type = r < wB ? 0 : r < wB + wS ? 1 : 2;
    const z = 0.3 + Math.random() * 0.7;
    return {
      type, z, x: Math.random() * (W || innerWidth), y,
      r: type === 0 ? 1.5 + z * 4 : type === 1 ? 0.5 + z * 1.4 : 6 + z * 16,
      vy: type === 0 ? -(18 + Math.random() * 40) * z : type === 1 ? (3 + Math.random() * 8) * z : (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * (type === 2 ? 8 : 4), ph: Math.random() * 6.28, f: 0.4 + Math.random() * 1.6,
      spr: SPR[Math.random() < 0.6 ? 0 : Math.random() < 0.6 ? 1 : 2]
    };
  }
  function drawOcean(t, dt, scrollDelta) {
    const d = curDepth;
    const top = colorAt(Math.max(0, d - 40)), bot = colorAt(d + Math.max(120, d * 0.35));
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, `rgb(${top})`); g.addColorStop(1, `rgb(${bot})`);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    const sec = dt / 1000;
    for (let i = 0; i < parts.length; i++) {
      let p = parts[i];
      if (!reduced) {
        p.y += p.vy * sec - scrollDelta * p.z * 0.35;
        p.x += p.vx * sec + (p.type === 0 ? Math.sin(t * 0.003 + p.ph) * 0.3 : 0);
      }
      if (p.y < -40) { p = parts[i] = spawn(H + 30); }
      else if (p.y > H + 40) { p = parts[i] = spawn(-30); }
      if (p.x < -40) p.x = W + 30; else if (p.x > W + 40) p.x = -30;

      if (p.type === 0) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.55 * p.z * clamp(1 - d / 300, 0.15, 1);
        ctx.strokeStyle = 'rgba(225,250,255,1)'; ctx.lineWidth = 0.9;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath(); ctx.arc(p.x - p.r * 0.35, p.y - p.r * 0.35, p.r * 0.22, 0, 6.283); ctx.fill();
      } else if (p.type === 1) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.25 + p.z * 0.4;
        ctx.fillStyle = 'rgb(185,205,218)';
        ctx.fillRect(p.x, p.y, p.r, p.r);
      } else {
        const fl = reduced ? 0.7 : Math.pow(0.5 + 0.5 * Math.sin(t * 0.001 * p.f + p.ph), 3);
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = fl * p.z * clamp((d - 600) / 1200);
        ctx.drawImage(p.spr, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      }
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }

  const vignette = $('.vignette');

  /* ── Reveal ────────────────────────────────────────────── */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.2 });
  $$('[data-reveal]').forEach((n) => io.observe(n));

  /* ── Main loop ─────────────────────────────────────────── */
  let needsDraw = true, lastY = scrollY, lastT = performance.now(), lastTreeDepth = -1;
  function frame(t) {
    const dt = Math.min(64, t - lastT); lastT = t;
    const y = scrollY, dY = y - lastY; lastY = y;
    const moved = dY !== 0;

    if (moved || needsDraw || !reduced) {
      const { depth, idx } = depthAt(y);
      curDepth = depth;
      drawOcean(t, reduced ? 0 : dt, reduced ? 0 : dY);
      updateHud(depth, idx);
      hud.fill.style.transform = `scaleY(${clamp(y / Math.max(1, docH - vh)).toFixed(4)})`;
      vignette.style.opacity = (0.2 + clamp(depth / 6000) * 0.55).toFixed(3);

      if (Math.abs(depth - lastTreeDepth) > 0.5 || needsDraw) {
        lastTreeDepth = depth;
        updateTree(depth);
      }

      if (!reduced) {
        for (const p of parallax) {
          const off = (p.center - (y + vh / 2)) * p.speed;
          if (Math.abs(p.center - (y + vh / 2)) < vh * 2) p.el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
        }
      }
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
