# Aperio — concept AI product landing page

A **self-initiated concept project** by Dhansurrya S P. Aperio is a fictional product; every name, number, quote and price on the site is sample content. This is not a client project.

**Live demo:** https://dhansurryasp.github.io/aperio-concept/

## The idea

Aperio "reads" thousands of customer comments and turns them into a short list of what to fix. The page's signature element is a canvas field of ~1,600 dots — one per comment — that moves through the product's four steps as you scroll: **collect → cluster → weigh → decide**. The motion explains the product instead of decorating it.

## Highlights

- Editorial typography (Bricolage Grotesque, Geist, Geist Mono — all OFL, self-hosted)
- Custom Canvas 2D particle engine with four layouts, deterministic seeding, device-pixel-ratio capping, and off-screen pausing
- Sticky scroll storytelling on desktop; stacked frames on mobile
- Line-masked headline reveals and restrained entrance motion with Motion (Framer Motion)
- `prefers-reduced-motion` respected: no animation loop, static frames only
- Semantic landmarks, skip link, labelled controls, visible focus states, screen-reader text for the canvas
- Responsive from 360 px phones to wide desktops
- Client-side-only email form (concept: nothing is sent or stored)

## Stack

React 19 · Vite · Tailwind CSS 4 · Motion · Canvas 2D

## Run locally

```bash
npm install
npm run dev
```

`npm run build` outputs a static site configured for GitHub Pages (`base: /aperio-concept/`).
