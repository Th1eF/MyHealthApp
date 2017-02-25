<?php

$serverIP = "138.197.130.124";
$loginName = "root";
$passwordDB = "[mysqlpassword123.";
$schema = "MyHealthApp";

// Create connection
$link = mysqli_connect($serverIP, $loginName, $passwordDB, $schema);
if (!$link) {
    exit;
}else{
    echo "Successful connection";
}
// Security stuff
$auth = bin2hex(openssl_random_pseudo_bytes(16));
$password = $_POST["password"];
$passwordSalt = mcrypt_create_iv(22, MCRYPT_DEV_URANDOM);

$options = [
    'cost' => 12,
    'salt' => $passwordSalt,
];

$password = password_hash($password, PASSWORD_BCRYPT, $options);

$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$emailAddress = $_POST["emailAddress"];

$statement = "INSERT INTO user (auth, firstName, lastName, email, password, passwordSalt) VALUES (?, ?, ?, ?, ?, ?)";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("ssssss", $auth, $firstName, $lastName, $emailAddress, $password, $passwordSalt);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $stmt->free_result();
    $stmt->close();
}

mysqli_close($link);