# Design System — "Case File" aesthetic

Derived from `aiengineeringfromscratch.com`: editorial-technical, monospace metadata,
numbered figures, generous whitespace, near-monochrome palette.

## 1. Color tokens (WCAG AA verified pairs)

| Token | Light | Usage |
|---|---|---|
| `--bg` | `#faf9f5` | page background (warm paper) |
| `--surface` | `#ffffff` | cards |
| `--ink` | `#16130e` | primary text on bg/surface (15.9:1) |
| `--muted` | `#6b645a` | secondary text on bg (4.9:1) |
| `--accent` / `--blueprint` | `#3353ff` | links, active states, FIG labels, hero `<em>` (5.3:1 on bg) |
| `--accent-tint` | `rgba(51,83,255,0.06)` | recommended-card tint (`course-route.is-recommended` analogue) |
| `--line` | `#e3ded4` | hairline borders |
| `--code-bg` | `#16130e` | terminal blocks; text `#d7fce9`, prompt `#5eead4` |

Dark mode via `prefers-color-scheme: dark`: bg `#12100c`, ink `#ece8df`,
surface `#1b1813`, line `#2c2820`, accent/blueprint `#6b8eff` (7.1:1 on bg),
accent-tint `rgba(107,142,255,0.12)`.

> Identity decision 2026-08-26: adopted reference blueprint `#3353ff` (was security-teal `#0f766e`) per owner direction. Teal retained only as terminal prompt `#5eead4`.

## 2. Typography

- Display/headings: `"Newsreader", Georgia, serif` (editorial contrast with mono).
- Body/UI/labels: `"IBM Plex Mono", ui-monospace, monospace`.
- Scale (fluid clamp): display 44→76px · h2 26→36px · body 16px · label 12px uppercase,
  letter-spacing 0.08em.

## 3. Signature components

| Component | Spec |
|---|---|
| Meta label | `FIG_001 · DETECTION PIPELINE` — 12px mono uppercase muted, top border tick |
| Terminal | dark rounded block, traffic-light dots, copy button, `$` blueprint-tinted prompt (`--code-prompt #5eead4` retained for contrast on dark) |
| Card | 1px line border, radius 14px, hover: border-accent + translateY(-2px) |
| Tag/pill | mono 11px, 1px border pill; domain tags color-coded by domain enum |
| Stat | huge serif number + mono caption, separated by vertical rules |
| Timeline | left rule + node dots for career history |
| Section header | kicker label → serif h2 → lede paragraph, max-width 62ch |

## 4. Layout

- Container: `max-width: 1120px`, gutter 24px.
- Section rhythm: `padding-block: 96px` desktop / 64px mobile.
- Grid: specializations 3×2 (auto-fit minmax 280px); cases 2-col; certs auto-fit pills.

## 5. Motion

Only two animations, both gated behind `@media (prefers-reduced-motion: no-preference)`:
fade-up section reveal (IntersectionObserver adds `.in`), stat count-up once.

## 6. Accessibility contract

- Semantic landmarks (`header/nav/main/section/footer`), skip-link first focusable.
- Focus ring: 2px accent offset 2px, never removed.
- All interactive targets ≥ 40×24px; SVG diagrams get `role="img"` + `<title>`.
