# Aorgy01 – Gen Z & Alpha Webapp (Static PWA)

One-screen style PWA with bottom nav, unlimited Prompt box, Signals, and quick templates.
Designed mobile-first (≥64px tap targets), dark mode default, accent color customizable.

## 🔧 Local run (no build steps)
Just open `index.html` or serve the folder with any static server.

```bash
# Python
python -m http.server -d . 5173
# or Node
npx http-server . -p 5173
```

Open http://localhost:5173

## 🚀 Deploy to GitHub Pages (automatic)
1) Create a repo on GitHub (e.g. `Aorgy01`), set **Default branch: main**.
2) Push this folder to `main` (see commands below) or upload via web UI.
3) Pages deploy uses the included workflow: `.github/workflows/pages.yml`  
   - In repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**

### Git commands (copy/paste)
```bash
git init
git add .
git commit -m "init: Aorgy01 webapp"
git branch -M main
git remote add origin https://github.com/<YOUR-USER>/Aorgy01.git
git push -u origin main
```

After the workflow finishes, your site will be live at:  
`https://<YOUR-USER>.github.io/Aorgy01/`

## 🧩 What’s inside
- `index.html` – app shell with 5 tabs (Home/Explore/Create/Signals/Profile)
- `styles.css` – dark-first tokens, large tap targets, neo-brutal corners
- `app.js` – view switcher, prompt→UI mock, localStorage prefs, modal
- `manifest.json` + `sw.js` – PWA bits (installable & offline cache)
- `.github/workflows/pages.yml` – auto-deploy to GitHub Pages
- `assets/logo.svg` – simple gradient logo

## ✍️ Customize quickly
- Change accent color in Profile (saved to localStorage), or set `--accent` in `:root`
- Edit Signals copy in `index.html` → section#view-signals
- Extend prompt parser in `app.js` → `renderPreviewFromPrompt()`
