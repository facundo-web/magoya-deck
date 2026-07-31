# Magoya Knowledge Experience — Visual Design Punch List

Surveyed: `index.html`, `css/deck.css`, `js/deck.js`, `content/panels.js` (current build, 14 scenes) against the documented system in `brand-system/` (styleguide.html, library.html, PLAN.md, assets/) and the locked decisions in memory (paper/ink rhythm, "must not look AI-generated" mandate, estratos motif, no people/crop photography).

Twelve distinct elements below, each brief-able independently — hand any one of these to a designer/agent on its own; the shared constraints at the bottom are what keep the results cohering as one system.

---

## 1. Icon Set (Pillars, Method, Capabilities)

**Where it lives:** `index.html` lines 63, 87, 107 (Pillar 1/2/3 heads), 218, 226, 234, 242 (Method cards, scene 10), 268, 279, 290, 302 (Capabilities cards, scene 11). CSS: `.mg-icon`, `.mg-icon-sm/md/card` in `css/deck.css` lines 199-204.

**Why it needs work:** 11 icons exist today, all hand-authored inline as one-off `<svg>` blocks with no shared construction rules. Stroke widths drift between instances (`stroke-width="1.6"` on most, `"1.8"` on the Method checkmark). Geometric complexity is wildly uneven — the Pillar 3 "method" icon is a two-arc circular-arrow glyph with four path commands, while the Capabilities "Product & UX" icon is a simple corner-bracket + dot. There's no true set: it's 11 separate improvisations. The documented brand system has **zero icon direction** — this gap isn't unique to the deck, it's system-wide.

**Brief:** This set is the deck's small connective tissue — it should feel like one hand drew all 11 pieces in one sitting, present but quiet, never competing with the Manrope headlines next to them. Mood: precise but not corporate-clean; a little loose, like a technical sketch rather than a UI icon library. It sits directly beside pillar/method/capability copy that is locked, so icons must read as literal-enough shorthand for the label without needing a legend.

**Deliverable ask:** 11 monoline SVG icons, 24×24 viewBox, single `currentColor` stroke, uniform 1.6px stroke-weight, `stroke-linecap="round"`, no fills except small solid dots/nodes (matching existing convention), no more than 4 path/shape primitives per icon. Set: 3 pillar icons, 4 method-step icons (magnifier/spark/route/check — already exist, need weight normalization), 4 capability-column icons (already exist, need weight normalization). Deliver as a single SVG sprite or one file per icon named by slot.

---

## 2. Ambient Background for Ink Scenes (network canvas)

**Where it lives:** `#netCanvas` in `index.html` line 15, driven by `js/deck.js` lines 51-120 (`initNetwork`, `loop`). Layered under `.bg-glow`, `.bg-grid`, `.bg-grain` (`css/deck.css` lines 76-88).

**Why it needs work:** This is the flagged, open gap — reviewers read the drifting node/line canvas as "The Matrix" / hacker terminal, which directly fights the "editorial paper dossier" identity the rest of the CSS explicitly aims for. It's present behind every ink scene (0-6, 8, 13 — 8 of 14 scenes), so it's the single most-seen background element in the whole piece, and it's the one most out of step with the brand.

**Brief:** This is the "cover stock" texture behind most of the deck — it needs to feel like paper grain, ink bleed, or the estratos soil-layer motif breathing quietly, not a live data simulation. It should read as ambient and almost static at a glance, not as a system visualizing itself. It sits directly behind body text and headlines (contrast budget is tight — current opacity is 0.55), so whatever replaces it must recede, not perform. It shares its motion budget with the pillar diagrams (#5) and the count-up stat (#8) — none of these three should compete for "the moving thing on screen" at once.

**Deliverable ask:** Propose 2-3 alternate treatments as static frames + short video/GIF of motion, evaluated against: (a) an evolution of the current canvas — same node data, recolored/reshaped into estratos-style horizontal soil bands, slow vertical drift instead of node-repulsion; (b) a hand-drawn textural approach — slow-moving grain/paper-fiber (canvas or CSS-only, no WebGL); (c) a much-reduced version of the existing network (fewer nodes, slower motion, single color, opacity ≤0.25) as the "safe" fallback. Must run in vanilla canvas/CSS (no new JS libraries). Must keep working with the existing `scene <= 2 / clusters / ring` mode-switching logic in `js/deck.js` or explicitly say what replaces it.

---

## 3. Proof Hub Visualization (scene 7)

**Where it lives:** `index.html` lines 128-177 (`.mg-hub`, `.mg-hub-svg`, `.mg-hub-nodes`). CSS: `css/deck.css` lines 225-246.

**Why it needs work:** The centerpiece "64 deployments" moment is currently five plain straight lines radiating from a center circle to five stat cards — a generic hub-and-spoke chart with no relationship to Magoya's visual language. It's the most content-dense, "wow" scene in the deck and it currently looks like a default org-chart diagram, not a considered visual centerpiece.

**Brief:** This is the deck's single "explore me" moment — it should feel like a map or a field plot being pinned with data points, not a corporate network diagram. Should visually rhyme with the estratos motif (`brand-system/assets/motif-estratos.svg`) or another agricultural-abstract metaphor already sanctioned (no literal crop/people imagery). It's the one scene where the ambient background (#2) goes quiet — this diagram can carry more visual weight than anywhere else, but must still hand off cleanly to the flat card style of its five node components.

**Deliverable ask:** A redesigned connective-diagram treatment for the same five-node-plus-center data structure (64 → 22/8/8/28/10), replacing the straight-line SVG spokes with a more bespoke connector treatment (hand-drawn curve, dashed hand-tremor line, or estratos-band underlay) — deliverable as an SVG template compatible with the existing five fixed node positions so it drops in without new JS.

---

## 4. Hand-Drawn Accent Flourish System

**Where it lives:** `.mg-accent` inline SVG underlines in `index.html` lines 32, 33, 53. CSS: `css/deck.css` lines 150-157 (`.mg-accent`, `.mg-circle-wrap`). Compare to `brand-system/assets/flourish-underline.svg`, `flourish-circle.svg`, `flourish-arrow.svg`.

**Why it needs work:** The deck re-draws its own one-off underline path inline per instance instead of referencing the documented flourish family. Only the underline variant is used — circle and arrow flourishes exist in the brand system and are never used. `.mg-circle-wrap` is defined in CSS but never called in `index.html` — dead code / an unfinished thought.

**Brief:** This is Magoya's signature "proof of a human hand" mark — explicitly the opposite of a highlighter block, used to underline/circle/point at single accented words. Must look unmistakably freehand: uneven pressure, slight overshoot, never a perfect curve. Appears sparingly (2-3 times per scene at most).

**Deliverable ask:** Consolidate to one canonical, parameterized flourish family (reuse/refine the existing three brand-system SVGs), each with 2-3 stroke-path variations to avoid repetition. Single `currentColor` stroke, 2.5-4px weight, organic non-uniform curve. Deliver as SVG path data usable both for underline-under-word and circle-around-word.

---

## 5. Pillar Concept Diagrams (scenes 4-6 triptych)

**Where it lives:** Pillar 1 (scene 4): icon + chip set only. Pillar 2 (scene 5): icon + `.mg-formviz` animated squares-into-ring diagram. Pillar 3 (scene 6): icon + `.mg-loop-row` animated pill sequence.

**Why it needs work:** These three scenes are meant to read as one triptych but each improvises a completely different secondary visual device — a static tag cloud, an abstract morphing-shapes animation, a pulsing pill chain. None share a visual grammar, weight, or motion timing.

**Brief:** These three diagrams are a single argument told in three parts — they need one shared diagram language (stroke weight, animation easing/duration, color logic) so scrolling through feels like turning pages of the same idea. Each should still differentiate its content while staying inside one system.

**Deliverable ask:** One diagram template family, three content variants: (a) Pillar 1 — a lightly connected/clustered arrangement echoing domain breadth, (b) Pillar 2 — refine `.mg-formviz` so the shape-morph reads clearly as "many inputs → one custom fit," (c) Pillar 3 — keep the loop-pill sequence but restyle to match (a)/(b)'s line-weight/motion-easing.

---

## 6. Card & Component Visual Language

**Where it lives:** `.mg-card`, `.mg-card-dark`, `.mg-card-result`, `.mg-pill-tag`, `.mg-tag` — `css/deck.css` lines 141-178. Used throughout Method, Capabilities, Results, Discovery.

**Why it needs work:** Every card is a flat rounded rectangle with a standard Material-style elevation shadow — visually indistinguishable from a generic SaaS marketing site's card component. Given the explicit "printed dossier, not a terminal" ambition, cards carry none of that paper-craft quality.

**Brief:** Cards are where most of the deck's actual content lives — they need to feel like index cards or dossier pages, not SaaS UI chrome. Consider a paper-texture fill, a hand-cut top edge, a subtle rotation/imperfection, or a different shadow logic entirely.

**Deliverable ask:** A revised `.mg-card` / `.mg-card-dark` / `.mg-card-result` treatment — border, shadow, and/or texture spec — that reads as considered paper/print rather than default web-app elevation. Work at the existing `border-radius:14px` or propose a replacement token.

---

## 7. Cover / Opening Scene (scene 0, Intro)

**Where it lives:** `index.html` lines 22-26 — contains only one line: "A Magoya knowledge experience."

**Why it needs work:** This is the very first thing anyone sees, and it's currently almost empty — one small eyebrow line, centered, over the (Matrix-y) network canvas, no wordmark, no visual anchor. The logo doesn't appear until scene 2.

**Brief:** This is the handshake moment — it should feel deliberate and confident, not like a loading screen. It sets the tone for the ambient background (#2) since it's rendered first. Should not preempt or duplicate the wordmark reveal in scene 2.

**Deliverable ask:** A proposed treatment for scene 0 as a genuine "cover" moment — could be a slow reveal of the ambient motif (#2) itself, a minimal typographic mark, or a restrained combination — with a concrete before/after mock. Only the existing eyebrow line of copy is allowed; no wordmark here.

---

## 8. Data-Viz Treatment for Stats (Results scene 12, Proof count-up scene 7)

**Where it lives:** Results cards, `index.html` lines 330-357. Proof hub count-up, lines 143-148 + `js/deck.js` lines 122-133.

**Why it needs work:** Every number in the deck — the "64," the four Results stats, the five hub-node stats — is plain oversized Manrope typography with no visual quantity cue. For a deck whose entire "Proof" and "Results" sections exist to make a numeric case, there's currently zero actual chart — just numerals.

**Brief:** These numbers are the deck's evidence — they should feel authoritative and give the eye something to compare against, without becoming a generic dashboard chart. Must not imply false precision. Should feel like it belongs next to the hand-drawn flourish system (#4), not a BI tool widget.

**Deliverable ask:** One lightweight, reusable "quantity mark" component (a partial-fill ring, a hand-drawn bar/tick mark, or a proportionally-sized dot) that can sit beside/behind the four `.mg-stat-card` numbers and the five `.mg-stat-md` hub numbers, inline SVG, no charting library, single accent color.

---

## 9. Ink↔Paper Scene-Transition Motion

**Where it lives:** `.scene{display:none}` / `.scene.active{display:block}` toggle in `css/deck.css` line 91-92, driven by `render()` in `js/deck.js` lines 135-142. No transition CSS exists between scene swaps.

**Why it needs work:** The locked paper/ink rhythm (scenes 7, 9, 10, 11, 12 jump to full-bleed Crema) is a deliberate visual beat, but the actual swap happens with zero transition — a hard, instant cut, identical to every other scene change. The "jump" is only visible as a static before/after.

**Brief:** Not a request to change *which* scenes are paper (locked) — only to give the ink→paper and paper→ink handoffs their own small motion signature, distinct from the ordinary scene fade. Should feel like a page turn, a flash of light, or an ink-to-paper wipe — quick (under ~400ms), never a slow cross-fade.

**Deliverable ask:** A specific CSS/JS transition spec (keyframe + duration + easing) that fires only on the scene transitions where `.paper-scene` status flips, distinct from standard per-scene content animations. Must work within the existing `setScene()`/`render()` functions.

---

## 10. Proof Hub Node Interactive Affordance

**Where it lives:** `.mg-hub-node` / `.mg-node` — `index.html` lines 151-170, CSS `css/deck.css` lines 193-195, 232-234.

**Why it needs work:** The five clickable hub nodes look identical to plain stat cards — nothing signals "click me" until hover (desktop-only). The footer hint is small and easy to miss. Touch devices get zero affordance beyond the text hint.

**Brief:** These five nodes are the deck's main interactive surface — they need a quiet, always-visible cue, consistent with the deck's restrained tone. Should extend the hand-drawn flourish language (#4) or the icon set (#1), not a generic "chevron in a circle."

**Deliverable ask:** A static (always-on) micro-affordance for `.mg-hub-node` — a small corner mark, plus glyph, or dashed-border treatment — as CSS/inline-SVG working identically on touch and pointer devices, plus a `:focus-visible` state for keyboard nav (currently absent).

---

## 11. Proof Panel Empty/Asymmetric State (Organizations panel)

**Where it lives:** `content/panels.js` lines 87-108 — the `orgs` panel has `bulletsLabel: ''` and items with only `name` + `def`, no `bullets`, unlike the other four panels (all populate 4 bullets per item).

**Why it needs work:** The panel detail layout assumes every item has a bullet list, so the Organizations panel — one of five main exploration paths — renders visibly sparser than its siblings. A prospect could click into this mid-pitch and notice.

**Brief:** Not a case for decorative filler — a case for a panel-detail layout that looks intentionally different (not accidentally empty) when there's no bullet list.

**Deliverable ask:** Either (a) flag back to Varu/Pato that `orgs` items are missing the 4th data point the other panels have and ask whether bullets should be authored, or (b) if bullets truly aren't coming, a distinct single-column/large-definition detail layout variant for panels without bullets.

---

## 12. Print/PDF Cover & Pagination Treatment

**Where it lives:** `@media print` block, `css/deck.css` lines 325-354; `build_pdf.py`; `index.html?print=1` mode.

**Why it needs work:** Print mode just stacks all 14 on-screen scenes as fixed pages with the ambient canvas hidden — no dedicated PDF cover page (title, "prepared for," date), no running footer/page-number treatment. Client logo assets exist specifically to support a future "Prepared for [Client]" cover, currently unused anywhere.

**Brief:** The PDF is the artifact a prospect keeps after the call — it deserves its own front matter, distinct from scene 0's live cover (#7), with a lightweight per-client personalization slot (using `assets/logos/clients/`) without turning this into a client-logos showcase.

**Deliverable ask:** A proposed print-only cover page (title, subtitle, optional "Prepared for [Client]" line + logo slot) plus a consistent footer/page-number treatment for the 14 body pages, as additions to the `@media print` block and any `build_pdf.py` changes needed to inject a client name/logo at export time.

---

## Shared Constraints (apply to every brief above)

- **Typography:** Manrope only for all display/body/UI text; JetBrains Mono only for eyebrows, captions, numeric labels. No other typefaces.
- **Palette (exact hex, no additions without approval):** Ink `#133825` / Ink-2 `#0F2E1E` / Ink-3 `#1E4A34` / Ink-4 `#2A5C42` / Paper `#ECE3DB` / Paper-dim `#DFD3C3` / Accent `#00DE68` / Accent-deep `#0E6B36` / Accent-ink `#0C2A1B` / On-ink `#F4EFE8`.
- **No gradients, no 3D, no glossy/glassmorphism, no perfect symmetry.** Explicit founder directive: must not look AI-generated. Favor hand-drawn imperfection and asymmetry.
- **No people or crop/field photography.** Abstract motifs only (estratos soil-layers, geometric/typographic devices).
- **The paper/ink scene rhythm is locked.** Scenes 7, 9, 10, 11, 12 are full-bleed paper "jump" beats; everything else is ink. Only how those states look/transition is open.
- **Content copy is 100% locked.** No brief should propose new or altered copy.
- **No build step, no new frameworks.** Vanilla HTML/CSS/JS only — inline SVG, plain CSS, small vanilla-JS snippets.
- **Must degrade at the existing breakpoints** (900px, 760px, 520px) — mobile is not an afterthought.

---

## Prioritization

If only 2-3 elements can be tackled before this ships as a live sales tool:

1. **#2 — Ambient background for ink scenes.** The single flagged reviewer objection ("hacker terminal") on the most-seen element in the deck (behind 8 of 14 scenes). Fixing it changes the first impression more than any other single change.
2. **#1 — Icon set.** Cheap relative to impact: normalizing 11 existing icons to one stroke weight/geometry rule is bounded/mechanical, and immediately removes a "half-finished" feeling from three content-dense scenes.
3. **#7 — Cover scene.** First impressions compound — a prospect's very first frame is currently the emptiest scene in the deck. Low-effort (one line of copy involved) relative to payoff.

#3 (Proof hub) and #8 (data-viz stats) are next tier — both touch the deck's actual evidentiary "wow" content, but are more design-effort-intensive.
