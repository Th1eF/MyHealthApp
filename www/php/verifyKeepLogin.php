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

$auth = $_GET["authToken"];
$emailAddress = $_GET["emailAddress"];

$statement = "SELECT auth, firstName, lastName FROM user WHERE email = ?";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("s", $emailAddress);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $storedAuth = $row['auth'];
        $firstName = $row['firstName'];
        $lastName = $row['lastName'];
    }
    if($auth !== $storedAuth){
        throw new Exception($stmt->error());
    }else{
        echo json_encode(array(
            'user' => array(
                'firstName' => $firstName,
                'lastName' => $lastName
            )
        ));
    }
    $stmt->free_result();
    $stmt->close();
}

mysqli_close($link);