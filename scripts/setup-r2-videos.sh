#!/usr/bin/env bash
#
# One-time setup: push the re-encoded hero videos to Cloudflare R2 and make
# them publicly readable. Run from the project root AFTER authenticating:
#
#   npx wrangler login        # opens a browser OAuth flow (interactive)
#   bash scripts/setup-r2-videos.sh
#
# Requires an R2-enabled Cloudflare account. Subcommand names can differ
# slightly between wrangler versions — if one fails, check `npx wrangler r2 --help`.
set -euo pipefail

BUCKET="fairfield-videos"
WRANGLER="npx wrangler"
FILES=(gila_monster madagascar_periwinkle cone_snail streptomyces)

echo "==> Creating bucket $BUCKET (ignore error if it already exists)"
$WRANGLER r2 bucket create "$BUCKET" || true

echo "==> Uploading videos under the videos/ prefix"
for f in "${FILES[@]}"; do
  echo "    - $f.mp4"
  $WRANGLER r2 object put "$BUCKET/videos/$f.mp4" \
    --file="public/videos/$f.mp4" \
    --content-type="video/mp4" \
    --remote
done

echo "==> Enabling the public r2.dev dev URL"
# Gives you a https://pub-<hash>.r2.dev base URL. (Or attach a custom domain
# such as videos.fairfieldbio.com from the R2 dashboard instead.)
$WRANGLER r2 bucket dev-url enable "$BUCKET"

echo "==> Applying CORS"
$WRANGLER r2 bucket cors put "$BUCKET" --file scripts/r2-cors.json

echo ""
echo "Done. Copy the printed pub-*.r2.dev URL and set it as NEXT_PUBLIC_VIDEO_CDN_URL:"
echo "  - locally in .env.local"
echo "  - in Vercel:  npx vercel env add NEXT_PUBLIC_VIDEO_CDN_URL production"
echo "                (repeat for preview + development, then redeploy)"
