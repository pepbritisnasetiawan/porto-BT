import type { Domain } from './specializations';

export interface Technique {
  attackId: string;
  name: string;
}

export interface CaseFile {
  id: string;
  codename: string;
  domain: Domain;
  date: string;
  summary: string;
  role: string;
  techniques: Technique[];
  outcomeMetric: string;
  links: { kind: 'repo' | 'writeup'; url: string | null; label: string }[];
}

export const cases: CaseFile[] = [
  {
    id: 'cf-ransomware-ad',
    codename: 'Operation Black Vault',
    domain: 'dfir',
    date: '2026-04',
    summary:
      'Full-scope ransomware IR across a 3-domain AD forest. Reconstructed the intrusion timeline from $MFT, EVTX and Sysmon after the attacker wiped event logs; proved initial access via exposed RDP, identified Chisel tunneling and AD dominance via 4720+4728 chains.',
    role: 'Lead DFIR analyst',
    techniques: [
      { attackId: 'T1133', name: 'External Remote Services' },
      { attackId: 'T1070.001', name: 'Clear Windows Event Logs' },
      { attackId: 'T1572', name: 'Protocol Tunneling' },
      { attackId: 'T1486', name: 'Data Encrypted for Impact' },
    ],
    outcomeMetric: '72h from engagement to root cause · 14 hosts rebuilt · full IOC sweep delivered',
    links: [{ kind: 'writeup', url: null, label: 'Sanitized report — on request' }],
  },
  {
    id: 'cf-lolbin-detection',
    codename: 'Living-off-the-Land Radar',
    domain: 'detection',
    date: '2026-01',
    summary:
      'Built and tuned a Sigma detection pack for LOLBin abuse (certutil, mshta, regsvr32) across 40k endpoints. Every rule validated against atomic red-team simulations and baseline noise profiles before rollout.',
    role: 'Detection engineer',
    techniques: [
      { attackId: 'T1105', name: 'Ingress Tool Transfer' },
      { attackId: 'T1218.005', name: 'System Binary Proxy Execution: Mshta' },
      { attackId: 'T1059', name: 'Command and Scripting Interpreter' },
    ],
    outcomeMetric: '31 detections shipped · FP rate < 0.4% after tuning · 9 true positives in first quarter',
    links: [{ kind: 'repo', url: null, label: 'Sigma rule pack — on request' }],
  },
  {
    id: 'cf-loader-re',
    codename: 'Sample TR-2247 Loader',
    domain: 'malware',
    date: '2025-11',
    summary:
      'Static reverse engineering of an obfuscated .NET loader: deobfuscated Base64 stage chain, recovered RC4 configuration routine, extracted C2 infrastructure and wrote a standalone Python decryptor reproducing the embedded payload config.',
    role: 'Malware analyst',
    techniques: [
      { attackId: 'T1027', name: 'Obfuscated Files or Information' },
      { attackId: 'T1573.001', name: 'Encrypted Channel: Symmetric Cryptography' },
      { attackId: 'T1071.001', name: 'Application Layer Protocol: Web Protocols' },
    ],
    outcomeMetric: '12 C2 domains sinkholed · decryptor open-sourced · featured in community writeup',
    links: [
      { kind: 'repo', url: null, label: 'Config decryptor — on request' },
      { kind: 'writeup', url: null, label: 'Analysis writeup — on request' },
    ],
  },
  {
    id: 'cf-beacon-hunt',
    codename: 'Hunt: Sleepy Beacons',
    domain: 'hunt',
    date: '2025-07',
    summary:
      'Hypothesis-driven hunt for low-and-slow C2 beaconing. Built a Jupyter-based jitter analysis pipeline over 90 days of proxy logs; surfaced one compromised vendor laptop using statistical regularity detection where signature alerts saw nothing.',
    role: 'Threat hunter',
    techniques: [
      { attackId: 'T1071', name: 'Application Layer Protocol' },
      { attackId: 'T1090.001', name: 'Proxy: Internal Proxy' },
    ],
    outcomeMetric: '1 live compromise found pre-exfiltration · methodology adopted org-wide',
    links: [{ kind: 'writeup', url: null, label: 'Hunt methodology — on request' }],
  },
];
