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
  {
    id: 'cf-monetrix-pm',
    codename: 'Audit: Monetrix PM Double-Count',
    domain: 'audit',
    date: '2026-04',
    summary:
      'High-severity Code4rena audit of MonetrixAccountant._readL1Backing: proved Hyperliquid 0x80F accountValue already includes L1 USDC, supplied assets and hedge tokens, yet code summed them again — inflating totalBackingSigned by 2× and enabling phantom surplus extraction via 4-gate settlement. Built full 5-phase Forge PoC and quantified $500k phantom on $1.5M backing.',
    role: 'Lead auditor · C4',
    techniques: [
      { attackId: 'CWE-682', name: 'Incorrect Calculation' },
      { attackId: 'CWE-670', name: 'Always-Incorrect Control Flow' },
    ],
    outcomeMetric: 'H-01 valid · $500k phantom quantified · fix: single 0x80F read + HLP separate',
    links: [{ kind: 'writeup', url: null, label: 'C4 report + PoC — on request' }],
  },
  {
    id: 'cf-chainlink-oracle',
    codename: 'Audit: Chainlink Oracle Hardening',
    domain: 'audit',
    date: '2026-03',
    summary:
      'Chainlink-adjacent price feed review: staleness checks, sequencer uptime, and fallback oracle composition. Identified missing L2 sequencer guard allowing stale-price settlement and proposed heartbeat + grace-period patch validated with Halmos symbolic tests.',
    role: 'Auditor',
    techniques: [
      { attackId: 'CWE-908', name: 'Uninitialized Resource' },
      { attackId: 'CWE-330', name: 'Insufficient Randomness' },
    ],
    outcomeMetric: '2 H/M findings · Halmos proofs · sequencer guard shipped',
    links: [{ kind: 'writeup', url: null, label: 'Audit report — on request' }],
  },
  {
    id: 'cf-k2-registry',
    codename: 'Audit: K2 Registry & Rewards',
    domain: 'audit',
    date: '2026-04',
    summary:
      'K2 registry and rewards distribution audit: registry slot collisions via 0x811 analogue, reward accounting double-spend, and C4 submission pipeline. Delivered 4naly3er-maintained report with Foundry invariant suite (120 runs) and Slither triage.',
    role: 'Auditor',
    techniques: [
      { attackId: 'CWE-841', name: 'Improper Enforcement of Behavioral Workflow' },
      { attackId: 'CWE-362', name: 'Race Condition' },
    ],
    outcomeMetric: '3 findings · 120 invariant runs · 4naly3er report',
    links: [{ kind: 'writeup', url: null, label: '4naly3er report — on request' }],
  },
  {
    id: 'cf-threat-hunt-master',
    codename: 'Hunt: Masterguide Baseline',
    domain: 'hunt',
    date: '2025-04',
    summary:
      'Threat-hunting masterguide implementation: translated 00-threat-hunting-masterguide.md into 12 hypotheses, built Elastic + KQL baselines, and ran atomic hunts across Sysmon + Zeek. Productized as html masterclass with Jupyter notebooks for SOC hand-off.',
    role: 'Threat hunter',
    techniques: [
      { attackId: 'T1059', name: 'Command and Scripting Interpreter' },
      { attackId: 'TA0007', name: 'Discovery' },
    ],
    outcomeMetric: '12 hypotheses · 3 permanent detections · masterclass html shipped',
    links: [{ kind: 'writeup', url: null, label: 'Masterguide html — on request' }],
  },
  {
    id: 'cf-maldev-dropper',
    codename: 'MalDev: Dropper → Loader',
    domain: 'malware',
    date: '2025-03',
    summary:
      'Stage0 dropper and Stage1 loader from MalwareDev Lab: built minimal C dropper (payload placement via data_section/rsrc), Stage1 with AES/RC4/XOR + IPv4/MAC/UUID fuscation, anti-debug/VM and API hammering. Validated against Defender with Floss and Pe-bear.',
    role: 'Malware author (lab)',
    techniques: [
      { attackId: 'T1027', name: 'Obfuscated Files' },
      { attackId: 'T1564.002', name: 'Hidden Files: Data Section' },
      { attackId: 'T1497', name: 'Virtualization/Sandbox Evasion' },
    ],
    outcomeMetric: '5 fuscation variants · 3 placement techniques · lab-only, no live C2',
    links: [{ kind: 'repo', url: null, label: 'Lab repo — on request' }],
  },
  {
    id: 'cf-maldev-implant',
    codename: 'MalDev: Implant & Persistence',
    domain: 'malware',
    date: '2025-03',
    summary:
      'Stage2 implant and Stage3 persistence: APC/dll/mapping injection, Hells Gate syscalls, AMSI/ETW patch + Ntdll unhook, and persistence via DLL sideload + arg spoof. Built builder/keygen and validated EDR bypass in isolated lab.',
    role: 'Malware author (lab)',
    techniques: [
      { attackId: 'T1055', name: 'Process Injection' },
      { attackId: 'T1562.001', name: 'Impair Defenses: Disable Security Tools' },
      { attackId: 'T1547.001', name: 'Boot or Logon Autostart Execution' },
    ],
    outcomeMetric: '6 injection primitives · AMSI/ETW bypass · isolated lab, defanged',
    links: [{ kind: 'repo', url: null, label: 'Lab repo — on request' }],
  },
];
