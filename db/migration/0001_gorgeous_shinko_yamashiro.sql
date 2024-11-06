ALTER TABLE `users` MODIFY COLUMN `id` char(10) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `email_verified` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `role` varchar(50) DEFAULT 'user' NOT NULL;