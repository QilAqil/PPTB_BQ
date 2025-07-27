"use client";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SignUp 
        redirectUrl="/dashboard"
        afterSignUpUrl="/dashboard"
      />
    </div>
  );
} 