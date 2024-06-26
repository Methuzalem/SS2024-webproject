<?php
require_once '../db/config.php'; 
$conn = connectDB(); 

// get data from post
$username = $_POST['input1'] ?? '';
$date = $_POST['input2'] ?? '';
$time = $_POST['input3'] ?? '';
$comment = $_POST['input4'] ?? '';
$appointmentID = $_POST['input5'] ?? '';
$dateTotal = "";

echo $date;

//get date ID for vote insert
$dateIdSQL = "SELECT date_ID FROM date WHERE appointment = ? AND date = ?";
$stmt = $conn->prepare($dateIdSQL);
$stmt->bind_param("ss", $appointmentID, $date);
$stmt->execute();
$result = $stmt->get_result();

$dateID = 0;

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $dateID = $row['date_ID'];
}

$stmt->close();

//INSERT values to vots
$votesSQL = "INSERT INTO votes (username, comment, date, appointment) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($votesSQL);
$stmt->bind_param("ssss", $username, $comment, $dateID, $appointmentID);
$stmt->execute();

$stmt->close();

$conn->close();
?>