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
    'operator_name' => '',       // Legal entity or individual acting as data controller
    'operator_contact' => '',    // Valid privacy contact e-mail
    'recipient' => '',           // Where lead notifications should be sent
    'sender' => 'no-reply@kotly.pro', // Must be a real/authorized mailbox on this domain
    'policy_version' => 'kotly-consent-draft-2026-11-15', // Update in site + backend after approval
    'rate_secret' => '',         // Generate >=32 random characters; never publish
];
