import { PropsWithChildren } from "react";

export default function PreProcess({ children }: PropsWithChildren) {
  return <div>
    <h3 className="mb-5 text-2xl font-semibold">Pre Process</h3>
    {children}
  </div>
}