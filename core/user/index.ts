import { users } from "./user.sql"
import { z } from 'zod'
import { fn } from "../util";
import { db } from "@/db";
import { hashPassword, id } from "@/db/types";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";


const UserSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be 20 digits or fewer")
    .regex(/^[0-9]+$/, "Phone number should contain only digits"),
  officeNumber: z.string()
    .min(10, "Office number must be at least 10 digits")
    .max(20, "Office number must be 20 digits or fewer")
    .regex(/^[0-9]+$/, "Office number should contain only digits")
    .optional(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must be 255 characters or fewer")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
});

export const register = fn(UserSchema,
  async (input) => {
    await db.insert(users).values({
      id: id(),
      firstName: input.firstName,
      middleName: input.middleName,
      lastName: input.lastName,
      email: input.email,
      phoneNumber: input.phoneNumber,
      officeNumber: input.officeNumber,
      password: await hashPassword(input.password)
    })
  }
)


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})


export const login = async (input: z.infer<typeof loginSchema>) => {
    const user = await db.select().from(users).where(eq(users.email, input.email)).execute();
    if (user.length === 0) {
      throw new Error("User not found");
    }
    const foundUser = user[0];

    const isPasswordValid = await bcrypt.compare(input.password, foundUser.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return {
      message: "Login successful",
      user: {
        id: foundUser.id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        role: foundUser.role,
      },
    }
}
