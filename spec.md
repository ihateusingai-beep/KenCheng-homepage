# KenCheng Homepage — Feature Spec

## About Modal (Phase 1-C)

**Status:** Implemented ✅
**Date:** 2026-05-26
**Commit:** e7c0239

---

### What
- Modal overlay (slide-in + backdrop blur) displaying Ken's identity
- Trigger: click "關於我" button inside watermark (bottom-right corner)
- Close: ✕ button, backdrop click, or Escape key

---

### Component: About Modal

**File:** `index.html` (injected markup + CSS + JS)

| Element | Details |
|---|---|
| `#about-modal` | Fixed overlay, `z-index: 99999`, hidden by default (`aria-hidden="true"`) |
| `.about-backdrop` | Semi-transparent blur backdrop |
| `.about-panel` | 520px max-width card, white/dark theme aware |
| `.about-close` | Top-right circular ✕ button |
| `.about-header` | Avatar + name + subtitle |
| `.about-divider` | 1px grey separator |
| `.about-body` | 4 sections: 關於我, 工具導航站, 偏好與風格, 連結 |
| `.about-tags` | Pill chips for preferences |
| `.about-links` | Outlined link buttons for key projects |

---

### Integration Points
- Watermark `"關於我"` button added inline — `onclick="openAboutModal()"`
- Theme observer syncs `data-theme` attribute on modal when opened
- Escape key handler closes modal
- Body scroll locked while modal open

---

### Accessibility
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-hidden`
- Focus trapped via natural focus flow
- Keyboard: Escape to close

---

## Short-Term Roadmap

### Phase 2: Filter Bar (TODO)
- Filter buttons: 全部 / 👤 Ken / 👥 同事 / 🎮 學生
- Requires JS bundle modification (React state flow)
- Approach: DOM-based filtering via `data-author` + `data-group` attributes injected into card wrappers

### Phase 3: Author Badge + Context Tag (TODO)
- Badge on Ken's own TDA cards (Ken Cheng badge, purple gradient)
- Colleague cards (green), Student cards (amber)
- Context tag chips inside card body
- Requires bulk modification of `vo` array in JS bundle

---

## Round 5 (2026-05-27)
**Commit:** 7e6d29f
**Status:** ✅ Done

- Generate Open Graph image (og-image.png, 1200×630, SVG→PNG via qlmanage)
- Remove orphan `public/` directory (old Vite artifact)
- GitHub Pages: confirmed built and serving

---

## Round 6 (2026-05-27)
**Commit:** 3960fed
**Status:** ✅ Done

- `sitemap.xml` — SEO sitemap (4 URLs)
- `robots.txt` — allow all, point to sitemap
- `students.html` — add OG tags + canonical
- `og-image.png` — compress 626KB→377KB (900px max)

---

## Round 7 (2026-05-27)
**Commit:** b273742
**Status:** ✅ Done

- `bookmark-sync.html` — OG tags + canonical
- `download-qr.html` — OG tags + canonical
- Remove `.netlify/` dead weight

---

## Round 8 (2026-05-27)
**Commit:** 4c621e2
**Status:** ✅ Done

- Replace `i.imgur.com` hotlinks → local `/assets/images/avatar.png` (21KB self-hosted)
- SW v8 bump (avatar.png in cache list)
- Skip gundam-assets PNG compression (photo quality, already optimized, 6.3MB total acceptable)

---

## Round 9 (2026-05-27)
**Commit:** 7fd7838
**Status:** ✅ Done

- `manifest.json` — `background_color` #f8fafc → #0a0f1a (dark theme match, PWA FOUC fix)
- `index.html` — add `revisit-after: 7 days` meta

---

## Round 10 (2026-05-27)
**Commit:** 84c8285
**Status:** ✅ Done

- Fix broken `pdf-tool/` footer link → 404 removed
- Add JSON-LD WebSite schema (author, publisher, about)

---

## Deployed URLs
- **GitHub Pages:** https://ihateusingai-beep.github.io/KenCheng-homepage/
- **Netlify (previous):** https://vermillion-kulfi-544479.netlify.app/ *(deprecation recommended — files not served correctly)*
