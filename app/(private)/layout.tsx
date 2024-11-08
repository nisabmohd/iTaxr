import Leftbar from "@/components/leftbar";
import Navbar from "@/components/navbar";
import { PropsWithChildren } from "react";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex items-start h-[94vh] relative">
        <Leftbar />
        <div className="flex-[9] h-full overflow-y-auto px-16 py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
