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
$auth = bin2hex(openssl_random_pseudo_bytes(16));
$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$emailAddress = $_POST["emailAddress"];
$password = $_POST["password"];

$statement = "INSERT INTO user (auth, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("sssss", $auth, $firstName, $lastName, $emailAddress, $password);
    $stmt->execute();
    $stmt->free_result();
    $stmt->close();
}

mysqli_close($link);