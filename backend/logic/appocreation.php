<?php
require_once '../db/config.php'; 
$conn = connectDB(); 

// get data from post
$title = $_POST['input1'] ?? '';
$date = $_POST['input2'] ?? '';
$time = $_POST['input3'] ?? '';
$duration = $_POST['input4'] ?? '';
$location = $_POST['input5'] ?? '';
$isOption = "1";

//INSERT appointment statement
$AppoSql = "INSERT INTO appointments (title, duration, location) VALUES (?, ?, ?)";
$stmt = $conn->prepare($AppoSql);
$stmt->bind_param("sss", $title, $duration, $location);
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

//INSERT date statement
$DateSql = "INSERT INTO date (date, beginn, appointment, isOption) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($DateSql);
$stmt->bind_param("sssi", $date, $time, $appoID, $isOption);
$stmt->execute();
$stmt->close();

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