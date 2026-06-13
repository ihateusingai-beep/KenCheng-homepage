# AGENTS.md

Ken Cheng 電子教學工具導航站 — 靜態單頁 PWA，收錄教學工具、AI 應用、開發工具，托管於 GitHub Pages。

## 快速開始

- 無需安裝。`index.html` 即可喺瀏覽器開
- 直接 push 至 `main`，GitHub Pages 自動部署至 https://ihateusingai-beep.github.io/KenCheng-homepage/
- 修改源碼：兩條路徑
  - **Inline micro-edits**（P0 UX、a11y、3-track 整合嘅 micro-interactions 等）直接改 `index.html` 嘅 inline `<style>` / `<script>`
  - **主 React build**（即將 / 部分功能）改 `src/` 後跑 `npm run build`，產物入 `assets/`

## 頁面結構

- `/` — 主頁（工具導航，含書籤/最近/推薦引擎、search instant-result、gundam admin-only Easter egg）
- `/students.html` — 學生專區
- `/bookmark-sync.html` — 書籤同步工具
- `/download-qr.html` — QR Code 下載頁
- `404.html` — 自定義 404

## 技術棧

- **部署產物**：`index.html`（hybrid — 內聯 inline `<style>`/`<script>` + Vite build artifact 喺 `assets/index-*.js` + `assets/index-*.css`）
- **框架**：React 18（via Vite build）做主要 app；手寫 vanilla JS 做 P0 micro-interactions / 3-track 整合嘅 bookmark/recent/recommend engine
- **PWA**：Service Worker（`sw.js`，v11，可離線）+ `manifest.json` + PWA install banner (Track C)
- **A11y**：skip-link、focus-visible、aria-label、keyboard nav（search dropdown ↑↓ Enter Esc）
- **無後端、無數據庫、無 CI/CD**
- **GitHub Pages** 托管

## 當前主要 inline work（P0 + 3-track merge）

P0 改動（commit `94db272`）：
- `getAuthorType()` helper unify badge counts / filter behavior（修咗 99-vs-39 contradiction）
- `#gundam-switcher` 預設隱藏，Ctrl/Cmd+Shift+G 切換 admin mode
- Search instant-result dropdown（top-6 fuzzy match，keyboard nav）
- Mobile CTA overlap fix（560px media query）

3-track 整合（merge `4b9e8f3`）：
- **Track A**：`__recommendTools` engine + bookmark/recent write paths + 為你推薦 wiring
- **Track B**：hero + card micro-interactions + focus polish
- **Track C**：PWA install banner + a11y polish + manifest update（incl. skip-link target fix `href="#root"`）

## 代碼規範

- 兩種 source 風格要分清：
  - **`index.html` 內聯**：P0 / a11y / 3-track micro-interactions —— 一句 grep 就搵到，唔好 move 入 `src/`
  - **`src/` Vite source**（如有）：主 React app，build 之後 ingest 入 `assets/index-*.js`
- 提交前 `rg -n 'TODO|FIXME|XXX' index.html` 應該無 hit
- 提交前 `wc -c index.html` 記低當前 size，留返 baseline

## 測試方式

- 手動測試：瀏覽器開 `index.html`，檢查所有工具連結、書籤、推薦引擎、search dropdown、skip-link、PWA install banner
- **5 invariants E2E smoke**（每次改 `index.html` 之後跑）：
  1. `__recommendTools` 在 `index.html` 出現 ≥ 4 次
  2. `hero|micro-interaction|focus-visible` markers ≥ 30 hits
  3. `beforeinstallprompt|pwa-install|skip-link` markers ≥ 10 hits
  4. `getAuthorType|gundam-switcher` (P0 核心) ≥ 5 hits，zero regression
  5. Skip-link target `href="#root"` exactly 1 hit
- PWA：Service Worker 離線緩存測試
- 多頁面：`students.html`、`bookmark-sync.html`、`download-qr.html` 各別檢查
- 無自動化測試框架

## 部署

- 直接 push 至 `main`，GitHub Pages 自動部署
- Service Worker cache 版本需配合 `manifest.json` version 更新（而家 SW v11）
- **本地 Mac only** — 唔 push 任何 `gundam-chatbot` pattern 嘅嘢，呢個 repo 冇呢個限制

## 安全

- 無 API key、無 secrets
- 書籤 / 推薦 / gundam-admin 數據存於 localStorage / sessionStorage
- `.gitignore` 包咗 `.mavis/`、`.opencode/`、`.harness/`、`.DS_Store`、IDE 嘢（勿 commit runtime / agent 資料）
