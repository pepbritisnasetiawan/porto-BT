export interface Social {
  platform: 'github' | 'linkedin' | 'x' | 'email';
  url: string;
  label: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  note: string;
}

export interface SkillGroup {
  area: string;
  items: string[];
}

export const timeline: TimelineEntry[] = [
  {
    period: '2025 — present',
    role: 'Senior Security Engineer · DFIR Lead',
    org: 'PT. Cyber Defense Indonesia — Jakarta',
    note: 'Leads IR for 40k-endpoint financial estate; owns Sigma/YARA backlog, cut MTTR 38% via NIST 800-61 playbooks.',
  },
  {
    period: '2023 — 2025',
    role: 'SOC Analyst Tier 2–3',
    org: 'PT. Global Security Solutions — Jakarta',
    note: 'Escalation point for EDR/SIEM; built KAPE/Velociraptor triage, 31 detections shipped.',
  },
  {
    period: '2021 — 2023',
    role: 'SOC Analyst Tier 1',
    org: 'PT. Secure Network — Jakarta',
    note: 'Alert triage, phishing, first full-scope IR — Baggage & UltraVNC cases.',
  },
];

export const skillMatrix: SkillGroup[] = [
  { area: 'Forensics', items: ['Memory (Volatility)', 'Disk/NTFS ($MFT, USN)', 'EVTX/KAPE', 'Network PCAP'] },
  { area: 'Detection', items: ['Sigma/YARA', 'Splunk SPL', 'KQL', 'Suricata'] },
  { area: 'RE & Tooling', items: ['Ghidra/IDA', 'x64dbg', 'Python', 'Bash/PowerShell'] },
];

export const profile = {
  name: '0x013H',
  initials: '0H',
  roleLine: 'Security Engineer · DFIR · Blue Team · SOC Analyst',
  tagline:
    'I defend networks the way they deserve to be defended: every incident reconstructed from raw telemetry, every detection built from first principles before a single vendor tool gets trusted.',
  location: 'Jakarta, ID · UTC+7',
  email: '0x013h@gmail.com',
  cvUrl: '/cv.pdf',
  socials: [
    { platform: 'github', url: 'https://github.com/pepbritisnasetiawan', label: 'GitHub' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/pepbri-tisna-setiawan/', label: 'LinkedIn' },
    { platform: 'x', url: 'https://x.com/0x013H', label: 'X / Twitter' },
    { platform: 'email', url: 'mailto:0x013h@gmail.com', label: 'Email' },
  ] as Social[],
  stats: [
    { value: 120, suffix: '+', label: 'Incidents investigated' },
    { value: 85, suffix: '', label: 'Detections shipped' },
    { value: 4200, suffix: '+', label: 'IoCs extracted' },
    { value: 6, suffix: '', label: 'Certifications held' },
  ] as Stat[],
};
