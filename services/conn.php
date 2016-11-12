<?php
$servername = "mysql:host=localhost;dbname=associates";
$username = "colocar o username do DB";
$password = "colocar o password do DB";

try {
	$conn = new PDO($servername, $username, $password);
	// set the PDO error mode to exception
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	// Test Connection
	// echo "Connected successfully"; 

	// Close Connection
	// $conn = null;
}
catch(PDOException $e) {
	echo "Connection failed: " . $e->getMessage();
}
?>