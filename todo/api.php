<?php
$action = $_POST['action'];
switch ($action) {
	case 'get':
		$my_file = 'todo.txt';
		$handle = fopen($my_file, 'r');
		$data = fread($handle,filesize($my_file));
		return $data;		
		break;
	
	default:
		return "Please provide proper case";
		break;
}

?>