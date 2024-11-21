import { ResidencyStates } from "@/lib/definitions";
import { timestamps } from "@/lib/sql";
import { relations } from "drizzle-orm";
import {
  boolean,
  char,
  date,
  index,
  int,
  json,
  mysqlTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: char("id", { length: 10 }).primaryKey(),
  ...timestamps,
  firstName: varchar("first_name", { length: 100 }).notNull(),
  middleName: varchar("middle_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified"),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  alternatePhoneNumber: varchar("alternate_phone_number", { length: 20 })
    .default(""),
  employeeName: varchar("employee_name", { length: 100 }).default(""),
  officeNumber: varchar("office_number", { length: 20 }).default(""),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("user"),
}, (table) => {
  return {
    idIdx: index("id_idx").on(table.id),
    emailIdx: uniqueIndex("email_idx").on(table.email),
    phoneIdx: uniqueIndex("phone_idx").on(table.phoneNumber),
    roleIdx: index("role_idx").on(table.role),
  };
});

export const userInterviewDetails = mysqlTable("userInterviewDetails", {
  id: int("id").autoincrement().primaryKey(),
  userId: char("user_id", { length: 10 }).notNull().references(() => users.id),
  fileNumber: char("file_number", { length: 20 }),
  firstName: varchar("first_name", { length: 100 }),
  middleName: varchar("middle_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }),
  ssn_or_itin: varchar("ssn_or_itin", { length: 20 }),
  currentAddress: varchar("current_address", { length: 255 }),
  currentCity: varchar("current_city", { length: 100 }),
  currentState: varchar("current_state", { length: 30 }),
  visaCategory: varchar("visa_category", { length: 50 }).notNull(),
  occupation: varchar("occupation", { length: 100 }),
  residencyStates: json().$type<ResidencyStates>(),
});

export const userDependentDetails = mysqlTable("userDependentDetails", {
  id: int("id").autoincrement().primaryKey(),
  userId: char("user_id", { length: 10 }).notNull().references(() => users.id),
  firstName: varchar("first_name", { length: 100 }),
  middleName: varchar("middle_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  relation: varchar("relation", { length: 50 }),
  dob: date("dob"),
  ssn_or_itin: varchar("ssn_or_itin", { length: 20 }),
});

export const userPreTaxDocs = mysqlTable("userPreTaxDocs", {
  id: int("id").autoincrement().primaryKey(),
  userId: char("user_id", { length: 10 }).notNull().references(() => users.id),
  documentType: varchar("document_type", { length: 100 }),
  documentTypeFile: char("document_file", { length: 10 }).references(() => documents.id),
  documentRemarks: text("document_file_remarks"),
});

export const userPostTaxDocs = mysqlTable("userPostTaxDocs", {
  id: int("id").autoincrement().primaryKey(),
  userId: char("user_id", { length: 10 }).notNull().references(() => users.id),
  documentType: varchar("document_type", { length: 100 }),
  documentTypeFile: char("document_file", { length: 10 }).references(() => documents.id),
  documentRemarks: text("document_file_remarks"),
});

export const userSourceIncDeduct = mysqlTable(
  "userSourceIncome_Deductions",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: char("user_id", { length: 10 }).notNull().references(() =>
      users.id
    ),
    wages: int("wages"),
    spouseWages: int("spouse_wages"),
    wagesFile: char("wages_file", { length: 10 }).references(() => documents.id),
    businessIncome: boolean("business_income"),
    spouseBusinessIncome: boolean("spouse_business_income"),
    businessIncomeFile: char("business_income_file", { length: 10 }).references(() => documents.id),
    rentalIncome: boolean("rental_income"),
    spouseRentalIncome: boolean("spouse_rental_income"),
    rentalIncomeFile: char("rental_income_file", { length: 10 }).references(() => documents.id),
    interestIncome: boolean("interest_income"),
    spouseInterestIncome: boolean("spouse_interest_income"),
    interestIncomeFile: char("interest_income_file", { length: 10 }).references(() => documents.id),
    dividendIncome: boolean("dividend_income"),
    spouseDividendIncome: boolean("spouse_dividend_income"),
    dividendIncomeFile: char("dividend_income_file", { length: 10 }).references(() => documents.id),
    saleOfStockCryInc: boolean("sale_of_st_cry_inc"),
    spouseSaleOfStockCryInc: boolean("spouse_sale_of_st_cry_inc"),
    saleOfStockCryIncFile: char("sale_of_st_cry_inc_file", { length: 10 }).references(() => documents.id),
    retirePlanIncome: boolean("retire_plan_income"),
    spouseRetirePlanIncome: boolean("spouse_retire_plan_income"),
    retirePlanIncomeFile: char("retire_plan_income_file", { length: 10 }).references(() => documents.id),
    mortgageInterest: boolean("mortgage_interest"),
    spouseMortgageInterest: boolean("spouse_mortgage_interest"),
    mortgageInterestFile: char("mortgage_interest_file", { length: 10 }).references(() => documents.id),
    propertyTax: boolean("property_tax"),
    spousePropertyTax: boolean("spouse_property_tax"),
    propertyTaxFile: char("property_tax_file", { length: 10 }).references(() => documents.id),
    charitableDonations: boolean("charitable_donations"),
    spouseCharitableDonations: boolean("spouse_charitable_donations"),
    charitableDonationsFile: char("charitable_donations_file", { length: 10 }).references(() => documents.id),
    medicalExpenses: boolean("medical_expenses"),
    spouseMedicalExpenses: boolean("spouse_medical_expenses"),
    medicalExpensesFile: char("medical_expenses_file", { length: 10 }).references(() => documents.id),
    studentLoanInterest: boolean("student_loan_interest"),
    spouseStudentLoanInterest: boolean("spouse_student_loan_interest"),
    studentLoanInterestFile: char("student_loan_interest_file", { length: 10 }).references(() => documents.id),
    educationExpenses: boolean("education_expenses"),
    spouseEducationExpenses: boolean("spouse_education_expenses"),
    educationExpensesFile: char("education_expenses_file", { length: 10 }).references(() => documents.id),
    fbar: boolean("fbar"),
    spouseFbar: boolean("spouse_fbar"),
    fbarFile: char("fbar_file", { length: 10 }).references(() => documents.id),
    fatca_pfic: boolean("fatca_pfic"),
    spouseFatca_pfic: boolean("spouse_fatca_pfic"),
    fatca_pfic_File: char("fatca_pfic_File", { length: 10 }).references(() => documents.id),
  },
);

export const userInterviewRelation = relations(
  userInterviewDetails,
  ({ one }) => ({
    user: one(users, {
      fields: [userInterviewDetails.userId],
      references: [users.id],
    }),
  }),
);

export const userDependentRelation = relations(
  userDependentDetails,
  ({ one }) => ({
    user: one(users, {
      fields: [userDependentDetails.userId],
      references: [users.id],
    }),
  }),
);

export const userPreTaxRelation = relations(users, ({ many }) => ({
  preTax: many(userPreTaxDocs),
}));

export const preTaxUserRelation = relations(userPreTaxDocs, ({ one }) => ({
  user: one(users, {
    fields: [userPreTaxDocs.userId],
    references: [users.id],
  }),
}));

export const userPTaxRelation = relations(users, ({ many }) => ({
  preTax: many(userPostTaxDocs),
}));

export const proTaxUserRelation = relations(userPostTaxDocs, ({ one }) => ({
  user: one(users, {
    fields: [userPostTaxDocs.userId],
    references: [users.id],
  }),
}));

export const userSourceIncomeRelation = relations(users, ({ many }) => ({
  preTax: many(userSourceIncDeduct),
}));

export const sourceIncomeUserRelation = relations(
  userSourceIncDeduct,
  ({ one }) => ({
    user: one(users, {
      fields: [userSourceIncDeduct.userId],
      references: [users.id],
    }),
  }),
);
export type { ResidencyStates };


export const documents = mysqlTable("documents", {
  id: char("id", { length: 10 }).primaryKey(),
  document: text("document")
})

export const userSourceIncome_DeductionsRelations = relations(userSourceIncDeduct, ({ one }) => ({
  wagesDocument: one(documents, {
    fields: [userSourceIncDeduct.wagesFile],
    references: [documents.id]
  }),

  businessIncomeDocument: one(documents, {
    fields: [userSourceIncDeduct.businessIncomeFile],
    references: [documents.id]
  }),

  rentalIncomeDocument: one(documents, {
    fields: [userSourceIncDeduct.rentalIncomeFile],
    references: [documents.id]
  }),

  interestIncomeDocument: one(documents, {
    fields: [userSourceIncDeduct.interestIncomeFile],
    references: [documents.id]
  }),

  dividendIncomeDocument: one(documents, {
    fields: [userSourceIncDeduct.dividendIncomeFile],
    references: [documents.id]
  }),

  saleOfStockCryptoIncomeDocument: one(documents, {
    fields: [userSourceIncDeduct.saleOfStockCryIncFile],
    references: [documents.id]
  }),

  retirePlanIncomeDocument: one(documents, {
    fields: [userSourceIncDeduct.retirePlanIncomeFile],
    references: [documents.id]
  }),

  mortgageInterestDocument: one(documents, {
    fields: [userSourceIncDeduct.mortgageInterestFile],
    references: [documents.id]
  }),

  propertyTaxDocument: one(documents, {
    fields: [userSourceIncDeduct.propertyTaxFile],
    references: [documents.id]
  }),

  charitableDonationsDocument: one(documents, {
    fields: [userSourceIncDeduct.charitableDonationsFile],
    references: [documents.id]
  }),

  medicalExpensesDocument: one(documents, {
    fields: [userSourceIncDeduct.medicalExpensesFile],
    references: [documents.id]
  }),

  studentLoanInterestDocument: one(documents, {
    fields: [userSourceIncDeduct.studentLoanInterestFile],
    references: [documents.id]
  }),

  educationExpensesDocument: one(documents, {
    fields: [userSourceIncDeduct.educationExpensesFile],
    references: [documents.id]
  }),

  fbarDocument: one(documents, {
    fields: [userSourceIncDeduct.fbarFile],
    references: [documents.id]
  }),

  fatcaPficDocument: one(documents, {
    fields: [userSourceIncDeduct.fatca_pfic_File],
    references: [documents.id]
  })
}));

export const documentsRelations = relations(documents, ({ many }) => ({
  userSourceIncome_Deductions: many(userSourceIncDeduct)
}));