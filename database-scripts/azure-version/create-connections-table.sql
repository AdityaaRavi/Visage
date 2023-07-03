use visage_app;
CREATE TABLE connections (
	connection_ID INT NOT NULL,
	lower_userID INT NOT NULL,
	higher_userID INT NOT NULL,
	time_of_connection datetime2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (connection_ID),
	-- KEY key (higher_userID,lower_userID)
);