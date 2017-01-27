<?php

$serverName = "138.197.130.124";
$loginName = "root";
$password = "[mysqlpassword123.";
$database = "grad_seminar";

// Create connection
$link = mysqli_connect($serverName, $loginName, $password, $database);
if (!$link) {
    exit;
}

/*
$bpmStatement = "SELECT DISTINCT bpm, AVG(bpm) AS avgBPM FROM user_info WHERE timestamp >= 1479163093000 AND timestamp <= 1479254879639 AND bpm != ''";

$mcStatement = "SELECT visit, AVG(duration) AS McDur, COUNT(*) AS totalVisits FROM user_info WHERE timestamp >= 1479163093000 AND timestamp <= 1479254879639 AND visit = 'McDonalds'";

$luStatement = "SELECT visit, AVG(duration) AS luDur, COUNT(*) AS totalVisits FROM user_info WHERE timestamp >= 1479163093000 AND timestamp <= 1479254879639 AND visit = 'Lakehead Hangar'";
*/

$datePast = $_GET["datePast"];
$dateCurr = $_GET["dateCurr"];

//$datePast = '1479163093000';
//$dateCurr = '1479254879639';

$bpmAvg;
$bpmStatement = "SELECT DISTINCT bpm, AVG(bpm) AS avgBPM FROM user_info WHERE timestamp >= ? AND timestamp <= ? AND bpm != ''";

$mcVisits;
$mcAvg;
$mcStatement = "SELECT visit, AVG(duration) AS McDur, COUNT(*) AS totalVisits FROM user_info WHERE timestamp >= ? AND timestamp <= ? AND visit = 'McDonalds'";

$luVisits;
$luAvg;
$luStatement = "SELECT visit, AVG(duration) AS luDur, COUNT(*) AS totalVisits FROM user_info WHERE timestamp >= ? AND timestamp <= ? AND visit = 'Lakehead Hangar'";

$stepsLast;
$stepsCurr;
$stepsStatement = "SELECT steps FROM user_info WHERE timestamp = ? OR timestamp = ?";

if($stmt = $link->prepare($bpmStatement)){
    $stmt->bind_param("ss", $datePast, $dateCurr);
    $stmt->execute();
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $bpmAvg = $row['avgBPM'];
    }
    $stmt->free_result();
    $stmt->close();
}

if($stmt = $link->prepare($mcStatement)){
    $stmt->bind_param("ss", $datePast, $dateCurr);
    $stmt->execute();
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $mcVisits = $row['totalVisits'];
        $mcAvg = $row['McDur'];
    }
    $stmt->free_result();
    $stmt->close();
}

if($stmt = $link->prepare($luStatement)){
    $stmt->bind_param("ss", $datePast, $dateCurr);
    $stmt->execute();
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $luVisits = $row['totalVisits'];
        $luAvg = $row['luDur'];
    }
    $stmt->free_result();
    $stmt->close();
}

/*
if($stmt = $link->prepare($stepsStatement)){
    $stmt->bind_param("ss", $datePast, $dateCurr);
    $stmt->execute();
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $stepsCurr = $row['steps'];
        $stepsLast = $row['steps'];
    }
    $stmt->free_result();
    $stmt->close();
}
*/



echo json_encode(array(
    'McDonalds' => array(
        'totalVisits' => $mcVisits,
        'avgDuration' => $mcAvg
    ),
    'Lakehead Hangar' => array(
        'totalVisits' => $luVisits,
        'avgDuration' => $luAvg
    ),
    'Heart Rate' => array(
        'BPMAvg' => $bpmAvg
    ),/*
    'Steps' => array(
        'StepsCurr' => $stepsCurr,
        'StepsLast' => $stepsLast
    ),*/
));
/*if($mcVisits && $mcAvg){
    $mcObj = (object)[
        'Name' => 'McDonalds',
        'totalVisits' => $mcVisits,
        'avgDuration' => $mcAvg
    ];
    echo json_encode($mcObj);
}else{
    echo "False";
}*/

mysqli_close($link);