<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM Referees';
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
    echo "RefID,Name,Age,RefGrade, RefRating\r\n";
  
    foreach($books as $o) {
      echo $o['refID'] . ","
          ."\"".$o['name'] . "\","
          .$o['age'] . ","
          .$o['refGrade'] . ","
          .$o['refRating'] . "\r\n";
    }
  
  } else {
    // Step 3: Convert to JSON
    $json = json_encode($books, JSON_PRETTY_PRINT);
  
    // Step 4: Output
    header('Content-Type: application/json');
    echo $json;
  }