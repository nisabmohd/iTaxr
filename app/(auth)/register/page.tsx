"use client";

import { registerAction } from "@/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Building, Lock } from "lucide-react";
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

const userRegistrationSchema = z
  .object({
    firstName: z.string().min(1, "First name required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name required"),
    email: z.string().email("Invalid email format"),
    phoneNumber: z
      .string()
      .min(10, "Phone should be 10 digits")
      .max(20, "Phone number must be fewer than 20")
      .regex(/^[0-9]+$/, "Phone number should contain only digits"),
    officeNumber: z
      .union([
        z
          .string()
          .min(10, "Office number must be at least 10 digits")
          .max(20, "Office number must be 20 digits or fewer")
          .regex(/^[0-9]+$/, "Office number should contain only digits"),
        z.literal(""), // Allow an empty string
      ])
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(255, "Password must be 255 characters or fewer")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    cpassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(255, "Password must be 255 characters or fewer"),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"],
  });

type RegistrationFormValues = z.infer<typeof userRegistrationSchema>;

export default function RegisterPage() {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      officeNumber: "",
      password: "",
      cpassword: "",
    },
  });

  async function onSubmit(data: RegistrationFormValues) {
    await registerAction(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 grid">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Register to Taxpage
          </h2>
          <p className="mb-6 mt-2 text-muted-foreground text-sm text-center">
            Enter details to register account
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 my-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <Input
                            {...field}
                            placeholder="First Name"
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
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <Input
                            {...field}
                            placeholder="Middle Name"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <Input
                            {...field}
                            placeholder="Last Name"
                            className="w-full pl-11 h-12"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[13px]" />
                    </FormItem>
                  )}
                />
              </div>
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
                          placeholder="Email Address"
                          className="w-full pl-11 h-12"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Phone
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <Input
                            {...field}
                            type="tel"
                            placeholder="Phone Number"
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
                  name="officeNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Building
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <Input
                            {...field}
                            type="tel"
                            placeholder="Office Number"
                            className="w-full pl-11 h-12"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[13px]" />
                    </FormItem>
                  )}
                />
              </div>
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
              <FormField
                control={form.control}
                name="cpassword"
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
                          placeholder="Confirm Password"
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
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Register
              </Button>
            </form>
          </Form>
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
