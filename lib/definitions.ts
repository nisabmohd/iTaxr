import { z } from 'zod'

//max size is 2 mb
const MAX_FILE_SIZE = 2000000;

function checkFile(file: File) {
  if (file?.name) {
    const type = file.name.split(".").pop()
    if (type === 'docx' || type === 'pdf') return true
  }
  return false
}

const fileSchema = z.any()
  .refine((file: File) => file?.size > MAX_FILE_SIZE, 'File should be less than 2 mb')
  .refine((file) => checkFile(file), "Only .pdf, .docx formats are supported.")

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
  wagesFile: fileSchema,

  businessIncome: z.boolean(),
  businessIncomeFile: fileSchema,

  rentalIncome: z.boolean(),
  rentalIncomeFile: fileSchema,

  interestIncome: z.boolean(),
  interestIncomeFile: fileSchema,

  dividendIncome: z.boolean(),
  dividendIncomeFile: fileSchema,

  saleOfStock_CryptoIncome: z.any(),
  saleOfStock_CryptoIncomeFile: fileSchema,

  retirePlanIncome: z.boolean(),
  retirePlanIncomeFile: fileSchema,

  mortgageInterest: z.boolean(),
  mortgageInterestFile: fileSchema,


  propertyTax: z.boolean(),
  propertyTaxFile: fileSchema,

  charitableDonations: z.boolean(),
  charitableDonationsFile: fileSchema,

  medicalExpenses: z.boolean(),
  medicalExpensesFile: fileSchema,

  studentLoanInterest: z.boolean(),
  studentLoanInterestFile: fileSchema,

  educationExpenses: z.boolean(),
  educationExpensesFile: fileSchema,

  fbar: z.boolean(),
  fbarFile: fileSchema,

  fatca_pfic: z.boolean(),
  fatca_pfic_File: fileSchema
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
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must be 255 characters or fewer")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});