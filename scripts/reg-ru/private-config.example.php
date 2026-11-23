<?php
/**
 * EXAMPLE ONLY. Do not upload this file into /www/kotly.pro/.
 *
 * In ISPmanager create /www/kotly-pro-private/ alongside /www/kotly.pro/,
 * set directory permissions 700 (if supported), and create config.php there.
 * The lead receiver at /www/kotly.pro/api/v1/leads/index.php will then load it.
 *
 * Never put a mailbox password in this file. PHP mail() is used without SMTP credentials.
 */
return [
    // Keep OFF until the operator and published privacy/consent text are approved.
    'enabled' => false,
    'privacy_approved' => false,
    'operator_name' => 'Малыгина Арина Дмитриевна', // физическое лицо — оператор
    'operator_contact' => 'info@kotly.pro', // по вопросам персональных данных
    'operator_postal_address' => '', // получить у оператора до утверждения
    'recipient' => 'info@kotly.pro', // Destination provided for lead notifications
    'sender' => 'info@kotly.pro',  // действующий ящик домена
    'notify_by_email' => false,  // Switch to true ONLY after testing mail delivery
    'policy_version' => 'kotly-consent-draft-2026-11-23', // final version before approval
    'rate_secret' => '',         // Generate >=32 random characters; never publish
];
