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

$emailAddress = $_POST["emailAddress"];

$tempPassword = md5(time());

$options = [
    'cost' => 12,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
];
//TODO Finish assigning a temporary password (1 time use) in database for the user once email verified
$newPassword = password_hash($tempPassword, PASSWORD_BCRYPT, $options);

$statement = "SELECT email, firstName, lastName FROM user WHERE email = ?";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("s", $emailAddress);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $emailExists = $row['email'];
        $firstName = $row['firstName'];
        $lastName = $row['lastName'];
    }
    if(!$emailExists) throw new Exception($stmt->error());
    //E-Mail System
    //********************************************************
    require_once 'swiftmailer/lib/swift_required.php';

    $transport = Swift_SmtpTransport::newInstance("smtp.gmail.com", 465, "ssl")
        ->setUsername($emailSender)
        ->setPassword($emailPw);

    $mailer = Swift_Mailer::newInstance($transport);

    $message = Swift_Message::newInstance("MyHealthApp Password Reset Request")
        ->setFrom(array('web.health.noreply@gmail.com' => "MyHealthApp Account Support"))
        ->setTo(array($emailExists))
        ->setBody("Hello $firstName $lastName!\n\nWe have noticed that you requested to reset your password.\nIf this request wasn't made by you, please ignore this email and report the issue.\n\nUse this temporary password to login: $tempPassword\n\nPlease change your password immediately after logging in by following the instructions.");

    if(!$result = $mailer->send($message)) throw new Exception($stmt->error());

    //E-Mail System END
    //********************************************************
    $statement = "UPDATE user SET passwordResetToken = ?, passwordResetTokenDate = ? WHERE email = ?";
    if($stmt = $link->prepare($statement)){
        $stmt->bind_param("sss", $tempPassword, time(), $emailExists);
        if(!$stmt->execute()) throw new Exception($stmt->error());
        $stmt->free_result();
    }
    $stmt->free_result();
    $stmt->close();
}