<?php
require __DIR__ . '/_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    cpmg_json(false, ['message' => 'Method not allowed.']);
}

// This form posts multipart/form-data (it can include a CV), so read $_POST/$_FILES.
if (!empty($_POST['companyWebsite'])) {
    cpmg_json(true);
}

$name  = cpmg_clean($_POST['name'] ?? ($_POST['fullName'] ?? ''));
$email = cpmg_clean($_POST['email'] ?? '');

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    cpmg_json(false, ['message' => 'A name and valid email are required.']);
}

$skip  = ['companyWebsite', 'consent', 'privacyConsent', 'status', 'createdAt'];
$lines = [];
foreach ($_POST as $key => $value) {
    if (in_array($key, $skip, true) || is_array($value)) {
        continue;
    }
    $label = ucfirst(preg_replace('/(?<!^)([A-Z])/', ' $1', $key));
    $lines[$label] = cpmg_clean($value);
}
$lines['Submitted'] = date('Y-m-d H:i:s');

$attachment = null;
if (!empty($_FILES['cvFile']) && $_FILES['cvFile']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['cvFile'];
    $ext  = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, ['pdf', 'doc', 'docx'], true)) {
        cpmg_json(false, ['message' => 'CV must be a PDF, DOC or DOCX file.']);
    }
    if ($file['size'] > 5 * 1024 * 1024) {
        cpmg_json(false, ['message' => 'CV must be under 5MB.']);
    }
    $attachment = ['path' => $file['tmp_name'], 'name' => basename($file['name'])];
}

if ($attachment) {
    $ok = cpmg_send_with_attachment('New careers application: ' . $name, $lines, $email, $attachment);
} else {
    $ok = cpmg_send('New careers application: ' . $name, $lines, $email);
}

if ($ok) {
    cpmg_json(true);
}
cpmg_json(false, ['message' => 'The email could not be sent. Please try again.']);
