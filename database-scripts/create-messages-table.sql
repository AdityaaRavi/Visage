use `visage_app`;
CREATE TABLE `messages` (
	`sender_userID` INT unsigned NOT NULL,
	`recipient_userID` INT unsigned NOT NULL,
	`message_sent_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`message` VARCHAR(300) NOT NULL,
	`message_ID` INT unsigned NOT NULL,
	KEY `key2` (`sender_userID`,`recipient_userID`) USING BTREE,
	PRIMARY KEY (`message_ID`)
);