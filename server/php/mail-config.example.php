<?php
/**
 * COPY ONLY ON THE SERVER to a sibling directory OUTSIDE the site's document root:
 *   <parent-of-document-root>/kotly-private/mail-config.php
 *
 * Do not put a real password in GitHub, ZIP or a public website directory.
 */
return [
    'smtp_host' => 'mail.hosting.reg.ru',
    'smtp_port' => 465,
    'smtp_secure' => 'ssl',
    'smtp_user' => 'info@kotly.pro',
    'smtp_password' => 'REPLACE_WITH_PASSWORD_IN_ISPMANAGER_ONLY',
    'recipient' => 'info@kotly.pro',
];
