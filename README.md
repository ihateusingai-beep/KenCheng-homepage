# Ken Cheng 電子教學工具導航站

> 匯集教學輔助、AI 應用、開發工具與模擬體驗的個人導航站

**Live:** https://ihateusingai-beep.github.io/KenCheng-homepage/

## 工具分類

| 分類 | 說明 |
|------|------|
| 🎓 教學 TDA | 老師上課用的互動教材（數學/語文/科學） |
| 💻 電腦 | 打字練習、打字遊戲 |
| 🔧 實用工具 | QR Code、書籤同步等 |
| 🤖 AI 助手 | GNS AI、數位人助教 |
| 🎮 開發工具 | Cursor、Lovable、Bolt、v0 |

## 頁面地圖

- `/` — 主頁（工具導航）
- `/students.html` — 學生專區
- `/bookmark-sync.html` — 書籤同步工具
- `/download-qr.html` — QR Code 下載頁

## 技術棧

- Vite + Tailwind CSS + React 18
- PWA（Service Worker v9，可離線）
- MiniMax TTS / 語音合成
- GitHub Pages 托管

## 快速開始

```bash
# Clone
git clone https://github.com/ihateusingai-beep/KenCheng-homepage.git
cd KenCheng-homepage

# Dev（已 build，無源碼）
# 只需靜態托管即可
```

## 更新日誌

- **R21 (2026-05-27):** SW v9 全頁緩存（404 + 所有 HTML）
- **R20 (2026-05-27):** hreflang + color-scheme + DNS prefetch
- **R18 (2026-05-27):** 404 fallback 頁面
- **R17 (2026-05-27):** Schema.org structured data
- **R16 (2026-05-27):** favicon.ico + manifest 清理
- **R15 (2026-05-27):** robots.txt AI bot 阻止
- **R14 (2026-05-27):** JS bundle footer 年份 2026
- **R13 (2026-05-27):** 全頁 SEO meta 優化

---
Made with ❤️ by [Ken Cheng](https://ihateusingai-beep.github.io/KenCheng-homepage/)