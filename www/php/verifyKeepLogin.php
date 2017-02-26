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

$auth = $_POST["authToken"];
$emailAddress = $_POST["emailAddress"];

$statement = "SELECT auth FROM user WHERE email = ?";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("s", $emailAddress);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $storedAuth = $row['auth'];
    }
    if($auth !== $storedAuth) throw new Exception($stmt->error());
    $stmt->free_result();
    $stmt->close();
}

mysqli_close($link);