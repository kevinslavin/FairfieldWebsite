# DNS migration to Cloudflare + R2 video hosting

**Why:** Hero videos were burning Vercel Fast Data Transfer (~100 GB/mo). Videos
have been re-encoded to ~1/10th size (committed) and will move to Cloudflare R2.
An R2 custom domain (`videos.fairfieldbio.com`) requires the domain to be in a
Cloudflare zone, so `fairfieldbio.com` DNS is moving from Squarespace/Google Cloud
DNS to Cloudflare. (The `r2.dev` public URL is dev-only / rate-limited per
Cloudflare and is not suitable for production.)

## Current authoritative DNS — REPLICATE ALL IN CLOUDFLARE BEFORE CUTOVER

Registrar: Squarespace. DNS currently delegated to Google Cloud DNS
(`ns-cloud-d1..d4.googledomains.com`).

| Type  | Name | Value                                                                   | Cloudflare proxy            |
|-------|------|-------------------------------------------------------------------------|-----------------------------|
| A     | @    | `76.76.21.21`                                                           | **DNS only (grey cloud)**   |
| CNAME | www  | `cname.vercel-dns.com`                                                  | **DNS only (grey cloud)**   |
| MX    | @    | `smtp.google.com` (priority 1)                                          | n/a — Google Workspace mail |
| TXT   | @    | `google-site-verification=yNGvnK219fs8PxWvzKn9I-DapdkqTE0lg7cHqE4-rbw`  | n/a                         |

No AAAA / DKIM (`google._domainkey`) / DMARC records currently exist.

> **Critical:** The Vercel A/CNAME records must be **DNS-only (grey cloud)** in
> Cloudflare. Proxying them (orange cloud) puts Cloudflare in front of Vercel and
> breaks SSL / domain verification.
>
> **Critical:** The MX record is live Google Workspace email (e.g.
> `slavin@fairfieldbio.com`). If it isn't replicated before the nameserver switch,
> email stops.

Cloudflare nameservers assigned: `irma.ns.cloudflare.com`, `rohin.ns.cloudflare.com`.

## Runbook (ordered)

1. [DONE] Cloudflare account created, `fairfieldbio.com` added (Free), DNS auto-scanned.
2. [DONE] All four records verified in Cloudflare; Vercel A/CNAME set to DNS-only.
3. [DONE] Squarespace nameservers switched to Cloudflare. Propagated + verified:
   apex/www return HTTP 200, MX + TXT intact. No downtime.
4. **You (NEXT):** Enable R2 (needs a payment method on file). Then:
   ```bash
   npx wrangler login
   bash scripts/setup-r2-videos.sh
   ```
   In the R2 dashboard, connect custom domain `videos.fairfieldbio.com` to the
   `fairfield-videos` bucket (auto-creates the proxied CNAME + TLS cert).
5. **Claude:** set `NEXT_PUBLIC_VIDEO_CDN_URL=https://videos.fairfieldbio.com` in
   `.env.local` and in Vercel (all environments), redeploy; delete
   `public/videos/*.mp4`; verify videos load from R2 with autoplay + seamless
   transitions and no CORS errors.

Originals backed up to gitignored `video-originals/`.
