export interface Writeup {
  title: string;
  url: string | null;
  published: string;
  summary: string;
  tags: string[];
}

export const writeups: Writeup[] = [
  {
    title: 'NTFS $MFT Timeline Reconstruction Without Commercial Tooling',
    url: null,
    published: '2026-05',
    summary: 'Parsing $MFT with pure Python and building defensible timelines under budget constraints.',
    tags: ['DFIR', 'Forensics'],
  },
  {
    title: 'From Sigma to Signal: Tuning Detections Against Real Noise',
    url: null,
    published: '2026-02',
    summary: 'A repeatable workflow for taking a detection idea to production without drowning the SOC.',
    tags: ['Detection', 'SIEM'],
  },
  {
    title: 'Killing Switches: Static C2 Extraction Before Detonation',
    url: null,
    published: '2025-12',
    summary: 'Why static-first malware analysis finds kill switches, sleep intervals and webhooks faster than any sandbox.',
    tags: ['Malware RE', 'CTF'],
  },
];
