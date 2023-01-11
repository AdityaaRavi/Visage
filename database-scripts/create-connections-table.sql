use `visage_app`;
CREATE TABLE `connections` (
	`connection_ID` INT unsigned NOT NULL,
	`lower_userID` INT unsigned NOT NULL,
	`higher_userID` INT unsigned NOT NULL,
	`time_of_connection` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`connection_ID`),
	KEY `key` (`higher_userID`,`lower_userID`)
);