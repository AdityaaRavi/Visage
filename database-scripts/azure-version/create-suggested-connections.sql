use visage_app;
CREATE TABLE suggested_connections (
	connection_ID INT NOT NULL,
	lower_userID INT NOT NULL,
	higher_userID INT NOT NULL,
    accepted BIT NOT NULL DEFAULT 0,
    pending BIT NOT NULL DEFAULT 1,
	time_of_connection datetime2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (connection_ID),
);