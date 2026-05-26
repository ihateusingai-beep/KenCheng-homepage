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

## Deployed URLs
- **GitHub Pages:** https://ihateusingai-beep.github.io/KenCheng-homepage/
- **Netlify (previous):** https://vermillion-kulfi-544479.netlify.app/ *(deprecation recommended — files not served correctly)*
