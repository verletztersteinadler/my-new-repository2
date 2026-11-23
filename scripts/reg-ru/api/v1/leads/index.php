<?php
/**
 * kotly.pro — PHP 8.3 receiver for the static REG.RU website.
 *
 * Disabled unless a PRIVATE config is created outside the document root:
 * /www/kotly-pro-private/config.php (sibling of /www/kotly.pro).
 * Do not upload the private config or lead files into /www/kotly.pro.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('X-Content-Type-Options: nosniff');
header("Referrer-Policy: no-referrer");
header("Content-Security-Policy: default-src 'none'");
umask(0077);

function answer(int $code, array $body): never {
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}
function field(array $src, string $key, int $max = 4000): string {
    $v = $src[$key] ?? '';
    if (!is_string($v)) return '';
    $v = trim($v);
    if (strlen($v) > $max) return '';
    return str_replace(["\0", "\r"], ['', ''], $v);
}
function textLength(string $value): int {
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}
function digits(string $value): int {
    return preg_match_all('/\d/', $value) ?: 0;
}
function okEmail(string $value): bool {
    return (bool)filter_var($value, FILTER_VALIDATE_EMAIL) && strlen($value) <= 254;
}
function cfgReady(mixed $config, string $store): bool {
    if (!is_array($config)) return false;
    if (($config['enabled'] ?? false) !== true) return false;
    if (($config['privacy_approved'] ?? false) !== true) return false;
    if (!okEmail((string)($config['recipient'] ?? ''))) return false;
    if (!okEmail((string)($config['sender'] ?? ''))) return false;
    // Do not accept spoofed "From" addresses of third-party domains.
    if (!preg_match('/@kotly\.pro$/i', (string)$config['sender'])) return false;
    if (trim((string)($config['operator_name'] ?? '')) === '') return false;
    if (!okEmail((string)($config['operator_contact'] ?? ''))) return false;
    if (($config['policy_version'] ?? '') !== 'kotly-consent-draft-2026-11-15') return false;
    if (!isset($config['rate_secret']) || !is_string($config['rate_secret']) || strlen($config['rate_secret']) < 32) return false;
    if (!is_dir($store) || !is_writable($store)) return false;
    return true;
}
function lockFile(string $path) {
    $fp = @fopen($path, 'c+');
    if ($fp === false || !flock($fp, LOCK_EX)) return false;
    return $fp;
}
function checkRate(string $path, string $ipHash): bool {
    $fp = lockFile($path);
    if ($fp === false) return false;
    $now = time();
    $rows = [];
    rewind($fp);
    while (($line = fgets($fp)) !== false) {
        $item = json_decode($line, true);
        if (!is_array($item)) continue;
        $time = (int)($item['time'] ?? 0);
        if ($now - $time < 3600 && $now >= $time) $rows[] = ['time' => $time, 'ip' => (string)($item['ip'] ?? '')];
    }
    $count = count(array_filter($rows, static fn($r) => hash_equals($r['ip'], $ipHash)));
    if ($count >= 5) { flock($fp, LOCK_UN); fclose($fp); return false; }
    $rows[] = ['time' => $now, 'ip' => $ipHash];
    rewind($fp);
    ftruncate($fp, 0);
    foreach ($rows as $row) fwrite($fp, json_encode($row) . "\n");
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    return true;
}
function saveLead(string $path, array $record): array|false {
    $fp = lockFile($path);
    if ($fp === false) return false;
    rewind($fp);
    while (($line = fgets($fp)) !== false) {
        $row = json_decode($line, true);
        if (!is_array($row) || ($row['submission_id'] ?? '') !== $record['submission_id']) continue;
        flock($fp, LOCK_UN);
        fclose($fp);
        return ['id' => (string)$row['id'], 'same' => hash_equals((string)($row['fingerprint'] ?? ''), $record['fingerprint']), 'replay' => true];
    }
    $encoded = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    if ($encoded === false) { flock($fp, LOCK_UN); fclose($fp); return false; }
    fseek($fp, 0, SEEK_END);
    $fullLine = $encoded . "\n";
    $written = fwrite($fp, $fullLine);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    return $written !== strlen($fullLine) ? false : ['id' => $record['id'], 'same' => true, 'replay' => false];
}

$private = dirname(__DIR__, 4) . DIRECTORY_SEPARATOR . 'kotly-pro-private';
$configPath = $private . DIRECTORY_SEPARATOR . 'config.php';
$config = is_file($configPath) ? (static function ($path) { return require $path; })($configPath) : null;
$ready = cfgReady($config, $private);

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'GET' || $method === 'HEAD') {
    header('Allow: GET, HEAD, POST');
    answer(200, ['enabled' => $ready, 'service' => 'kotly-pro-leads', 'api_version' => 1]);
}
if ($method !== 'POST') { header('Allow: GET, HEAD, POST'); answer(405, ['message' => 'Метод не поддерживается']); }
if (!$ready) answer(503, ['message' => 'Приём заявок пока не настроен']);

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (!in_array($origin, ['https://kotly.pro', 'https://www.kotly.pro'], true)) {
    answer(403, ['message' => 'Недопустимый источник запроса']);
}
if (($_SERVER['HTTP_SEC_FETCH_SITE'] ?? 'same-origin') === 'cross-site') answer(403, ['message' => 'Недопустимый источник']);
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 32768) answer(413, ['message' => 'Заявка слишком большая']);
$body = file_get_contents('php://input', false, null, 0, 32769);
if (!is_string($body) || strlen($body) > 32768) answer(413, ['message' => 'Заявка слишком большая']);

$type = $_SERVER['CONTENT_TYPE'] ?? '';
if (str_contains($type, 'application/json')) {
    $data = json_decode($body, true);
} elseif (str_contains($type, 'application/x-www-form-urlencoded')) {
    parse_str($body, $data);
} else {
    answer(415, ['message' => 'Поддерживается только JSON']);
}
if (!is_array($data)) answer(422, ['message' => 'Некорректный формат заявки']);

$honeypot = field($data, 'website', 300);
if ($honeypot !== '') answer(422, ['message' => 'Заявка не принята']);

$idempotency = field($data, 'submission_id', 100);
$name = field($data, 'name', 500);
$phone = field($data, 'phone', 250);
$email = field($data, 'email', 300);
$comment = field($data, 'comment', 18000);
$category = field($data, 'category_id', 90);
$series = field($data, 'series_id', 120);
$size = field($data, 'size_id', 120);
$pageUrl = field($data, 'page_url', 1500);
$consent = ($data['consent'] ?? false) === true || in_array($data['consent'] ?? false, ['1', 'on', 'true'], true);
$consentVersion = field($data, 'consent_version', 150);
$errors = [];
if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $idempotency)) $errors['form'] = 'Обновите страницу и повторите отправку';
if ($name === '' || textLength($name) > 100) $errors['name'] = 'Укажите имя (до 100 символов)';
if ($phone === '' || digits($phone) < 8 || strlen($phone) > 80) $errors['phone'] = 'Укажите корректный телефон';
if ($email !== '' && !okEmail($email)) $errors['email'] = 'Проверьте адрес почты';
if (textLength($comment) > 3000) $errors['comment'] = 'Описание слишком длинное';
if (!$consent || $consentVersion !== 'kotly-consent-draft-2026-11-15') $errors['consent'] = 'Подтвердите согласие с актуальной политикой';
if (count($errors)) answer(422, ['message' => 'Проверьте поля', 'errors' => $errors]);

// Only record a same-origin path, without query string or fragment.
$parsed = parse_url($pageUrl);
$path = is_array($parsed) && in_array(strtolower((string)($parsed['host'] ?? '')), ['kotly.pro', 'www.kotly.pro'], true)
    ? (string)($parsed['path'] ?? '/') : '/';
$path = substr($path, 0, 512);

$ip = (string)($_SERVER['REMOTE_ADDR'] ?? '');
$ipHash = hash_hmac('sha256', $ip, (string)$config['rate_secret']);
if (!checkRate($private . '/rate-' . gmdate('Y-m-d') . '.jsonl', $ipHash)) {
    answer(429, ['message' => 'Слишком много запросов. Попробуйте позднее']);
}
$record = [
    'id' => 'KP-' . gmdate('ymd') . '-' . strtoupper(bin2hex(random_bytes(4))),
    'created_at_utc' => gmdate('c'),
    'submission_id' => $idempotency,
    'fingerprint' => hash('sha256', json_encode([$name, $phone, $email, $comment, $series, $size, $category])),
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'comment' => $comment,
    'series_id' => $series,
    'size_id' => $size,
    'category_id' => $category,
    'page_path' => $path,
    'consent_at_utc' => gmdate('c'),
    'consent_version' => $consentVersion,
    'notification' => 'pending',
];
$saved = saveLead($private . '/leads-' . gmdate('Y-m') . '.jsonl', $record);
if ($saved === false) answer(503, ['message' => 'Не удалось сохранить заявку. Попробуйте позже']);
if (!$saved['same']) answer(409, ['message' => 'Обращение с таким ключом уже существует']);
if ($saved['replay']) answer(200, ['lead_id' => $saved['id'], 'status' => 'accepted', 'replay' => true]);

// Notification is best effort. Local storage is authoritative. mail() returning true
// only means accepted by the local mail agent, not proof of delivery.
$subject = '=?UTF-8?B?' . base64_encode('Заявка kotly.pro ' . $record['id']) . '?=';
$message = "Новая заявка kotly.pro\n\n";
foreach (['id','created_at_utc','name','phone','email','category_id','series_id','size_id','page_path','comment','consent_version'] as $key) {
    $message .= $key . ": " . str_replace(["\r", "\0"], '', (string)$record[$key]) . "\n";
}
$headers = ['MIME-Version: 1.0', 'Content-type: text/plain; charset=UTF-8', 'From: ' . $config['sender']];
if ($email !== '') $headers[] = 'Reply-To: ' . $email;
$sent = ($config['notify_by_email'] ?? false) === true
    ? @mail((string)$config['recipient'], $subject, $message, implode("\r\n", $headers))
    : false;
// Never claim email was delivered. Keep a separate minimal notification status log.
@file_put_contents($private . '/notifications-' . gmdate('Y-m') . '.jsonl',
    json_encode(['id' => $record['id'], 'mail_accepted' => (bool)$sent, 'at_utc' => gmdate('c')]) . "\n",
    FILE_APPEND | LOCK_EX);
answer(201, ['lead_id' => $record['id'], 'status' => 'accepted', 'notification' => $sent ? 'queued' : 'check_mail_settings']);
