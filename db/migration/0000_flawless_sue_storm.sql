CREATE TABLE `users` (
	`id` char(30) NOT NULL,
	`time_created` timestamp(3) NOT NULL DEFAULT (now()),
	`time_updated` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`time_deleted` timestamp(3),
	`first_name` varchar(100) NOT NULL,
	`middle_name` varchar(100),
	`last_name` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone_number` varchar(20) NOT NULL,
	`office_number` varchar(20),
	`password` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
