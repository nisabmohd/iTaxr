"use client";

import dynamic from "next/dynamic";

const InterviewForm = dynamic(() => import("./form"), {
  ssr: false,
});

export default function InterviewPage() {
  return <InterviewForm />;
}
