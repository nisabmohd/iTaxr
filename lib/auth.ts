import { decrypt } from "@/actions/session";
import { cookies } from "next/headers";

export async function getSession(){
  const session=cookies().get("session")?.value
  if(!session) return undefined
  return await decrypt(session)
}