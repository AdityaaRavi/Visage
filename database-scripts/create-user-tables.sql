use `visage_app`;
-- Only to be used for login. 
CREATE TABLE `user_login` (
	`userId` INT NOT NULL,
	`name` VARCHAR(70) NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	`password` VARCHAR(100) NOT NULL,
	`time_of_update` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`email`),
    KEY `userId_key` (`userId`)
);

-- To be used to store everything other than the login information of an user.
CREATE TABLE `user_info` (
	`userId` INT NOT NULL,
	`name` VARCHAR(70) NOT NULL,
    `num_connections` INT DEFAULT 0,
    `top_skill1` VARCHAR(50) NOT NULL,
    `top_skill2` VARCHAR(50) NOT NULL,
    `top_skill3` VARCHAR(50) NOT NULL,
    `top_skill4` VARCHAR(50) NOT NULL,
	`org1` VARCHAR(50),
	`org2` VARCHAR(50),
	`org3` VARCHAR(50),
	`org4` VARCHAR(50),
	`school1` VARCHAR(60),
	`school2` VARCHAR(60),
	`school3` VARCHAR(60),
	`career1` VARCHAR(50),
	`career2` VARCHAR(50),
	`career3` VARCHAR(50),
	`fun1` VARCHAR(50),
	`fun2` VARCHAR(50),
	`fun3` VARCHAR(50),
	`description` VARCHAR(300),
	`time_of_update` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `time_of_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`userId`),
    KEY `search` (`name`,`org1`),
    KEY `search1` (`name`,`school1`)
);