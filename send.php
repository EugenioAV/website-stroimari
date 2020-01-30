<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'side_packages/phpmailer/Exception.php';
require 'side_packages/phpmailer/SMTP.php';
require 'side_packages/phpmailer/PHPMailer.php';

$name = $_POST['name'];
$phone = $_POST['phone'];
$text = $_POST['text'];

$mail = new PHPMailer(true);

try {
    $msg = "ok";
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;

    $mail->Host       = 'host';
    $mail->Username   = 'username';
    $mail->Password   = 'password';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('email', 'name');

    $mail->addAddress('email');
    $mail->isHTML(true);

    $mail->Subject = 'Письмо с сайта строймари.рф';
    $mail->Body    = "<b>Имя:</b> $name <br>  <b>Телефон:</b> $phone<br><br> <b>Сообщение:</b><br>$text";

    if ($mail->send()) {
        echo "$msg";
    } else {
        echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты";
    }
} catch (Exception $e) {
    echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
