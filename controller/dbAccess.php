<?php
class dbAccess
{
    private $pdo = null; //Le PDO donc la requete vers la BDD
    private $action = null; //Action qui va reprendre la classe action
    /**
     * La fonction permet d'effectuer une connexion vers la BDD
     */
    public function connexionBDD()
    {
        try {
            $this->pdo = new PDO('mysql:host=91.216.107.162;dbname=ambro1430042', 'ambro1430042', 'shnzqwgi7h');
            //$this->pdo = new PDO('mysql:host=localhost;dbname=projet', 'root', 'root');
        } catch (PDOException $e) {
            print_r($e);
        }
    }
    /**
     * La fonction permet d'effectuer les requetes aux procèdures dans BDD
     * @param $procName nom de la procèdure
     * @param array $procParams les paramètres qu'on transmet vers la procèdure
     * @return mixed
     */
    public function procCall($procName, $procParams = array())
    {
        $params = array();
        switch ($procName) {

            case 'getTaff':
            case 'getnbTaffAujourdhui':
            case 'bestScore':
                array_push($params, '?');
                try {
                    $this->connexionBDD();
                    $callProc = 'call ' . $procName . '(' . join(',', $params) . ')';
                    $request = $this->pdo->prepare($callProc);
                    $request->execute($procParams);
                    return $request->fetchAll();
                } catch (PDOException $e) {
                    $e->getMessage();
                }
                break;

            case 'connexionUserRespire':
            case 'ajoutTaff':
                array_push($params, '?', '?');
                try {
                    $this->connexionBDD();
                    $callProc = 'call ' . $procName . '(' . join(',', $params) . ')';
                    $request = $this->pdo->prepare($callProc);
                    $request->execute($procParams);
                    return $request->fetchAll();
                } catch (PDOException $e) {
                    $e->getMessage();
                }
                break;

            case 'creationUserRespire':
            case 'verifEmailRespire':
            case 'verifPseudoRespire':
                array_push($params, '?', '?', '?');
                try {
                    $this->connexionBDD();
                    $callProc = 'call ' . $procName . '(' . join(',', $params) . ')';
                    $request = $this->pdo->prepare($callProc);
                    $request->execute($procParams);
                    return $request->fetchAll();
                } catch (PDOException $e) {
                    $e->getMessage();
                }
                break;
        }
    }
}
