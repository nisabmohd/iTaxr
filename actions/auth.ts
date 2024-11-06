"use server"

import { login, loginSchema } from "@/core/user"

export async function loginAction(formData: FormData) {
  const body = Object.fromEntries(formData)
  const { success, data } = loginSchema.safeParse(body)
  if (!success) throw new Error("Invalid data")
  await login(data)
}