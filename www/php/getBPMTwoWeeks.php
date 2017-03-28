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
$date = date("M j Y", $datePast/1000);

$bpmArray = array();
$oneDay = 86400000;
$startTime = $datePast;
$endTime = $startTime+$oneDay;
$statement = "SELECT id FROM user WHERE auth = ?";
$tempTime = $datePast;
for($i = 0; $i < 14; $i++){
    $tempDate = date("M j, Y", $tempTime/1000);
    array_push($timeArray, $tempDate);
    $tempTime += $oneDay;
}
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("s", $auth);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $ID = $row['id'];
    }
    if($dummyMode == 'true') $ID = 'dummydata';
    $stmt->free_result();
    for($i = 0; $i < 14; $i++){
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
        $startTime += $oneDay;
        $endTime += $oneDay;
    }
    echo json_encode(array_combine($timeArray, $bpmArray));

    $stmt->close();
}
?>