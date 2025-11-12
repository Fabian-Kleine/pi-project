-- phpMyAdmin SQL Dump
-- version 5.2.1deb1+deb12u1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 12. Nov 2025 um 07:11
-- Server-Version: 10.11.14-MariaDB-0+deb12u2
-- PHP-Version: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `project_prod`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `radar_sensor_data`
--

CREATE TABLE `radar_sensor_data` (
  `id` int(11) NOT NULL,
  `sensor_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sensor_data`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `radar_sensor_data`
--

INSERT INTO `radar_sensor_data` (`id`, `sensor_data`, `created_at`) VALUES
(1, '{\"motion\": 1}', '2025-11-05 08:08:52'),
(2, '{\"motion\": 1}', '2025-11-05 08:09:00'),
(3, '{\"motion\": 1}', '2025-11-05 08:09:05'),
(4, '{\"motion\": 1}', '2025-11-05 08:09:10'),
(5, '{\"motion\": 1}', '2025-11-05 08:09:15'),
(6, '{\"motion\": 1}', '2025-11-05 08:09:20'),
(7, '{\"motion\": 1}', '2025-11-05 08:09:25'),
(8, '{\"motion\": 1}', '2025-11-05 08:09:31'),
(9, '{\"motion\": 1}', '2025-11-05 08:09:36'),
(10, '{\"motion\": 1}', '2025-11-05 08:09:41');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `voc_sensor_data`
--

CREATE TABLE `voc_sensor_data` (
  `id` int(11) NOT NULL,
  `sensor_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sensor_data`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `voc_sensor_data`
--

INSERT INTO `voc_sensor_data` (`id`, `sensor_data`, `created_at`) VALUES
(2, '{\"temperature\": 22.5, \"humidity\": 45, \"pressure\": 1013, \"gas\": 1200}', '2025-11-05 07:25:42'),
(3, '{\"temperature\": 23.2, \"pressure\": 1012.69, \"humidity\": 41.012, \"gas_resistance\": null}', '2025-11-05 07:54:45'),
(4, '{\"temperature\": 23.2, \"pressure\": 1012.69, \"humidity\": 40.611, \"gas_resistance\": 3892.2099764553855}', '2025-11-05 07:54:50'),
(5, '{\"temperature\": 23.21, \"pressure\": 1012.71, \"humidity\": 40.716, \"gas_resistance\": 4944.943711473821}', '2025-11-05 07:54:55'),
(6, '{\"temperature\": 23.32, \"pressure\": 1012.85, \"humidity\": 39.416, \"gas_resistance\": null}', '2025-11-05 08:09:05'),
(7, '{\"temperature\": 23.32, \"pressure\": 1012.86, \"humidity\": 39.553, \"gas_resistance\": 3681.221492200691}', '2025-11-05 08:09:10'),
(8, '{\"temperature\": 23.32, \"pressure\": 1012.87, \"humidity\": 40.351, \"gas_resistance\": null}', '2025-11-05 08:09:15'),
(9, '{\"temperature\": 23.33, \"pressure\": 1012.87, \"humidity\": 41.029, \"gas_resistance\": 6432.8943738495145}', '2025-11-05 08:09:20'),
(10, '{\"temperature\": 23.34, \"pressure\": 1012.86, \"humidity\": 41.025, \"gas_resistance\": null}', '2025-11-05 08:09:25'),
(11, '{\"temperature\": 23.36, \"pressure\": 1012.84, \"humidity\": 40.36, \"gas_resistance\": null}', '2025-11-05 08:09:36'),
(12, '{\"temperature\": 23.36, \"pressure\": 1012.83, \"humidity\": 40.051, \"gas_resistance\": 9453.941219322105}', '2025-11-05 08:09:41');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `radar_sensor_data`
--
ALTER TABLE `radar_sensor_data`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `voc_sensor_data`
--
ALTER TABLE `voc_sensor_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `radar_sensor_data`
--
ALTER TABLE `radar_sensor_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT für Tabelle `voc_sensor_data`
--
ALTER TABLE `voc_sensor_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
