<?php

$serverIP = "138.197.130.124";
$loginName = "root";
$passwordDB = "[mysqlpassword123.";
$schema = "MyHealthApp";
$emailSender = "web.health.noreply@gmail.com";
$emailPw = "[p455w0rdw3bh34lth";

// Create connection
$link = mysqli_connect($serverIP, $loginName, $passwordDB, $schema);
if (!$link) {
    exit;
}

$resetToken = $_POST["resetToken"];

$statement = "SELECT passwordResetToken, passwordResetTokenDate FROM user WHERE email = ?";