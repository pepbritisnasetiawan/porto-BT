import { cases } from '../../data/cases';

export function getStaticPaths() {
  return cases.map((c) => ({ params: { id: c.id } }));
}

export async function GET({ params }) {
  const c = cases.find((x) => x.id === params.id);
  if (!c) return new Response('Not found', { status: 404 });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#030a06"/>
  <rect x="24" y="24" width="1152" height="582" fill="none" stroke="#a8ff60" stroke-width="1.2" opacity="0.35"/>
  <text x="48" y="56" font-family="JetBrains Mono, monospace" font-size="13" letter-spacing="0.14em" fill="#5a7a5a">${c.domain.toUpperCase()} · ${c.date} · ${c.id}</text>
  <text x="48" y="120" font-family="VT323, monospace" font-size="54" fill="#a8ff60">${c.codename.replace(/&/g, '&amp;').slice(0, 48)}</text>
  <foreignObject x="48" y="160" width="700" height="180"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Source Serif 4, Georgia, serif; font-size: 16px; line-height:1.5; color:#c8f0c8;">${c.summary.slice(0, 220).replace(/&/g, '&amp;')}…</div></foreignObject>
  <rect x="48" y="380" width="700" height="1" fill="#1a3a1e"/>
  <text x="48" y="410" font-family="JetBrains Mono, monospace" font-size="12" fill="#7abf7a">${c.techniques.map(t=>t.attackId).slice(0,4).join(' · ')} — ${c.role}</text>
  <text x="48" y="560" font-family="JetBrains Mono, monospace" font-size="11" fill="#4a6a4a">0x013H — pepbritisnasetiawan.github.io/porto-BT/cases/${c.id}/</text>
  <circle cx="1100" cy="100" r="3" fill="#a8ff60" opacity="0.7"/><circle cx="1100" cy="110" r="3" fill="#a8ff60" opacity="0.35"/><circle cx="1100" cy="120" r="3" fill="#a8ff60" opacity="0.15"/>
</svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public, max-age=31536000, immutable' } });
}
