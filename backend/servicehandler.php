<?php
include "./db/connection.php";

// Testabfrage
$sql = "SELECT * FROM appointments";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["Appo_ID"] . " - Name: " . $row["title"] . "- date: " . $row["date"] . "- date of exp: " . $row["expire"] . "- adress: ". $row["adress"] . "<br>";
    }
} else {
    echo "0 Ergebnisse";
}





include "./db/disconnect.php"
?>