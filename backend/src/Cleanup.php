<?php
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/../config.php';

use Database;

echo("startet cleanup...");

try {
    $db = new Database($dsn, DB_USER, DB_PASS);
    
    // $db->execute("DELETE FROM voc_sensor_data WHERE timestamp < datetime('now', '-30 days')");
    $db->execute("DELETE FROM voc_sensor_data WHERE id=2");
    
} catch (Exception $e) {
    echo($e);
}
?>