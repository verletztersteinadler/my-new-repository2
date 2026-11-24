#!/usr/bin/env bash
# Interactive server-only configuration. No password in CLI args or public ZIP.
set -euo pipefail
umask 077
if [[ $# -ne 1 || ! -d "$1" ]]; then
  echo "Usage: bash setup-mail.sh /absolute/path/to/kotly.pro/document-root" >&2
  exit 2
fi
ROOT="$(cd "$1" && pwd -P)"
[[ "$ROOT" != "/" ]] || exit 2
PRIVATE="$(dirname "$ROOT")/kotly-private"
mkdir -p "$PRIVATE" "$PRIVATE/leads"
chmod 700 "$PRIVATE" "$PRIVATE/leads"
CONFIG="$PRIVATE/mail-config.php"
if [[ -f "$CONFIG" ]]; then
  read -r -p "SMTP config exists. Overwrite? Type YES: " answer
  [[ "$answer" == YES ]] || { echo "Existing config kept."; exit 0; }
  cp -p "$CONFIG" "$PRIVATE/mail-config.backup-$(date -u +%Y%m%dT%H%M%SZ).php"
fi
read -r -p "SMTP server [mail.hosting.reg.ru]: " host
[[ -n "$host" ]] || host="mail.hosting.reg.ru"
read -r -p "SMTP port [465]: " port
[[ -n "$port" ]] || port="465"
read -r -p "Mailbox login [info@kotly.pro]: " login
[[ -n "$login" ]] || login="info@kotly.pro"
read -r -p "Recipient [info@kotly.pro]: " recipient
[[ -n "$recipient" ]] || recipient="info@kotly.pro"
if [[ ! "$host" =~ ^[A-Za-z0-9.-]+$ || ! "$port" =~ ^(465|587)$ ]]; then
  echo "Invalid SMTP host or port." >&2; exit 1
fi
secure="ssl"
[[ "$port" == 587 ]] && secure="tls"
read -r -s -p "Mailbox password (hidden): " password
echo
[[ -n "$password" ]] || { echo "Password cannot be empty" >&2; exit 1; }
TMP="$(mktemp "$PRIVATE/.mail-config.XXXXXX")"
trap 'rm -f "$TMP"; unset password' EXIT
# Secret is carried by STDIN; process arguments do not contain it.
printf '%s' "$password" |
  KOTLY_CONFIG_OUT="$TMP" KOTLY_HOST="$host" KOTLY_PORT="$port" KOTLY_SECURE="$secure" \
  KOTLY_LOGIN="$login" KOTLY_RECIPIENT="$recipient" \
  php -r '
  $password = stream_get_contents(STDIN);
  $values = [
    "smtp_host" => getenv("KOTLY_HOST"),
    "smtp_port" => (int)getenv("KOTLY_PORT"),
    "smtp_secure" => getenv("KOTLY_SECURE"),
    "smtp_user" => getenv("KOTLY_LOGIN"),
    "smtp_password" => $password,
    "recipient" => getenv("KOTLY_RECIPIENT")
  ];
  if (!filter_var($values["smtp_user"], FILTER_VALIDATE_EMAIL) ||
      !filter_var($values["recipient"], FILTER_VALIDATE_EMAIL) ||
      strlen($password) < 1) {
    fwrite(STDERR, "Invalid mailbox or recipient\n");
    exit(1);
  }
  file_put_contents(getenv("KOTLY_CONFIG_OUT"), "<?php\nreturn " . var_export($values, true) . ";\n");
  '
unset password
php -l "$TMP" >/dev/null
chmod 600 "$TMP"
mv -f "$TMP" "$CONFIG"
echo "Private SMTP settings saved outside webroot: $CONFIG"
echo "Now run install.sh. It sends one real SMTP test before publication."
