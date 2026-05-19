# Isaac Mbugua — Developer Portfolio

A production-ready personal portfolio built with **React 18** and **Vite 5**. Dark editorial aesthetic, fully component-based architecture, plain CSS with custom properties — zero UI framework dependencies.

---

## Table of Contents

- [Live Features](#live-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture Overview](#architecture-overview)
  - [Data Layer](#data-layer)
  - [Custom Hooks](#custom-hooks)
  - [Components](#components)
  - [CSS Architecture](#css-architecture)
- [Customising Content](#customising-content)
- [Adding a New Project](#adding-a-new-project)
- [Assets](#assets)
- [Deployment](#deployment)

---

## Live Features

- **Animated hero** — staggered name reveal on load, typewriter role cycling
- **Sticky nav** — transparently transitions to frosted glass on scroll; active section highlighted via `IntersectionObserver`
- **Skills marquee** — infinite `requestAnimationFrame` scroll loop; hover to pause, edge-zone dragging for manual control
- **Portfolio grid** — 9 projects in a responsive CSS Grid; each card reveals with a staggered scroll-triggered animation
- **About section** — blockquote, stat boxes, and a two-column skills list
- **Contact CTA** — large typographic call-to-action with direct mailto link
- **Back-to-top button** — smooth fade/slide-up entrance after 700px scroll
- **Mobile nav** — animated hamburger → drawer with slide-down transition
- **Accessible** — semantic HTML, ARIA labels, `:focus-visible` outlines, keyboard navigable

---

## Tech Stack

| Layer      | Choice                                    |
| ---------- | ----------------------------------------- |
| Framework  | React 18                                  |
| Bundler    | Vite 5                                    |
| Styling    | Plain CSS + CSS Custom Properties         |
| Fonts      | Google Fonts — DM Serif Display + DM Mono |
| Animations | CSS keyframes + `requestAnimationFrame`   |
| Scroll     | Native `IntersectionObserver` API         |
| Deployment | Vercel / Netlify (static, no SSR needed)  |

No Tailwind. No CSS-in-JS. No component libraries. Zero runtime dependencies beyond React itself.

---

## Project Structure

```
isaac-portfolio/
│
├── index.html                       ← Vite HTML entry point
├── vite.config.js                   ← Vite + React plugin config
├── package.json
├── README.md
│
└── src/
    ├── main.jsx                     ← React DOM root mount
    ├── App.jsx                      ← Root component, composes all sections
    ├── App.css                      ← App-level layout overrides
    ├── index.css                    ← Global reset, CSS variables, keyframes, utilities
    │
    ├── data/
    │   └── portfolioData.js         ← Single source of truth for ALL content
    │
    ├── hooks/
    │   ├── useTypewriter.js         ← Types/deletes words from an array
    │   ├── useInView.js             ← One-shot scroll-reveal via IntersectionObserver
    │   └── useActiveSection.js      ← Tracks which section is in the viewport center
    │
    └── components/
        ├── SectionLabel/
        │   ├── SectionLabel.jsx     ← Reusable eyebrow label (e.g. "01 ─── PORTFOLIO")
        │   └── SectionLabel.css
        │
        ├── Nav/
        │   ├── Nav.jsx              ← Sticky header, desktop links, mobile drawer
        │   └── Nav.css
        │
        ├── Hero/
        │   ├── Hero.jsx             ← Full-viewport intro with animated name + typewriter
        │   └── Hero.css
        │
        ├── Skills/
        │   ├── Skills.jsx           ← RAF-powered infinite marquee
        │   └── Skills.css
        │
        ├── Portfolio/
        │   ├── Portfolio.jsx        ← Grid layout, maps PROJECTS → ProjectCard
        │   ├── ProjectCard.jsx      ← Individual card with scroll-reveal + hover states
        │   └── Portfolio.css        ← Grid + card styles in one file
        │
        ├── About/
        │   ├── About.jsx            ← Bio, quote, stats, skill list
        │   └── About.css
        │
        ├── Contact/
        │   ├── Contact.jsx          ← Large typographic CTA + mailto button
        │   └── Contact.css
        │
        ├── Footer/
        │   ├── Footer.jsx           ← Logo, social links, copyright year
        │   └── Footer.css
        │
        └── BackToTop/
            ├── BackToTop.jsx        ← Fixed button, visible after 700px scroll
            └── BackToTop.css
```

---

## Getting Started

### Prerequisites

- Node.js **v18 or higher**
- npm **v9 or higher**

Check your versions:

```bash
node -v
npm -v
```

### Install and Run

```bash
# 1. Navigate into the project folder
cd isaac-portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The page hot-reloads on every save.

---

## Available Scripts

| Command           | Description                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start local dev server with hot module replacement  |
| `npm run build`   | Production build — output goes to `dist/`           |
| `npm run preview` | Serve the production build locally before deploying |

---

## Architecture Overview

### Data Layer

**`src/data/portfolioData.js`** is the single source of truth for all site content. No content strings are hardcoded inside components — everything flows from this one file.

```js
export const PROJECTS; // Array of portfolio project objects
export const SKILLS; // Array of tech strings shown in the marquee
export const ROLES; // Array of role strings cycled in the hero typewriter
export const SOCIAL; // Array of { label, href } for footer links
export const STATS; // Array of { num, label } for the About section
```

To change anything visible on the site, you only ever edit this file.

---

### Custom Hooks

#### `useTypewriter(words, speed, pause)`

Cycles through an array of strings with a type-then-delete animation. Returns the currently displayed string.

```js
const role = useTypewriter(["Full Stack Developer", "React Specialist", ...]);
// Returns the partial string being typed at any moment
```

| Parameter | Type       | Default | Description                             |
| --------- | ---------- | ------- | --------------------------------------- |
| `words`   | `string[]` | —       | Array of strings to cycle through       |
| `speed`   | `number`   | `80`    | Milliseconds per character typed        |
| `pause`   | `number`   | `1800`  | Milliseconds to hold a fully typed word |

---

#### `useInView(threshold)`

Attaches an `IntersectionObserver` to a ref. Returns `[ref, inView]`. Once the element enters the viewport, `inView` becomes `true` permanently and the observer disconnects. Used to trigger scroll-reveal CSS transitions.

```js
const [ref, inView] = useInView(0.1);
// Attach ref to any DOM element
// inView flips to true once 10% of the element is visible
```

| Parameter   | Type     | Default | Description                             |
| ----------- | -------- | ------- | --------------------------------------- |
| `threshold` | `number` | `0.15`  | 0–1, fraction of element that must show |

---

#### `useActiveSection(ids)`

Observes multiple section elements simultaneously. Returns the `id` of whichever section currently occupies the center band of the viewport. Used by `Nav` to highlight the matching link.

```js
const active = useActiveSection(["skills", "portfolio", "about", "contact"]);
// Returns e.g. "portfolio" while that section is scrolled into view
```

| Parameter | Type       | Description                          |
| --------- | ---------- | ------------------------------------ |
| `ids`     | `string[]` | Array of section element `id` values |

---

### Components

| Component      | File(s)                         | Responsibility                                                  |
| -------------- | ------------------------------- | --------------------------------------------------------------- |
| `App`          | `App.jsx`                       | Composes all sections; passes `activeSection` down to `Nav`     |
| `Nav`          | `Nav/Nav.jsx`                   | Sticky header; handles scroll state, active link, mobile drawer |
| `Hero`         | `Hero/Hero.jsx`                 | Animated name reveal, typewriter role, CTA buttons              |
| `Skills`       | `Skills/Skills.jsx`             | Infinite marquee with RAF loop and hover control                |
| `Portfolio`    | `Portfolio/Portfolio.jsx`       | Reads `PROJECTS`, renders a `ProjectCard` per item              |
| `ProjectCard`  | `Portfolio/ProjectCard.jsx`     | Card with scroll-reveal, hover accent line, live + code links   |
| `About`        | `About/About.jsx`               | Pull quote, bio paragraphs, stat boxes, skills list             |
| `Contact`      | `Contact/Contact.jsx`           | Large typographic heading + mailto CTA                          |
| `Footer`       | `Footer/Footer.jsx`             | Logo, social links from `SOCIAL`, dynamic copyright year        |
| `BackToTop`    | `BackToTop/BackToTop.jsx`       | Fixed button; fades in after 700px scroll, smooth scroll up     |
| `SectionLabel` | `SectionLabel/SectionLabel.jsx` | Reusable eyebrow: `01 ─── LABEL`. Used in every section header  |

---

### CSS Architecture

All CSS custom properties are declared once in **`src/index.css`** and consumed globally:

```css
:root {
  /* Colors */
  --color-bg: #080808;
  --color-bg-card: #0d0d0d;
  --color-accent: #dc2626;
  --color-accent-dim: rgba(220, 38, 38, 0.2);
  --color-text: #e5e5e5;
  --color-text-muted: #777;
  --color-text-dim: #555;
  --color-border: #1a1a1a;

  /* Typography */
  --font-display: "DM Serif Display", serif;
  --font-mono: "DM Mono", monospace;

  /* Easing */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-med: 0.4s ease;
  --transition-slow: 0.8s ease;
}
```

**Rules:**

- Each component imports only its own `.css` file — no cross-imports
- Class names follow BEM-lite convention: `.nav__link`, `.project-card__title`
- Shared utility classes (`.container`, `.section`, `.section-title`, `.btn-primary`, `.btn-outline`) live in `index.css` and are used directly in JSX
- No CSS Modules, no `styled-components`, no Tailwind — just scoped, readable vanilla CSS

---


## Adding a New Project

1. Open `src/data/portfolioData.js`
2. Append a new object to the `PROJECTS` array:

```js
{
  id: 10,               // Must be unique
  index: "10",          // Display number shown on the card
  title: "My New App",
  description: "A short description of what it does and what makes it interesting.",
  tags: ["React", "Node.js", "MongoDB"],
  live: "https://my-app.vercel.app/",
  code: "https://github.com/DEmosus/my-app",
}
```

3. Save the file. The new card appears automatically in the portfolio grid — no other files need changing.

---

## License

MIT — free to use, modify, and distribute.
