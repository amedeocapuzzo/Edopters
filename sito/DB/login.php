<?php
//apro la sessione e verifico se il login è già stato effettuato
session_start();
if(isset($_SESSION['loggedin'])){
    header('location: ../home/');
}

//controlliamo se i dati sono stati inseriti
if(!isset($_POST['username']) OR $_POST['username']=="" OR !isset($_POST['password']) OR $_POST['password']==""){
	header('location: ../login/loginER.html');
} else {
	//puliamo i dati
	$username = trim(filter_var($_POST['username'], FILTER_SANITIZE_STRING));
	$password = trim(filter_var($_POST['password'], FILTER_SANITIZE_STRING));

	//includiamo la connessione, connettiamoci al database ed eseguiamo la query
	include "config.php";
        connetti_database();
	$result = mysql_query("SELECT * FROM user WHERE username = '$username' AND password = '$password'");

	//se la query ha restituito 0 righe, non esiste nessun user con username e password inseriti
	if(mysql_num_rows($result)==0)
            header('location: ../login/loginER.html');
	else{
            $user = mysql_fetch_array($result);
            $_SESSION['user_id'] = $user;
            header('location: ../home/');
	}
}


?>