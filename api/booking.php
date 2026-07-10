<?php
require __DIR__ . '/_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    cpmg_json(false, ['message' => 'Method not allowed.']);
}

$d = cpmg_read_json();

// Honeypot: bots fill this hidden field. Pretend success, send nothing.
if (!empty($d['companyWebsite'])) {
    cpmg_json(true);
}

$name  = cpmg_clean($d['name'] ?? '');
$email = cpmg_clean($d['email'] ?? '');

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    cpmg_json(false, ['message' => 'A name and valid email are required.']);
}

$service = cpmg_clean($d['serviceRequired'] ?? 'Service');

$ok = cpmg_send('New booking request: ' . $service, [
    'Service'        => $service,
    'Name'           => $name,
    'Email'          => $email,
    'Phone'          => cpmg_clean($d['phone'] ?? ''),
    'Address'        => cpmg_clean($d['address'] ?? ''),
    'Postcode'       => cpmg_clean($d['postcode'] ?? ''),
    'Property type'  => cpmg_clean($d['propertyType'] ?? ''),
    'Preferred date' => cpmg_clean($d['preferredDate'] ?? ''),
    'Preferred time' => cpmg_clean($d['preferredTime'] ?? ''),
    'Urgency'        => cpmg_clean($d['urgency'] ?? ''),
    'Job details'    => cpmg_clean($d['message'] ?? ''),
    'Source page'    => cpmg_clean($d['sourcePage'] ?? ''),
    'Submitted'      => date('Y-m-d H:i:s'),
], $email);

if ($ok) {
    cpmg_json(true);
}
cpmg_json(false, ['message' => 'The email could not be sent. Please try again.']);
