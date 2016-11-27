<?php
//funzione che ci permette di conneterci al database
function connetti_database(){
	//ipotizziamo di lavorare in locale con username = "root" e password = "toor"
	$host = 'localhost';
	$db_user = 'edopters';
	$db_password = '';
	$db_name = 'my_edopters';
	
	$connessione = mysql_connect($host,$db_user,$db_password) or die("Impossibile connettersi a MySQL");
	$db = mysql_select_db($db_name,$connessione) or die ("Impossibile selezionare il database");
}
?>