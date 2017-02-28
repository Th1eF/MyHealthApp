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
$timestamp = $_POST["timestamp"];
$latitude = $_POST["latitude"];
$longitude = $_POST["longitude"];
$speed = $_POST["speed"];
$steps = $_POST["steps"];
$bpm = $_POST["bpm"];
$visit = $_POST["visit"];
$duration = $_POST["duration"];
$auth = $_POST["auth"];

$statement = "SELECT id FROM user WHERE auth = ?";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("s", $auth);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $ID = $row['id'];
    }
    $statement = "INSERT INTO `".$ID."` (timestamp, latitude, longitude, speed, steps, bpm, visit, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    if($stmt = $link->prepare($statement)){
        $stmt->bind_param("ssssssss", $timestamp, $latitude, $longitude, $speed, $steps, $bpm, $visit, $duration);
        $stmt->execute();
        $stmt->free_result();
        $stmt->close();
    }
    $stmt->free_result();
    $stmt->close();
}
mysqli_close($link);