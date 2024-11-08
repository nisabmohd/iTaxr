"use client";

import { loginAction } from "@/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    await loginAction(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted-foreground/5 p-4">
      <div className="w-full max-w-md bg-background rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 grid">
          <Image
            src="/assets/logo.jpeg"
            alt="logo"
            width={90}
            height={50}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Login to iTaxr
          </h2>
          <p className="mb-6 mt-2 text-muted-foreground text-sm text-center">
            Enter username and password to login
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 my-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email"
                          className="w-full pl-11 h-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <Input
                          {...field}
                          type="password"
                          placeholder="Password"
                          className="w-full pl-11 h-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="w-full !mt-5 bg-blue-500 hover:bg-blue-600"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
        <div className="px-6 py-2 bg-muted-foreground/5">
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
