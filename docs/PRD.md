# PRD — Security Engineer Portfolio ("porto")

| Field | Value |
|---|---|
| Version | 1.0 |
| Status | Approved for build |
| Owner | unamed |
| Date | 2026-08-26 |

## 1. Problem Statement

Security Engineers / DFIR analysts / Blue Teamers / SOC Analysts are evaluated by
recruiters and peers on **demonstrable artifacts** (case studies, detections, writeups,
certifications), yet most portfolios are generic developer sites that hide this evidence
behind blog posts. There is no portfolio template that speaks the visual language of the
defensive-security craft: timelines, kill chains, IoCs, detection logic, terminal output.

## 2. Goal & Objectives

Build a single-page-first static portfolio that:

1. Communicates the owner's identity and specialization within **5 seconds** of load.
2. Presents case studies like incident reports: structured, evidence-driven, reproducible.
3. Matches the editorial-technical aesthetic of `aiengineeringfromscratch.com`
   (monospace metadata labels, FIG-numbered diagrams, terminal blocks, card grid).
4. Deploys as a fully static site with zero runtime dependencies.

### Non-goals

- No CMS, no auth, no server-side code.
- No comments or dynamic content.
- Not a blog engine (writeups link out to external posts/repos initially).

## 3. Target Audience

| Persona | Need | Success signal |
|---|---|---|
| Technical recruiter (non-technical) | Verify skills fast, find certs/contact | Scrolls hero → stats → contact in <30s |
| Hiring manager / senior engineer | Judge depth: real cases, real detections | Opens a case study, reads MITRE mapping |
| Peer / community | Reuse tools, read writeups | Clicks GitHub tool link |

## 4. Functional Requirements

### FR-1 Hero
- Name/handle, role line (`SECURITY ENGINEER · DFIR · BLUE TEAM · SOC`), one-paragraph
  value proposition, primary CTAs (**View Case Files**, **Download CV**), GitHub link.
- Terminal block showing a signature triage command sequence (static, copy button).

### FR-2 Evidence figures ("FIG" plates)
- At least 2 hand-authored inline SVG diagrams in reference style:
  - `FIG_001` Detection pipeline (telemetry → detection → triage → response).
  - `FIG_002` DFIR workflow (acquire → process → analyze → report) with timeline.
- Each figure carries monospace caption label + description, matching reference.

### FR-3 Stats bar
- Counters: incidents investigated, detections shipped, IoCs extracted, certifications.

### FR-4 Specialization cards
- 6 cards (DFIR, Detection Engineering, Malware RE, Threat Hunting, SOC Ops, Cloud/K8s
  security). Each: title, description, representative tools, links to related case file.

### FR-5 Case files (case studies)
- Structured entries rendered from typed data model: summary, role, MITRE ATT&CK
  techniques, tools, outcome metrics, artifact link (repo/writeup).
- Filterable by domain (DFIR / Detection / Malware RE / Threat Hunt).

### FR-6 Certifications strip
- Grid of certs with issuer, year, badge placeholder; mirrors the reference's
  "certification preparation" band.

### FR-7 About + Contact colophon
- Short bio with career timeline, skills matrix; footer styled like reference colophon
  with a copyable `git clone`-style contact command and social links.

### FR-8 Non-functional
- Lighthouse ≥ 95 performance/accessibility; responsive 360px→1440px;
  semantic HTML; prefers-reduced-motion respected; no client framework JS shipped.

## 5. Acceptance Criteria

- [ ] `npm run build` produces static output with no errors/warnings.
- [ ] All sections FR-1…FR-7 present on `/`.
- [ ] Personal data isolated in `src/data/profile.ts` — swapping identity requires
      editing exactly one file (+ optional images).
- [ ] Page weight < 300KB total transfer.
- [ ] Keyboard-navigable nav, visible focus states, WCAG AA contrast.
