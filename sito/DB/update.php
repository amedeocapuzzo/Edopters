<?php
session_start(); 
//controlliamo se i dati sono stati inseriti
if(!isset($_POST['name']) OR $_POST['name']=="" OR !isset($_POST['password']) OR $_POST['password']==""){
	echo "niente dati";
} else {
		//puliamo i dati
		$name = trim(filter_var($_POST['name'], FILTER_SANITIZE_STRING));
		$password = trim(filter_var($_POST['password'], FILTER_SANITIZE_STRING));

		//includiamo la connessione, connettiamoci al database ed eseguiamo la query
		include "config.php";
	    connetti_database();

	    $color = substr($_POST['color'], 3); 
	    echo $color;

		$sql = mysql_query("UPDATE user SET name = '$name', password = '$password', color = $color where id = '" . $_SESSION['user_id'][0] . "'");

		$_SESSION['user_id'][4] = $name;
		$_SESSION['user_id'][6] = $color;
		header('location: ../home/');
}


?>