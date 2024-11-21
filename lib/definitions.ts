import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(255, "Password must be 255 characters or fewer")
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character",
  );

export const interviewFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  middleName: z.string(),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  ssn: z.string().min(9, { message: "SSN must be at least 9 characters." }),
  dob: z.string(),
  visaCategory: z.string(),
  occupation: z.string(),
  currentAddress: z.string(),
  currentCity: z.string(),
  currentState: z.string(),
  zipCode: z.string(),

  dependentDetails: z.array(z.object({
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    relation: z.string(),
    dob: z.string(),
    ssn: z.string(),
  })),
  residencyStates: z.array(z.string()),

  wages: z.number(),
  spouseWages: z.number(),
  wagesFile: z.string(),

  businessIncome: z.boolean(),
  spouseBusinessIncome: z.boolean(),
  businessIncomeFile: z.string(),

  rentalIncome: z.boolean(),
  spouseRentalIncome: z.boolean(),
  rentalIncomeFile: z.string(),

  interestIncome: z.boolean(),
  spouseInterestIncome: z.boolean(),
  interestIncomeFile: z.string(),

  dividendIncome: z.boolean(),
  spouseDividendIncome: z.boolean(),
  dividendIncomeFile: z.string(),

  saleOfStock_CryptoIncome: z.any(),
  spouseSaleOfStock_CryptoIncome: z.any(),
  saleOfStock_CryptoIncomeFile: z.string(),

  retirePlanIncome: z.boolean(),
  spouseRetirePlanIncome: z.boolean(),
  retirePlanIncomeFile: z.string(),

  mortgageInterest: z.boolean(),
  spouseMortgageInterest: z.boolean(),
  mortgageInterestFile: z.string(),

  propertyTax: z.boolean(),
  spousePropertyTax: z.boolean(),
  propertyTaxFile: z.string(),

  charitableDonations: z.boolean(),
  spouseCharitableDonations: z.boolean(),
  charitableDonationsFile: z.string(),

  medicalExpenses: z.boolean(),
  spouseMedicalExpenses: z.boolean(),
  medicalExpensesFile: z.string(),

  studentLoanInterest: z.boolean(),
  spouseStudentLoanInterest: z.boolean(),
  studentLoanInterestFile: z.string(),

  educationExpenses: z.boolean(),
  spouseEducationExpenses: z.boolean(),
  educationExpensesFile: z.string(),

  fbar: z.boolean(),
  spouseFbar: z.boolean(),
  fbarFile: z.string(),

  fatca_pfic: z.boolean(),
  spouseFatca_pfic: z.boolean(),
  fatca_pfic_File: z.string(),
});

export const userRegistrationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  email: z.string().email("Invalid email format"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be 20 digits or fewer")
    .regex(/^[0-9]+$/, "Phone number should contain only digits"),
  officeNumber: z
    .string()
    .min(10, "Office number must be at least 10 digits")
    .max(20, "Office number must be 20 digits or fewer")
    .regex(/^[0-9]+$/, "Office number should contain only digits")
    .optional(),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const prePostTaxDocsSchema = z.object({
  documentType: z.string(),
  documentTypeFile: z.string(),
  documentRemarks: z.string().optional(),
});

export const changePasswordSchema = z.object({
  currentPass: passwordSchema,
  newPass: passwordSchema,
});

export type ResidencyStates = {
  states: string[];
};
