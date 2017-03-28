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

$date = new DateTime();
//Take two weeks off
$timestamp = (($date->getTimestamp())*1000) - 1209600000;
$oneHour = 3600000;
$tenMin = 600000;

$possibleVisits = array('McDonalds', 'Tim Hortons', 'Lakehead Gym', 'Calicos', 'Outpost');
$possibleDurations = array(30, 60, 90, 120, 150, 180, 210);

$statement = "INSERT INTO `dummydata` (timestamp, latitude, longitude, speed, steps, bpm, visit, duration) VALUES (?,?,?,?,?,?,?,?)";
//Loops for two weeks of time using tenmin segments as an iteration
$dummySteps = 0;
for($i = 0; $i < 2016; $i++){
    //timestamp
    $dummyTime = $timestamp + ($i*$tenMin);
    $dummyLat = 'dummyLat';
    $dummyLong = 'dummyLong';
    $dummySpeed = 'dummySpeed';
    $dummySteps += rand(1, 100);
    $dummyBPM = rand(60, 140);
    //Only 25% chance of a visit occurring
    $visitChance = rand(1,100);
    if($visitChance <= 25){
        $dummyVisit = $possibleVisits[array_rand($possibleVisits, 1)];
        $dummyDur = $possibleDurations[array_rand($possibleDurations, 1)];
    }else{
        $dummyVisit = '';
        $dummyDur = '';
    }
    if($stmt = $link->prepare($statement)){
        $stmt->bind_param("ssssssss", $dummyTime, $dummyLat, $dummyLong, $dummySpeed, $dummySteps, $dummyBPM, $dummyVisit, $dummyDur);
        if(!$stmt->execute()) throw new Exception($stmt->error());
        $stmt->free_result();
        $stmt->close();
    }
}
echo 'done';