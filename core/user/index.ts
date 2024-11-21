import {
  documents,
  ResidencyStates,
  userDependentDetails,
  userInterviewDetails,
  userPostTaxDocs,
  userPreTaxDocs,
  users,
  userSourceIncDeduct,
} from "./schema";
import { z } from "zod";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";
import { hashPassword, id } from "@/lib/sql";
import {
  changePasswordSchema,
  interviewFormSchema,
  loginSchema,
  prePostTaxDocsSchema,
  userRegistrationSchema,
} from "@/lib/definitions";

export const register = async (
  input: z.infer<typeof userRegistrationSchema>,
) => {
  const userId = id();
  await db.insert(users).values({
    id: userId,
    firstName: input.firstName,
    middleName: input.middleName,
    lastName: input.lastName,
    email: input.email,
    phoneNumber: input.phoneNumber,
    officeNumber: input.officeNumber,
    password: await hashPassword(input.password),
  }).execute();
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
    .execute();
  await createSession(user[0]);
};

export type User = typeof users.$inferSelect;

export const login = async (input: z.infer<typeof loginSchema>) => {
  const userRes = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1)
    .execute();
  if (userRes.length === 0) {
    throw new Error("User not found");
  }
  const user = userRes[0];
  const isPasswordValid = await bcrypt.compare(
    input.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  await createSession(user);
};

export const getPersonalDetails = async (userId: string) => {
  const result = await db.select({
    firstName: users.firstName,
    middleName: users.middleName,
    lastName: users.lastName,
    email: users.email,
    alternatePhoneNumber: users.alternatePhoneNumber,
    employeeName: users.employeeName,
    phoneNumber: users.phoneNumber,
  }).from(users).where(eq(users.id, userId));
  return result[0];
};

export type personalDetialsUpdate = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  alternatePhoneNumber?: string;
  employeeName?: string;
};

export const updatePersonalDetails = async (
  userId: string,
  updatedData: personalDetialsUpdate,
) => {
  await db.update(users)
    .set({ ...updatedData, id: userId })
    .where(eq(users.id, userId))
    .execute();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const interviewSchema = interviewFormSchema.extend({
  id: z.string(),
});

export type InterviewFormPayload = z.infer<typeof interviewSchema>;

export const submitInterviewSheet = async (
  i: InterviewFormPayload,
) => {
  const residencyStates: ResidencyStates = { states: i.residencyStates };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dependentInsert: any = i.dependentDetails.map((dependent) => ({
    userId: i.id,
    firstName: dependent.firstName,
    middleName: dependent.middleName,
    lastName: dependent.lastName,
    relation: dependent.relation,
    dob: dependent.dob,
    ssn_or_itin: dependent.ssn,
  }));

  const call1 = db.insert(userInterviewDetails).values({
    userId: i.id,
    firstName: i.firstName,
    spouseFirstName: i.spouseFirstName,
    middleName: i.middleName,
    spouseMiddleName: i.spouseMiddleName,
    lastName: i.lastName,
    spouseLastName: i.spouseLastName,
    spouseEmail: i.spouseEmail,
    spousePhoneNumber: i.spousePhoneNumber,
    ssn_or_itin: i.ssn,
    spouse_ssn_or_itin: i.spouseSsn,
    dob: new Date(i.dob),
    spouseDob: i.spouseDob ? new Date(i.spouseDob) : undefined,
    currentAddress: i.currentAddress,
    currentCity: i.currentCity,
    currentState: i.currentState,
    currentZipcode: i.zipCode,
    visaCategory: i.visaCategory,
    occupation: i.occupation,
    spouseOccupation: i.spouseOccupation,
    residencyStates: residencyStates,
  }).$returningId().execute();

  const call2 = db.insert(userDependentDetails).values(dependentInsert)
    .execute();

  const call3 = db.insert(userSourceIncDeduct).values({
    userId: i.id,

    wages: i.wages,
    spouseWages: i.spouseWages,
    wagesFile: i.wagesFile,

    businessIncome: i.businessIncome,
    spouseBusinessIncome: i.spouseBusinessIncome,
    businessIncomeFile: i.businessIncomeFile,

    rentalIncome: i.rentalIncome,
    spouseRentalIncome: i.spouseRentalIncome,
    rentalIncomeFile: i.rentalIncomeFile,

    interestIncome: i.interestIncome,
    spouseInterestIncome: i.spouseInterestIncome,
    interestIncomeFile: i.interestIncomeFile,

    dividendIncome: i.dividendIncome,
    spouseDividendIncome: i.spouseDividendIncome,
    dividendIncomeFile: i.dividendIncomeFile,

    saleOfStockCryInc: i.saleOfStock_CryptoIncome,
    spouseSaleOfStockCryInc: i.spouseSaleOfStock_CryptoIncome,
    saleOfStockCryIncFile: i.saleOfStock_CryptoIncomeFile,

    retirePlanIncome: i.retirePlanIncome,
    spouseRetirePlanIncome: i.spouseRetirePlanIncome,
    retirePlanIncomeFile: i.retirePlanIncomeFile,

    mortgageInterest: i.mortgageInterest,
    spouseMortgageInterest: i.spouseMortgageInterest,
    mortgageInterestFile: i.mortgageInterestFile,

    propertyTax: i.propertyTax,
    spousePropertyTax: i.spousePropertyTax,
    propertyTaxFile: i.propertyTaxFile,

    charitableDonations: i.charitableDonations,
    spouseCharitableDonations: i.spouseCharitableDonations,
    charitableDonationsFile: i.charitableDonationsFile,

    medicalExpenses: i.medicalExpenses,
    spouseMedicalExpenses: i.spouseMedicalExpenses,
    medicalExpensesFile: i.medicalExpensesFile,

    studentLoanInterest: i.studentLoanInterest,
    spouseStudentLoanInterest: i.spouseStudentLoanInterest,
    studentLoanInterestFile: i.studentLoanInterestFile,

    educationExpenses: i.educationExpenses,
    spouseEducationExpenses: i.spouseEducationExpenses,
    educationExpensesFile: i.educationExpensesFile,

    fbar: i.fbar,
    spouseFbar: i.spouseFbar,
    fbarFile: i.fbarFile,

    fatca_pfic: i.fatca_pfic,
    spouseFatca_pfic: i.spouseFatca_pfic,
    fatca_pfic_File: i.fatca_pfic_File,
  }).execute();

  const [data1] = await Promise.all([call1, call2, call3]);
  const fileId = data1[0].id;

  await db.update(userInterviewDetails).set({
    fileNumber: `${new Date().toISOString().split("-")[0]}-${
      fileId.toString().padStart(5, "0")
    }`,
  }).where(eq(userInterviewDetails.userId, i.id)).execute();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prePostDocsSchema = prePostTaxDocsSchema.extend({
  userId: z.string(),
});

export type PrePostTaxPayload = z.infer<typeof prePostDocsSchema>;

export const submitPreTaxDocs = async (
  i: PrePostTaxPayload,
) => {
  return await db.insert(userPreTaxDocs).values({
    userId: i.userId,
    documentType: i.documentType,
    documentTypeFile: i.documentTypeFile,
    documentRemarks: i.documentRemarks,
  }).execute();
};

export const submitPostTaxDocs = async (
  i: PrePostTaxPayload,
) => {
  return await db.insert(userPostTaxDocs).values({
    userId: i.userId,
    documentType: i.documentType,
    documentTypeFile: i.documentTypeFile,
    documentRemarks: i.documentRemarks,
  }).execute();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const changePassSchema = changePasswordSchema.extend({
  id: z.string(),
});

export type ChangePasswordInput = z.infer<typeof changePassSchema>;

export const changePassword = async (i: ChangePasswordInput) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, i.id),
  });
  if (!user) {
    throw Error("No user found");
  }
  const validPass = await bcrypt.compare(i.currentPass, user.password);
  if (!validPass) {
    throw Error("invalid password");
  }
  await db.update(users)
    .set({ password: await hashPassword(i.newPass) })
    .where(eq(users.id, i.id))
    .execute();
};

export const uplaodDocument = async (doc: string): Promise<string> => {
  try {
    const newId = crypto.randomUUID().split("-")[0];
    await db.insert(documents).values({
      id: newId,
      document: doc,
    }).$returningId().execute();
    return newId;
  } catch {
    throw new Error("failed to uplaod document");
  }
};
