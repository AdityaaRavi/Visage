use `visage_app`;
CREATE TABLE `connections` (
	`lower_userID` INT unsigned NOT NULL,
	`higher_userID` INT unsigned NOT NULL,
	`time_of_connection` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`lower_userID`,`higher_userID`),
	KEY `key2` (`higher_userID`,`lower_userID`)
);