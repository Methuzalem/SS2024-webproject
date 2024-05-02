<?php
require_once '../db/config.php'; 
$conn = connectDB(); 

// get data from post
$title = $_POST['input1'] ?? '';
$expireDate = $_POST['input2'] ?? '';
$time = $_POST['input3'] ?? '';
$duration = $_POST['input4'] ?? '';
$location = $_POST['input5'] ?? '';
$datesString = $_POST['input6'] ?? '';
$isOption = "1";

//INSERT appointment statement
$appoSQL = "INSERT INTO appointments (title, expireDate, duration, location) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($appoSQL);
$stmt->bind_param("ssss", $title, $expireDate, $duration, $location);
$stmt->execute();
//Get autoincrement ID
$appoID = $stmt->insert_id;
$stmt->close();

//JSON for appointment
$sql = "SELECT * FROM appointments";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    $json = json_encode($data, JSON_PRETTY_PRINT); 

    file_put_contents('../JSON/Appointments.json', $json);

    echo "JSON-file created.";
} else {
    echo "Error: not found.";
}

//function to INSERT into date
function insertDate($value, $time, $appoID, $isOption) {
    $conn = connectDB(); 

    $dateSQL = "INSERT INTO date (date, beginn, appointment, isOption) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($dateSQL);
    $stmt->bind_param("sssi", $value, $time, $appoID, $isOption);
    $stmt->execute();
    $stmt->close();

    $conn->close();
}

//slice datesString into single dates
if (isset($_POST['input6'])) {
    $datesString = $_POST['input6'];
    $datesArray = explode(',', $datesString);
    foreach ($datesArray as $date) {
        insertDate($date, $time, $appoID, $isOption);
    }
}

//JSON for date
$sql = "SELECT * FROM date";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    $json = json_encode($data, JSON_PRETTY_PRINT); 

    file_put_contents('../JSON/Date.json', $json);

    echo "JSON-file created.";
} else {
    echo "Error: not found.";
}

$conn->close();
?>