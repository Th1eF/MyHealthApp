<?php

$serverIP = "138.197.130.124";
$loginName = "root";
$passwordDB = "[mysqlpassword123.";
$schema = "MyHealthApp";

// Create connection
$link = mysqli_connect($serverIP, $loginName, $passwordDB, $schema);
if (!$link) {
    exit;
}else{
    echo "Successful connection";
}
// Security stuff
$auth = bin2hex(openssl_random_pseudo_bytes(16));
$password = $_POST["password"];

$options = [
    'cost' => 12,
    'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
];

$password = password_hash($password, PASSWORD_BCRYPT, $options);

$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$emailAddress = $_POST["emailAddress"];

$statement = "INSERT INTO user (auth, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)";
if($stmt = $link->prepare($statement)){
    $stmt->bind_param("sssss", $auth, $firstName, $lastName, $emailAddress, $password);
    if(!$stmt->execute()) throw new Exception($stmt->error());
    $stmt->free_result();
    $statement = "SELECT id FROM user WHERE email = ?";
    if($stmt = $link->prepare($statement)){
        $stmt->bind_param("s", $emailAddress);
        if(!$stmt->execute()) throw new Exception($stmt->error());
        $result = $stmt->get_result();
        while($row = $result->fetch_assoc()){
            $ID = $row['id'];
        }
        $createTable = "CREATE TABLE `".$ID."` ( ".
            "timestamp VARCHAR(255) NOT NULL, ".
            "latitude VARCHAR(255) NOT NULL, ".
            "longitude VARCHAR(255) NOT NULL, ".
            "speed VARCHAR(255) NOT NULL, ".
            "steps VARCHAR(255) NOT NULL, ".
            "bpm VARCHAR(255) NULL DEFAULT NULL, ".
            "visit VARCHAR(255) NULL DEFAULT NULL, ".
            "duration VARCHAR(255) NULL DEFAULT NULL, ".
            "PRIMARY KEY (timestamp))";
        $stmt->free_result();
        if($stmt = $link->prepare($createTable)){
            if(!$stmt->execute()) $stmt->error();
            $stmt->free_result();
        }
    }
    $stmt->close();
}

mysqli_close($link);