<?php
/**
 * COPY ONLY ON THE SERVER to a sibling directory OUTSIDE the site's document root:
 *   <parent-of-document-root>/kotly-private/mail-config.php
 *
 * Outgoing settings supplied via Thunderbird: smtp.kotly.pro:587 STARTTLS.\n * Ensure the server has a trusted TLS certificate for smtp.kotly.pro.\n * Do not put a real password in GitHub, ZIP or a public website directory.
 */
return [
    'smtp_host' => 'smtp.kotly.pro',
    'smtp_port' => 587,
    'smtp_secure' => 'tls',
    'smtp_user' => 'info@kotly.pro',
    'smtp_password' => 'REPLACE_WITH_PASSWORD_IN_ISPMANAGER_ONLY',
    'recipient' => 'info@kotly.pro',
];
