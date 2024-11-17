import { PropsWithChildren } from "react";

export default function PostProcess({ children }: PropsWithChildren) {
  return (
    <div>
      <h3 className="mb-5 text-2xl font-semibold">Post Process</h3>
      {children}
    </div>
  );
}
