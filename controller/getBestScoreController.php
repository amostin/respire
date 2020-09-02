<?php
include_once 'dbAccess.php';
$db = new dbAccess();
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$userId = htmlspecialchars($obj['userId']);
$total = $db->procCall('bestScore', [$userId]);
echo json_encode($total); 