CREATE TABLE IF NOT EXISTS `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `hashedPassword` varchar(60) NOT NULL,
  `uen` varchar(10) DEFAULT NULL,
  `walletAddress` varchar(42) DEFAULT NULL,
  `accountType` int(11) NOT NULL,
  `approved` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `uen_UNIQUE` (`uen`),
  UNIQUE KEY `walletAddress_UNIQUE` (`walletAddress`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Awardee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organisationId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `organisationId_email_UNIQUE` (`organisationId`, `email`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `AwardeeGroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organisationId` int(11) NOT NULL,
  `groupName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `organisationId_groupName_UNIQUE` (`organisationId`, `groupName`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `AwardeeGroupAwardeeIds` (
  `awardeeGroupId` int(11) NOT NULL,
  `awardeeId` int(11) NOT NULL,
  PRIMARY KEY (`awardeeGroupId`, `awardeeId`)
) ENGINE=InnoDB;

-- TODO find out how to store image blob / file path of uploaded image
CREATE TABLE IF NOT EXISTS `CredentialTemplate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organisationId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
