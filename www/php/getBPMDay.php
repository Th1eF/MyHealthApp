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
$auth = $_GET["auth"];
$dummyMode = $_GET["dummyMode"];

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

$bpmArray = array();
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
    if($dummyMode == 'true') $ID = 'dummydata';
    $stmt->free_result();
    for($i = 0; $i < 24; $i++){
        $bpmLast = 0;
        $bpmFirst = 0;
        $getBPMAvg = "SELECT round(avg(bpm)) AS avgBPM FROM `".$ID."` WHERE bpm IS NOT NULL and bpm != '' and timestamp between ? and ?";
        if($stmt = $link->prepare($getBPMAvg)){
            $stmt->bind_param("ss", $startTime, $endTime);
            if(!$stmt->execute()) throw new Exception($stmt->error());
            $result = $stmt->get_result();
            while($row = $result->fetch_assoc()){
                $bpmAVG = $row['avgBPM'];
            }
            $stmt->free_result();
        }

        array_push($bpmArray, $bpmAVG);
        $startTime += $oneHour;
        $endTime += $oneHour;
    }
    echo json_encode(array_combine($timeArray, $bpmArray));

    $stmt->close();
}
?>