"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// Mock data for states, users, and priorities
const states = [
  "Interview Pending",
  "Document Pending",
  "Additional Doc Pending",
  "Pre Cancelled",
];
const users = [
  "alice@gmail.com",
  "mohd@outlook.com",
  "charlie@msn.org",
  "david@outlook.in",
];

type FormData = {
  state: string;
  assignedTo: string;
  remarks: string;
  dueDate: string;
};

const currentState = "Interview Pending";

export default function AdminPanelEditor() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      state: "",
      assignedTo: "",
      remarks: "",
      dueDate: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Submitted:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    // Here you would typically send this data to your backend
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Employee Verification</CardTitle>
        <CardDescription>
          Verify the file and move to appropriate state.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Current Stage</Label>
            <Input id="current" readOnly value={currentState} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">Change Stage</Label>
            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  aria-label="Select task state"
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.state && (
              <p className="text-[13px] text-red-500">{errors.state.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignTo">Assign To</Label>
            <Controller
              name="assignedTo"
              control={control}
              rules={{ required: "Assigned user is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  aria-label="Select user to assign"
                >
                  <SelectTrigger id="assignTo">
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user} value={user}>
                        {user}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.assignedTo && (
              <p className="text-[13px] text-red-500">
                {errors.assignedTo.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Controller
              name="dueDate"
              control={control}
              rules={{ required: "Due date is required" }}
              render={({ field }) => (
                <Input
                  type="date"
                  id="dueDate"
                  {...field}
                  aria-label="Select due date"
                />
              )}
            />
            {errors.dueDate && (
              <p className="text-[13px] text-red-500">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Controller
              name="remarks"
              control={control}
              rules={{ required: "Remarks are required" }}
              render={({ field }) => (
                <Textarea
                  id="remarks"
                  placeholder="Enter any additional remarks..."
                  {...field}
                  rows={7}
                />
              )}
            />
            {errors.remarks && (
              <p className="text-[13px] text-red-500">
                {errors.remarks.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            size="lg"
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
