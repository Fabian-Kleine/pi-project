<?php
declare(strict_types=1);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../src/Database.php';
require_once __DIR__ . '/../src/Response.php';
require_once __DIR__ . '/../src/DataController.php';

use Src\Database;
use Src\Response;
use Src\DataController;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_NAME);
$db = new Database($dsn, DB_USER, DB_PASS);
$controller = new DataController($db);

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$base = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'])), '/'); 
$relative = '/' . ltrim(substr($path, strlen($base)), '/');
$segments = array_values(array_filter(explode('/', $relative)));

$method = $_SERVER['REQUEST_METHOD'];

try {
    
    if (count($segments) === 0 || $segments[0] === '') { 
        $controller->index();
        exit;
    }

    if ($segments[0] === 'voc') {
        if ($method === 'GET' && count($segments) === 1) {
            $controller->getVocData();
            exit;
        }

        if ($method === 'GET' && count($segments) === 2 && $segments[1] === 'period') {
            $startDate = $_GET['start'] ?? null;
            $endDate = $_GET['end'] ?? null;
        
            if (!$startDate || !$endDate) {
                Response::json(['error' => 'Missing start or end date parameter'], 400);
                exit;
            }
            
            $controller->getVocDataPeriod($startDate, $endDate);
            exit;
        }
    }

    if ($segments[0] === 'radar') {
        if ($method === 'GET' && count($segments) === 1) {
            $controller->getRadarData();
            exit;
        }

        if ($method === 'GET' && count($segments) === 2 && $segments[1] === 'period') {
            $startDate = $_GET['start'] ?? null;
            $endDate = $_GET['end'] ?? null;
        
            if (!$startDate || !$endDate) {
                Response::json(['error' => 'Missing start or end date parameter'], 400);
                exit;
            }
            
            $controller->getRadarDataPeriod($startDate, $endDate);
            exit;
        }
    }

    if ($segments[0] === 'period') {
        if ($method === 'GET' && count($segments) === 1) {
            $startDate = $_GET['start'] ?? null;
            $endDate = $_GET['end'] ?? null;
        
            if (!$startDate || !$endDate) {
                Response::json(['error' => 'Missing start or end date parameter'], 400);
                exit;
            }
            
            $controller->getDataPeriod($startDate, $endDate);
            exit;
        }
    }

    Response::json(['error' => 'Not Found'], 404);
} catch (Throwable $e) {
    Response::json(['error' => 'Server error', 'details' => $e->getMessage()], 500);
}