# Alfred Enyinna — Portfolio

A personal portfolio built with **Vite + React + TypeScript**. Dark/light mode, indigo→cyan accent, Space Grotesk display type.

## Quick look (no install)

Open **`preview.html`** in any browser to see the finished design instantly — theme toggle and all. This is a static mirror of the React app for quick previewing.

## Run the real app

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Before you deploy — drop in your assets

Everything works out of the box with graceful placeholders, but to make it yours:

1. **Profile photo** — already included at `public/profile.jpeg`. Replace it to swap the hero image.

2. **Resume** — the "Download Resume" button points to `/resume.pdf`. Add your file:
   ```
   public/resume.pdf
   ```

3. **Project screenshots** — each card shows a clean placeholder until you add a real screenshot. Drop them here (the paths are already wired up in `src/data/projects.ts`):
   ```
   public/projects/seecom/cover.jpg
   public/projects/bonsai/cover.jpg
   public/projects/tajo/cover.jpg
   public/projects/samuel-richard/cover.jpg
   ```
   Recommended size: 1280×720 (16:9), JPG or PNG. If an image is missing, the card automatically falls back to a styled placeholder — nothing breaks.

## Editing content

- **Projects** — `src/data/projects.ts`
- **Hero text / bio** — `src/components/Hero.tsx`
- **Tech stack** — `src/components/TechStack.tsx`
- **Contact links** — `src/components/Contact.tsx`
- **Colors & theme** — CSS variables at the top of `src/index.css` (`:root`, `[data-theme="dark"]`, `[data-theme="light"]`)

## Deploy

Works on Vercel, Netlify, or any static host. On Vercel: import the repo, framework preset **Vite**, build command `npm run build`, output `dist`.

## Stack

React 18 · TypeScript · Vite 5 · react-icons · Google Fonts (Space Grotesk, Inter, Caveat)
