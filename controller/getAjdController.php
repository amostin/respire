<?php
include_once 'dbAccess.php';
//include '../DBAccess/dbAccess.php';
$db = new dbAccess();
$json = file_get_contents('php://input');
$total = $db->procCall('getnbTaffAujourdhui');
echo json_encode($total); //Decode le en JS