<?php
/**
 * This is an example only. Save the populated configuration one directory
 * ABOVE the site document root, e.g. /www/kotly-private/mail-config.php.
 * Never put a real password into public ZIPs, chat attachments or GitHub.
 *
 * REG.RU-hosted mail (per published REG.RU support documentation):
 * mail.hosting.reg.ru, port 465, SSL/TLS.
 * If your mailbox is on a separate SMTP server, use its exact trusted host.
 */
return [
    'smtp_host' => 'mail.hosting.reg.ru',
    'smtp_port' => 465,
    'smtp_secure' => 'ssl',
    'smtp_user' => 'info@kotly.pro',
    'smtp_password' => 'REPLACE_WITH_PASSWORD_ON_SERVER_ONLY',
    'recipient' => 'info@kotly.pro',
];
