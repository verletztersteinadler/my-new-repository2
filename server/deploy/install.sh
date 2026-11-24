#!/usr/bin/env bash
# Run OUTSIDE the public directory. This archive contains NO real credentials.
set -euo pipefail
umask 077
if [[ $# -ne 1 || ! -d "$1" ]]; then
  echo "Usage: bash install.sh /absolute/path/to/kotly.pro/document-root" >&2
  exit 2
fi
SITE_ROOT="$(cd "$1" && pwd -P)"
BUNDLE_DIR="$(cd "$(dirname "$0")" && pwd -P)"
PARENT="$(dirname "$SITE_ROOT")"
PRIVATE="$PARENT/kotly-private"
[[ "$SITE_ROOT" != "/" && "$SITE_ROOT" != "$PARENT" ]] || exit 2
case "$BUNDLE_DIR/" in "$SITE_ROOT/"*) echo "ERROR: Move bundle OUTSIDE public webroot" >&2; exit 1;; esac
[[ -f "$BUNDLE_DIR/site.zip" ]] || { echo "ERROR: site.zip missing" >&2; exit 1; }
for exe in php unzip tar; do command -v "$exe" >/dev/null || { echo "$exe missing" >&2; exit 1; }; done
php -r 'if (PHP_VERSION_ID < 80200 || !extension_loaded("openssl") || !extension_loaded("mbstring")) { fwrite(STDERR, "Requires PHP 8.2+ with openssl and mbstring\n"); exit(1); }'
[[ -f "$PRIVATE/mail-config.php" ]] || {
  echo "ERROR: SMTP config missing. Run: bash setup-mail.sh $SITE_ROOT" >&2
  exit 2
}
php -l "$PRIVATE/mail-config.php" >/dev/null
unzip -tq "$BUNDLE_DIR/site.zip" >/dev/null
ARCHIVE_LIST="$(unzip -Z1 "$BUNDLE_DIR/site.zip")"
for f in index.html .htaccess api/v1/leads.php api/v1/_server/notify.php api/v1/_server/vendor/autoload.php; do
  grep -Fx "$f" <<< "$ARCHIVE_LIST" >/dev/null || { echo "Missing: $f" >&2; exit 1; }
done
mkdir -p "$PRIVATE" "$PRIVATE/backups" "$PRIVATE/leads"
chmod 700 "$PRIVATE" "$PRIVATE/backups" "$PRIVATE/leads"
STAGE="$(mktemp -d "$PARENT/.kotly-release.XXXXXXXX")"
trap 'rm -rf "$STAGE"' EXIT
unzip -oq "$BUNDLE_DIR/site.zip" -d "$STAGE"
php -l "$STAGE/api/v1/leads.php" >/dev/null
php -l "$STAGE/api/v1/_server/notify.php" >/dev/null
php -l "$STAGE/api/v1/_server/retry.php" >/dev/null

# Critical: refuse to update the live website until a real SMTP test succeeds.
echo "Checking SMTP connection and sending a test message..."
php "$BUNDLE_DIR/smtp-diagnose.php" "$STAGE" --send

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP="$PRIVATE/backups/kotly-public-before-$STAMP.tar.gz"
if [[ -n "$(ls -A "$SITE_ROOT")" ]]; then
  tar -C "$SITE_ROOT" -czf "$BACKUP" .
  chmod 600 "$BACKUP"
  echo "Backup saved outside public webroot: $BACKUP"
fi
# Avoid keeping stale JS/CSS bundles from earlier builds.
rm -rf -- "$SITE_ROOT/assets"
unzip -oq "$BUNDLE_DIR/site.zip" -d "$SITE_ROOT"
if command -v crontab >/dev/null 2>&1; then
  CRON_ENTRY="*/5 * * * * $(command -v php) $SITE_ROOT/api/v1/_server/retry.php"
  EXISTING="$(crontab -l 2>/dev/null || true)"
  if ! printf '%s\n' "$EXISTING" | grep -Fq "$SITE_ROOT/api/v1/_server/retry.php"; then
    { [[ -z "$EXISTING" ]] || printf '%s\n' "$EXISTING"; printf '%s\n' "$CRON_ENTRY"; } | crontab -
    echo "Pending email retries enabled (every five minutes)."
  fi
else
  echo "WARNING: Set up cron in ISPmanager to retry failed SMTP deliveries every five minutes." >&2
fi
echo "Website deployed to: $SITE_ROOT"
echo "SMTP test accepted by outgoing server; check incoming info@kotly.pro."
echo "Check live GET https://kotly.pro/api/v1/leads.php: HTTP 405 expected."
echo "Confirm final delivery using a test request from the public contact form."
