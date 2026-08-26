export interface Certification {
  code: string;
  issuer: string;
  year: number;
  status: 'held' | 'in-progress';
}

export const certifications: Certification[] = [
  { code: 'GCFA', issuer: 'GIAC', year: 2025, status: 'held' },
  { code: 'GCIH', issuer: 'GIAC', year: 2024, status: 'held' },
  { code: 'GREM', issuer: 'GIAC', year: 2026, status: 'in-progress' },
  { code: 'BTL1', issuer: 'Blue Team Labs', year: 2023, status: 'held' },
  { code: 'eCDFP', issuer: 'INE / eLearnSecurity', year: 2024, status: 'held' },
  { code: 'CKS', issuer: 'CNCF / Linux Foundation', year: 2025, status: 'held' },
];

// Writeups moved to src/data/writeups.ts — see there for published work.
