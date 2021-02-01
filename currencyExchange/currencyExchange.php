<?php
header('content-type: application/json; charset=utf-8');
// error_reporting(E_ALL);ini_set('display_errors', 1);
include 'config.php';
$rq = $_SERVER['REQUEST_METHOD'];

if ($rq == 'GET') // Get listing of currencies
{
    $sql = "SELECT * FROM currency_list;";
    $currencyList = getArrayFromSql($sql);
    send_json($currencyList, false, 'Currency list Fetched Successfully', false, false);
}

/******** Function to run database queries and return data in assoc array *********/
function getArrayFromSql($qry)
{
    global $sqlCon;
    $retAry = array();
    $conn = $sqlCon;
    $res = $conn->query($qry);
    while ($row = mysqli_fetch_assoc($res)) {
        $retAry[] = $row;
    }
    return $retAry;
}

/******** Function to return data in json format *********/
function send_json($data, $error = false, $message = false, $error_code = false, $totalRec = false)
{
    $data = $data ? $data : array();
    $arr = array('data' => $data, 'error' => $error);
    if ($message) {
        $arr['message'] = $message;
    }
    if ($error_code) {
        $arr['error_code'] = $error_code;
    }
    $arr['recordsTotal'] = $totalRec ? $totalRec : 0;
    echo json_encode($arr);
    exit;
}
