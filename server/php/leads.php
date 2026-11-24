<?php
declare(strict_types=1);
require_once __DIR__ . '/_server/notify.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');
header('X-Content-Type-Options: nosniff');

function reply(array $body, int $status): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
function value(array $input, string $key, int $max = 3000): string
{
    $raw = $input[$key] ?? '';
    return is_string($raw) ? mb_substr(trim($raw), 0, $max, 'UTF-8') : '';
}
function validatedInput(): array
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        reply(['message' => 'Метод не поддерживается'], 405);
    }
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '') {
        $host = parse_url($origin, PHP_URL_HOST);
        $scheme = parse_url($origin, PHP_URL_SCHEME);
        if (!in_array($host, ['kotly.pro', 'www.kotly.pro'], true) || $scheme !== 'https') {
            reply(['message' => 'Источник запроса не разрешён'], 403);
        }
    }
    $type = (string) ($_SERVER['CONTENT_TYPE'] ?? '');
    $size = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($size > 32768) {
        reply(['message' => 'Слишком большой запрос'], 413);
    }
    if (str_contains($type, 'application/json')) {
        $raw = file_get_contents('php://input', false, null, 0, 32769);
        if ($raw === false || strlen($raw) > 32768) reply(['message' => 'Слишком большой запрос'], 413);
        $input = json_decode($raw, true);
        if (!is_array($input)) reply(['message' => 'Неверный формат заявки'], 422);
    } elseif (str_contains($type, 'application/x-www-form-urlencoded')) {
        $input = $_POST;
    } else {
        reply(['message' => 'Неверный формат заявки'], 415);
    }
    if (value($input, 'website', 100) !== '') {
        reply(['message' => 'Проверьте поля формы'], 422);
    }
    $errors = [];
    $name = value($input, 'name', 101);
    $phone = value($input, 'phone', 41);
    $email = value($input, 'email', 121);
    $comment = value($input, 'comment', 3001);
    $uuid = value($input, 'submission_id', 61);
    if ($name === '' || mb_strlen($name) > 100) $errors['name'] = 'Укажите имя (не более 100 символов)';
    if (preg_match('/\d/', $name) && mb_strlen($name) < 2) $errors['name'] = 'Укажите имя';
    if (strlen(preg_replace('/\D+/', '', $phone)) < 8 || mb_strlen($phone) > 40) {
        $errors['phone'] = 'Укажите телефон полностью';
    }
    if ($email !== '' && (mb_strlen($email) > 120 || !filter_var($email, FILTER_VALIDATE_EMAIL))) {
        $errors['email'] = 'Проверьте адрес почты';
    }
    if (mb_strlen($comment) > 3000) $errors['comment'] = 'Слишком длинное сообщение';
    if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', $uuid)) {
        $errors['submissionId'] = 'Некорректный ключ заявки';
    }
    $consent = $input['consent'] ?? false;
    if (!in_array($consent, [true, 'true', '1', 'on', 1], true)) {
        $errors['consent'] = 'Нужно согласие на обработку данных';
    }
    $consentVersion = value($input, 'consent_version', 80);
    if (!in_array($consentVersion, ['kotly-consent-2026-11-24', 'kotly-consent-draft-2026-11-15'], true)) {
        $errors['consent'] = 'Обновите страницу и согласие на обработку данных';
    }
    if ($errors !== []) reply(['message' => 'Проверьте поля', 'errors' => $errors], 422);
    return [
        'submission_id' => strtolower($uuid),
        'name' => $name,
        'phone' => $phone,
        'email' => $email,
        'organization' => value($input, 'organization', 200),
        'city' => value($input, 'city', 120),
        'comment' => $comment,
        'series_id' => value($input, 'series_id', 60),
        'size_id' => value($input, 'size_id', 80),
        'category_id' => value($input, 'category_id', 30),
        'page_url' => value($input, 'page_url', 300),
        'consent_version' => $consentVersion,
    ];
}
try {
    $input = validatedInput();
    $config = kotlyMailConfig();
    if (!$config) {
        reply(['message' => 'Приём заявок временно недоступен. Свяжитесь с нами по info@kotly.pro.'], 503);
    }
    $folder = kotlyPrivatePath() . '/leads';
    if (!is_dir($folder) && !mkdir($folder, 0700, true) && !is_dir($folder)) {
        throw new RuntimeException('Could not create storage folder');
    }
    $lock = fopen(kotlyPrivatePath() . '/.lead-lock', 'c+');
    if ($lock === false || !flock($lock, LOCK_EX)) throw new RuntimeException('Could not lock storage');

    $id = $input['submission_id'];
    $file = $folder . '/' . $id . '.json';
    $replay = is_file($file);
    $fingerprint = hash('sha256', json_encode($input, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));
    if ($replay) {
        $lead = json_decode((string) file_get_contents($file), true);
        if (!is_array($lead) || !hash_equals((string) ($lead['fingerprint'] ?? ''), $fingerprint)) {
            flock($lock, LOCK_UN);
            fclose($lock);
            reply(['message' => 'Эта заявка уже принята с другими данными'], 409);
        }
    } else {
        $remote = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        $ipHash = hash('sha256', $remote);
        $rateFile = kotlyPrivatePath() . '/.rate-' . $ipHash;
        $current = time();
        $timestamps = is_file($rateFile) ? json_decode((string) file_get_contents($rateFile), true) : [];
        if (!is_array($timestamps)) $timestamps = [];
        $timestamps = array_values(array_filter($timestamps, fn($t) => is_int($t) && $t > $current - 60));
        if (count($timestamps) >= 10) {
            flock($lock, LOCK_UN);
            fclose($lock);
            reply(['message' => 'Слишком много запросов. Повторите через минуту.'], 429);
        }
        $timestamps[] = $current;
        file_put_contents($rateFile, json_encode($timestamps), LOCK_EX);
        chmod($rateFile, 0600);
        $lead = $input + [
            'lead_id' => 'KOT-' . gmdate('Ymd-His') . '-' . strtoupper(bin2hex(random_bytes(3))),
            'created_at' => gmdate('c'),
            'fingerprint' => $fingerprint,
            'delivery' => 'pending',
            'sent_at' => null,
        ];
        kotlyWriteLead($file, $lead);
    }
    // No duplicate emails on repeated browser submissions after a success.
    if ($lead['delivery'] !== 'sent') {
        try {
            kotlySendLead($lead, $config);
            $lead['delivery'] = 'sent';
            $lead['sent_at'] = gmdate('c');
            kotlyWriteLead($file, $lead);
        } catch (Throwable $mailError) {
            error_log('kotly.pro pending email ' . $lead['lead_id'] . ': ' . $mailError->getMessage());
            // It is safely persisted; retry.php can send again from cron.
        }
    }
    flock($lock, LOCK_UN);
    fclose($lock);
    reply([
        'lead_id' => $lead['lead_id'],
        'status' => 'accepted',
        'delivery' => $lead['delivery'],
        'replay' => $replay,
        'message' => $lead['delivery'] === 'sent' ? 'Сообщение принято почтовым сервером' : 'Заявка сохранена, доставка почты ожидает повторной попытки',
    ], $lead['delivery'] === 'sent' ? ($replay ? 200 : 201) : 202);
} catch (Throwable $error) {
    error_log('kotly.pro lead endpoint failure: ' . $error->getMessage());
    reply(['message' => 'Не удалось сохранить заявку. Повторите отправку позже.'], 503);
}
