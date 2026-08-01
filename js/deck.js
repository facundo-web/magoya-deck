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
  const flashOverlay = document.getElementById('flashOverlay');

  function sceneIsPaper(n) {
    const el = document.querySelector(`.scene[data-scene="${n}"]`);
    return !!(el && el.classList.contains('paper-scene'));
  }

  // Directional choreography — scoped to exactly these four boundaries per
  // the brief (1↔2 Manifesto→Logo, 6↔7 Pillar 3→Proof, 7↔8 Proof→Finale,
  // 9↔10 Bridge→Method). Every other scene change keeps today's instant
  // cut + flashOverlay, byte-for-byte. Keyed by the unordered scene pair so
  // it fires the same way regardless of nav direction.
  const VT_PAIRS = {
    '1-2': null,
    '6-7': { oldSel: '[data-scene="6"] .mg-pillar-head', newSel: '[data-scene="7"] .mg-hub-head' },
    '7-8': { oldSel: '[data-scene="7"] .mg-hub-center', newSel: '[data-scene="8"] .mg-finale-stats' },
    '9-10': { oldSel: '[data-scene="9"] .mg-h1', newSel: '[data-scene="10"] .mg-method-head' },
  };
  const supportsVT = typeof document.startViewTransition === 'function';

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
  let raf = null;
  let nodes = [];
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FRAME_MS = 1000 / 30;
  let lastFrameT = 0;

  function updateLabel() {
    stage.setAttribute('data-screen-label', SCENE_NAMES[scene] || '');
    stage.setAttribute('data-screen-index', String(scene + 1).padStart(2, '0'));
  }

  // Ambient background — direction "2c Red reducida": a quiet, almost-still
  // texture behind the few remaining ink scenes, not a "network visualizing
  // itself." Deliberately simple: 18 nodes drift and bounce off the edges,
  // connecting only when close. No scene-aware modes — the canvas only ever
  // shows behind scenes 2/8/13 now, so it doesn't need to perform per-scene.
  function initNetwork() {
    const W = 1920, H = 1080, N = 18;
    nodes = [];
    for (let i = 0; i < N; i++) {
      nodes.push({
        x: 60 + Math.random() * (W - 120),
        y: 60 + Math.random() * (H - 120),
        vx: (Math.random() * 2 - 1) * 0.08,
        vy: (Math.random() * 2 - 1) * 0.08,
        r: 1.4 + Math.random() * 1.4,
      });
    }
  }

  function drawNetwork() {
    const W = 1920, H = 1080;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 92) {
          ctx.strokeStyle = `rgba(0,222,104,${(1 - d / 92) * 0.55})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    nodes.forEach(n => {
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,222,104,0.22)';
      ctx.fill();
    });
  }

  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (now - lastFrameT < FRAME_MS) return;
    lastFrameT = now;
    const W = 1920, H = 1080;
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x <= 0 || n.x >= W) n.vx *= -1;
      if (n.y <= 0 || n.y >= H) n.vy *= -1;
      n.x = Math.max(0, Math.min(W, n.x));
      n.y = Math.max(0, Math.min(H, n.y));
    });
    drawNetwork();
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
    cornerMark.src = activeIsPaper ? 'assets/logos/magoya-wordmark-deep.svg' : 'assets/logos/magoya-wordmark-white.svg';
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
        ${selItem.bullets.map(b => `<div class="mg-panel-detail-bullet">${b}</div>`).join('')}
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

  function applySceneChange(n) {
    if (n === 7 && scene !== 7) { startCount(); } else if (n !== 7) { count59 = 0; }
    scene = n;
    panelKey = null;
    try { localStorage.setItem('magoya_kx_scene', String(n)); } catch (e) {}
    render();
  }

  function setScene(n) {
    n = Math.max(0, Math.min(TOTAL_SCENES - 1, n));
    const prev = scene;
    if (n === prev) { render(); return; }

    const pairKey = [prev, n].sort((a, b) => a - b).join('-');
    const isTargetPair = Object.prototype.hasOwnProperty.call(VT_PAIRS, pairKey);
    const wasPaper = sceneIsPaper(prev);

    if (!REDUCED_MOTION && supportsVT && !PRINT_MODE && isTargetPair) {
      const direction = n > prev ? 'fwd' : 'back';
      const html = document.documentElement;
      const oldSceneEl = document.querySelector(`.scene[data-scene="${prev}"]`);
      const anchor = VT_PAIRS[pairKey];
      let oldAnchorEl = null, newAnchorEl = null;

      html.dataset.navDir = direction;
      if (oldSceneEl) oldSceneEl.style.viewTransitionName = 'mg-content-old';
      if (anchor) {
        oldAnchorEl = document.querySelector(anchor.oldSel);
        if (oldAnchorEl) oldAnchorEl.style.viewTransitionName = 'mg-anchor';
      }

      const transition = document.startViewTransition(() => {
        if (oldSceneEl) oldSceneEl.style.viewTransitionName = '';
        if (oldAnchorEl) oldAnchorEl.style.viewTransitionName = '';
        document.body.classList.add('vt-grid-boost');
        applySceneChange(n);
        const newSceneEl = document.querySelector(`.scene[data-scene="${n}"]`);
        if (newSceneEl) newSceneEl.style.viewTransitionName = 'mg-content-new';
        if (anchor) {
          newAnchorEl = document.querySelector(anchor.newSel);
          if (newAnchorEl) newAnchorEl.style.viewTransitionName = 'mg-anchor';
        }
        // grid recolor: flip the tint mid-mutation so the "old" capture is
        // pre-cut and the "new" capture is post-cut — the browser cross-
        // fades/morphs between the two automatically (persistent named node).
      });

      transition.finished.finally(() => {
        const settledSceneEl = document.querySelector(`.scene[data-scene="${n}"]`);
        if (settledSceneEl) settledSceneEl.style.viewTransitionName = '';
        if (newAnchorEl) newAnchorEl.style.viewTransitionName = '';
        delete html.dataset.navDir;
        document.body.classList.remove('vt-grid-boost');
      });
    } else {
      applySceneChange(n);
      if (!REDUCED_MOTION && sceneIsPaper(n) !== wasPaper) {
        flashOverlay.classList.remove('flash');
        void flashOverlay.offsetWidth; // restart the animation if it's already mid-flash
        flashOverlay.classList.add('flash');
      }
    }
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
    // Keyboard affordance for the Proof hub nodes: Enter/Space opens the
    // panel like a click. stopPropagation keeps the global onKey scene
    // navigator (which also binds Space) from firing at the same time.
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        e.stopPropagation();
        openPanel(el.dataset.open);
      }
    });
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
    document.querySelectorAll('.scene').forEach(el => {
      el.classList.add('active');
      const footer = document.createElement('div');
      footer.className = 'print-footer';
      footer.innerHTML = `<span>Magoya · Knowledge Experience</span><span>${el.dataset.page} / 14</span>`;
      el.appendChild(footer);
    });
    document.getElementById('count59').textContent = '64';
    document.getElementById('cornerMark').classList.add('show');

    // Cover personalization — direction "12b": ?client=<name>&logo=<path
    // relative to the deck root, e.g. assets/logos/clients/john-deere.svg>.
    // Omitted entirely (not an empty rectangle) when no client is passed.
    const params = new URLSearchParams(location.search);
    const clientName = params.get('client');
    const clientLogo = params.get('logo');
    if (clientName) {
      document.getElementById('printCoverClientName').textContent = clientName;
      const logoImg = document.getElementById('printCoverLogo');
      if (clientLogo) { logoImg.src = clientLogo; logoImg.style.display = ''; }
      else { logoImg.style.display = 'none'; }
      document.getElementById('printCoverClientRow').style.display = '';
    }
  } else {
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: false });

    initNetwork();
    drawNetwork();
    if (!REDUCED_MOTION) raf = requestAnimationFrame(loop);
    render();
  }
})();
