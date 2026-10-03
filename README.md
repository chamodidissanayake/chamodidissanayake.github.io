# Chamodi Dissanayake — academic portfolio

A static, dependency-free site (plain HTML/CSS/JS, no build step) that deploys for free on GitHub Pages.

## File map

| File | What it is |
|---|---|
| `data.js` | **All content. The only file you edit day to day.** |
| `index.html` | Page structure (hero, sticky nav, sections). |
| `style.css` | Visual design: forest green + dark "point cloud" accents. |
| `script.js` | Renders `data.js` into the page, plus the photo lightbox and nav highlighting. |
| `assets/` | Photos and figures: `profile/`, `gallery/` (point-cloud renders and figures), `conferences/`, `travel/`. |
| `tools/optimize_images.py` | Shrinks new photos and strips their metadata before publishing. |

Keep the whole folder together. Opening `index.html` on its own (without the other files next to it) shows a blank, unstyled page.

## Previewing

Double-click `index.html`. Edit `data.js`, save, and refresh the browser.

## Adding things

- **New event, paper, trip:** copy an existing entry in the matching array in `data.js` and edit it. Newest first.
- **Photos:** put the file in the right `assets/` subfolder, reference it in `data.js` (e.g. `"assets/conferences/Burgos1.jpeg"`). Paths are **case-sensitive** on GitHub. Then run:
  ```
  python tools/optimize_images.py
  ```
  This resizes to 1600 px, keeps the same filename, and removes EXIF data (which can include GPS location). Keep your full-size originals somewhere outside this folder; the current ones are in `../personal-academic-site_ORIGINAL_PHOTOS_BACKUP/`.
- **Figures / point-cloud renders** go in `assets/gallery/`. Anything there is shown whole on a dark background instead of being cropped.
- **CV:** save it as `assets/CV_Chamodi_Dissanayake.pdf` and uncomment the `cvUrl` line in `data.js`. A "CV (PDF)" button appears automatically.
- **Google Scholar / ResearchGate / GitHub:** uncomment the line in `profile` and paste your URL.
- Update `profile.updated` (e.g. `"2026-11"`) when you change things; it's shown in the footer.

## Private files

Everything inside this folder becomes **public** on GitHub, even files the site never links to. Your CV is listed in `.gitignore`, so git and GitHub Desktop will skip it. If you upload by drag-and-drop on the GitHub website, do **not** drag the CV PDF. The safest option is to keep it outside this folder.

## Publishing on GitHub Pages (free)

1. Create a GitHub account, then a **public** repository named exactly `<your-username>.github.io`. The site will then live at `https://<your-username>.github.io/`. (Any other repo name works too, with the site at `https://<your-username>.github.io/<repo-name>/`.)
2. Upload the files. Choose either option:
   - **Easiest:** on the repo page, click **Add file → Upload files**, drag in `index.html`, `style.css`, `script.js`, `data.js`, `.nojekyll`, `assets/`, `tools/` and `README.md` (not your CV), then **Commit**.
   - **GitHub Desktop** (already installed): *File → Add local repository* → this folder → create the repository → *Publish repository* (untick "Keep this code private").
   - **Command line:**
     ```bash
     git init
     git add .
     git commit -m "Initial site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
     git push -u origin main
     ```
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)` → Save**.
4. Wait 1–2 minutes and open the URL. After that, every push or upload updates the site automatically.

Tip: add the site link to your email signature, CV, ORCID profile and LinkedIn.
