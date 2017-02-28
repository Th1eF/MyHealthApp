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

$statement = "UPDATE user SET auth = ? WHERE email = ?";
if($stmt = $link->prepare($statement)){
    $auth = bin2hex(openssl_random_pseudo_bytes(16));
    $stmt->bind_param("ss", $auth, $emailAddress);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $stmt->free_result();
    $stmt->close();
}

mysqli_close($link);