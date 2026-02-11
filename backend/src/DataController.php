<?php
declare(strict_types=1);

namespace Src;

class DataController
{
    private Database $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function index(): void
    {
        $radarQuery = "
            SELECT 
                id, 
                sensor_data, 
                created_at
            FROM radar_sensor_data
            ORDER BY created_at DESC
        ";
        $radarData = $this->db->fetchAll($radarQuery);
        
        $vocQuery = "
            SELECT 
                id, 
                sensor_data, 
                created_at
            FROM voc_sensor_data
            ORDER BY created_at DESC
        ";
        $vocData = $this->db->fetchAll($vocQuery);

        $groupedData = [
            'radar_sensor' => $radarData,
            'voc_sensor' => $vocData
        ];
        
        Response::json($groupedData);
    }

    public function getDataPeriod($startDate, $endDate): void {
         $radarQuery = "
        SELECT 
            id, 
            sensor_data, 
            created_at 
        FROM radar_sensor_data 
        WHERE created_at BETWEEN ? AND ? 
        ORDER BY created_at DESC
        ";

        $radarData = $this->db->fetchAll($radarQuery, [$startDate, $endDate]);

        $vocQuery = "
            SELECT 
                id, 
                sensor_data, 
                created_at 
            FROM voc_sensor_data 
            WHERE created_at BETWEEN ? AND ? 
            ORDER BY created_at DESC
            ";

        $vocData = $this->db->fetchAll($vocQuery, [$startDate, $endDate]);

        $groupedData = [
            'radar_sensor' => $radarData,
            'voc_sensor' => $vocData
        ];
        
        Response::json($groupedData);
    }

    public function getVocData(): void {
        $query = "
            SELECT
                *
            FROM voc_sensor_data
        ";
        $data = $this->db->fetchAll($query);
        Response::json($data);
    }

    public function getVocDataPeriod($startDate, $endDate): void {
         $query = "
            SELECT 
                id, 
                sensor_data, 
                created_at 
            FROM voc_sensor_data 
            WHERE created_at BETWEEN ? AND ? 
            ORDER BY created_at DESC
            ";

        $data = $this->db->fetchAll($query, [$startDate, $endDate]);
        Response::json($data);
    }

    public function getRadarData(): void {
        $query = "
            SELECT
                *
            FROM radar_sensor_data
        ";
        $data = $this->db->fetchAll($query);
        Response::json($data);
    }

    public function getRadarDataPeriod($startDate, $endDate): void {
         $query = "
        SELECT 
            id, 
            sensor_data, 
            created_at 
        FROM radar_sensor_data 
        WHERE created_at BETWEEN ? AND ? 
        ORDER BY created_at DESC
        ";

        $data = $this->db->fetchAll($query, [$startDate, $endDate]);
        Response::json($data);
    }

}