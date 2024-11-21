ALTER TABLE `userInterviewDetails` ADD `spouse_first_name` varchar(100);--> statement-breakpoint
ALTER TABLE `userInterviewDetails` ADD `spouse_middle_name` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `userInterviewDetails` ADD `spouse_last_name` varchar(100);--> statement-breakpoint
ALTER TABLE `userInterviewDetails` ADD `spouse_email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `userInterviewDetails` ADD `spouse_phone_number` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `userInterviewDetails` ADD `spouse_ssn_or_itin` varchar(20);--> statement-breakpoint
ALTER TABLE `userInterviewDetails` ADD `dob` date;--> statement-breakpoint
ALTER TABLE `userInterviewDetails` ADD `spouse_dob` date;--> statement-breakpoint
ALTER TABLE `userInterviewDetails` ADD `current_zipcode` varchar(30);--> statement-breakpoint
ALTER TABLE `userInterviewDetails` ADD `spouse_occupation` varchar(100);