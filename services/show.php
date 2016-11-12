<?php 
include 'conn.php';

echo "<table>";
echo "<tr><th>Id</th><th>Name</th><th>Email</th><th>Senha</th><th>Telefone</th></tr>";

class TableRows extends RecursiveIteratorIterator { 
	function __construct($it) { 
		parent::__construct($it, self::LEAVES_ONLY); 
	}

	function current() {
		return "<td>" . parent::current(). "</td>";
	}

	function beginChildren() { 
		echo "<tr>"; 
	} 

	function endChildren() { 
		echo "</tr>" . "\n";
	} 
} 

$stmt = $conn->prepare("SELECT * FROM user"); 
$stmt->execute();

// set the resulting array to associative
$result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) { 
	echo $v;
}

$conn = null;
echo "</table>";

?>

<style>
	table {
	    border-spacing: 0 !important;
	    text-align: center;
	    margin: 50px auto;
	    width: 80%;
	}
	td, th { padding: 5px 10px; }
	tr:nth-child(even) { background: #CCC }
	tr:nth-child(odd) { background: #FFF }
	th {
		background: #555;
		color: #fff;
	}
</style>