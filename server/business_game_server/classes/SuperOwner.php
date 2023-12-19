<?php	
	include 'Owner.php';

	class SuperOwner extends Owner {
		// private $login = '';
		// private $password = '';
		
		// function __construct($queryElements) {			
			// if (array_key_exists('login', $queryElements)) {
				// $this->login = $queryElements['login'];
			// }
			
			// if (array_key_exists('password', $queryElements)) {
				// $this->password = $queryElements['password'];
			// }
		// }
		
		// function getUserData() {
			// $connection = new mysqli($GLOBALS['serverName'], $GLOBALS['userName'], $GLOBALS['password'], $GLOBALS['dataBaseName']);
			
			// if ($connection->connect_error) {
				// die('Connection failed: ' . $connection->connect_error);
			// }
			
			// // Check if credentials are presented and get data
			// $sql = "SELECT id, name, user_role_id, game_id FROM users WHERE login = '$this->login' AND password = '$this->password'";
			// $results = $connection->query($sql);
			
			// $matrix = array();
			
			// if ($results && $results->num_rows > 0) {				
				// while($row = $results->fetch_assoc()) {
					// array_push($matrix, $row);
				// }
			// }
			
			// $connection->close();			
			
			// return count($matrix) > 0 ? $matrix[0] : null;
		// }
	}
?>