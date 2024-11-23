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
import { settingFormAction } from "@/actions/user-forms";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    oldPassword: z.string().min(8, {
      message: "Old password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "New password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ChangePassword() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { oldPassword, newPassword } = values;
    startTransition(async () => {
      const resp = await settingFormAction({
        currentPass: oldPassword,
        newPass: newPassword,
      });

      if (resp.success) {
        toast({
          title: "Password changed successfully",
          variant: "success",
        });
        router.refresh();
      } else {
        toast({
          title: "Password update failed",
          description: resp.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <h3 className="text-2xl font-semibold">Change Password</h3>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-[600px]"
      >
        <p className="text-sm text-muted-foreground mb-4 mt-2">
          All fields are mandatory.
        </p>
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Old Password
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[13px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  New Password
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[13px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Confirm New Password
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your new password"
                    {...field}
                  />
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
          Change Password
        </Button>
      </form>
    </Form>
  );
}
