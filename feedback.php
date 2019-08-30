<?php

define('TO_EMAIL', 'autoestetika.ua@gmail.com'); // email получателя
define('SENDER_EMAIL', 'info@prodetailing.com.ua'); // email отправителя (должен совпадать с реальным ящиком отправителя!)

$u_name = empty($_POST['name']) ? '' : addslashes(trim(strip_tags($_POST['name'])));
$u_phone = empty($_POST['phone']) ? '' : addslashes(trim(strip_tags($_POST['phone'])));
$u_org = empty($_POST['org']) ? '' : addslashes(trim(strip_tags($_POST['org'])));
$u_np = empty($_POST['np']) ? '' : addslashes(trim(strip_tags($_POST['np'])));

if (empty($u_name) && empty($u_phone))
    print FALSE;
else {
    $subject = "Новая заявка с сайта \"autoestetika.od.ua\"";

    $message = "
		<html>
			<head>
				<title>$subject</title>
			</head>
			<body>
				" . (empty($u_name) ? '' : '<b>Имя:</b> ' . $u_name . '<br>') . "
				" . (empty($u_phone) ? '' : '<b>Телефон:</b> ' . $u_phone . '<br>') . "
				" . (empty($u_org) ? '' : '<b>Организация:</b> ' . $u_org . '<br>') . "
				" . (empty($u_np) ? '' : '<b>Отделение НП:</b> ' . $u_np . '<br>') . "
			</body>
		</html>
	";

    $headers = array();
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-type: text/html; charset=utf-8";
    $headers[] = "From: Auto Estetika <" . SENDER_EMAIL . ">";
    $headers[] = "Reply-To: Auto Estetika <" . SENDER_EMAIL . ">";
    $headers[] = "Subject: $subject";
    $headers[] = "X-Mailer: PHP/" . phpversion();

    print mail(TO_EMAIL, $subject, $message, implode("\r\n", $headers));
}
