<?php
require_once 'db/config.php'; 
$conn = connectDB();

//Json for appointments
$sql = "SELECT * FROM appointments";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    $json = json_encode($data, JSON_PRETTY_PRINT); 

    file_put_contents('JSON/Appointments.json', $json);

    echo "JSON-file created.";
} else {
    echo "Error: not found.";
}

//Json for user
$sql = "SELECT * FROM date";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    $json = json_encode($data, JSON_PRETTY_PRINT); 

    file_put_contents('JSON/Date.json', $json);

    echo "JSON-file created.";
} else {
    echo "Error: not found.";
}

//Json for votes
$sql = "SELECT * FROM votes";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    $json = json_encode($data, JSON_PRETTY_PRINT); 

    file_put_contents('JSON/Votes.json', $json);

    echo "JSON-file created.";
} else {
    echo "Error: not found.";
}


$conn -> close();
?>