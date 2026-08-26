# Custom Domain — Step-by-Step

**Current live (no DNS needed):** `https://pepbritisnasetiawan.github.io/porto-BT/` — works now.

To use `https://porto-bt.pepbritisnasetiawan.dev` (your CNAME):

1. **DNS — add CNAME at your provider (Cloudflare / Namecheap / etc.):**
   - Type: `CNAME` · Host: `porto-bt` · Target: `pepbritisnasetiawan.github.io` · TTL: Auto
   - Or 4x `A` to GitHub Pages IPs if you want apex `pepbritisnasetiawan.dev`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

2. **Repo — re-add CNAME file:**
   ```bash
   echo "porto-bt.pepbritisnasetiawan.dev" > public/CNAME
   # astro.config.mjs: site: 'https://porto-bt.pepbritisnasetiawan.dev', base: '/'
   ```

3. **GitHub — Settings → Pages → Custom domain:** enter `porto-bt.pepbritisnasetiawan.dev` → Save. Wait for DNS check green.

4. **Verify:** `dig porto-bt.pepbritisnasetiawan.dev +short` should return GitHub IPs / CNAME, then `curl -I https://porto-bt.pepbritisnasetiawan.dev` → 200. Plausible `data-domain` in `src/layouts/Base.astro:41` already set to `pepbritisnasetiawan.github.io` — change to `porto-bt.pepbritisnasetiawan.dev` when DNS is live.

**Keep GitHub Pages source = GitHub Actions** (Settings → Pages → Source: GitHub Actions) — our `.github/workflows/deploy.yml` handles deploys on `git push` to `main`.
