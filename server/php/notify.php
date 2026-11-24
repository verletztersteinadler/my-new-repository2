<?php
declare(strict_types=1);

/**
 * Server-only functions. This file lives in /api/v1/_server/ and is denied
 * from HTTP by Apache. Credentials and saved submissions are one directory
 * ABOVE the vhost document root, not in the ZIP.
 */
function kotlyPrivatePath(): string
{
    $root = realpath(dirname(__DIR__, 3));
    if ($root === false) {
        throw new RuntimeException('Document root not found');
    }
    return dirname($root) . '/kotly-private';
}

function kotlyMailConfig(): ?array
{
    $path = kotlyPrivatePath() . '/mail-config.php';
    if (!is_file($path) || !is_readable($path)) {
        return null;
    }
    $value = require $path;
    if (!is_array($value)) {
        return null;
    }
    $password = (string) ($value['smtp_password'] ?? '');
    if (
        $password === '' ||
        $password === 'REPLACE_WITH_PASSWORD_IN_ISPMANAGER_ONLY' ||
        !in_array((int) ($value['smtp_port'] ?? 0), [465, 587], true) ||
        !in_array((string) ($value['smtp_secure'] ?? ''), ['ssl', 'tls'], true) ||
        !filter_var($value['smtp_user'] ?? '', FILTER_VALIDATE_EMAIL) ||
        !filter_var($value['recipient'] ?? '', FILTER_VALIDATE_EMAIL)
    ) {
        return null;
    }
    $value['smtp_host'] = trim((string) ($value['smtp_host'] ?? ''));
    if (!preg_match('/^[a-z0-9.-]+$/i', $value['smtp_host'])) {
        return null;
    }
    return $value;
}

function kotlyWriteLead(string $path, array $lead): void
{
    $json = json_encode($lead, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR);
    $temp = $path . '.tmp-' . bin2hex(random_bytes(5));
    if (file_put_contents($temp, $json . "\n", LOCK_EX) === false) {
        throw new RuntimeException('Could not save lead');
    }
    chmod($temp, 0600);
    if (!rename($temp, $path)) {
        @unlink($temp);
        throw new RuntimeException('Could not finalize lead');
    }
}

function kotlySendLead(array $lead, array $config): void
{
    $loader = __DIR__ . '/vendor/autoload.php';
    if (!is_file($loader)) {
        throw new RuntimeException('Mail transport library unavailable');
    }
    require_once $loader;

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->Port = (int) $config['smtp_port'];
    $mail->SMTPAuth = true;
    $mail->Username = (string) $config['smtp_user'];
    $mail->Password = (string) $config['smtp_password'];
    $mail->SMTPSecure = $config['smtp_secure'] === 'ssl'
        ? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPAutoTLS = false;
    $mail->Timeout = 12;
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    $mail->setFrom($config['smtp_user'], 'kotly.pro | Заявки');
    $mail->addAddress($config['recipient']);
    if (!empty($lead['email']) && filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($lead['email'], $lead['name']);
    }
    $mail->isHTML(false);
    $mail->Subject = 'Новая инженерная заявка kotly.pro | ' . $lead['lead_id'];
    $mail->MessageID = '<' . preg_replace('/[^a-zA-Z0-9-]/', '', $lead['lead_id']) . '@kotly.pro>';
    $fields = [
        'Номер' => $lead['lead_id'],
        'Дата (UTC)' => $lead['created_at'],
        'Имя' => $lead['name'],
        'Телефон' => $lead['phone'],
        'Email' => $lead['email'],
        'Организация' => $lead['organization'],
        'Город' => $lead['city'],
        'Комментарий' => $lead['comment'],
        'Серия (ID)' => $lead['series_id'],
        'Типоразмер (ID)' => $lead['size_id'],
        'Категория' => $lead['category_id'],
        'Страница' => $lead['page_url'],
        'Согласие' => $lead['consent_version'],
    ];
    $message = "Новая заявка с kotly.pro\n\n";
    foreach ($fields as $label => $value) {
        $message .= $label . ': ' . (string) $value . "\n";
    }
    $mail->Body = $message;
    if (!$mail->send()) {
        throw new RuntimeException('Mail server did not accept message');
    }
}
