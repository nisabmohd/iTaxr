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
import { personalInfoUpdateAction } from "@/actions/user-forms";
import { useTransition } from "react";

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
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  alternatePhoneNumber: z
    .string()
    .min(10, {
      message: "Alternate phone number must be at least 10 digits.",
    })
    .optional(),
  employeeName: z.string().min(2, {
    message: "Employee name must be at least 2 characters.",
  }),
});

export default function PersonalInfoForm({
  userDetails,
}: {
  userDetails: UserDetails;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: userDetails.firstName,
      middleName: userDetails.middleName ?? "",
      lastName: userDetails.lastName,
      email: userDetails.email,
      phoneNumber: userDetails.phoneNumber,
      alternatePhoneNumber: userDetails.alternatePhoneNumber ?? "",
      employeeName: userDetails.employeeName ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, ...body } = values;
    startTransition(async () => {
      const resp = await personalInfoUpdateAction(body);

      if (resp.success) {
        toast({
          title: "Information updated for user " + email,
          variant: "success",
        });
      } else {
        toast({
          title: "Information update failed",
          description: resp.message,
          variant: "destructive",
        });
      }
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
            name="phoneNumber"
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
            name="alternatePhoneNumber"
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
            name="employeeName"
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
          disabled={isPending}
          type="submit"
          className="w-fit bg-tomato"
          size="lg"
        >
          Update
        </Button>
      </form>
    </Form>
  );
}
