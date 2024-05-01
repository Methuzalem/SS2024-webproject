<?php
require_once '../db/config.php'; // Datenbankkonfiguration einbinden
$conn = connectDB(); // Datenbankverbindung herstellen

// get data from post
$title = $_POST['input1'] ?? '';
$date = $_POST['input2'] ?? '';
$time = $_POST['input3'] ?? '';
$duration = $_POST['input4'] ?? '';
$location = $_POST['input5'] ?? '';



//DB query with SQL
$sql = "INSERT INTO appointments (title, duration, location, date) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $title, $duration, $location, $date);

$stmt->execute();

$stmt->close();



$conn->close();
?>