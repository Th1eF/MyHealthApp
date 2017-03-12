<?php

$serverIP = "138.197.130.124";
$loginName = "root";
$passwordDB = "[mysqlpassword123.";
$schema = "MyHealthApp";

// Create connection
$link = mysqli_connect($serverIP, $loginName, $passwordDB, $schema);
if (!$link) {
    exit;
}

$emailAddress = $_POST["emailAddress"];
$token = $_POST["token"];

$statement = "SELECT passwordResetToken, passwordResetTokenDate FROM user WHERE email = ?";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("s", $emailAddress);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $passwordResetToken = $row['passwordResetToken'];
        $passwordResetTokenDate = $row['passwordResetTokenDate'];
    }
    $stmt->free_result();
    if(!(password_verify($token, $passwordResetToken)) && (time() - $passwordResetTokenDate <= 1800)) throw new Exception($stmt->error());

    $stmt->close();
}

?>