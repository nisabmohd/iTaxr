import { ResidencyStates } from "@/lib/definitions";
import { timestamps } from "@/lib/sql";
import { relations } from "drizzle-orm";
import { mysqlTable, varchar, boolean, char, index, uniqueIndex, serial, date, json, int, text } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: char("id", { length: 10 }).primaryKey(),
  ...timestamps,
  firstName: varchar("first_name", { length: 100 }).notNull(),
  middleName: varchar("middle_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified"),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  alternatePhoneNumber: varchar("alternate_phone_number", { length: 20 }).default(''),
  employeeName: varchar("employee_name", { length: 100 }).default(''),
  officeNumber: varchar("office_number", { length: 20 }).default(''),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("user"),
}, (table) => {
  return {
    idIdx: index("id_idx").on(table.id),
    emailIdx: uniqueIndex("email_idx").on(table.email),
    phoneIdx: uniqueIndex("phone_idx").on(table.phoneNumber),
    roleIdx: index("role_idx").on(table.role),
  }
});

export const userInterviewDetails = mysqlTable("userInterviewDetails", {
  id: int("id").autoincrement().primaryKey(),
  userId: char("user_id", { length: 10 }).notNull().references(() => users.id),
  firstName: varchar("first_name", { length: 100 }),
  middleName: varchar("middle_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }),
  ssn_or_itin: varchar("ssn_or_itin", { length: 20 }),
  currentAddress: varchar("current_address", { length: 255 }),
  currentCity: varchar("current_city", { length: 100 }),
  currentState: varchar("current_state", { length: 30 }),
  visaCategory: varchar("visa_category", { length: 50 }).notNull(),
  occupation: varchar("occupation", { length: 100 }),
  residencyStates: json().$type<ResidencyStates>()
})

export const userDependentDetails = mysqlTable("userDependentDetails", {
  id: int("id").autoincrement().primaryKey(),
  userId: char("user_id", { length: 10 }).notNull().references(() => users.id),
  firstName: varchar("first_name", { length: 100 }),
  middleName: varchar("middle_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  relation: varchar("relation", { length: 50 }),
  dob: date("dob"),
  ssn_or_itin: varchar("ssn_or_itin", { length: 20 })
})

export const userPreTaxDocs = mysqlTable("userPreTaxDocs", {
  id: int("id").autoincrement().primaryKey(),
  userId: char("user_id", { length: 10 }).notNull().references(() => users.id),
  documentType: varchar("document_type", { length: 100 }),
  documentTypeFile: text("document_file"),
  documentRemarks: text("document_file_remarks")
})

export const userPostTaxDocs = mysqlTable("userPostTaxDocs", {
  id: int("id").autoincrement().primaryKey(),
  userId: char("user_id", { length: 10 }).notNull().references(() => users.id),
  documentType: varchar("document_type", { length: 100 }),
  documentTypeFile: text("document_file"),
  documentRemarks: text("document_file_remarks"),
})

export const userSourceIncome_Deductions = mysqlTable("userSourceIncome_Deductions", {
  id: int("id").autoincrement().primaryKey(),
  userId: char("user_id", { length: 10 }).notNull().references(() => users.id),
  wages: int("wages"),
  wagesFile: text("wages_file"),
  businessIncome: boolean("business_income"),
  businessIncomeFile: text("business_income_file"),
  rentalIncome: boolean("rental_income"),
  rentalIncomeFile: text("rental_income_file"),
  interestIncome: boolean("interest_income"),
  interestIncomeFile: text("interest_income_file"),
  dividendIncome: boolean("dividend_income"),
  dividendIncomeFile: text("dividend_income_file"),
  saleOfStock_CryptoIncome: boolean("sale_of_stock_crypto_income"),
  saleOfStock_CryptoIncomeFile: text("sale_of_stock_crypto_income_file"),
  retirePlanIncome: boolean("retire_plan_income"),
  retirePlanIncomeFile: text("retire_plan_income_file"),
  mortgageInterest: boolean("mortgage_interest"),
  mortgageInterestFile: text("mortgage_interest_file"),
  propertyTax: boolean("property_tax"),
  propertyTaxFile: text("property_tax_file"),
  charitableDonations: boolean("charitable_donations"),
  charitableDonationsFile: text("charitable_donations_file"),
  medicalExpenses: boolean("medical_expenses"),
  medicalExpensesFile: text("medical_expenses_file"),
  studentLoanInterest: boolean("student_loan_interest"),
  studentLoanInterestFile: text("student_loan_interest_file"),
  educationExpenses: boolean("education_expenses"),
  educationExpensesFile: text("education_expenses_file"),
  fbar: boolean("fbar"),
  fbarFile: text("fbar_file"),
  fatca_pfic: boolean("fatca_pfic"),
  fatca_pfic_File: text("fatca_pfic_File"),
})


export const userInterviewRelation = relations(userInterviewDetails, ({ one }) => ({
  user: one(users, {
    fields: [userInterviewDetails.userId],
    references: [users.id]
  })
}))

export const userDependentRelation = relations(userDependentDetails, ({ one }) => ({
  user: one(users, {
    fields: [userDependentDetails.userId],
    references: [users.id]
  })
}))

export const userPreTaxRelation = relations(users, ({ many }) => ({
  preTax: many(userPreTaxDocs)
}))

export const preTaxUserRelation = relations(userPreTaxDocs, ({ one }) => ({
  user: one(users, {
    fields: [userPreTaxDocs.userId],
    references: [users.id]
  })
}))

export const userPTaxRelation = relations(users, ({ many }) => ({
  preTax: many(userPostTaxDocs)
}))

export const proTaxUserRelation = relations(userPostTaxDocs, ({ one }) => ({
  user: one(users, {
    fields: [userPostTaxDocs.userId],
    references: [users.id]
  })
}))

export const userSourceIncomeRelation = relations(users, ({ many }) => ({
  preTax: many(userSourceIncome_Deductions)
}))

export const sourceIncomeUserRelation = relations(userSourceIncome_Deductions, ({ one }) => ({
  user: one(users, {
    fields: [userSourceIncome_Deductions.userId],
    references: [users.id]
  })
}))
export type { ResidencyStates };

