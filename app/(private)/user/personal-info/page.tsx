import { getPersonalDetails } from "@/core/user";
import PersonalInfoForm from "./personal-info-form";
import { getSession } from "@/lib/session";

export default async function PerosnalInfoPage() {
  const session = (await getSession())!;
  const userDetails = await getPersonalDetails(session.id);

  return <PersonalInfoForm userDetails={userDetails} />;
}

export type UserDetails = Awaited<ReturnType<typeof getPersonalDetails>>;
