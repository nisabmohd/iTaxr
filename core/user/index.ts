import { users } from "./user.sql";
import { z } from "zod";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { hashPassword, id } from "@/lib/sql";

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
  });
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
    .execute();
  await createSession(user[0]);
  redirect("/");
};

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type User = typeof users.$inferSelect;

export const login = async (input: z.infer<typeof loginSchema>) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1)
    .execute();
  if (user.length === 0) {
    throw new Error("User not found");
  }
  const userExist = user[0];
  const isPasswordValid = await bcrypt.compare(
    input.password,
    userExist.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  await createSession(userExist);
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
  }).from(users).limit(1)
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