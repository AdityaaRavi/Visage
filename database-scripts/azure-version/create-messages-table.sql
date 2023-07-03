use visage_app;
CREATE TABLE messages (
	sender_userID INT NOT NULL,
	recipient_userID INT NOT NULL,
	message_sent_time datetime2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
	message VARCHAR(300) NOT NULL,
	message_ID INT NOT NULL,
	PRIMARY KEY (message_ID)
);