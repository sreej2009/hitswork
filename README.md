# Hitswork

A premium learning platform. Dark, cinematic, electric-blue design system with a 3D
"learning universe" hero built on React Three Fiber.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (tokens in [src/index.css](src/index.css))
- React Three Fiber / drei / postprocessing for the 3D hero
- GSAP for 3D entrance timelines, Framer Motion for UI transitions
- Lenis for smooth scrolling
- React Router for routing

## Getting started

```bash
npm install
npm run dev
```

## Logo

The official logo lives at `src/assets/Images/Hitswork.png` and is rendered unmodified
by [src/components/ui/Logo.tsx](src/components/ui/Logo.tsx). Its wordmark is dark navy
(designed for light backgrounds), so on Hitswork's dark surfaces it sits on a small
light backdrop chip for contrast — the source pixels are never recolored or altered.

## Typography

Fonts are matched to thulirmedia.com's own working design-system tokens (verified via
its compiled CSS, not guessed):

- **Body/UI** (nav, buttons, paragraphs): **Inter**, weights 300–700 — matches Thulir's
  `--font-dm-sans`.
- **Headings/display**: **Bricolage Grotesque** (variable, weights 200–800), falling
  back to Inter — matches Thulir's `--font-dm-display`.

One caveat found during inspection: Thulir's own hero `<h1>` references a font
(`"Warownia Black Extended"`) that has no `@font-face` or webfont link anywhere on
their site, so it silently falls back to the browser default rather than actually
rendering as authored. That wasn't replicated here, since matching an unloaded font
would just copy a rendering bug rather than their real typography.

## What's built (core experience)

- Design system tokens, navigation (with mobile menu), footer, command-palette search
- Cinematic 3D hero ("Learning Universe") with entrance sequence, scroll + pointer parallax
- Five-chapter scroll narrative (Discover → Learn → Build → Prove → Grow)
- Skill Explorer, Learning Paths, and featured course cards
- `/explore` course/skill browsing page
- Responsive down to 320px, `prefers-reduced-motion` respected, 3D scene scoped down on
  low-power/mobile devices

## What's stubbed

Every other route from the brief (`/courses/:slug`, `/learn/:courseId`, `/learning-paths`,
`/projects`, `/dashboard`, `/certificates`, `/verify/:certificateId`, `/instructor`,
`/admin`) is wired up in [src/App.tsx](src/App.tsx) but renders a placeholder
`ComingSoon` page, per the brief's "don't build everything at once" instruction.
