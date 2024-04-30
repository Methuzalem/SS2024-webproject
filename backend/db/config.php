<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'bif2webscriptinguser');
define('DB_PASSWORD', 'bif2021');
define('DB_NAME', 'ss2024web');

//use "$conn = connectDB()" to connect to DB and "$conn -> close()" to close it
function connectDB() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if ($conn->connect_error) {
        die("Verbindung fehlgeschlagen: " . $conn->connect_error);
    }
    return $conn;
}
?>