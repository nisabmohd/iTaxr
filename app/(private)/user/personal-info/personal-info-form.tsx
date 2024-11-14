"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { UserDetails } from "./page";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  alternatePhone: z
    .string()
    .min(10, {
      message: "Alternate phone number must be at least 10 digits.",
    })
    .optional(),
  empName: z.string().min(2, {
    message: "Employee name must be at least 2 characters.",
  }),
});

export default function PersonalInfoForm({
  userDetails,
}: {
  userDetails: UserDetails;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: userDetails.firstName,
      middleName: userDetails.middleName ?? "",
      lastName: userDetails.lastName,
      email: userDetails.email,
      phone: userDetails.phoneNumber,
      alternatePhone: userDetails.alternatePhoneNumber ?? "",
      empName: userDetails.employeeName ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    toast({
      title: "Information updated",
    });
  }

  return (
    <Form {...form}>
      <h3 className="text-2xl font-semibold">Personal Information</h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <p className="text-sm text-muted-foreground mb-4 mt-2">
          Fields marked with an asterisk (*) are mandatory.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  First Name
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
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
                <FormLabel className="text-primary">
                  Middle Name
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Micheal" {...field} />
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
                <FormLabel className="text-primary">
                  Last Name
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage className="text-[13px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Email
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    type="email"
                    placeholder="john.doe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[13px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Phone
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage className="text-[13px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alternatePhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Alternate Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>

                <FormMessage className="text-[13px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="empName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Employee Name
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John M. Doe" {...field} />
                </FormControl>
                <FormMessage className="text-[13px]" />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-fit bg-blue-500 hover:bg-blue-600"
          size="lg"
        >
          Update
        </Button>
      </form>
    </Form>
  );
}
