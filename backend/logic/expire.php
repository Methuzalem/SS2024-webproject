<?php
require_once '../db/config.php'; 
$conn = connectDB(); 

$expired = 1;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $appoIDs = $_POST['appoIDs'] ?? [];
    $expireDates = $_POST['expireDates'] ?? [];

    // Hier könnten Sie die Daten weiter verarbeiten
    foreach ($appoIDs as $index => $appoID) {
        $expireDate = $expireDates[$index];
        // Machen Sie etwas mit $appoID und $expireDate
        // Zum Beispiel: Datenbank aktualisieren, Logging, etc.

        $expireSQL = "UPDATE appointments SET expired = ? WHERE appo_ID = ? AND expireDate = ?;";
        $stmt = $conn->prepare($expireSQL);
        $stmt->bind_param("iss", $expired, $appoID, $expireDate);
        $stmt->execute();

        $stmt->close();
        echo $expireDate;
        echo $appoID;
    }

    echo "Daten erfolgreich erhalten und verarbeitet.";
}

/*
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
*/
$conn->close();
?>