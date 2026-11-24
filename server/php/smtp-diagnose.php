<?php
declare(strict_types=1);

// CLI-only diagnostics. NEVER expose diagnostics or SMTP credentials over HTTP.
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit(1);
}
$root = realpath($argv[1] ?? '');
if (!$root || !is_file($root . '/api/v1/_server/notify.php')) {
    fwrite(STDERR, "Usage: php smtp-diagnose.php /absolute/site/document/root [--send]\n");
    exit(2);
}
require_once $root . '/api/v1/_server/notify.php';
echo "PHP: " . PHP_VERSION . PHP_EOL;
foreach (['json', 'openssl', 'mbstring'] as $extension) {
    echo $extension . ': ' . (extension_loaded($extension) ? 'OK' : 'MISSING') . PHP_EOL;
    if (!extension_loaded($extension)) exit(1);
}
$config = kotlyMailConfig();
if (!$config) {
    fwrite(STDERR, "Private SMTP configuration missing or invalid: " . kotlyPrivatePath() . "/mail-config.php\n");
    exit(1);
}
echo "Private configuration: found outside public root\n";
echo "SMTP server: " . $config['smtp_host'] . ":" . (int) $config['smtp_port'] .
    " (" . strtoupper($config['smtp_secure']) . ")\n";
echo "Authentication: configured (password is not displayed)\n";
$vendor = $root . '/api/v1/_server/vendor/autoload.php';
if (!is_file($vendor)) {
    fwrite(STDERR, "PHPMailer vendor/autoload.php missing\n");
    exit(1);
}
require_once $vendor;
$smtp = new PHPMailer\PHPMailer\SMTP();
$smtp->setTimeout(12);
$smtp->setDebugLevel(0);
$host = ($config['smtp_secure'] === 'ssl' ? 'ssl://' : '') . $config['smtp_host'];
try {
    if (!$smtp->connect($host, (int) $config['smtp_port'], 12, [
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'allow_self_signed' => false,
        ],
    ])) {
        throw new RuntimeException('TCP connection or TLS handshake failed');
    }
    $smtp->hello('kotly.pro');
    if ($config['smtp_secure'] === 'tls') {
        if (!$smtp->startTLS()) throw new RuntimeException('SMTP STARTTLS negotiation failed');
        $smtp->hello('kotly.pro');
    }
    echo "SMTP connection and TLS certificate: OK\n";
    $smtp->quit(true);
    $smtp->close();
} catch (Throwable $e) {
    $smtp->close();
    fwrite(STDERR, "SMTP TLS connectivity: FAILED. Check host, port, certificate, firewall.\n");
    exit(1);
}
if (!in_array('--send', $argv, true)) {
    echo "No mail sent. Add --send to send one real delivery test to configured recipient.\n";
    exit(0);
}
$lead = [
    'lead_id' => 'TEST-' . gmdate('Ymd-His'),
    'created_at' => gmdate('c'),
    'name' => 'kotly.pro SMTP self-test',
    'phone' => 'not applicable',
    'email' => '',
    'organization' => '',
    'city' => '',
    'comment' => 'Mail configuration check after site publication.',
    'series_id' => '',
    'size_id' => '',
    'category_id' => '',
    'page_url' => 'https://kotly.pro',
    'consent_version' => 'smtp-self-test',
];
try {
    kotlySendLead($lead, $config);
    echo "SMTP: message accepted by outgoing server. Verify reception in mailbox.\n";
} catch (Throwable $e) {
    fwrite(STDERR, "SMTP authentication/delivery: FAILED. Check mailbox credentials and outgoing mail limits.\n");
    exit(1);
}
