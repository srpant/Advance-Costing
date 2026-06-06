# 🍽️ Recipe Manager Pro

A professional recipe costing, nutrition tracking, and management Progressive Web App for chefs.

## ✨ Features

- **Recipe Costing** — Real-time food cost %, gross profit, suggested sell price
- **Ingredient Database** — Built-in nutrition & cost database with AI auto-fill
- **Nutrition Calculator** — Per-portion macros with AI nutritional insights
- **QTY Calculator** — Type math expressions directly in quantity fields (`300+150`, `(500-20)*2`)
- **Sub Recipes** — Link recipes as ingredients in other recipes
- **Import / Export** — Excel (.xlsx) import and export
- **PWA** — Installable on Android, iPhone, and desktop
- **Offline Support** — Works without internet after first load
- **Multi-theme** — Dark, Light, and Warm themes

## 📱 Install as App

### Android (Samsung Browser / Chrome)
1. Open the app URL in **Samsung Internet** or Chrome
2. Tap the **Install** banner at the bottom, or
3. Tap browser menu (⋮) → **"Add to Home Screen"**

### iPhone / iPad (Safari)
1. Open in **Safari**
2. Tap **Share** (📤) → **"Add to Home Screen"**

### Desktop (Chrome / Edge)
1. Click the **install icon** (⊕) in the address bar

## 🚀 Deploy to GitHub Pages

1. Fork or clone this repository
2. Go to **Settings** → **Pages**
3. Set source to **Deploy from a branch** → `main` → `/ (root)`
4. Your app will be live at `https://yourusername.github.io/recipe-manager/`

Or use the included GitHub Actions workflow for automatic deployment.

## 🔧 Files

| File | Purpose |
|------|---------|
| `index.html` | Main app (self-contained) |
| `manifest.json` | PWA manifest for install prompt |
| `sw.js` | Service worker for offline support |
| `icons/` | App icons (72px to 512px) |
| `favicon.ico` | Browser tab icon |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages |

## 📋 Tech Stack

- Vanilla JS (no framework dependencies)
- CSS custom properties for theming
- LocalStorage for data persistence
- SheetJS for Excel import/export
- Pollinations AI for nutrition lookup
- Service Worker for offline PWA

## 📄 License

MIT License — free to use and modify.
