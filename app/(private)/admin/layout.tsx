import { AdminLeftbar } from "@/components/leftbar";
import { PropsWithChildren } from "react";

export default async function AdminLayout({ children }: PropsWithChildren) {

  return (
    <div className="flex items-start h-[94vh] relative">
      <AdminLeftbar />
      <div className="flex-[9] h-full overflow-y-auto px-16 py-10">
        {children}
      </div>
    </div>
  );
}
