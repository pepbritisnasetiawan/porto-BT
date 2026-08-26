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
  {
    id: 'cf-sherlock-baggage',
    codename: 'Sherlock: Baggage — ShellBags & UserAssist',
    domain: 'dfir',
    date: '2025-09',
    summary:
      'HTB Sherlock Baggage: KAPE RegistryHivesUser triage of PROD-WORKSTATIO steve (S-1-5-21-568863175-1002). Reconstructed 10/10 tasks via NTUSER.DAT RecentDocs/UserAssist (ROT13) + UsrClass.dat BagMRU/Bags. Proved 1.zip → everything.exe (07:26:57 UTC) → OT Station 3 VPN (07:31:05) → \\Prod-ns-2\\prodshare\\Construction 2027\\Dam Construction Engineer Plans.zip (07:34:04) → staging C:\\Users\\steve\\Pictures\\a → a.zip (07:34:30).',
    role: 'DFIR analyst · HTB Sherlock',
    techniques: [
      { attackId: 'T1005', name: 'Data from Local System' },
      { attackId: 'T1083', name: 'File and Directory Discovery' },
      { attackId: 'T1552.001', name: 'Credentials in Files' },
    ],
    outcomeMetric: '10/10 tasks · ShellBags + UserAssist cross-validated · UTC timeline',
    links: [{ kind: 'writeup', url: null, label: 'DFIR report WRITEUP_MASTER.md — on request' }],
  },
  {
    id: 'cf-sherlock-foreigner',
    codename: 'Sherlock: Foreigner — WiFi Driver RE',
    domain: 'malware',
    date: '2025-08',
    summary:
      'HTB Sherlock Foreigner: reverse engineering WiFi-22.160.0-Driver32-Win10.exe. Unpacked UPX, recovered RC4 C2 config, traced DANGER.txt staging, and documented walkthrough in Foreigner_Reverse_Engineering_Walkthrough.md. Demonstrated static-before-dynamic triage with Floss, Ghidra, and x64dbg.',
    role: 'Malware analyst · HTB',
    techniques: [
      { attackId: 'T1027', name: 'Obfuscated Files' },
      { attackId: 'T1140', name: 'Deobfuscate/Decode Files' },
      { attackId: 'T1587', name: 'Develop Capabilities' },
    ],
    outcomeMetric: 'UPX + RC4 deobfuscated · walkthrough published · lab-only',
    links: [{ kind: 'writeup', url: null, label: 'RE walkthrough — on request' }],
  },
  {
    id: 'cf-sat-backdoor-ultravnc',
    codename: 'SAT-TNI: Backdoor UltraVNC — Sysmon EVTX',
    domain: 'dfir',
    date: '2024-02',
    summary:
      'SAT-TNI Operation Backdoor UltraVNC: 169 Sysmon events from Microsoft-Windows-Sysmon-Operational.evtx. Identified Preventivo24.02.14.exe.exe (double .exe, OriginalFileName Fattura 2 2024.exe, SHA256 0CB44C4F8273750FA40497FCA81E850F73927E70B13C8F80CDCFEE9D1478E6F3) via EID 1 T1204, Dropbox C2 162.125.81.15 (EID 22), dummy www.example.com 93.184.216.34 check (T1036 masquerading), and EID 3 network 93.184.216.34:80. Built python-evtx parsers for EID 1/3/11/22 distribution.',
    role: 'DFIR analyst · SAT-TNI IR',
    techniques: [
      { attackId: 'T1204', name: 'User Execution' },
      { attackId: 'T1036', name: 'Masquerading' },
      { attackId: 'T1071', name: 'Application Layer Protocol' },
    ],
    outcomeMetric: '169 events · 6 EID1/56 EID11 · SHA256 + Dropbox C2 extracted',
    links: [{ kind: 'writeup', url: null, label: 'WRITEUP_OPERATION_BACKDOOR_ULTRAVNC.md — on request' }],
  },
  {
    id: 'cf-sat-dark-entry',
    codename: 'SAT-TNI: Dark Entry — Disk + Mem + PCAP',
    domain: 'dfir',
    date: '2024-03',
    summary:
      'SAT-TNI Operation Dark Entry: CEO-US disk image (E01 AFF4), WebServer mem (memdump) + Ubuntu 5.3.0-70 profile, and traffic.pcapng. Correlated disk MFT (parse_mft_exe.py), memory Volatility pslist + syscalls, and Zeek pcap to reconstruct initial access, lateral movement, and data staging. Full chain of custody with UTC-normalized plaso timeline.',
    role: 'DFIR lead · SAT-TNI IR',
    techniques: [
      { attackId: 'T1003', name: 'OS Credential Dumping' },
      { attackId: 'T1048', name: 'Exfiltration Over Alternative Protocol' },
      { attackId: 'T1055', name: 'Process Injection' },
    ],
    outcomeMetric: 'Disk + mem + pcap triaged · Volatility + Wireshark · IOCs on request',
    links: [{ kind: 'writeup', url: null, label: 'Writeup_Operation_Dark_Entry.md — on request' }],
  },
];
