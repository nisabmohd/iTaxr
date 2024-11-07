"use client"

import { registerAction } from "@/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Building, Lock } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod"

const userRegistrationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be 20 digits or fewer")
    .regex(/^[0-9]+$/, "Phone number should contain only digits"),
  officeNumber: z.string()
    .min(10, "Office number must be at least 10 digits")
    .max(20, "Office number must be 20 digits or fewer")
    .regex(/^[0-9]+$/, "Office number should contain only digits")
    .optional(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must be 255 characters or fewer")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  cpassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must be 255 characters or fewer")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
}).refine(({ cpassword, password }) => password === cpassword, {
  message: "Passwords don't match",
  path: ["confirm"],
});

export default function RegisterPage() {
  const [userInput, setUserInput] = useState({
    firstName: "", middleName: "", lastName: "", email: "", phoneNumber: "", officeNumber: "",
    password: "", cpassword: ""
  })

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setUserInput(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    const { data, error } = userRegistrationSchema.safeParse(userInput)
    // todo handle this case
    if (error) return;
    await registerAction(data)
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 text-center grid">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Register to Taxpage
          </h2>
          <p className="mb-6 mt-2 text-muted-foreground text-sm">
            Enter details to register account
          </p>
          <form onSubmit={handleRegister} className="space-y-4 my-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  onChange={handleInputChange}
                  value={userInput.firstName}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full pl-11 h-12"
                  required
                />
              </div>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  onChange={handleInputChange}
                  value={userInput.middleName}
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                  className="w-full pl-11 h-12"
                />
              </div>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  onChange={handleInputChange}
                  value={userInput.lastName}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full pl-11 h-12"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                onChange={handleInputChange}
                value={userInput.email}
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-11 h-12"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  onChange={handleInputChange}
                  value={userInput.phoneNumber}
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="w-full pl-11 h-12"
                  required
                />
              </div>
              <div className="relative">
                <Building
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  onChange={handleInputChange}
                  value={userInput.officeNumber}
                  type="tel"
                  name="officeNumber"
                  placeholder="Office Number"
                  className="w-full pl-11 h-12"
                />
              </div>
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                onChange={handleInputChange}
                value={userInput.password}
                type="password"
                name="password"
                placeholder="Password"
                className="w-full pl-11 h-12"
                required
              />
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                onChange={handleInputChange}
                value={userInput.cpassword}
                type="password"
                name="cpassword"
                placeholder="Confirm Password"
                className="w-full pl-11 h-12"
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Register
            </Button>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="text-center">
            <Link
              href="/login"
              className={buttonVariants({
                variant: "link",
                className: "mx-0 px-0",
              })}
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
