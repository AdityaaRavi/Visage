use `visage_app`;

CREATE TABLE `sessionsTable` (
	`userId` INT unsigned NOT NULL,
    `sessionId` INT unsigned NOT NULL,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`userId`),
    UNIQUE KEY `sessionId` (`sessionId`)
);