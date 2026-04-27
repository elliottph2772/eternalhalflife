# Eternal Halflife

> *Some Things Fade, But Hard Work Remains.*

Personal portfolio website for **Myself** — B.S. Computer Science student at Western Governors University. Built from scratch to showcase projects, technical skills, and academic progress.

---

## Live Site

Deployed on [Vercel](https://vercel.com) — visit the live site to see it in action.

---

## Features

### Home
- Main section with name, degree program, and personal tagline
- Animated graduation progress bar tracking credits completed toward the 122-credit B.S. CS degree
- Tech stack grid displaying languages and tools I am familiar with, including branded icons
- About section covering current focus, interests, and what I'm looking for

### Projects
- Card-based project list with per-project accent colors
- Expandable detail view for each project with sections for overview, key features, and technical breakdown
- Interactive WGUPS delivery simulation embedded directly in the project detail page

### Courses
- Full list of completed WGU courses organized by category (Gen Ed, Core, Math, Programming, Data)
- Per-category color coding on both the labels and the card hover border
- Credit count and pass/fail status on every card

### Nav & Mobile
- Desktop nav includes Email, GitHub, and LinkedIn links
- Email link copies address to clipboard on click with a styled toast notification — pop up appears when you don't have a configured mail client
- Hamburger menu on mobile collapses all navigation and social links into a clean side-bar
- Logo always acts as a Home button

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev) |
| Build tool | [Vite 8](https://vitejs.dev) |
| Icons | [React Icons 5](https://react-icons.github.io/react-icons/) |
| Fonts | [Syne](https://fonts.google.com/specimen/Syne) · [Space Mono](https://fonts.google.com/specimen/Space+Mono) |
| Styling | Vanilla CSS — custom properties, CSS Grid, `color-mix()` |
| Deployment | [Vercel](https://vercel.com) |

No UI framework. No component library. Layout and theming built entirely with CSS custom properties and grid.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

```bash
# Lint
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── App.jsx        # All components and page logic
├── App.css        # All styles
├── WGUPSDemo.jsx  # Interactive WGUPS routing simulation
└── main.jsx       # React entry point
```

---

## About

Elliott Hudson — Computer Science student, aspiring software engineer.

[Email](mailto:elliottph2772@gmail.com) · [GitHub](https://github.com/elliottph2772) · [LinkedIn](https://linkedin.com/in/elliotthudson)
