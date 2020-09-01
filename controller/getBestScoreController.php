<?php
include_once 'dbAccess.php';
$db = new dbAccess();
$json = file_get_contents('php://input');
$total = $db->procCall('bestScore');
echo json_encode($total); 