import { cases } from '../data/cases';

export async function GET() {
  const site = 'https://pepbritisnasetiawan.github.io/porto-BT/';
  const items = cases
    .slice(0, 20)
    .map(
      (c) => `
    <item>
      <title><![CDATA[${c.codename}]]></title>
      <link>${site}cases/${c.id}/</link>
      <guid>${site}cases/${c.id}/</guid>
      <pubDate>${new Date(c.date + '-01').toUTCString()}</pubDate>
      <description><![CDATA[${c.summary} — ${c.outcomeMetric}]]></description>
      <category>${c.domain}</category>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>0x013H — DFIR Case Files</title>
    <link>${site}</link>
    <description>Evidence-driven DFIR case files by 0x013H — 28 cases, MITRE-mapped, UTC-normalized.</description>
    <language>en-us</language>
    <atom:link href="${site}rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
