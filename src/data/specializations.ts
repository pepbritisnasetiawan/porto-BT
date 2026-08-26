export type Domain = 'dfir' | 'detection' | 'malware' | 'hunt' | 'soc' | 'cloud';

export interface Specialization {
  id: Domain;
  kicker: string;
  title: string;
  blurb: string;
  tools: string[];
  caseRef?: string;
}

export const specializations: Specialization[] = [
  {
    id: 'dfir',
    kicker: 'Recommended first',
    title: 'Digital Forensics & Incident Response',
    blurb:
      'Disk, memory and log forensics. NTFS $MFT timeline reconstruction, EVTX hunting, memory triage with Volatility — evidence first, conclusions second.',
    tools: ['Volatility 3', 'KAPE', 'Plaso', 'Autopsy', 'Velociraptor'],
    caseRef: 'cf-ransomware-ad',
  },
  {
    id: 'detection',
    kicker: 'Build the base',
    title: 'Detection Engineering',
    blurb:
      'Sigma rules mapped to MITRE ATT&CK, tuned against real telemetry until false positives die. Every rule ships with a test, a rationale and an owner.',
    tools: ['Sigma', 'Suricata', 'Elastic SIEM', 'Splunk SPL', 'YARA'],
    caseRef: 'cf-lolbin-detection',
  },
  {
    id: 'malware',
    kicker: 'Reverse it',
    title: 'Malware Reverse Engineering',
    blurb:
      'Static-before-dynamic triage of PE/ELF/.NET samples. Import tables, entropy, XOR loops, C2 extraction — reproducible decryption scripts over guesswork.',
    tools: ['IDA Pro', 'Ghidra', 'x64dbg', 'PE-bear', 'FLOSS'],
    caseRef: 'cf-loader-re',
  },
  {
    id: 'hunt',
    kicker: 'Assume breach',
    title: 'Threat Hunting',
    blurb:
      'Hypothesis-driven hunts across EDR and SIEM telemetry. Atomic red team validation, baselining, and turning every hunt into a permanent detection.',
    tools: ['Elastic', 'KQL', 'Jupyter', 'ART', 'Sysmon'],
    caseRef: 'cf-beacon-hunt',
  },
  {
    id: 'soc',
    kicker: 'Own the queue',
    title: 'SOC Operations & Leadership',
    blurb:
      'Tier 1–3 escalation, playbooks that survive handover, SLA discipline. Alert quality metrics that measure signal, not ticket count.',
    tools: ['TheHive', 'MISP', 'Cortex', 'Wazuh', 'NIST 800-61'],
  },
  {
    id: 'cloud',
    kicker: 'New perimeter',
    title: 'Cloud & Kubernetes Security',
    blurb:
      'Guardrails as code. IAM blast-radius audits, container escape detection, audit-log pipelines for AWS and K8s — because the adversary already moved in.',
    tools: ['CloudTrail', 'Falco', 'Trivy', 'Terraform', 'Kubernetes'],
  },
];
