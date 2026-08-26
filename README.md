# porto — Security Engineer Portfolio

Blue Team / DFIR / SOC portfolio built with Astro, styled after the editorial-technical
aesthetic of `aiengineeringfromscratch.com`. Fully static, zero trackers, 68KB output.

## Documentation

| Doc | Contents |
|---|---|
| [`docs/PRD.md`](docs/PRD.md) | Problem, goals, personas, functional requirements, acceptance criteria |
| [`docs/DATA-MODEL.md`](docs/DATA-MODEL.md) | ERD, sitemap/IA, content-model-to-file mapping |
| [`docs/DESIGN.md`](docs/DESIGN.md) | Design tokens, typography, components, a11y contract |

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output → dist/
npm run preview   # serve the production build
```

## Editing your identity

All human-editable content lives in `src/data/`:

- `profile.ts` — name, role line, tagline, email, socials, stats
- `cases.ts` — case files (summaries, MITRE ATT&CK techniques, outcomes, links)
- `specializations.ts` — capability cards and tool lists
- `certifications.ts` — certifications + writeups

Components contain no hard-coded copy. Swap identity by editing these files only.

## Structure

```
src/
├── data/          # typed content models (edit here)
├── components/    # Nav, Hero/Terminal, FigPlate SVGs, Stats, Cases, ...
├── layouts/       # Base.astro — head, skip-link, reveal observer
└── pages/         # index.astro, 404.astro
```
