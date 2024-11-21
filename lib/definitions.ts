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
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  middleName: z.string(),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  ssn: z.string().min(9, { message: "SSN must be at least 9 characters." }),
  dob: z.string(),
  spouseFirstName: z.string().optional(),
  spouseMiddleName: z.string().optional(),
  spouseLastName: z.string().optional(),
  spouseEmail: z.string().email().optional(),
  spousePhoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(20, { message: "Phone number must be 20 digits or fewer." })
    .regex(/^[0-9]+$/, "Phone number should contain only digits")
    .optional(),
  spouseSsn: z.string().min(9, {
    message: "SSN must be at least 9 characters.",
  }).optional(),
  spouseDob: z.string().optional(),
  visaCategory: z.string(),
  occupation: z.string(),
  spouseOccupation: z.string().optional(),
  currentAddress: z.string(),
  currentCity: z.string(),
  currentState: z.string(),
  zipCode: z.string(),

  dependentDetails: z.array(
    z.object({
      firstName: z.string(),
      middleName: z.string().optional(),
      lastName: z.string(),
      relation: z.string(),
      dob: z.string(),
      ssn: z.string(),
    }),
  ),

  residencyStates: z.array(z.string()),

  wages: z.number(),
  spouseWages: z.number().optional(),
  wagesFile: z.string().nullable(),

  businessIncome: z.number(),
  spouseBusinessIncome: z.number().optional(),
  businessIncomeFile: z.string().nullable(),

  rentalIncome: z.number(),
  spouseRentalIncome: z.number().optional(),
  rentalIncomeFile: z.string().nullable(),

  interestIncome: z.number(),
  spouseInterestIncome: z.number().optional(),
  interestIncomeFile: z.string().nullable(),

  dividendIncome: z.number(),
  spouseDividendIncome: z.number().optional(),
  dividendIncomeFile: z.string().nullable(),

  saleOfStock_CryptoIncome: z.number(),
  spouseSaleOfStock_CryptoIncome: z.number().optional(),
  saleOfStock_CryptoIncomeFile: z.string().nullable(),

  retirePlanIncome: z.number(),
  spouseRetirePlanIncome: z.number().optional(),
  retirePlanIncomeFile: z.string().nullable(),

  mortgageInterest: z.number(),
  spouseMortgageInterest: z.number().optional(),
  mortgageInterestFile: z.string().nullable(),

  propertyTax: z.number(),
  spousePropertyTax: z.number().optional(),
  propertyTaxFile: z.string().nullable(),

  charitableDonations: z.number(),
  spouseCharitableDonations: z.number().optional(),
  charitableDonationsFile: z.string().nullable(),

  medicalExpenses: z.number(),
  spouseMedicalExpenses: z.number().optional(),
  medicalExpensesFile: z.string().nullable(),

  studentLoanInterest: z.number(),
  spouseStudentLoanInterest: z.number().optional(),
  studentLoanInterestFile: z.string().nullable(),

  educationExpenses: z.number(),
  spouseEducationExpenses: z.number().optional(),
  educationExpensesFile: z.string().nullable(),

  fbar: z.boolean(),
  spouseFbar: z.boolean().optional(),
  fbarFile: z.string().nullable(),

  fatca_pfic: z.boolean(),
  spouseFatca_pfic: z.boolean().optional(),
  fatca_pfic_File: z.string().nullable(),
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
