-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 30. Apr 2024 um 13:47
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
  `date` date NOT NULL,
  `expire` date NOT NULL,
  `adress` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`Appo_ID`, `title`, `date`, `expire`, `adress`) VALUES
(1, 'Test Title 1', '2024-04-01', '2024-12-31', 'Test Adress 1'),
(2, 'Test Title 2', '2024-01-01', '2024-03-31', 'Test Adress 2');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `user_ID` int(11) NOT NULL,
  `username` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `appointments` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`user_ID`, `username`, `email`, `appointments`) VALUES
(7, 'Testuser 1', 'user1@gmail.com', 1),
(8, 'Testuser 2', 'user2@gmail.com', 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `votes`
--

CREATE TABLE `votes` (
  `vote_ID` int(11) NOT NULL,
  `user_ID` int(11) NOT NULL,
  `comment` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `votes`
--

INSERT INTO `votes` (`vote_ID`, `user_ID`, `comment`) VALUES
(3, 7, 'This is the first comment from Testuser 1.'),
(4, 7, 'This is the second comment from Testuser 1.'),
(7, 8, 'This is the first comment from Testuser 2.'),
(8, 8, 'This is the second comment from Testuser 2.');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`Appo_ID`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_ID`),
  ADD KEY `appointments` (`appointments`);

--
-- Indizes für die Tabelle `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`vote_ID`),
  ADD KEY `user_ID` (`user_ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointments`
--
ALTER TABLE `appointments`
  MODIFY `Appo_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `user_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT für Tabelle `votes`
--
ALTER TABLE `votes`
  MODIFY `vote_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`appointments`) REFERENCES `appointments` (`Appo_ID`);

--
-- Constraints der Tabelle `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`user_ID`) REFERENCES `user` (`user_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
