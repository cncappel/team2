<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM SoccerGame';
$vars = [];

// if (isset($_GET['guid'])) {
//   // This is an example of a parameterized query
//   $sql = 'SELECT * FROM Patient WHERE patientGuid = ?';
//   $vars = [ $_GET['guid'] ];
// }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$books = $stmt->fetchAll();

if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');
    echo "GameID,Field,Date,Time,GameLevel\r\n";
  
    foreach($books as $o) {
      echo $o['gameID'] . ","
          ."\"".$o['field'] . "\","
          .$o['date'] . ","
          .$o['time'] . ","
          .$o['gameLevel'] . "\r\n";
    }
  
  } else {
    // Step 3: Convert to JSON
    $json = json_encode($books, JSON_PRETTY_PRINT);
  
    // Step 4: Output
    header('Content-Type: application/json');
    echo $json;
  }