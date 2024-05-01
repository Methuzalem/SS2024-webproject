-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 02. Mai 2024 um 01:25
-- Server-Version: 10.4.28-MariaDB
-- PHP-Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `ss2024web`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointments`
--

CREATE TABLE `appointments` (
  `Appo_ID` int(11) NOT NULL,
  `title` varchar(64) NOT NULL,
  `duration` int(12) NOT NULL,
  `location` varchar(64) NOT NULL,
  `expired` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`Appo_ID`, `title`, `duration`, `location`, `expired`) VALUES
(39, 'Marvin', 6, 'Malediven', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `date`
--

CREATE TABLE `date` (
  `date_ID` int(11) NOT NULL,
  `date` date NOT NULL,
  `beginn` time NOT NULL,
  `appointment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `date`
--

INSERT INTO `date` (`date_ID`, `date`, `beginn`, `appointment`) VALUES
(26, '1222-12-12', '09:08:00', 39);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `votes`
--

CREATE TABLE `votes` (
  `vote_ID` int(11) NOT NULL,
  `username` varchar(64) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `date` int(11) NOT NULL,
  `appointment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `votes`
--

INSERT INTO `votes` (`vote_ID`, `username`, `comment`, `date`, `appointment`) VALUES
(2, 'Marvin', 'This is the inital comment', 26, 39);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`Appo_ID`);

--
-- Indizes für die Tabelle `date`
--
ALTER TABLE `date`
  ADD PRIMARY KEY (`date_ID`),
  ADD KEY `appointment` (`appointment`);

--
-- Indizes für die Tabelle `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`vote_ID`),
  ADD KEY `appointment` (`appointment`),
  ADD KEY `date` (`date`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointments`
--
ALTER TABLE `appointments`
  MODIFY `Appo_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT für Tabelle `date`
--
ALTER TABLE `date`
  MODIFY `date_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT für Tabelle `votes`
--
ALTER TABLE `votes`
  MODIFY `vote_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `date`
--
ALTER TABLE `date`
  ADD CONSTRAINT `date_ibfk_1` FOREIGN KEY (`appointment`) REFERENCES `appointments` (`Appo_ID`);

--
-- Constraints der Tabelle `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`appointment`) REFERENCES `appointments` (`Appo_ID`),
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`date`) REFERENCES `date` (`date_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
