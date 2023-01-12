use `visage_app`;
CREATE TABLE `suggested_connections` (
	`connection_ID` INT unsigned NOT NULL,
	`lower_userID` INT unsigned NOT NULL,
	`higher_userID` INT unsigned NOT NULL,
    `accepted` BOOLEAN NOT NULL DEFAULT FALSE,
    `pending` BOOLEAN NOT NULL DEFAULT TRUE,
	`time_of_connection` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`connection_ID`),
	KEY `key` (`higher_userID`,`lower_userID`)
);