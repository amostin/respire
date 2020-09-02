<?php

include_once 'dbAccess.php';

$db = new dbAccess();
$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$pseudo = htmlspecialchars($obj["pseudo"]);
$passwd = hash("sha256", htmlspecialchars($obj["passwd"]));


$connect = $db->procCall('connexionUserRespire', [$pseudo, $passwd]);

if (!empty($connect)) {
    $SuccessLoginMsg = 'ok';
    $SuccessLoginJson = json_encode(array('ok', $connect[0]['idUser'], $connect[0]['email'], $connect[0]['pseudo']));
    echo $SuccessLoginJson;
} else {
    $InvalidMSG = 'Email ou mot de passe incorrect ! ';
    $InvalidMSGJSon = json_encode($InvalidMSG);
    echo $InvalidMSGJSon;
}