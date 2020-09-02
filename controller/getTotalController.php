<?php
include_once 'dbAccess.php';
//include '../DBAccess/dbAccess.php';
$db = new dbAccess();
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$userId = htmlspecialchars($obj['userId']);
$total = $db->procCall('getTaff', [$userId]);
echo json_encode($total); //Decode le en JS