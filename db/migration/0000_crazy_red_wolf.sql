CREATE TABLE `documents` (
	`id` char(10) NOT NULL,
	`document` text,
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userDependentDetails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` char(10) NOT NULL,
	`first_name` varchar(100),
	`middle_name` varchar(100),
	`last_name` varchar(100),
	`relation` varchar(50),
	`dob` date,
	`ssn_or_itin` varchar(20),
	CONSTRAINT `userDependentDetails_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userInterviewDetails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` char(10) NOT NULL,
	`file_number` char(20),
	`first_name` varchar(100),
	`middle_name` varchar(100) NOT NULL,
	`last_name` varchar(100),
	`ssn_or_itin` varchar(20),
	`current_address` varchar(255),
	`current_city` varchar(100),
	`current_state` varchar(30),
	`visa_category` varchar(50) NOT NULL,
	`occupation` varchar(100),
	`residencyStates` json,
	CONSTRAINT `userInterviewDetails_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userPostTaxDocs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` char(10) NOT NULL,
	`document_type` varchar(100),
	`document_file` char(10),
	`document_file_remarks` text,
	CONSTRAINT `userPostTaxDocs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userPreTaxDocs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` char(10) NOT NULL,
	`document_type` varchar(100),
	`document_file` char(10),
	`document_file_remarks` text,
	CONSTRAINT `userPreTaxDocs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userSourceIncDeduct` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` char(10) NOT NULL,
	`wages` int,
	`spouse_wages` int,
	`wages_file` char(10),
	`business_income` boolean,
	`spouse_business_income` boolean,
	`business_income_file` char(10),
	`rental_income` boolean,
	`spouse_rental_income` boolean,
	`rental_income_file` char(10),
	`interest_income` boolean,
	`spouse_interest_income` boolean,
	`interest_income_file` char(10),
	`dividend_income` boolean,
	`spouse_dividend_income` boolean,
	`dividend_income_file` char(10),
	`sale_of_st_cry_inc` boolean,
	`spouse_sale_of_st_cry_inc` boolean,
	`sale_of_st_cry_inc_file` char(10),
	`retire_plan_income` boolean,
	`spouse_retire_plan_income` boolean,
	`retire_plan_income_file` char(10),
	`mortgage_interest` boolean,
	`spouse_mortgage_interest` boolean,
	`mortgage_interest_file` char(10),
	`property_tax` boolean,
	`spouse_property_tax` boolean,
	`property_tax_file` char(10),
	`charitable_donations` boolean,
	`spouse_charitable_donations` boolean,
	`charitable_donations_file` char(10),
	`medical_expenses` boolean,
	`spouse_medical_expenses` boolean,
	`medical_expenses_file` char(10),
	`student_loan_interest` boolean,
	`spouse_student_loan_interest` boolean,
	`student_loan_interest_file` char(10),
	`education_expenses` boolean,
	`spouse_education_expenses` boolean,
	`education_expenses_file` char(10),
	`fbar` boolean,
	`spouse_fbar` boolean,
	`fbar_file` char(10),
	`fatca_pfic` boolean,
	`spouse_fatca_pfic` boolean,
	`fatca_pfic_File` char(10),
	CONSTRAINT `userSourceIncDeduct_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` char(10) NOT NULL,
	`time_created` timestamp(3) NOT NULL DEFAULT (now()),
	`time_updated` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`time_deleted` timestamp(3),
	`first_name` varchar(100) NOT NULL,
	`middle_name` varchar(100),
	`last_name` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean,
	`phone_number` varchar(20) NOT NULL,
	`alternate_phone_number` varchar(20) DEFAULT '',
	`employee_name` varchar(100) DEFAULT '',
	`office_number` varchar(20) DEFAULT '',
	`password` varchar(255) NOT NULL,
	`role` varchar(50) NOT NULL DEFAULT 'user',
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `email_idx` UNIQUE(`email`),
	CONSTRAINT `phone_idx` UNIQUE(`phone_number`)
);
--> statement-breakpoint
ALTER TABLE `userDependentDetails` ADD CONSTRAINT `userDependentDetails_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userInterviewDetails` ADD CONSTRAINT `userInterviewDetails_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userPostTaxDocs` ADD CONSTRAINT `userPostTaxDocs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userPostTaxDocs` ADD CONSTRAINT `userPostTaxDocs_document_file_documents_id_fk` FOREIGN KEY (`document_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userPreTaxDocs` ADD CONSTRAINT `userPreTaxDocs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userPreTaxDocs` ADD CONSTRAINT `userPreTaxDocs_document_file_documents_id_fk` FOREIGN KEY (`document_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_wages_file_documents_id_fk` FOREIGN KEY (`wages_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_business_income_file_documents_id_fk` FOREIGN KEY (`business_income_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_rental_income_file_documents_id_fk` FOREIGN KEY (`rental_income_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_interest_income_file_documents_id_fk` FOREIGN KEY (`interest_income_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_dividend_income_file_documents_id_fk` FOREIGN KEY (`dividend_income_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_sale_of_st_cry_inc_file_documents_id_fk` FOREIGN KEY (`sale_of_st_cry_inc_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_retire_plan_income_file_documents_id_fk` FOREIGN KEY (`retire_plan_income_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_mortgage_interest_file_documents_id_fk` FOREIGN KEY (`mortgage_interest_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_property_tax_file_documents_id_fk` FOREIGN KEY (`property_tax_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_charitable_donations_file_documents_id_fk` FOREIGN KEY (`charitable_donations_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_medical_expenses_file_documents_id_fk` FOREIGN KEY (`medical_expenses_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_student_loan_interest_file_documents_id_fk` FOREIGN KEY (`student_loan_interest_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_education_expenses_file_documents_id_fk` FOREIGN KEY (`education_expenses_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_fbar_file_documents_id_fk` FOREIGN KEY (`fbar_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncDeduct` ADD CONSTRAINT `userSourceIncDeduct_fatca_pfic_File_documents_id_fk` FOREIGN KEY (`fatca_pfic_File`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `id_idx` ON `users` (`id`);--> statement-breakpoint
CREATE INDEX `role_idx` ON `users` (`role`);