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

$auth = $_POST["auth"];
$currWeight = $_POST["currWeight"];
$goalWeight = $_POST["goalWeight"];
$goalSteps = $_POST["goalSteps"];
$statement = "UPDATE user SET currWeight = ?, goalWeight = ?, goalSteps = ? WHERE auth = ?";
if($stmt = $link->prepare($statement)) {
    $stmt->bind_param("ssss", $currWeight, $goalWeight, $goalSteps, $auth);
    if (!$stmt->execute()) throw new Exception($stmt->error());
    $stmt->free_result();
    $stmt->close();
}