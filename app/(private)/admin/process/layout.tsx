import { PropsWithChildren } from "react";

export default function Process({ children }: PropsWithChildren) {
  return (
    <div>
      <h3 className="mb-5 text-2xl font-semibold">Process</h3>
      {children}
    </div>
  );
}
