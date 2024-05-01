<?php
require_once 'db/config.php'; 
$conn = connectDB();

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