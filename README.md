# Glow UI

Code version of the **Glow Design System**: a [shadcn](https://ui.shadcn.com/docs/registry) registry of React components plus a Storybook with the mapping to Figma.

> **Status: scaffold.** The theme and `Button` are placeholders. Real tokens and components come from the Figma audit and token export.

## Principles

- **Figma original is the source of truth** and is never changed by this repo.
- **Copy, don't install.** Components are copied into a project with the shadcn CLI and belong to that project afterwards. This registry stays untouched.
- **Story = docs + Figma mapping.** Every story carries `parameters.design` (Figma frame shown next to the story) and `parameters.glow.figma` (Figma property → prop mapping).
- **Tokens only.** Tailwind's default palette is disabled; arbitrary values and hardcoded colors fail `npm run check`.

## Stack

React 19 · TypeScript · Tailwind CSS v4 · `class-variance-authority` · Radix UI · Storybook 10 · shadcn registry · Vercel

## Repository structure

```
registry/glow/
  ui/        components + their stories
  lib/       shared helpers (cn)
  styles/    Glow theme (tokens → Tailwind v4 theme)
registry.json            registry manifest (one item per component)
.storybook/              Storybook config
docs/                    Storybook docs pages
scripts/                 checks (no arbitrary values, …)
```

## Scripts

| Command | What it does |
|---|---|
| `npm run storybook` | Storybook locally on :6006 |
| `npm run check` | Typecheck + token lint |
| `npm run build` | Check, build Storybook to `dist/` and registry to `dist/r/` |

## Using Glow in a project

Requirements: React + Tailwind v4 project with the `@` alias and a `components.json` (`npx shadcn init`).

1. Add the Glow registry to `components.json`:

   ```json
   "registries": {
     "@glow": "https://glow-ui.vercel.app/r/{name}.json"
   }
   ```

2. Add the theme and components:

   ```bash
   npx shadcn add @glow/theme @glow/button
   ```

3. Import the theme in the main CSS after Tailwind:

   ```css
   @import "tailwindcss";
   @import "./styles/glow-theme.css";
   ```

Components land in `components/ui/` together with their stories and belong to the project from then on.

## Deploy (Vercel)

Deployed at **https://glow-ui.vercel.app** — Storybook at `/`, registry at `/r/{name}.json`. Every push to `main` redeploys; `vercel.json` sets the build command and output.
