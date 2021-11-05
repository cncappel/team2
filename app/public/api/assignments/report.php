<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT 
	name,
  age, 
  refGrade,
  refRating,
  refStatus,
  position
FROM Referees 
  LEFT OUTER JOIN AssignmentStatus ON referee.refID = AssignmentStatus.id
  GROUP BY name';
$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$assignments = $stmt->fetchAll();


// if (isset($_GET['format']) && $_GET['format']=='csv') {
//   header('Content-Type: text/csv');
//   echo "Name,Username,MaxSalary,OfferCount\r\n";

//   foreach($offers as $o) {
//     echo "\"".$o['name'] . "\","
//         .$o['username'] . ","
//         .$o['maxSalary'] . ","
//         .$o['offerCount'] . "\r\n";
//   }

// } else {

  // Step 3: Convert to JSON
  $json = json_encode($assignments, JSON_PRETTY_PRINT);

  // Step 4: Output
  header('Content-Type: application/json');
  echo $json;
