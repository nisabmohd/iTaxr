import { UserLeftbar } from "@/components/leftbar";
import { PropsWithChildren } from "react";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex items-start h-[94vh] relative">
      <UserLeftbar />
      <div className="flex-[9] h-full overflow-y-auto px-16 py-10">
        {children}
      </div>
    </div>
  );
}
