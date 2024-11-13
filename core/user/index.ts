import { ResidencyStates, userDependentDetails, userInterviewDetails, userPostTaxDocs, userPreTaxDocs, users, userSourceIncome_Deductions } from "./user.sql";
import { z } from "zod";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { hashPassword, id } from "@/lib/sql";
import { changePasswordSchema, interviewFormSchema, loginSchema, prePostTaxDocsSchema, userRegistrationSchema } from "@/lib/definitions";

export const register = async (
  input: z.infer<typeof userRegistrationSchema>
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
  }).execute()
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
    .execute();
  await createSession(user[0]);
  redirect("/");
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
    user.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  await createSession(user);
  redirect("/");
};


export const getPersonalDetails = async (userId: string) => {
  const result = await db.select({
    firstName: users.firstName,
    middleName: users.middleName,
    lastName: users.lastName,
    email: users.email,
    alternatePhoneNumber: users.alternatePhoneNumber,
    employeeName: users.employeeName,
  }).from(users).where(eq(users.id, userId))
  return result[0]
}

type personalDetialsUpdate = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  alternatePhoneNumber?: string;
  employeeName?: string;
}

export const updatePersonalDetails = async (userId: string, updatedData: personalDetialsUpdate) => {
  await db.update(users)
    .set({ ...updatedData, id: userId })
    .where(eq(users.id, userId))
    .execute();
};

const interviewSchema = interviewFormSchema.extend({
  id: z.string()
})

export const submitInterviewSheet = async (i: z.infer<typeof interviewSchema>) => {

  const residencyStates: ResidencyStates = { states: i.residencyStates }
  const dependentInsert: any = i.dependentDetails.map(dependent => ({
    userId: i.id,
    firstName: dependent.firstName,
    middleName: dependent.middleName,
    lastName: dependent.lastName,
    relation: dependent.relation,
    dob: dependent.dob,
    ssn_or_itin: dependent.ssn,
  }))

  const call1 = db.insert(userInterviewDetails).values({
    userId: i.id,
    firstName: i.firstName,
    middleName: i.middleName,
    lastName: i.lastName,
    ssn_or_itin: i.ssn,
    currentAddress: i.currentAddress,
    currentCity: i.currentCity,
    currentState: i.currentState,
    visaCategory: i.visaCategory,
    occupation: i.occupation,
    residencyStates: residencyStates,
  }).execute()

  const call2 = db.insert(userDependentDetails).values(dependentInsert).execute()

  const call3 = db.insert(userSourceIncome_Deductions).values({
    userId: i.id,

    wages: i.wages,
    wagesFile: i.wagesFile,

    businessIncome: i.businessIncome,
    businessIncomeFile: i.businessIncomeFile,

    rentalIncome: i.rentalIncome,
    rentalIncomeFile: i.rentalIncomeFile,

    interestIncome: i.interestIncome,
    interestIncomeFile: i.interestIncomeFile,

    dividendIncome: i.dividendIncome,
    dividendIncomeFile: i.dividendIncomeFile,

    saleOfStock_CryptoIncome: i.saleOfStock_CryptoIncome,
    saleOfStock_CryptoIncomeFile: i.saleOfStock_CryptoIncomeFile,

    retirePlanIncome: i.retirePlanIncome,
    retirePlanIncomeFile: i.retirePlanIncomeFile,

    mortgageInterest: i.mortgageInterest,
    mortgageInterestFile: i.mortgageInterestFile,

    propertyTax: i.propertyTax,
    propertyTaxFile: i.propertyTaxFile,

    charitableDonations: i.charitableDonations,
    charitableDonationsFile: i.charitableDonationsFile,

    medicalExpenses: i.medicalExpenses,
    medicalExpensesFile: i.medicalExpensesFile,

    studentLoanInterest: i.studentLoanInterest,
    studentLoanInterestFile: i.studentLoanInterestFile,

    educationExpenses: i.educationExpenses,
    educationExpensesFile: i.educationExpensesFile,

    fbar: i.fbar,
    fbarFile: i.fbarFile,

    fatca_pfic: i.fatca_pfic,
    fatca_pfic_File: i.fatca_pfic_File,
  }).execute()

  await Promise.all([call1, call2, call3])
}

const prePostDocsSchema = prePostTaxDocsSchema.extend({
  id: z.string()
})

export const submitPreTaxDocs = async (i: z.infer<typeof prePostDocsSchema>) => {
  return await db.insert(userPreTaxDocs).values({
    userId: i.id,
    documentType: i.documentType,
    documentTypeFile: i.documentTypeFile,
    documentRemarks: i.documentRemarks,
  }).execute()
}

export const submitPostTaxDocs = async (i: z.infer<typeof prePostDocsSchema>) => {
  return await db.insert(userPostTaxDocs).values({
    userId: i.id,
    documentType: i.documentType,
    documentTypeFile: i.documentTypeFile,
    documentRemarks: i.documentRemarks,
  }).execute()
}

const changePassSchema = changePasswordSchema.extend({
  id: z.string()

})

export const changePassword = async (i: z.infer<typeof changePassSchema>) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, i.id)
  })
  if (!user) {
    throw Error("invalid password")
  }
  const validPass = await bcrypt.compare(i.currentPass, user.password)
  if (!validPass) {
    throw Error("invalid password")
  }
  await db.update(users)
    .set({ password: await hashPassword(i.newPass) })
    .where(eq(users.id, i.id))
    .execute()
}