<?php

$serverName = "138.197.130.124";
$loginName = "root";
$password = "[mysqlpassword123.";
$database = "grad_seminar";

// Create connection
$link = mysqli_connect($serverName, $loginName, $password, $database);
if (!$link) {
    exit;
}else{
    echo "Successful connection";
}
$timestamp = $_POST["timestamp"];
$latitude = $_POST["latitude"];
$longitude = $_POST["longitude"];
$speed = $_POST["speed"];
$steps = $_POST["steps"];
$bpm = $_POST["bpm"];
$visit = $_POST["visit"];
$duration = $_POST["duration"];

$statement = "INSERT INTO user_info (timestamp, latitude, longitude, speed, steps, bpm, visit, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("ssssssss", $timestamp, $latitude, $longitude, $speed, $steps, $bpm, $visit, $duration);
    $stmt->execute();
    $stmt->free_result();
    $stmt->close();
}

mysqli_close($link);