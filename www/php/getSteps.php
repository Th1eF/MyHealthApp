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

$auth = $_GET["auth"];

$statement = "SELECT goalSteps FROM user WHERE auth = ?";
if($stmt = $link->prepare($statement)) {
    $stmt->bind_param("s", $auth);
    if (!$stmt->execute()) throw new Exception($stmt->error());
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $steps = $row['goalSteps'];
    }
    echo json_encode($steps);
    $stmt->free_result();
    $stmt->close();
}