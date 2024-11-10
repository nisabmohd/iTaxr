import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function MainPage() {
  const user = (await getSession())!;
  redirect(user.role == "admin" ? "/admin/registration" : "/user/personal-info")
}
