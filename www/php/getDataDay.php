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

$datePast = $_GET["datePast"];
$dateCurr = $_GET["dateCurr"];
$auth = $_GET["auth"];

$timeArray = array();
$startHour = date("g", $datePast/1000);
$meridiem = strtoupper(date("a", $datePast/1000));

$hoursTo12 = 12 - $startHour;
if($hoursTo12 > 0){
    for($i = 0; $i < $hoursTo12; $i++){
        array_push($timeArray, $startHour.' '.$meridiem);
        $startHour++;
        if($startHour % 12 == 0){
            $startHour = 12;
        }else{
            $startHour = $startHour % 12;
        }
    }
    if($meridiem == "PM"){
        $meridiem = "AM";
        for($i = 0; $i < 12; $i++){
            array_push($timeArray, $startHour.' '.$meridiem);
            $startHour++;
            if($startHour % 12 == 0){
                $startHour = 12;
            }else{
                $startHour = $startHour % 12;
            }
        }
    }else{
        $meridiem = "PM";
        for($i = 0; $i < 12; $i++){
            array_push($timeArray, $startHour.' '.$meridiem);
            $startHour++;
            if($startHour % 12 == 0){
                $startHour = 12;
            }else{
                $startHour = $startHour % 12;
            }
        }
    }
    if($meridiem == "PM"){
        $meridiem = "AM";
    }else{
        $meridiem = "PM";
    }
    for($i = 0; $i < 12 - $hoursTo12; $i++){
        array_push($timeArray, $startHour.' '.$meridiem);
        $startHour++;
        if($startHour % 12 == 0){
            $startHour = 12;
        }else{
            $startHour = $startHour % 12;
        }
    }
}else{
    for($i = 0; $i < 12; $i++){
        array_push($timeArray, $startHour.' '.$meridiem);
        $startHour++;
        if($startHour % 12 == 0){
            $startHour = 12;
        }else{
            $startHour = $startHour % 12;
        }
    }
    if($meridiem == "PM"){
        $meridiem = "AM";
    }else{
        $meridiem = "PM";
    }
    for($i = 0; $i < 12; $i++){
        array_push($timeArray, $startHour.' '.$meridiem);
        $startHour++;
        if($startHour % 12 == 0){
            $startHour = 12;
        }else{
            $startHour = $startHour % 12;
        }
    }
}

$stepsArray = array();
$oneHour = 3600000;
$startTime = $datePast;
$endTime = $startTime+$oneHour;
$statement = "SELECT id FROM user WHERE auth = ?";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("s", $auth);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $ID = $row['id'];
    }
    $stmt->free_result();
    for($i = 0; $i < 24; $i++){
        $stepsLast = 0;
        $stepsFirst = 0;
        $getStepsFirst = "SELECT steps FROM `".$ID."` WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp ASC LIMIT 1";
        if($stmt = $link->prepare($getStepsFirst)){
            $stmt->bind_param("ss", $startTime, $endTime);
            if(!$stmt->execute()) throw new Exception($stmt->error());
            $result = $stmt->get_result();
            while($row = $result->fetch_assoc()){
                $stepsFirst = $row['steps'];
            }
            $stmt->free_result();
        }
        $getStepsLast = "SELECT steps FROM `".$ID."` WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp DESC LIMIT 1";
        if($stmt = $link->prepare($getStepsLast)){
            $stmt->bind_param("ss", $startTime, $endTime);
            if(!$stmt->execute()) throw new Exception($stmt->error());
            $result = $stmt->get_result();
            while($row = $result->fetch_assoc()){
                $stepsLast = $row['steps'];
            }
            $stmt->free_result();
        }
        $stepsDiff = $stepsLast - $stepsFirst;
        array_push($stepsArray, $stepsDiff);
        $startTime += $oneHour;
        $endTime += $oneHour;
    }
    echo json_encode(array_combine($timeArray, $stepsArray));

    $stmt->close();
}
?>