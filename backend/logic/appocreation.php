<?php
require_once '../db/config.php'; 
$conn = connectDB(); 

// get data from post
$title = $_POST['input1'] ?? '';
$date = $_POST['input2'] ?? '';
$time = $_POST['input3'] ?? '';
$duration = $_POST['input4'] ?? '';
$location = $_POST['input5'] ?? '';

//INSERT appointment statement
$AppoSql = "INSERT INTO appointments (title, duration, location) VALUES (?, ?, ?)";
$stmt = $conn->prepare($AppoSql);
$stmt->bind_param("sss", $title, $duration, $location);
$stmt->execute();
//Get autoincrement ID
$appoID = $stmt->insert_id;
$stmt->close();

//INSERT date statement
$DateSql = "INSERT INTO date (date, beginn, appointment) VALUES (?, ?, ?)";
$stmt = $conn->prepare($DateSql);
$stmt->bind_param("sss", $date, $time, $appoID);
$stmt->execute();
$stmt->close();

$conn->close();
?>