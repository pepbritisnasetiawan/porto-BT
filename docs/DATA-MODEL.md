# Data Model (ERD) & Information Architecture

Static site → no database. The "ERD" below is the **typed content model** that lives in
`src/data/*.ts` and is consumed at build time by Astro components.

## 1. Entity-Relationship Diagram

```mermaid
erDiagram
    PROFILE ||--o{ SOCIAL : has
    PROFILE ||--o{ STAT : reports
    PROFILE ||--o{ CERTIFICATION : holds
    SPECIALIZATION ||--o{ CASE_FILE : "evidenced by"
    CASE_FILE }o--o{ TECHNIQUE : "maps to (MITRE ATT&CK)"
    CASE_FILE ||--o{ ARTIFACT_LINK : exposes
    WRITEUP ||--o{ TAG : tagged

    PROFILE {
        string name
        string handle
        string roleLine
        string tagline
        string location
        string email
        string cvUrl
    }
    SOCIAL {
        enum platform
        string url
    }
    STAT {
        string label
        number value
        string suffix
    }
    SPECIALIZATION {
        string id
        string title
        string blurb
        string_list tools
        string figRef
    }
    CASE_FILE {
        string id
        string codename
        enum domain
        string summary
        string role
        string outcomeMetric
        date date
        bool sensitive
    }
    TECHNIQUE {
        string attackId
        string name
        enum tactic
    }
    ARTIFACT_LINK {
        enum kind
        string url
        string label
    }
    CERTIFICATION {
        string code
        string issuer
        int year
        enum status
    }
    WRITEUP {
        string title
        string url
        date published
        string summary
    }
```

## 2. Sitemap / IA

```
/                     Single-page portfolio (primary deliverable)
├── #hero             FR-1 identity + terminal
├── #figures          FR-2 FIG plates (detection pipeline, DFIR workflow)
├── #stats            FR-3 counters
├── #specializations  FR-4 capability cards
├── #cases            FR-5 case files (filterable)
├── #certs            FR-6 certifications strip
├── #about            FR-7 bio + timeline + skills matrix
└── colophon footer   contact command, socials, copyright

/writeups/index.html   Optional page: list of external writeups (phase 2)
404.html               Themed error page
```

## 3. File mapping

| Model entity | Source of truth |
|---|---|
| Profile / Social / Stat | `src/data/profile.ts` |
| Specialization | `src/data/specializations.ts` |
| CaseFile / Technique | `src/data/cases.ts` |
| Certification | `src/data/certifications.ts` |
| Writeup | `src/data/writeups.ts` |

**Rule:** all human-editable content lives in `src/data/`. Components contain zero
hard-coded copy.
