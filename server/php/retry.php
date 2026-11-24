<?php
declare(strict_types=1);
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}
require_once __DIR__ . '/notify.php';
$config = kotlyMailConfig();
if (!$config) {
    fwrite(STDERR, "Mail configuration unavailable\n");
    exit(1);
}
$folder = kotlyPrivatePath() . '/leads';
if (!is_dir($folder)) exit(0);
$lock = fopen(kotlyPrivatePath() . '/.lead-lock', 'c+');
if (!$lock || !flock($lock, LOCK_EX | LOCK_NB)) exit(0);
$sent = 0;
foreach (glob($folder . '/*.json') ?: [] as $path) {
    $lead = json_decode((string) file_get_contents($path), true);
    if (!is_array($lead) || ($lead['delivery'] ?? '') === 'sent') continue;
    try {
        kotlySendLead($lead, $config);
        $lead['delivery'] = 'sent';
        $lead['sent_at'] = gmdate('c');
        kotlyWriteLead($path, $lead);
        $sent++;
    } catch (Throwable $e) {
        error_log('kotly.pro retry email failed for ' . basename($path) . ': ' . $e->getMessage());
    }
}
flock($lock, LOCK_UN);
fclose($lock);
echo 'Notifications sent: ' . $sent . "\n";
