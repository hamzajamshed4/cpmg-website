<?php
/**
 * CPMG shared form helpers for cPanel / PHP shared hosting.
 *
 * Every lead (booking, contact, careers) is emailed to the inbox below.
 * Change CPMG_INBOX or CPMG_FROM here in one place if the address changes.
 *
 * Why From is a domain address: on cPanel the mail server accepts local mail
 * from your own domain, so a From on @cpmanagementgroup.co.uk is far more
 * likely to deliver and pass SPF than a spoofed visitor address. The visitor
 * email goes in Reply-To so you can reply straight to them.
 */

const CPMG_INBOX = 'info@cpmanagementgroup.co.uk';
const CPMG_FROM  = 'no-reply@cpmanagementgroup.co.uk';

/** Send a JSON response the front end understands ({ ok: true|false }). */
function cpmg_json($ok, $extra = []) {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($ok ? 200 : 400);
    echo json_encode(array_merge(['ok' => (bool) $ok], $extra));
    exit;
}

/** Read a JSON POST body into an array. */
function cpmg_read_json() {
    $raw  = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

/** Strip newlines so no field can inject extra email headers. */
function cpmg_clean($value) {
    return trim(str_replace(["\r", "\n"], ' ', (string) $value));
}

/** Build a plain-text body from label => value pairs, skipping blanks. */
function cpmg_body($lines) {
    $body = '';
    foreach ($lines as $label => $value) {
        if ($value === '' || $value === null) {
            continue;
        }
        $body .= $label . ': ' . $value . "\n";
    }
    return $body;
}

/** Send a plain-text email to the CPMG inbox. */
function cpmg_send($subject, $lines, $replyTo = '') {
    $headers   = [];
    $headers[] = 'From: CPMG Website <' . CPMG_FROM . '>';
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    if ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }
    return mail(CPMG_INBOX, $subject, cpmg_body($lines), implode("\r\n", $headers));
}

/** Send an email with a single file attachment (used for careers CVs). */
function cpmg_send_with_attachment($subject, $lines, $replyTo, $attachment) {
    $boundary  = 'cpmg_' . bin2hex(random_bytes(8));
    $headers   = [];
    $headers[] = 'From: CPMG Website <' . CPMG_FROM . '>';
    if ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';

    $msg  = '--' . $boundary . "\r\n";
    $msg .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $msg .= cpmg_body($lines) . "\r\n";

    if ($attachment && isset($attachment['path']) && is_file($attachment['path'])) {
        $content = chunk_split(base64_encode(file_get_contents($attachment['path'])));
        $name    = cpmg_clean($attachment['name']);
        $msg .= '--' . $boundary . "\r\n";
        $msg .= 'Content-Type: application/octet-stream; name="' . $name . '"' . "\r\n";
        $msg .= "Content-Transfer-Encoding: base64\r\n";
        $msg .= 'Content-Disposition: attachment; filename="' . $name . '"' . "\r\n\r\n";
        $msg .= $content . "\r\n";
    }
    $msg .= '--' . $boundary . '--';

    return mail(CPMG_INBOX, $subject, $msg, implode("\r\n", $headers));
}
