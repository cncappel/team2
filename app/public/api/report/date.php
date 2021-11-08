<?php

// if (($_SERVER['REQUEST_METHOD'] ?? '') != 'POST') {
//     header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed");
//     exit;
// }


//TO POST THE INPUTS TO THE TABLE

try {
    $_POST = json_decode(
                file_get_contents('php://input'), 
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    // print_r($_POST);
    // echo file_get_contents('php://input');
    exit;
}

require("class/DbConnection.php");

// Step 0: Validate the incoming data
// This code doesn't do that, but should ...
// For example, if the date is empty or bad, this insert fails.

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection

$stmt = $db->prepare(
'SELECT AssignmentStatus.refStatus, SoccerGame.field, SoccerGame.date FROM AssignmentStatus INNER JOIN SoccerGame ON AssignmentStatus.gameID = SoccerGame.gameID WHERE SoccerGame.date between ? and ? and AssignmentStatus.refID = ? ;'
);

$stmt->execute([
    $_POST['start'],
    $_POST['end'],
    $_POST['refID']
    ]);


$dategames = $stmt->fetchAll();



// Step 3: Convert to JSON
$json = json_encode($dategames, JSON_PRETTY_PRINT);
// Get auto-generated PK from DB
// https://www.php.net/manual/en/pdo.lastinsertid.php
// $pk = $db->lastInsertId();  

// Step 4: Output
// Here, instead of giving output, I'm redirecting to the SELECT API,
// just in case the data changed by entering it

header('HTTP/1.1 303 See Other');
echo $json;
