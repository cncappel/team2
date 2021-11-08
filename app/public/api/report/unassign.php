<?php

// if (($_SERVER['REQUEST_METHOD'] ?? '') != 'POST') {
//     header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed");
//     exit;
// }


//TO POST THE INPUTS TO THE TABLE



require("class/DbConnection.php");

// Step 0: Validate the incoming data
// This code doesn't do that, but should ...
// For example, if the date is empty or bad, this insert fails.

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection

$stmt = $db->prepare(
'SELECT AssignmentStatus.refStatus, SoccerGame.field, SoccerGame.date FROM AssignmentStatus INNER JOIN SoccerGame ON AssignmentStatus.gameID = SoccerGame.gameID WHERE AssignmentStatus.refStatus = "Unassigned" ;'
);

$vars=[];



$stmt->execute($vars);

$dategames = $stmt->fetchAll();



// Step 3: Convert to JSON
$json = json_encode($dategames, JSON_PRETTY_PRINT);
// Get auto-generated PK from DB
// https://www.php.net/manual/en/pdo.lastinsertid.php
// $pk = $db->lastInsertId();  

// Step 4: Output
// Here, instead of giving output, I'm redirecting to the SELECT API,
// just in case the data changed by entering it

header('Content-Type: application/json');
echo $json;
