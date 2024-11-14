"use server";

import { login, register } from "@/core/user";
import { loginSchema, userRegistrationSchema } from "../lib/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function loginAction(payload: z.infer<typeof loginSchema>) {
  const { success, data } = loginSchema.safeParse(payload);
  if (!success) return { success: false, message: "Invalid data" };
  try {
    await login(data);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
}

export async function registerAction(
  payload: z.infer<typeof userRegistrationSchema>,
) {
  const { success, data } = userRegistrationSchema.safeParse(payload);
  if (!success) return { success: false, message: "Invalid data" };

  try {
    await register(data);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
}

export async function logoutAction() {
  cookies().delete("session");
  redirect("/login");
}
