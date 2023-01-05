use `visage_app`;
CREATE TABLE `messages` (
	`sender_userID` INT unsigned NOT NULL,
	`recipient_userID` INT unsigned NOT NULL,
	`message_sent_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`message` VARCHAR(300) NOT NULL,
	KEY `key2` (`recipient_userID`,`sender_userID`) USING BTREE,
	PRIMARY KEY (`sender_userID`,`recipient_userID`)
);