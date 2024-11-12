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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { states } from "@/lib/utils";
import { interviewFormSchema } from "@/lib/definitions";

export default function InterviewSheetPage() {
  const form = useForm<z.infer<typeof interviewFormSchema>>({
    resolver: zodResolver(interviewFormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      ssn: "",
      dob: "",
      visaCategory: "",
      occupation: "",
      currentAddress: "",
      currentCity: "",
      currentState: "",
      zipCode: "",
      dependentFirstName: "",  // => array object refer schema
      dependentMiddleName: "",
      dependentLastName: "",
      dependentRelation: "",
      dependentDOB: "",
      dependentSSN: "",
      residencyState: "", //string array
      wages: 0,
      //wagesFile
      businessIncome: false,
      //File
      rentalIncome: false,
      //File
      interestIncome: false,
      //File
      dividendIncome: false,
      //File
      retirePlanIncome: false,
      //File
      mortgageInterest: false,
      //File
      propertyTax: false,
      //File
      charitableDonations: false,
      //File
      medicalExpenses: false,
      //File
      studentLoanInterest: false,
      //File
      educationExpenses: false,
      //File
      fbar: false,
      //File
      fatca_pfic: false,
    },
  });

  function onSubmit(values: z.infer<typeof interviewFormSchema>) {
    console.log(values);
    toast({
      title: "Form submitted",
      description: "Your information has been successfully submitted.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="border-none shadow-none">
          <CardHeader className="!px-0 !pt-1">
            <CardTitle>Interview & Documents</CardTitle>
            <p className="text-sm text-muted-foreground mb-4 !mt-3">
              Fields marked with an asterisk (*) are mandatory.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 !p-0 m-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">
                      First Name as per SSN <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel className="text-primary">Middle Name as per SSN</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      Last Name as per SSN<span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <FormField
                control={form.control}
                name="ssn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">
                      SSN/ITIN<span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">
                      Current Address
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Current City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <FormField
                control={form.control}
                name="currentState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">
                      Current State
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((item) => <SelectItem value={item.code} key={item.code}>{item.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">ZIP Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visaCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">
                      Current Visa Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select visa category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="H1B">H1B</SelectItem>
                        <SelectItem value="H4">H4</SelectItem>
                        <SelectItem value="L1">L1</SelectItem>
                        <SelectItem value="L2">L2</SelectItem>
                        <SelectItem value="F1">F1</SelectItem>
                        <SelectItem value="Green Card">Green Card</SelectItem>
                        <SelectItem value="Citizen">Citizen</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Occupation</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-none">
          <CardHeader className="!px-0">
            <CardTitle>Dependent Details</CardTitle>
            <p className="text-sm text-muted-foreground mb-4 !mt-3">
              Fields marked with an asterisk (*) are mandatory.
            </p>
          </CardHeader>
          <CardContent className="space-y-5 !p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="dependentFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dependentMiddleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Middle Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dependentLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="dependentRelation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Relation</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Son">Son</SelectItem>
                        <SelectItem value="Daughter">Daughter</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                        {/* Add more options as needed */}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dependentDOB"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dependentSSN"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">SSN</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-none">
          <CardHeader className="!px-0">
            <CardTitle>Residency Details</CardTitle>
            <p className="text-sm text-muted-foreground mb-4 !mt-3">
              Fields marked with an asterisk (*) are mandatory.
            </p>
          </CardHeader>
          <CardContent className="!p-0">
            <FormField
              control={form.control}
              name="residencyState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Residency State
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((item) => <SelectItem value={item.code} key={item.code}>{item.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-none">
          <CardHeader className="!px-0">
            <CardTitle>Source of Income</CardTitle>
            <p className="text-sm text-muted-foreground mb-4 !mt-3">
              Fields marked with an asterisk (*) are mandatory.
            </p>
          </CardHeader>
          <CardContent className="space-y-5 !p-0">
            <FormField
              control={form.control}
              name="wages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Wages (Number of Employers)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of employers" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Business Income (PNL/1099)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rentalIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Rental Income</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interestIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Interest Income (1099INT)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dividendIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Dividend Income (1099DIV)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capitalGains"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Income/Loss from Sale of Stock/Crypto (1099B)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="retirementIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Any Income from retirement plan (1099R)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-none">
          <CardHeader className="!px-0">
            <CardTitle>Source of Deduction/Benefits</CardTitle>
            <p className="text-sm text-muted-foreground mb-4 !mt-3">
              Fields marked with an asterisk (*) are mandatory.
            </p>
          </CardHeader>
          <CardContent className="space-y-5 !p-0">
            <FormField
              control={form.control}
              name="mortgageInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Mortgage Interest (Form 1098)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertyTax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Property Tax</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="charitableDonations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Charitable Donations
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalExpenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Medical Expenses
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentLoanInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Student Loan Interest (Form 1098E)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="educationExpenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Education Expenses (Form 1098T)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-none">
          <CardHeader className="!px-0">
            <CardTitle>Other Disclosure</CardTitle>
            <p className="text-sm text-muted-foreground mb-4 !mt-3">
              Fields marked with an asterisk (*) are mandatory.
            </p>
          </CardHeader>
          <CardContent className="space-y-5 !p-0">
            <FormField
              control={form.control}
              name="foreignBankAccounts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    FBAR - Did you have $10,000 or more balance in your foreign
                    Bank accounts any time during the tax year?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foreignAssets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    FATCA/PFIC - Do you have any investments outside US like
                    Mutual Funds, fixed deposits, insurance etc.?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-fit bg-blue-500 hover:bg-blue-600"
          size="lg"
        >
          Submit Form
        </Button>
      </form>
    </Form>
  );
}
