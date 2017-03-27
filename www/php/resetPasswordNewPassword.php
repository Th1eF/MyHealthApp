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
$newPassword = $_POST["newPassword"];

$options = [
    'cost' => 12,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
];

$newPassword = password_hash($newPassword, PASSWORD_BCRYPT, $options);

$statement = "UPDATE user SET password = ? WHERE email = ?";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("ss", $newPassword, $emailAddress);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $stmt->free_result();
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
    }
    $statement = "UPDATE user SET passwordResetToken = NULL, passwordResetTokenDate = NULL WHERE email = ?";
    if($stmt = $link->prepare($statement)){
        $stmt->bind_param("s", $emailAddress);
        if(!$stmt->execute()) throw new Exception($stmt->error());
        $stmt->free_result();
    }
    //E-Mail System
    //********************************************************
    require_once 'swiftmailer/lib/swift_required.php';

    $transport = Swift_SmtpTransport::newInstance("smtp.gmail.com", 465, "ssl")
        ->setUsername($emailSender)
        ->setPassword($emailPw);

    $mailer = Swift_Mailer::newInstance($transport);

    $message = Swift_Message::newInstance("MyHealthApp Password Reset")
        ->setFrom(array('web.health.noreply@gmail.com' => "MyHealthApp Account Support"))
        ->setTo(array($emailExists))
        ->setBody("Hello $firstName $lastName!\n\nYour password has been reset successfully.\nPlease sign in with your new password.\n\nIf this wasn't made by you, please report the issue immediately.");

    if(!$result = $mailer->send($message)) throw new Exception($stmt->error());

    //E-Mail System END
    //********************************************************

    $stmt->close();
}

?>