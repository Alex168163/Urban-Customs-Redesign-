#!/usr/bin/env bash
#
# fetch-assets.sh — download Urban Customs site assets
#
#   cd assets && chmod +x fetch-assets.sh && ./fetch-assets.sh
#
# Writes into logos/ banners/ images/ icons/ badges/ coupons/ gallery/ kitchen/
# and produces fetch-report.txt listing every success and failure.
#
# Requires: bash 4+, curl

set -uo pipefail

BASE="https://urbancustomsaz.com/wp-content/uploads"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPORT="$DIR/fetch-report.txt"

OK=0
FAIL=0

mkdir -p "$DIR"/{logos,banners,images,icons,badges,coupons,gallery,kitchen,staging}
: > "$REPORT"

log()  { echo "$*" | tee -a "$REPORT"; }
note() { echo "$*" >> "$REPORT"; }

# get <folder> <relative-path>  → downloads to <folder>/<basename>
get() {
  local folder="$1" rel="$2"
  local file="${rel##*/}"
  local dest="$DIR/$folder/$file"

  if [[ -s "$dest" ]]; then
    printf '  = %-58s (already present)\n' "$file"
    OK=$((OK+1)); return 0
  fi

  local code
  code=$(curl -sS -L -A "$UA" --connect-timeout 15 --max-time 90 --retry 2 --retry-delay 1 \
               -o "$dest" -w '%{http_code}' "$BASE/$rel" 2>/dev/null)

  if [[ "$code" == "200" && -s "$dest" ]]; then
    # reject HTML error pages served with a 200
    if head -c 200 "$dest" | grep -qi '<!doctype html\|<html'; then
      rm -f "$dest"
      printf '  ! %-58s (got HTML, not an image)\n' "$file"
      note "FAIL  $BASE/$rel  (HTML response)"
      FAIL=$((FAIL+1)); return 1
    fi
    printf '  + %-58s %s\n' "$file" "$(du -h "$dest" | cut -f1)"
    note "OK    $BASE/$rel"
    OK=$((OK+1)); return 0
  fi

  rm -f "$dest"
  printf '  - %-58s (HTTP %s)\n' "$file" "$code"
  note "FAIL  $BASE/$rel  (HTTP $code)"
  FAIL=$((FAIL+1)); return 1
}

# try_full <folder> <relative-path-with--WxH-suffix>
# Attempts the full-size original first, falls back to the sized version.
try_full() {
  local folder="$1" rel="$2"
  # strip a trailing -WIDTHxHEIGHT immediately before the extension only
  local full
  full=$(printf '%s' "$rel" | sed -E 's/-[0-9]+x[0-9]+(\.[A-Za-z]+)$/\1/')
  if [[ "$full" != "$rel" ]] && exists "$full"; then
    get "$folder" "$full"
    return $?
  fi
  get "$folder" "$rel"
}

# exists <relative-path> → quiet HEAD check
exists() {
  local code
  code=$(curl -sS -L -A "$UA" --connect-timeout 10 --max-time 20 \
              -o /dev/null -w '%{http_code}' -r 0-0 "$BASE/$1" 2>/dev/null)
  [[ "$code" == "200" || "$code" == "206" ]]
}

log "Urban Customs asset fetch — $(date)"
log "Source: $BASE"
log ""

# ── connectivity check ────────────────────────────────────────────────
if ! exists "2024/12/urban-customs-square-logo-800px.png"; then
  log "Cannot reach $BASE"
  log ""
  log "Check that this machine has open internet access. Sandboxed or"
  log "proxied environments commonly block non-allowlisted domains and"
  log "return 403 host_not_allowed. Run this from an unrestricted machine."
  exit 1
fi

# ── logos ─────────────────────────────────────────────────────────────
log "LOGOS"
get logos "2024/12/urban-customs-new-logo-1200px.png"
get logos "2024/12/urban-customs-new-logo-600px.png"
get logos "2024/12/urban-customs-white-logo.png"
get logos "2024/12/urban-customs-square-logo-800px.png"
log ""

# ── banners ───────────────────────────────────────────────────────────
log "BANNERS (homepage slider frames)"
get banners "2023/08/floor-repair-slider.jpg"
get banners "2023/08/floor-refinishing-slider.jpg"
get banners "2023/08/cabinet-installation-slider.jpg"
get banners "2024/04/kitchen-remodeling-slider-02.jpg"
log ""

# ── images ────────────────────────────────────────────────────────────
log "IMAGES"
get images "2024/05/interior-stone-installations-in-arizona.jpg"
get images "2024/06/phoenix-flooring-installations-before-image.jpg"
get images "2024/06/phoenix-flooring-installations-during-image.jpg"
get images "2024/06/phoenix-flooring-installations-after-image.jpg"
get images "2019/09/pic035-with-logo.jpg"
get images "2019/09/pic007-with-logo.jpg"
get images "2019/09/pic036-with-logo.jpg"
get images "2019/09/Hardwood-Floor-Refinishing-Phoenix-AZ.jpg"
log ""

# ── icons (try full size, fall back to 150x150 crop) ──────────────────
log "ICONS"
try_full icons "2019/09/design-150x150.png"
try_full icons "2019/09/installation-icon-150x150.png"
try_full icons "2019/09/warranty-150x150.png"
try_full icons "2019/09/check-mark-icon-150x150.png"
log ""

# ── badges ────────────────────────────────────────────────────────────
log "BADGES"
get badges "2019/09/Urban-Customs-Google-Button.png"
get badges "2025/10/169358-967-2.png"
log ""

# ── coupons ───────────────────────────────────────────────────────────
log "COUPONS (2026 specials)"
try_full coupons "2026/07/urban-customs-design-coupon-2026-1024x512.jpg"
try_full coupons "2026/07/urban-customs-installation-coupon-2026-1024x512.jpg"
try_full coupons "2026/07/urban-customs-free-shipping-coupon-2026-1024x512.jpg"
log ""

# ── gallery: pic001..pic039 (029 and 034 not listed on the page) ──────
log "GALLERY (pic001-pic039, .jpg then .png)"
for i in $(seq 1 39); do
  n=$(printf '%03d' "$i")
  [[ "$n" == "029" || "$n" == "034" ]] && continue
  name="pic${n}-with-logo"
  if exists "2019/09/${name}.jpg"; then
    get gallery "2019/09/${name}.jpg"
  elif exists "2019/09/${name}.png"; then
    get gallery "2019/09/${name}.png"
  else
    printf '  - %-58s (not found in 2019/09)\n' "$name"
    note "FAIL  ${name}  (not found in 2019/09 as .jpg or .png)"
    FAIL=$((FAIL+1))
  fi
done
log ""

# ── gallery: three refinishing photos, filenames not exposed ──────────
log "GALLERY — refinishing photos (slug guesses)"
for guess in "wood-floor-refinishing" "hardwood-floor-refinishing" \
             "hardwood-floor-refinishing-2" "Wood-Floor-Refinishing" \
             "Hardwood-Floor-Refinishing" "Hardwood-Floor-Refinishing-2"; do
  for folder in 2019/09 2023/08 2024/06; do
    for ext in jpg png; do
      if exists "$folder/${guess}.${ext}"; then
        get gallery "$folder/${guess}.${ext}"
      fi
    done
  done
done
note "NOTE  Three refinishing gallery photos had no exposed filenames."
note "      Request them from the client if the guesses above missed."
log ""

# ── kitchen gallery: probe for the upload folder ──────────────────────
log "KITCHEN GALLERY (probing for upload folder)"
KPREFIX="arizona-kitchen-remodeling-by-urban-customs-img"
KDIR=""
for folder in 2024/04 2024/08 2024/05 2024/06 2023/08 2019/09 2024/12 2025/10; do
  if exists "$folder/${KPREFIX}-001.jpg"; then KDIR="$folder"; break; fi
  if exists "$folder/${KPREFIX}-001.png"; then KDIR="$folder"; break; fi
done

if [[ -n "$KDIR" ]]; then
  log "  found in $KDIR"
  for n in 001 002 003 004 005 006 007 008 009 010; do
    if exists "$KDIR/${KPREFIX}-${n}.jpg"; then
      get kitchen "$KDIR/${KPREFIX}-${n}.jpg"
    elif exists "$KDIR/${KPREFIX}-${n}.png"; then
      get kitchen "$KDIR/${KPREFIX}-${n}.png"
    else
      printf '  - %-58s (not found)\n' "${KPREFIX}-${n}"
      note "FAIL  ${KPREFIX}-${n}"
      FAIL=$((FAIL+1))
    fi
  done
else
  log "  not found in any probed folder"
  note "FAIL  Kitchen gallery folder not located."
  note "      Filenames are ${KPREFIX}-001 through -010."
  note "      Pull them from the client, or from the rendered HTML of"
  note "      https://urbancustomsaz.com/kitchen-remodeling/ (the images"
  note "      are lazy-loaded, so read data-src / data-lazy-src attributes)."
  FAIL=$((FAIL+10))
fi
log ""

# ── staging site (agency redesign, newer assets) ──────────────────────
SBASE="https://webtechs-designs.com/UrbanCustoms/wp-content/uploads"

sget() {
  local rel="$1"
  local file="${rel##*/}"
  local dest="$DIR/staging/$file"

  if [[ -s "$dest" ]]; then
    printf '  = %-58s (already present)\n' "$file"
    OK=$((OK+1)); return 0
  fi

  local code
  code=$(curl -sS -L -A "$UA" --connect-timeout 15 --max-time 90 --retry 2 --retry-delay 1 \
               -o "$dest" -w '%{http_code}' "$SBASE/$rel" 2>/dev/null)

  if [[ "$code" == "200" && -s "$dest" ]]; then
    if head -c 200 "$dest" | grep -qi '<!doctype html\|<html'; then
      rm -f "$dest"
      printf '  ! %-58s (got HTML, not an image)\n' "$file"
      note "FAIL  $SBASE/$rel  (HTML response)"
      FAIL=$((FAIL+1)); return 1
    fi
    printf '  + %-58s %s\n' "$file" "$(du -h "$dest" | cut -f1)"
    note "OK    $SBASE/$rel"
    OK=$((OK+1)); return 0
  fi

  rm -f "$dest"
  printf '  - %-58s (HTTP %s)\n' "$file" "$code"
  note "FAIL  $SBASE/$rel  (HTTP $code)"
  FAIL=$((FAIL+1)); return 1
}

sexists() {
  local code
  code=$(curl -sS -L -A "$UA" --connect-timeout 10 --max-time 20 \
              -o /dev/null -w '%{http_code}' -r 0-0 "$SBASE/$1" 2>/dev/null)
  [[ "$code" == "200" || "$code" == "206" ]]
}

log "STAGING SITE (agency redesign — newer logo, favicon, design photos)"
sget "2026/01/urban-customs-white-logo-300px.png"
sget "2026/01/urban-customs-favicon-300x300.png"
for n in 01 02 03 04; do
  sget "2026/02/urban-customs-floor-designs-and-installations-img-${n}.jpg"
done

log "  probing for slider frames"
for slug in custom-flooring-slider flooring-restoration-slider kitchen-cabinet-slider; do
  found=""
  for folder in 2026/01 2026/02 2026/03 2025/12; do
    for ext in jpg png; do
      if sexists "$folder/${slug}.${ext}"; then
        sget "$folder/${slug}.${ext}"; found=1; break 2
      fi
    done
  done
  if [[ -z "$found" ]]; then
    printf '  - %-58s (not found)\n' "$slug"
    note "FAIL  ${slug}  (not located on staging)"
    FAIL=$((FAIL+1))
  fi
done
note "NOTE  Six room-type images on /services/ (master bath, shower stall,"
note "      guest bathroom, living room, kitchen, patio) are lazy-loaded with"
note "      no exposed filenames. Request them from the client."
log ""

# ── summary ───────────────────────────────────────────────────────────
log "─────────────────────────────────────────────"
log "Downloaded: $OK    Failed: $FAIL"
log "Report: $REPORT"
log ""
log "Next:"
log "  1. Review fetch-report.txt and request any misses from the client"
log "  2. Confirm image rights before publishing"
log "  3. Convert to WebP and generate responsive sizes"
log "  4. Write real alt text for every image"
log "  5. Sample brand hex values from logos/urban-customs-new-logo-1200px.png"
