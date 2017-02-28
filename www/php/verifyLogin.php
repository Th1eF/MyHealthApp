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

$emailAddress = $_GET["emailAddress"];
$password = $_GET["password"];

$statement = "SELECT password FROM user WHERE email = ?";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("s", $emailAddress);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $storedPassword = $row['password'];
    }
    $stmt->free_result();
    if(password_verify($password, $storedPassword)){
        $auth = bin2hex(openssl_random_pseudo_bytes(16));
        //Update new auth token
        $statement = "UPDATE user SET auth = ? WHERE email = ?";
        if($stmt = $link->prepare($statement)){
            $stmt->bind_param("ss", $auth, $emailAddress);
            if(!$stmt->execute()) throw new Exception($stmt->error());
            $stmt->free_result();
        }
        $statement = "SELECT auth, firstName, lastName FROM user WHERE email = ?";
        if($stmt = $link->prepare($statement)){
            $stmt->bind_param("s", $emailAddress);
            if(!$stmt->execute()) throw new Exception($stmt->error());
            $result = $stmt->get_result();
            while($row = $result->fetch_assoc()){
                echo json_encode(array(
                    'user' => array(
                        'auth' => $row['auth'],
                        'firstName' => $row['firstName'],
                        'lastName' => $row['lastName']
                    )
                ));
            }
        }
    }else{
        throw new Exception($stmt->error());
    }
    $stmt->free_result();
    $stmt->close();
}

mysqli_close($link);