<?php
require __DIR__ . '/_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    cpmg_json(false, ['message' => 'Method not allowed.']);
}

$d = cpmg_read_json();

// Honeypot
if (!empty($d['companyWebsite'])) {
    cpmg_json(true);
}

$name  = cpmg_clean($d['name'] ?? '');
$email = cpmg_clean($d['email'] ?? '');

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    cpmg_json(false, ['message' => 'A name and valid email are required.']);
}

// Email every submitted field except internal/honeypot keys.
$skip  = ['companyWebsite', 'consent', 'status', 'createdAt'];
$lines = [];
foreach ($d as $key => $value) {
    if (in_array($key, $skip, true) || is_array($value)) {
        continue;
    }
    $label = ucfirst(preg_replace('/(?<!^)([A-Z])/', ' $1', $key));
    $lines[$label] = cpmg_clean($value);
}
$lines['Submitted'] = date('Y-m-d H:i:s');

$ok = cpmg_send('New website enquiry from ' . $name, $lines, $email);

if ($ok) {
    cpmg_json(true);
}
cpmg_json(false, ['message' => 'The email could not be sent. Please try again.']);
