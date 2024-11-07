"use client"

import { loginAction } from "@/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export default function LoginPage() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  })

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setUserInput(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    const { data, error } = loginSchema.safeParse(userInput)
    // todo handle this case
    if (error) return;
    await loginAction(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted-foreground/5 p-4">
      <div className="w-full max-w-md bg-background rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 text-center grid">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Login to Taxpage
          </h2>
          <p className="mb-6 mt-2 text-muted-foreground text-sm">
            Enter username and password to login
          </p>
          <form onSubmit={handleLogin} className="space-y-4 my-2">
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                onChange={handleInputChange}
                value={userInput.email}
                name="email"
                type="email"
                placeholder="Email"
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
                value={userInput.password}
                name="password"
                type="password"
                placeholder="Password"
                className="w-full pl-11 h-12"
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Login
            </Button>
          </form>
        </div>
        <div className="px-6 py-4 bg-muted-foreground/5">
          <div className="flex justify-between items-center">
            <Link
              href="/reset"
              className={buttonVariants({
                variant: "link",
                className: "mx-0 px-0",
              })}
            >
              Forgot password?
            </Link>
            <Link
              href="/register"
              className={buttonVariants({
                variant: "link",
                className: "mx-0 px-0",
              })}
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
