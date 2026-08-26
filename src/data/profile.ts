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
    org: 'Company placeholder',
    note: 'Leads incident response for enterprise AD estate; owns detection engineering backlog.',
  },
  {
    period: '2023 — 2025',
    role: 'SOC Analyst Tier 2–3',
    org: 'Company placeholder',
    note: 'Escalation point for 40k endpoints; cut mean triage time by 38% via playbook automation.',
  },
  {
    period: '2021 — 2023',
    role: 'SOC Analyst Tier 1',
    org: 'Company placeholder',
    note: 'Alert triage, phishing analysis, first exposure to full-scope IR engagements.',
  },
];

export const skillMatrix: SkillGroup[] = [
  { area: 'Forensics', items: ['Memory (Volatility)', 'Disk/NTFS ($MFT, USN)', 'EVTX/KAPE', 'Network PCAP'] },
  { area: 'Detection', items: ['Sigma/YARA', 'Splunk SPL', 'KQL', 'Suricata'] },
  { area: 'RE & Tooling', items: ['Ghidra/IDA', 'x64dbg', 'Python', 'Bash/PowerShell'] },
];

export const profile = {
  name: 'unamed',
  initials: 'U',
  roleLine: 'Security Engineer · DFIR · Blue Team · SOC Analyst',
  tagline:
    'I defend networks the way they deserve to be defended: every incident reconstructed from raw telemetry, every detection built from first principles before a single vendor tool gets trusted.',
  location: 'Jakarta, ID · UTC+7',
  email: 'you@example.com',
  cvUrl: '/cv.pdf',
  socials: [
    { platform: 'github', url: 'https://github.com/yourhandle', label: 'GitHub' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/yourhandle', label: 'LinkedIn' },
    { platform: 'x', url: 'https://x.com/yourhandle', label: 'X / Twitter' },
    { platform: 'email', url: 'mailto:you@example.com', label: 'Email' },
  ] as Social[],
  stats: [
    { value: 120, suffix: '+', label: 'Incidents investigated' },
    { value: 85, suffix: '', label: 'Detections shipped' },
    { value: 4200, suffix: '+', label: 'IoCs extracted' },
    { value: 6, suffix: '', label: 'Certifications held' },
  ] as Stat[],
};
