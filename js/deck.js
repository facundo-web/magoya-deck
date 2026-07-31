/**
 * Magoya Knowledge Experience — deck engine (vanilla JS, no build step).
 * Ported 1:1 from Varina's original Claude-artifact logic so the feel
 * (network background, scene transitions, exploration panels) stays identical.
 * Content lives in content/panels.js — this file is just the machine.
 */
(function () {
  const TOTAL_SCENES = 14;
  const SCENE_NAMES = ['Intro','Manifesto','Logo','Why Magoya','Pillar 1','Pillar 2','Pillar 3','Proof','Finale','Bridge','Method','Capabilities','Results','Discovery'];
  const NAV_GROUPS = ['Intro','Why','Proof','Method','Team','Results','Start'];
  const GROUP_START = [0,3,7,10,11,12,13];
  const PANELS = window.MAGOYA_PANELS;
  const PRINT_MODE = new URLSearchParams(location.search).has('print');

  const stage = document.getElementById('stage');
  const canvas = document.getElementById('netCanvas');
  const ctx = canvas.getContext('2d');
  const cornerMark = document.getElementById('cornerMark');
  const navHint = document.getElementById('navHint');
  const navDotsEl = document.getElementById('navDots');
  const panelOverlay = document.getElementById('panelOverlay');
  const panelEyebrow = document.getElementById('panelEyebrow');
  const panelTitle = document.getElementById('panelTitle');
  const panelSupporting = document.getElementById('panelSupporting');
  const panelChips = document.getElementById('panelChips');
  const panelDetail = document.getElementById('panelDetail');

  let scene = 0;
  try {
    const s = parseInt(localStorage.getItem('magoya_kx_scene'));
    if (!isNaN(s) && s >= 0 && s < TOTAL_SCENES) scene = s;
  } catch (e) {}

  let count59 = scene === 7 ? 64 : 0;
  let panelKey = null;
  let sel = 0;
  let countRAF = null;
  let lastNav = 0;
  let t0 = 0;
  let raf = null;
  let introP = 0;
  let nodes = [];
  let edges = [];
  const clusterC = [{ x: 1250, y: 300 }, { x: 1560, y: 560 }, { x: 1300, y: 830 }];

  function updateLabel() {
    stage.setAttribute('data-screen-label', SCENE_NAMES[scene] || '');
    stage.setAttribute('data-screen-index', String(scene + 1).padStart(2, '0'));
  }

  function initNetwork() {
    const W = 1920, H = 1080, N = 84;
    nodes = [];
    for (let i = 0; i < N; i++) {
      const sx = 110 + Math.random() * (W - 220);
      const sy = 110 + Math.random() * (H - 220);
      nodes.push({ sx, sy, cx: sx, cy: sy, cluster: i % 3, r: 1.6 + Math.random() * 1.7, tw: Math.random() * Math.PI * 2, reveal: 0 });
    }
    const order = [...Array(N).keys()];
    for (let i = N - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = order[i]; order[i] = order[j]; order[j] = t; }
    order.forEach((idx, rank) => {
      let r;
      if (rank === 0) r = 0; else if (rank === 1) r = 0.10; else if (rank === 2) r = 0.20;
      else r = 0.30 + Math.pow((rank - 2) / (N - 3), 0.85) * 0.70;
      nodes[idx].reveal = r;
    });
    edges = [];
    const seen = new Set();
    nodes.forEach((n, i) => {
      const d = nodes.map((m, j) => ({ j, dist: (m.sx - n.sx) ** 2 + (m.sy - n.sy) ** 2 })).filter(o => o.j !== i).sort((a, b) => a.dist - b.dist).slice(0, 2);
      d.forEach(o => { const k = i < o.j ? i + '-' + o.j : o.j + '-' + i; if (!seen.has(k)) { seen.add(k); edges.push([i, o.j]); } });
    });
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    const now = performance.now();
    introP = Math.min(1, (now - t0) / 6800);
    const W = 1920, H = 1080;
    ctx.clearRect(0, 0, W, H);
    const mode = scene <= 2 ? 'spread' : scene <= 6 ? 'clusters' : scene === 7 ? 'ring' : scene === 8 ? 'spread' : scene <= 10 ? 'ring' : scene <= 12 ? 'clusters' : 'spread';
    const hl = (scene >= 4 && scene <= 6) ? scene - 4 : -1;
    let baseA = mode === 'spread' ? 1 : mode === 'clusters' ? 0.7 : 0.42;
    if (scene >= 9) baseA *= 0.5;
    const cx = 960, cy = 540;

    nodes.forEach((n, i) => {
      let tx, ty;
      if (mode === 'spread') { tx = n.sx; ty = n.sy; }
      else if (mode === 'clusters') { const c = clusterC[n.cluster]; tx = c.x + (n.sx - cx) * 0.16; ty = c.y + (n.sy - cy) * 0.16; }
      else { const ang = (i / nodes.length) * Math.PI * 2; const R = 350 + (i % 3) * 26; tx = cx + Math.cos(ang) * R; ty = cy + Math.sin(ang) * R * 0.62; }
      n.cx += (tx - n.cx) * 0.055; n.cy += (ty - n.cy) * 0.055; n.tw += 0.018;
    });

    edges.forEach(([a, b]) => {
      const na = nodes[a], nb = nodes[b];
      if (introP < na.reveal || introP < nb.reveal) return;
      let op = 0.14 * baseA;
      if (mode === 'clusters') { op = na.cluster === nb.cluster ? 0.20 : 0.04; if (hl >= 0) op *= (na.cluster === hl || nb.cluster === hl) ? 1.7 : 0.35; op *= baseA; }
      else if (mode === 'ring') op = 0.08 * baseA;
      const edgeCol = (mode === 'clusters' && hl >= 0 && (na.cluster === hl || nb.cluster === hl)) ? '0,222,104' : '244,239,232';
      ctx.strokeStyle = `rgba(${edgeCol},${op})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(na.cx, na.cy); ctx.lineTo(nb.cx, nb.cy); ctx.stroke();
    });

    nodes.forEach((n, i) => {
      if (introP < n.reveal) return;
      const appear = Math.max(0, Math.min(1, (introP - n.reveal) / 0.035));
      let a = baseA * appear * (0.72 + 0.28 * Math.sin(n.tw));
      let rad = n.r, col = '244,239,232';
      if (mode === 'clusters' && hl >= 0) { if (n.cluster === hl) { rad *= 1.45; col = '0,222,104'; } else a *= 0.4; }
      ctx.beginPath(); ctx.arc(n.cx, n.cy, rad, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col},${a})`; ctx.fill();
      if ((mode === 'clusters' && n.cluster === hl) || (mode === 'spread' && i % 9 === 0)) {
        ctx.beginPath(); ctx.arc(n.cx, n.cy, rad * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${a * 0.12})`; ctx.fill();
      }
    });
  }

  function startCount() {
    if (countRAF) cancelAnimationFrame(countRAF);
    const start = performance.now();
    const step = () => {
      const p = Math.min(1, (performance.now() - start) / 1300);
      const e = 1 - Math.pow(1 - p, 3);
      count59 = Math.round(64 * e);
      document.getElementById('count59').textContent = count59;
      if (p < 1) countRAF = requestAnimationFrame(step);
    };
    countRAF = requestAnimationFrame(step);
  }

  function render() {
    let activeIsPaper = false;
    document.querySelectorAll('.scene').forEach(el => {
      const isActive = Number(el.dataset.scene) === scene && !panelKey;
      el.classList.toggle('active', isActive);
      if (isActive && el.classList.contains('paper-scene')) activeIsPaper = true;
    });
    document.body.classList.toggle('paper-active', activeIsPaper);
    cornerMark.src = activeIsPaper ? 'assets/logos/magoya-wordmark-green.svg' : 'assets/logos/magoya-wordmark-white.svg';
    cornerMark.classList.toggle('show', scene >= 3 && !panelKey);
    navHint.style.display = (scene !== 7 && scene < 13 && !panelKey) ? '' : 'none';
    panelOverlay.classList.toggle('show', !!panelKey);

    const groupIdx = scene <= 2 ? 0 : scene <= 6 ? 1 : scene <= 8 ? 2 : scene <= 10 ? 3 : scene === 11 ? 4 : scene === 12 ? 5 : 6;
    navDotsEl.querySelectorAll('.nav-dot-row').forEach((row, i) => {
      row.classList.toggle('is-active', i === groupIdx);
    });

    if (panelKey) renderPanel();
    updateLabel();
  }

  function renderPanel() {
    const cfg = PANELS[panelKey];
    const items = cfg.items;
    sel = Math.min(sel, items.length - 1);
    const selItem = items[sel] || {};

    panelEyebrow.textContent = cfg.eyebrow;
    panelTitle.textContent = cfg.title;
    panelSupporting.textContent = cfg.supporting;

    panelChips.innerHTML = items.map((it, i) => {
      return `<button class="mg-chip mg-chip-idx${i === sel ? ' is-active' : ''}" data-sel="${i}"><span class="mg-num">${String(i + 1).padStart(2, '0')}</span><span>${it.name}</span></button>`;
    }).join('');

    const bulletsHtml = (selItem.bullets && selItem.bullets.length) ? `
      <div class="mg-caption mg-panel-detail-group" style="margin-top:28px;">${cfg.bulletsLabel}</div>
      <div class="mg-panel-detail-bullets">
        ${selItem.bullets.map(b => `<div class="mg-panel-detail-bullet"><span class="dot"></span><span>${b}</span></div>`).join('')}
      </div>` : '';

    panelDetail.innerHTML = `
      ${selItem.group ? `<div class="mg-caption mg-panel-detail-group">${selItem.group}</div>` : ''}
      <div class="mg-panel-detail-name">${selItem.name || ''}</div>
      <div class="mg-panel-detail-def">${selItem.def || ''}</div>
      ${bulletsHtml}`;

    panelChips.querySelectorAll('.mg-chip').forEach(btn => {
      btn.addEventListener('click', () => { sel = Number(btn.dataset.sel); renderPanel(); });
    });
  }

  function setScene(n) {
    n = Math.max(0, Math.min(TOTAL_SCENES - 1, n));
    if (n === 7 && scene !== 7) { startCount(); } else if (n !== 7) { count59 = 0; }
    scene = n;
    panelKey = null;
    try { localStorage.setItem('magoya_kx_scene', String(n)); } catch (e) {}
    render();
  }

  function openPanel(key) { panelKey = key; sel = 0; render(); }
  function closePanel() { panelKey = null; render(); }

  function onWheel(e) {
    e.preventDefault();
    if (panelKey) return;
    const now = performance.now();
    if (now - lastNav < 760) return;
    if (Math.abs(e.deltaY) < 8) return;
    lastNav = now;
    setScene(scene + (e.deltaY > 0 ? 1 : -1));
  }

  function onKey(e) {
    if (e.key === 'Escape') { if (panelKey) closePanel(); return; }
    if (panelKey) return;
    if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); setScene(scene + 1); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); setScene(scene - 1); }
  }

  document.getElementById('btnExplore').addEventListener('click', () => setScene(3));
  document.getElementById('btnNext').addEventListener('click', () => { if (panelKey) { closePanel(); return; } setScene(scene + 1); });
  document.getElementById('btnPrev').addEventListener('click', () => { if (panelKey) { closePanel(); return; } setScene(scene - 1); });
  document.getElementById('btnClosePanel').addEventListener('click', closePanel);
  document.querySelectorAll('[data-open]').forEach(el => {
    el.addEventListener('click', () => openPanel(el.dataset.open));
  });

  navDotsEl.innerHTML = NAV_GROUPS.map((g, i) => `
    <div class="nav-dot-row" data-jump="${i}">
      <span class="nav-dot-label">${g}</span>
      <span class="nav-dot-dot"></span>
    </div>`).join('');
  navDotsEl.querySelectorAll('.nav-dot-row').forEach((row, i) => {
    row.addEventListener('click', () => setScene(GROUP_START[i]));
  });

  if (PRINT_MODE) {
    // Print/PDF mode: every scene is its own page, all shown at once,
    // no animation loop, no interaction — see css/deck.css @media print.
    document.body.classList.add('print-all');
    document.querySelectorAll('.scene').forEach(el => el.classList.add('active'));
    document.getElementById('count59').textContent = '64';
    document.getElementById('cornerMark').classList.add('show');
  } else {
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: false });

    initNetwork();
    t0 = performance.now();
    loop();
    render();
  }
})();
