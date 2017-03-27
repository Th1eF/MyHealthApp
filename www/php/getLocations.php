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

$statement = "SELECT id FROM user WHERE auth = ?";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("s", $auth);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $ID = $row['id'];
    }
    $visitsArray = array();
    $avgDurationArray = array();
    $visitCountArray = array();
    $statement = "SELECT visit, avg(DURATION) AS avgDuration, count(visit) AS visitCount FROM  `".$ID."` WHERE VISIT IS NOT NULL AND VISIT != '' GROUP BY VISIT";
    if($stmt = $link->prepare($statement)) {
        if (!$stmt->execute()) throw new Exception($stmt->error());
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            array_push($visitsArray, $row['visit']);
            array_push($avgDurationArray, $row['avgDuration']);
            array_push($visitCountArray, $row['visitCount']);
        }
    }

    $response = array();
    foreach($visitsArray as $key=>$value){
        array_push($response, array(
                $value => array(
                    'avgDuration' => $avgDurationArray[$key],
                    'totalVisits' => $visitCountArray[$key]
                ),
            )
        );
    }

    echo json_encode($response);
    $stmt->free_result();
    $stmt->close();
}
mysqli_close($link);