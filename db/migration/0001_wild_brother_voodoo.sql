CREATE TABLE `documents` (
	`id` char(10) NOT NULL,
	`document` text,
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `userInterviewDetails` MODIFY COLUMN `file_number` char(20);--> statement-breakpoint
ALTER TABLE `userPostTaxDocs` MODIFY COLUMN `document_file` char(10);--> statement-breakpoint
ALTER TABLE `userPreTaxDocs` MODIFY COLUMN `document_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `wages_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `business_income_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `rental_income_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `interest_income_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `dividend_income_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `sale_of_stock_crypto_income_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `retire_plan_income_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `mortgage_interest_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `property_tax_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `charitable_donations_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `medical_expenses_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `student_loan_interest_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `education_expenses_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `fbar_file` char(10);--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` MODIFY COLUMN `fatca_pfic_File` char(10);--> statement-breakpoint
ALTER TABLE `userPostTaxDocs` ADD CONSTRAINT `userPostTaxDocs_document_file_documents_id_fk` FOREIGN KEY (`document_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userPreTaxDocs` ADD CONSTRAINT `userPreTaxDocs_document_file_documents_id_fk` FOREIGN KEY (`document_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_wages_file_documents_id_fk` FOREIGN KEY (`wages_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_business_income_file_documents_id_fk` FOREIGN KEY (`business_income_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_rental_income_file_documents_id_fk` FOREIGN KEY (`rental_income_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_interest_income_file_documents_id_fk` FOREIGN KEY (`interest_income_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_dividend_income_file_documents_id_fk` FOREIGN KEY (`dividend_income_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_sale_of_stock_crypto_income_file_documents_id_fk` FOREIGN KEY (`sale_of_stock_crypto_income_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_retire_plan_income_file_documents_id_fk` FOREIGN KEY (`retire_plan_income_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_mortgage_interest_file_documents_id_fk` FOREIGN KEY (`mortgage_interest_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_property_tax_file_documents_id_fk` FOREIGN KEY (`property_tax_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_charitable_donations_file_documents_id_fk` FOREIGN KEY (`charitable_donations_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_medical_expenses_file_documents_id_fk` FOREIGN KEY (`medical_expenses_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_student_loan_interest_file_documents_id_fk` FOREIGN KEY (`student_loan_interest_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_education_expenses_file_documents_id_fk` FOREIGN KEY (`education_expenses_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_fbar_file_documents_id_fk` FOREIGN KEY (`fbar_file`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSourceIncome_Deductions` ADD CONSTRAINT `userSourceIncome_Deductions_fatca_pfic_File_documents_id_fk` FOREIGN KEY (`fatca_pfic_File`) REFERENCES `documents`(`id`) ON DELETE no action ON UPDATE no action;