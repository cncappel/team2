<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();
$sql = 'SELECT * FROM AssignmentStatus';
$vars = [];

if (isset($_GET['referee'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT *
  FROM Referees LEFT OUTER JOIN AssignmentStatus on Referees.refID = AssignmentStatus.refID 
  WHERE AssignmentStatus.gameID = ?';
  $vars = [ $_GET['referee'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$books = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($books, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
