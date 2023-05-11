DROP TABLE IF EXISTS `activitylog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activitylog` (
  `activityID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userID` bigint(20) unsigned DEFAULT NULL,
  `nomineeID` bigint(20) unsigned DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`activityID`),
  UNIQUE KEY `activityID` (`activityID`),
  KEY `userID` (`userID`),
  KEY `nomineeID` (`nomineeID`),
  CONSTRAINT `activitylog_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `activitylog_ibfk_2` FOREIGN KEY (`nomineeID`) REFERENCES `nominees` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cohort`
--

DROP TABLE IF EXISTS `cohort`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cohort` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `inductionYear` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matches` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nomineeID` bigint(20) unsigned DEFAULT NULL,
  `judgeID` bigint(20) unsigned DEFAULT NULL,
  `matchStatus` varchar(10) DEFAULT 'm300',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `nomineeID` (`nomineeID`),
  KEY `judgeID` (`judgeID`),
  CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`nomineeID`) REFERENCES `nominees` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`judgeID`) REFERENCES `users` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nominationlink`
--

DROP TABLE IF EXISTS `nominationlink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nominationlink` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nominationID` bigint(20) unsigned DEFAULT NULL,
  `nomineeID` bigint(20) unsigned DEFAULT NULL,
  `cohortID` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `nominationID` (`nominationID`),
  KEY `nomineeID` (`nomineeID`),
  KEY `cohortID` (`cohortID`),
  CONSTRAINT `nominationlink_ibfk_1` FOREIGN KEY (`nominationID`) REFERENCES `nominations` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `nominationlink_ibfk_2` FOREIGN KEY (`nomineeID`) REFERENCES `nominees` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `nominationlink_ibfk_3` FOREIGN KEY (`cohortID`) REFERENCES `cohort` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nominations`
--

DROP TABLE IF EXISTS `nominations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nominations` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `authorFirst` varchar(25) NOT NULL,
  `authorLast` varchar(25) NOT NULL,
  `authorEmail` varchar(50) NOT NULL,
  `nomFirst` varchar(25) NOT NULL,
  `nomLast` varchar(25) NOT NULL,
  `nomYOB` year(4) NOT NULL,
  `cohort` bigint(20) unsigned DEFAULT '4',
  `category` varchar(25) NOT NULL,
  `subcategory` varchar(25) DEFAULT NULL,
  `subcategoryOther` varchar(25) DEFAULT NULL,
  `nomQ1` varchar(25) DEFAULT NULL,
  `nomQ1Description` text NOT NULL,
  `nomQ2` varchar(25) DEFAULT NULL,
  `nomQ2Description` text NOT NULL,
  `nomQ3` varchar(25) DEFAULT NULL,
  `nomQ3Description` text NOT NULL,
  `nomDeceased` tinyint(1) NOT NULL,
  `nomAchieved` tinyint(1) NOT NULL,
  `nomAdditionalInfo` text,
  `nomStatus` varchar(10) DEFAULT 'n100',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `cohort` (`cohort`),
  CONSTRAINT `nominations_ibfk_1` FOREIGN KEY (`cohort`) REFERENCES `cohort` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `nominees`
--

DROP TABLE IF EXISTS `nominees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nominees` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `cohort` bigint(20) unsigned DEFAULT '4',
  `nomStatus` varchar(10) DEFAULT 'n200',
  `yob` year(4) NOT NULL,
  `category` varchar(25) NOT NULL,
  `subcategory` varchar(25) DEFAULT NULL,
  `subcategoryOther` varchar(25) DEFAULT NULL,
  `matchesAssigned` smallint(6) DEFAULT '0',
  `capacity` smallint(6) DEFAULT '3',
  `nominations` json DEFAULT NULL,
  `verdict` json DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  KEY `cohort` (`cohort`),
  CONSTRAINT `nominees_ibfk_1` FOREIGN KEY (`cohort`) REFERENCES `cohort` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(25) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `firstName` varchar(25) DEFAULT NULL,
  `lastName` varchar(25) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `info` json DEFAULT NULL,
  `firebaseID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
