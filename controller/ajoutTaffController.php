<?php
include_once 'dbAccess.php';
//include '../DBAccess/dbAccess.php';
$db = new dbAccess();
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$type = htmlspecialchars($obj['type']);
$total = $db->procCall('ajoutTaff', [$type]);
echo json_encode($total); //Decode le en JS