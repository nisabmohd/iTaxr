"use server"

import { login, register, } from "@/core/user"
import { userRegistrationSchema, loginSchema } from '../lib/definitions'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function loginAction(payload: z.infer<typeof loginSchema>) {
  const { success, data } = loginSchema.safeParse(payload)
  if (!success) throw new Error("Invalid data")
  await login(data)
}

export async function registerAction(payload: z.infer<typeof userRegistrationSchema>) {
  const { success, data, error } = userRegistrationSchema.safeParse(payload)
  if (!success) {
    const errorMessage = error.errors
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join("; ");
    throw new Error(`Validation error: ${errorMessage}`);
  } await register(data)
}


export async function logoutAction() {
  cookies().delete("session")
  redirect("/login")
}