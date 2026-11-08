/* The tree: procedurally grown (deterministic seed), transparent, updated by depth.
   No glow. Colour follows real light absorption; below ~1.000 m it is only seen in the ROV lamp. */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const BASE = { x: 400, y: 640 };
  const MAX_LVL = 7;
  const ROOT_LVL = 5;

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rand = mulberry32(20240611);
  const R = (a, b) => a + rand() * (b - a);
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const f = (n) => Math.round(n * 10) / 10;
  const el = (tag, attrs = {}) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  };

  const segs = [], tips = [], roots = [], rootTips = [];

  function grow(x, y, ang, len, w, lvl) {
    const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
    const bend = R(-0.28, 0.28) * len;
    const cx = (x + x2) / 2 + Math.cos(ang + Math.PI / 2) * bend;
    const cy = (y + y2) / 2 + Math.sin(ang + Math.PI / 2) * bend;
    const w2 = lvl === MAX_LVL ? 0.6 : w * 0.7;
    segs.push({ x, y, cx, cy, x2, y2, w1: w, w2, lvl, ang });
    if (lvl === MAX_LVL) { tips.push({ x: x2, y: y2 }); return; }
    const n = lvl < 1 ? 2 : rand() < 0.32 ? 3 : 2;
    const spread = lvl < 2 ? 0.55 : R(0.35, 0.62);
    for (let i = 0; i < n; i++) {
      let a = ang + (n === 2 ? (i ? spread : -spread) : (i - 1) * spread) + R(-0.12, 0.12);
      a = a * 0.86 + (-Math.PI / 2) * 0.14;
      a = clamp(a, -Math.PI + 0.12, -0.12);
      grow(x2, y2, a, len * R(0.72, 0.82), w2, lvl + 1);
    }
  }

  function root(x, y, ang, len, w, lvl) {
    const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
    const bend = R(-0.35, 0.35) * len;
    const cx = (x + x2) / 2 + Math.cos(ang + Math.PI / 2) * bend;
    const cy = (y + y2) / 2 + Math.sin(ang + Math.PI / 2) * bend;
    const w2 = lvl === ROOT_LVL ? 0.6 : Math.max(1.2, w * 0.68);
    roots.push({ x, y, cx, cy, x2, y2, w1: w, w2, lvl, ang });
    if (lvl === ROOT_LVL) { rootTips.push({ x: x2, y: y2 }); return; }
    const n = rand() < 0.45 ? 2 : 1;
    for (let i = 0; i < n; i++) {
      let a = ang + (n === 2 ? (i ? 0.5 : -0.5) : R(-0.3, 0.3)) + R(-0.15, 0.15);
      a = a * 0.8 + (Math.PI / 2) * 0.2;
      a = clamp(a, 0.15, Math.PI - 0.15);
      root(x2, y2, a, len * R(0.78, 0.9), w2, lvl + 1);
    }
  }

  // tapered tube outline of a quadratic segment
  function tube(s) {
    const L = [], Rr = [], N = 8;
    for (let i = 0; i <= N; i++) {
      const t = i / N, u = 1 - t;
      const px = u * u * s.x + 2 * u * t * s.cx + t * t * s.x2;
      const py = u * u * s.y + 2 * u * t * s.cy + t * t * s.y2;
      const dx = 2 * u * (s.cx - s.x) + 2 * t * (s.x2 - s.cx);
      const dy = 2 * u * (s.cy - s.y) + 2 * t * (s.y2 - s.cy);
      const m = Math.hypot(dx, dy) || 1;
      const hw = (s.w1 + (s.w2 - s.w1) * t) / 2;
      L.push([px - (dy / m) * hw, py + (dx / m) * hw]);
      Rr.push([px + (dy / m) * hw, py - (dx / m) * hw]);
    }
    return 'M' + L.concat(Rr.reverse()).map((p) => f(p[0]) + ' ' + f(p[1])).join('L') + 'Z';
  }
  const curve = (s, o = 0) => {
    const nx = Math.cos(s.ang + Math.PI / 2) * o, ny = Math.sin(s.ang + Math.PI / 2) * o;
    return `M${f(s.x - nx)} ${f(s.y - ny)}Q${f(s.cx - nx)} ${f(s.cy - ny)} ${f(s.x2 - nx)} ${f(s.y2 - ny)}`;
  };

  const state = { leaves: [], rootMasks: [], labels: [] };

  function drawTubes(group, list) {
    const body = el('g', { class: 'tree-body' });
    const edge = el('g', { class: 'tree-edge' });
    list.forEach((s) => {
      body.appendChild(el('path', { d: tube(s) }));
      if (s.w1 > 3.5) edge.appendChild(el('path', { d: curve(s, s.w1 * 0.22), 'stroke-width': f(Math.max(0.5, s.w1 * 0.06)) }));
    });
    group.append(body, edge);
  }

  function build(data, onPick) {
    grow(BASE.x, BASE.y, -Math.PI / 2 + 0.03, 175, 34, 0);
    // fit crown into the canvas, scaled about the trunk base
    let minY = Infinity, maxDX = 0;
    segs.forEach((s) => { minY = Math.min(minY, s.y2, s.cy); maxDX = Math.max(maxDX, Math.abs(s.x2 - BASE.x), Math.abs(s.cx - BASE.x)); });
    const k = Math.min(1, (BASE.y - 70) / (BASE.y - minY), 330 / maxDX);
    const sc = (x, y) => [BASE.x + (x - BASE.x) * k, BASE.y + (y - BASE.y) * k];
    segs.forEach((s) => { [s.x, s.y] = sc(s.x, s.y); [s.cx, s.cy] = sc(s.cx, s.cy); [s.x2, s.y2] = sc(s.x2, s.y2); });
    tips.forEach((t) => { [t.x, t.y] = sc(t.x, t.y); });

    [-1.15, -0.45, 0.1, 0.6, 1.2].forEach((a, i) =>
      root(BASE.x + (i - 2) * 6, BASE.y - 4, Math.PI / 2 + a, R(62, 78), 16 - Math.abs(i - 2) * 2, 0));

    const gBr = document.getElementById('branches');
    const gRoots = document.getElementById('roots');
    const gLeaves = document.getElementById('leaves');
    const gLabels = document.getElementById('labels');

    drawTubes(gBr, segs);

    // roots: same material, revealed through a growing stroke mask
    const mask = el('mask', { id: 'rootMask', maskUnits: 'userSpaceOnUse', x: -200, y: 0, width: 1200, height: 1100 });
    document.querySelector('#tree defs').appendChild(mask);
    gRoots.setAttribute('mask', 'url(#rootMask)');
    drawTubes(gRoots, roots);
    roots.forEach((s) => {
      const m = el('path', { d: curve(s), class: 'root-mask', 'stroke-width': f(s.w1 + 16), pathLength: 1 });
      mask.appendChild(m);
      state.rootMasks.push({ s, node: m, last: -1 });
    });

    // leaves
    const leafD = 'M0 0C5 -6 13 -6 18 0C13 6 5 6 0 0Z';
    segs.filter((s) => s.lvl >= MAX_LVL - 2).forEach((s) => {
      (s.lvl === MAX_LVL ? [1, 0.5] : [0.6]).forEach((t) => {
        if (rand() < 0.3) return;
        const u = 1 - t;
        const x = u * u * s.x + 2 * u * t * s.cx + t * t * s.x2;
        const y = u * u * s.y + 2 * u * t * s.cy + t * t * s.y2;
        const node = el('path', { d: leafD, class: 'leaf' });
        gLeaves.appendChild(node);
        state.leaves.push({
          node, x, y, a: (s.ang * 180) / Math.PI + R(-70, 70), sc: R(0.75, 1.25),
          th: Math.exp(R(Math.log(40), Math.log(1100))), dx: R(-260, 260), dy: -R(160, 520), spin: R(-200, 200), last: -1
        });
      });
    });

    /* one emotion per zone, each at its own place on the tree */
    const byY = tips.slice().sort((a, b) => a.y - b.y);
    const near = (list, x, y) => list.reduce((b, p) => (Math.hypot(p.x - x, p.y - y) < Math.hypot(b.x - x, b.y - y) ? p : b));
    const trunkTop = segs[0];
    const anchors = {
      epi: near(byY.slice(0, 12), BASE.x + 40, 0),
      meso: near(tips, BASE.x - 230, 200),
      bathy: near(tips, BASE.x + 190, 230),
      abysso: { x: (trunkTop.x + trunkTop.x2) / 2 + 12, y: (trunkTop.y + trunkTop.y2) / 2 },
      // a root end that has grown by ~7.000 m, so 'Trost' is present for most of the hadal zone
      roots: roots.filter((r) => r.lvl === 2).map((r) => ({ x: r.x2, y: r.y2 })).sort((a, b) => b.y - a.y)[0]
    };
    Object.keys(anchors).forEach((zone) => {
      const emo = data.emotions[zone];
      const pt = anchors[zone];
      if (!emo || !pt) return;
      const right = zone === 'abysso' ? true : pt.x >= BASE.x;
      const dx = right ? 14 : -14;
      const g = el('g', {
        class: `label label--${zone}`, transform: `translate(${f(pt.x)} ${f(pt.y)})`,
        tabindex: -1, role: 'button', 'aria-label': `${emo.de} – Gefühl lesen`, 'data-state': 'hidden'
      });
      g.append(
        el('line', { x1: 0, y1: 0, x2: dx * 0.7, y2: 0, class: 'label__tick' }),
        el('circle', { r: 3.2, class: 'label__dot' }),
        el('rect', { x: right ? -6 : -150, y: -24, width: 156, height: 54, class: 'label__hit' })
      );
      const t = el('text', { x: dx, y: 6, 'text-anchor': right ? 'start' : 'end', class: 'label__de' });
      t.textContent = emo.de;
      const ta = el('text', { x: dx, y: 28, 'text-anchor': right ? 'start' : 'end', class: 'label__ar', direction: 'rtl' });
      ta.textContent = emo.ar;
      g.append(t, ta);
      const open = () => onPick(zone, emo);
      g.addEventListener('click', open);
      g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
      gLabels.appendChild(g);
      state.labels.push({ node: g, zone, x: pt.x, right, texts: [t, ta], last: '' });
    });
  }

  /* depth → visual state; touches the DOM only on change */
  function update(depth, zone, reduced) {
    state.leaves.forEach((L) => {
      const q = Math.round(clamp((depth - L.th) / (L.th * 0.35 + 60)) * 200) / 200;
      if (q === L.last) return;
      L.last = q;
      const e = reduced ? 0 : q * q;
      L.node.setAttribute('transform', `translate(${f(L.x + L.dx * e)} ${f(L.y + L.dy * e)}) rotate(${f(L.a + L.spin * e)}) scale(${f(L.sc)})`);
      L.node.setAttribute('opacity', f(1 - Math.pow(q, 1.4)));
    });

    // roots: first stubs visible, then grow from 3.600 m to the trench floor
    const g = Math.max(1 / 6, clamp((depth - 3600) / (10400 - 3600)));
    state.rootMasks.forEach((r) => {
      const q = Math.round(clamp(g * 6 - r.s.lvl) * 100) / 100;
      if (q === r.last) return;
      r.last = q;
      r.node.style.strokeDashoffset = 1 - q;
    });

    state.labels.forEach((l) => {
      let s = l.zone === zone ? 'on' : 'hidden';
      if (l.zone === 'roots' && g < 0.52) s = 'hidden';
      if (s === l.last) return;
      l.last = s;
      l.node.dataset.state = s;
      l.node.setAttribute('tabindex', s === 'on' ? 0 : -1);
      l.node.setAttribute('aria-hidden', s === 'on' ? 'false' : 'true');
    });
  }

  // narrow screens: set every word toward the centre so it never leaves the viewport
  function layout(narrow) {
    state.labels.forEach((l) => {
      const right = narrow ? l.x < BASE.x : l.right;
      l.texts.forEach((t) => { t.setAttribute('text-anchor', right ? 'start' : 'end'); t.setAttribute('x', right ? 14 : -14); });
    });
  }

  window.GlassTree = { build, update, layout };
})();
