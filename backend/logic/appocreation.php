<?php
header('Content-Type: json');

require_once '../db/config.php'; // Datenbankkonfiguration einbinden

$conn = connectDB(); // Datenbankverbindung herstellen

// Daten aus POST holen
$title = $_POST['title'] ?? '';
$date = $_POST['date'] ?? '';
$time = $_POST['time'] ?? '';
$duration = $_POST['duration'] ?? '';
$location = $_POST['location'] ?? '';

// SQL-Query vorbereiten
$sql = "INSERT INTO appointments (title, 'date', 'time', duration, 'location') VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Parameter binden
!$stmt->bind_param("sssss", $title, $date, $time, $duration, $location);


$stmt->close();
$conn->close();
?>