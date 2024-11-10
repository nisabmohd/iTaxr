import Navbar from "@/components/navbar";
import { PropsWithChildren } from "react";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
}
