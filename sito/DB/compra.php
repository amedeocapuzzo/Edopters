<?php
session_start(); 

include "config.php";
connetti_database();


$crediti = $_SESSION['user_id'][7] + 1;

$sql = mysql_query("UPDATE user SET credits = '$crediti' where id = '" . $_SESSION['user_id'][0] . "'");

$_SESSION['user_id'][4] = $name;
$_SESSION['user_id'][7] = $crediti;
header('location: ../home/');


?>