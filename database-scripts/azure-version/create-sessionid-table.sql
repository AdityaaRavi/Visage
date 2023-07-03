use visage_app;

CREATE TABLE sessionsTable (
	userId INT NOT NULL,
    sessionId INT NOT NULL,
    timestamp datetime2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (sessionId)
);

-- Clean up the sessions table once every day
-- CREATE EVENT IF NOT EXISTS session_cleaner_event
-- ON SCHEDULE
--   EVERY '1 4' DAY_HOUR
--   COMMENT 'Clean up tempIds and sessions older than 5 hours at 4:00 AM daily!'
--   DO
--     DELETE FROM sessionsTable
--     WHERE TIMESTAMPDIFF(HOURS, NOW(),sessionsTable.timestamp)>5;