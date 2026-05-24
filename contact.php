<?php
mb_language('Japanese');
mb_internal_encoding('UTF-8');
header('Content-Type: application/json; charset=UTF-8');

$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    echo json_encode(['success' => false, 'message' => '未入力の項目があります']);
    exit;
}

$to      = 'craftiv.info@gmail.com';
$subject = '【NEXUS CREATIVE】お問い合わせ';
$body    = "お名前：{$name}\nメール：{$email}\n内容：{$message}";
$headers = "From: noreply@nexus-creative.jp\r\nReply-To: {$email}";

$result = mb_send_mail($to, $subject, $body, $headers);

echo json_encode(['success' => (bool)$result, 'message' => $result
    ? '送信が完了しました'
    : '送信に失敗しました'
]);