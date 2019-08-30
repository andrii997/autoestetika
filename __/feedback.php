<?php

require 'config.php';

$u_name = empty($_POST['name']) ? '' : addslashes(trim(strip_tags($_POST['name'])));
$u_phone = empty($_POST['phone']) ? '' : addslashes(trim(strip_tags($_POST['phone'])));
$u_email = empty($_POST['email']) ? '' : addslashes(trim(strip_tags($_POST['email'])));
$u_comment = empty($_POST['comment']) ? '' : addslashes(trim(strip_tags($_POST['comment'])));

if (empty($u_name) && empty($u_phone))
	print FALSE;
else {
	$subject = "Новая заявка с сайта \"" . SITE_NAME . "\"";

	$message = "
		<html>
			<head>
				<title>$subject</title>
			</head>
			<body>
				" . (empty($u_name) ? '' : '<b>Имя:</b> ' . $u_name . '<br>') . "
				" . (empty($u_phone) ? '' : '<b>Телефон:</b> ' . $u_phone . '<br>') . "
				" . (empty($u_email) ? '' : '<b>EMail:</b> ' . $u_email . '<br>') . "
				" . (empty($u_comment) ? '' : '<b>Комментарий:</b><br>' . $u_comment . '<br>') . "
			</body>
		</html>
	";

	$headers = array();
	$headers[] = "MIME-Version: 1.0";
	$headers[] = "Content-type: text/html; charset=utf-8";
	$headers[] = "From: " . SENDER_NAME . " <" . SENDER_EMAIL . ">";
	$headers[] = "Reply-To: " . SENDER_NAME . " <" . SENDER_EMAIL . ">";
	$headers[] = "Subject: $subject";
	$headers[] = "X-Mailer: PHP/" . phpversion();

	print mail(TO_EMAIL, $subject, $message, implode("\r\n", $headers));
}
