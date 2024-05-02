<?php
require_once '../db/config.php'; 
$conn = connectDB(); 

// get data from post
$username = $_POST['input1'] ?? '';
$date = $_POST['input2'] ?? '';
$time = $_POST['input3'] ?? '';
$comment = $_POST['input4'] ?? '';
$appointmentID = $_POST['input5'] ?? '';




echo "Hello ".$username." is here!";
echo "Hello ".$date." is here!";
echo "Hello ".$time." is here!";
echo "Hello ".$comment." is here!";
echo "Hello ".$appointmentID." is here!";







$conn->close();
?>