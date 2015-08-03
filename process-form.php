<?php
  
  // get data
  $name    = $_POST['name'];
  $email   = $_POST['email'];
  $phone   = $_POST['phone'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];
  
  // set error value to nothing
  $error = "";
  
  // check if name is empty
  if(trim($name) == "") {
    $error = "<p>Name is empty</p>";
  }
  // check if name contains only letters and numbers
  else if (!preg_match('/[^A-Za-z]+/', trim($name))) {
    $error = "<p>Name can only contain letters and spaces</p>";
  }
  
  // check if phone is empty
  if(trim($phone) == "") {
    $error .= "<p>Phone is empty</p>";
  }
  // check if phone contains only numbers
  else if(!is_numeric(trim($phone))) {
    $error .= "<p>Phone can only contain numbers</p>";
  }
  
  // check if subject is empty
  if(trim($subject) == "") {
    $error .= "<p>Subject is empty</p>";
  }
  
  // check if message is empty
  if(trim($message) == "") {
    $error .= "<p>Message is empty</p>";
  }
  
  // create array for the data we want to return
  $data = array();
  
  // if there are errors then send back the errors
  if($error != "") {
    $data['success'] = false;
    $data['error']   = $error; 
  }
  else {
    // do whatever you want to do with the data then return success
    
    $data['success'] = true; 
  }
  
  echo json_encode($data);
  
?>