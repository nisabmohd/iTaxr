ALTER TABLE `userDependentDetails` RENAME COLUMN `user_id` TO `file_id`;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` RENAME COLUMN `user_id` TO `file_id`;--> statement-breakpoint
ALTER TABLE `userDependentDetails` DROP FOREIGN KEY `userDependentDetails_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` DROP FOREIGN KEY `userSourceIncDeduct_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `userDependentDetails` MODIFY COLUMN `file_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` MODIFY COLUMN `file_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `userDependentDetails` ADD CONSTRAINT `userDependentDetails_file_id_userInterviewDetails_id_fk` FOREIGN KEY (`file_id`) REFERENCES `userInterviewDetails`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_file_id_userInterviewDetails_id_fk` FOREIGN KEY (`file_id`) REFERENCES `userInterviewDetails`(`id`) ON DELETE no action ON UPDATE no action;