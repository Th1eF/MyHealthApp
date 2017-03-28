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

$stepsArray = array();
$oneDay = 86400000;
$startTime = $datePast;
$endTime = $startTime+$oneDay;
$statement = "SELECT id FROM user WHERE auth = ?";
$tempTime = $datePast;
for($i = 0; $i < 7; $i++){
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
    for($i = 0; $i < 7; $i++){
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
        $startTime += $oneDay;
        $endTime += $oneDay;
    }
    echo json_encode(array_combine($timeArray, $stepsArray));

    $stmt->close();
}
?>