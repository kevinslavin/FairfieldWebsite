#!/usr/bin/env bash
#
# Upload the re-encoded hero videos to Cloudflare R2. The bucket
# (fairfield-videos) and the custom domain (videos.fairfieldbio.com) are
# already set up in the Cloudflare dashboard, so this only uploads the files.
#
# Run from the project root AFTER authenticating:
#
#   npx wrangler login        # opens a browser OAuth flow (interactive)
#   bash scripts/setup-r2-videos.sh
#
# If a subcommand fails, check `npx wrangler r2 object --help` (flags vary by version).
set -euo pipefail

BUCKET="fairfield-videos"
WRANGLER="npx wrangler"
FILES=(gila_monster madagascar_periwinkle cone_snail streptomyces)

# Idempotent — no-op if the bucket already exists.
$WRANGLER r2 bucket create "$BUCKET" || true

echo "==> Uploading videos under the videos/ prefix"
for f in "${FILES[@]}"; do
  echo "    - $f.mp4"
  $WRANGLER r2 object put "$BUCKET/videos/$f.mp4" \
    --file="public/videos/$f.mp4" \
    --content-type="video/mp4" \
    --remote
done

echo ""
echo "Done. Files are at https://videos.fairfieldbio.com/videos/<name>.mp4"
echo "Tell Claude the upload finished and it will set NEXT_PUBLIC_VIDEO_CDN_URL,"
echo "delete the local public/videos/*.mp4, and verify."
