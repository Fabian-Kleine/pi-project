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
        $query = "
            SELECT 
                *
            FROM radar_sensor_data
            
            UNION ALL
            
            SELECT 
                *
            FROM voc_sensor_data
            
            ORDER BY created_at DESC
        ";
        $data = $this->db->fetchAll($query);
        Response::json($data);
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

    public function getRadarData(): void {
        $query = "
            SELECT
                *
            FROM radar_sensor_data
        ";
        $data = $this->db->fetchAll($query);
        Response::json($data);
    }

}