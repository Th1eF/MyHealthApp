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
$oldPassword = $_POST["oldPassword"];
$newPassword = $_POST["newPassword"];
$auth = $_POST["auth"];

$options = [
    'cost' => 12,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
];

$newPassword = password_hash($newPassword, PASSWORD_BCRYPT, $options);

$statement = "SELECT password FROM user WHERE auth = ?";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("s", $auth);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $storedPassword = $row['password'];
    }
    $stmt->free_result();
    if(password_verify($oldPassword, $storedPassword)){
        //Passwords match, set the new password
        $statement = "UPDATE user SET password = ? WHERE auth = ?";
        if($stmt = $link->prepare($statement)){
            $stmt->bind_param("ss", $newPassword, $auth);
            if(!$stmt->execute()) throw new Exception($stmt->error());
        }
    }else{
        throw new Exception($stmt->error());
    }
    $stmt->free_result();
    $stmt->close();
}
mysqli_close($link);