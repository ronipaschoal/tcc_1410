<?php

include 'conn.php';

if ($_POST) {
	switch ($_POST["action"]) {
		case 'login':
			$stmt = $conn->prepare("SELECT * FROM user WHERE email = '".$_POST["email"]."' AND password = '".$_POST["password"]."'"); 
			$stmt->execute();
			// set the resulting array to associative
			$result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

			if ($user = $stmt->fetchAll()) {
				echo json_encode($user);
				die;
			}
			$conn = null;
			break;
		case 'save':
			
			$user = $_POST["user"];
			// prepare sql and bind parameters
			$stmt = $conn->prepare("INSERT INTO user (name, email, password, phone) 
									VALUES (:name, :email, :password, :phone)");
			$stmt->bindParam(':name', 		$name);
			$stmt->bindParam(':email', 		$email);
			$stmt->bindParam(':password', 	$password);
			$stmt->bindParam(':phone', 		$phone);

			// insert a row
			$name = $user["name"];
			$email = $user["email"];
			$password = $user["password"];
			$phone = $user["phone"];

			$stmt->execute();
			echo $temp = $conn->lastInsertId();

			$conn = null;
			break;
		case 'update':

			$user = $_POST["user"];
			// prepare sql and bind parameters
			$stmt = $conn->prepare( "UPDATE user SET name=:name, email=:email, password=:password, phone=:phone WHERE id=:id" );
			echo $stmt->execute(array(
				':name' => $user["name"],
				':email' => $user["email"],
				':password' => $user["password"], 
				':phone' => $user["phone"],
				':id' => $user["id"]
			));
			
			$conn = null;
			break;
	}
	die;
}

echo json_encode(0)	;

?>