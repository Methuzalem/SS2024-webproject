<?php
require_once 'db/config.php'; 
$conn = connectDB();


// Testcase
$sql = "SELECT * FROM appointments";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["Appo_ID"] . " - Name: " . $row["title"] . "- date: " . $row["date"] . "- date of exp: " . $row["expire"] . "- adress: ". $row["adress"] . "<br>";
    }
} else {
    echo "0 Ergebnisse";
}



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
$sql = "SELECT * FROM user";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    $json = json_encode($data, JSON_PRETTY_PRINT); 

    file_put_contents('JSON/User.json', $json);

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