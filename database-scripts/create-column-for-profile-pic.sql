use visage_app;

ALTER TABLE user_info
ADD COLUMN profile_pic VARCHAR(100) AFTER time_of_creation;