"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clientFileInputSchema, states } from "@/lib/utils";

const newformSchema = z.object({
  maritalStatus: z.string().min(1, { message: "Marital status is required." }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .nonempty({ message: "First name is required." }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .nonempty({ message: "Last name is required." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .nonempty({ message: "Email is required." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .nonempty({ message: "Phone number is required." }),
  ssn: z
    .string()
    .min(9, { message: "SSN must be at least 9 characters." })
    .nonempty({ message: "SSN is required." }),
  dob: z.string().nonempty({ message: "Date of birth is required." }),
  visaCategory: z.string().nonempty({ message: "Visa category is required." }),
  occupation: z.string().nonempty({ message: "Occupation is required." }),
  currentAddress: z
    .string()
    .nonempty({ message: "Current address is required." }),
  currentCity: z.string().nonempty({ message: "Current city is required." }),
  currentState: z.string().nonempty({ message: "Current state is required." }),
  zipCode: z.string().nonempty({ message: "Zip code is required." }),
  dependentDetails: z.array(
    z.object({
      firstName: z
        .string()
        .nonempty({ message: "Dependent first name is required." }),
      middleName: z.string().optional(),
      lastName: z
        .string()
        .nonempty({ message: "Dependent last name is required." }),
      relation: z.string().nonempty({ message: "Relation is required." }),
      dob: z
        .string()
        .nonempty({ message: "Dependent date of birth is required." }),
      ssn: z.string().nonempty({ message: "Dependent SSN is required." }),
    })
  ),
  residencyStates: z
    .array(z.string())
    .nonempty({ message: "At least one residency state is required." }),
  wages: z.number().optional(),
  spouseWages: z.number().optional(),
  wagesFile: clientFileInputSchema,
  businessIncome: z.number().optional(),
  spouseBusinessIncome: z.number().optional(),
  businessIncomeFile: clientFileInputSchema.optional(),
  rentalIncome: z.number().optional(),
  spouseRentalIncome: z.number().optional(),
  rentalIncomeFile: clientFileInputSchema.optional(),
  interestIncome: z.number().optional(),
  spouseInterestIncome: z.number().optional(),
  interestIncomeFile: clientFileInputSchema.optional(),
  dividendIncome: z.number().optional(),
  spouseDividendIncome: z.number().optional(),
  dividendIncomeFile: clientFileInputSchema.optional(),
  saleOfStock_CryptoIncome: z.number().optional(),
  spouseSaleOfStock_CryptoIncome: z.number().optional(),
  saleOfStock_CryptoIncomeFile: clientFileInputSchema.optional(),
  retirePlanIncome: z.number().optional(),
  spouseRetirePlanIncome: z.number().optional(),
  retirePlanIncomeFile: clientFileInputSchema.optional(),
  mortgageInterest: z.number().optional(),
  spouseMortgageInterest: z.number().optional(),
  mortgageInterestFile: clientFileInputSchema.optional(),
  propertyTax: z.number().optional(),
  spousePropertyTax: z.number().optional(),
  propertyTaxFile: clientFileInputSchema.optional(),
  charitableDonations: z.number().optional(),
  spouseCharitableDonations: z.number().optional(),
  charitableDonationsFile: clientFileInputSchema.optional(),
  medicalExpenses: z.number().optional(),
  spouseMedicalExpenses: z.number().optional(),
  medicalExpensesFile: clientFileInputSchema.optional(),
  studentLoanInterest: z.number().optional(),
  spouseStudentLoanInterest: z.number().optional(),
  studentLoanInterestFile: clientFileInputSchema.optional(),
  educationExpenses: z.number().optional(),
  spouseEducationExpenses: z.number().optional(),
  educationExpensesFile: clientFileInputSchema.optional(),
  fbar: z.boolean(),
  spouseFbar: z.boolean(),
  fbarFile: clientFileInputSchema.optional(),
  fatca_pfic: z.boolean(),
  spouseFatca_pfic: z.boolean(),
  fatca_pfic_File: clientFileInputSchema.optional(),
  // Spouse fields
  spouseFirstName: z.string().optional(),
  spouseMiddleName: z.string().optional(),
  spouseLastName: z.string().optional(),
  spouseEmail: z.string().email().optional(),
  spousePhone: z.string().optional(),
  spouseSSN: z.string().optional(),
  spouseDOB: z.string().optional(),
  spouseOccupation: z.string().optional(),
});

type FormValues = z.infer<typeof newformSchema>;

const BooleanSelect = ({
  value,
  onChange,
  disabled,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) => (
  <Select
    disabled={disabled}
    value={value ? "true" : "false"}
    onValueChange={(v) => onChange(v === "true")}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="true">Yes</SelectItem>
      <SelectItem value="false">No</SelectItem>
    </SelectContent>
  </Select>
);

export default function TaxForm() {
  const [isSpouseIncluded, setIsSpouseIncluded] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(newformSchema),
    defaultValues: {
      dependentDetails: [
        {
          firstName: "",
          middleName: "",
          lastName: "",
          relation: "",
          dob: "",
          ssn: "",
        },
      ],
      residencyStates: [""],
      fbar: false,
      spouseFbar: false,
      fatca_pfic: false,
      spouseFatca_pfic: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dependentDetails",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 mx-auto">
      <section>
        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maritalStatus" className="mb-1">
                Marital Status <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="maritalStatus"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <Label htmlFor="includeSpouse" className="mb-1">
                Include Spouse Information
              </Label>
              <BooleanSelect
                value={isSpouseIncluded}
                onChange={(checked) => setIsSpouseIncluded(checked)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="firstName" className="mb-1">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input {...register("firstName")} />
              {errors.firstName && (
                <p className="text-red-500 mt-1 text-[13px]">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="middleName" className="mb-1">
                Middle Name
              </Label>
              <Input {...register("middleName")} />
            </div>
            <div>
              <Label htmlFor="lastName" className="mb-1">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input {...register("lastName")} />
              {errors.lastName && (
                <p className="text-red-500 mt-1 text-[13px]">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="mb-1">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input {...register("email")} type="email" />
              {errors.email && (
                <p className="text-red-500 mt-1 text-[13px]">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="phone" className="mb-1">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input {...register("phone")} />
              {errors.phone && (
                <p className="text-red-500 mt-1 text-[13px]">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ssn" className="mb-1">
                SSN <span className="text-red-500">*</span>
              </Label>
              <Input {...register("ssn")} />
              {errors.ssn && (
                <p className="text-red-500 mt-1 text-[13px]">
                  {errors.ssn.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="dob" className="mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <Input {...register("dob")} type="date" />
            </div>
            <div>
              <Label htmlFor="visaCategory" className="mb-1">
                Visa Category
              </Label>
              <Input {...register("visaCategory")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="occupation" className="mb-1">
                Occupation
              </Label>
              <Input {...register("occupation")} />
            </div>
            <div>
              <Label htmlFor="currentAddress" className="mb-1">
                Current Address
              </Label>
              <Input {...register("currentAddress")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="currentCity" className="mb-1">
                City
              </Label>
              <Input {...register("currentCity")} />
            </div>
            <div>
              <Label htmlFor="currentState" className="mb-1">
                State
              </Label>
              <Input {...register("currentState")} />
            </div>
            <div>
              <Label htmlFor="zipCode" className="mb-1">
                Zip Code
              </Label>
              <Input {...register("zipCode")} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mt-6 mb-4">Spouse Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="spouseFirstName" className="mb-1">
              Spouse First Name
            </Label>
            <Input
              {...register("spouseFirstName")}
              disabled={!isSpouseIncluded}
            />
          </div>
          <div>
            <Label htmlFor="spouseMiddleName" className="mb-1">
              Spouse Middle Name
            </Label>
            <Input
              {...register("spouseMiddleName")}
              disabled={!isSpouseIncluded}
            />
          </div>
          <div>
            <Label htmlFor="spouseLastName" className="mb-1">
              Spouse Last Name
            </Label>
            <Input
              {...register("spouseLastName")}
              disabled={!isSpouseIncluded}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="spouseEmail" className="mb-1">
              Spouse Email
            </Label>
            <Input
              {...register("spouseEmail")}
              type="email"
              disabled={!isSpouseIncluded}
            />
          </div>
          <div>
            <Label htmlFor="spousePhone" className="mb-1">
              Spouse Phone
            </Label>
            <Input {...register("spousePhone")} disabled={!isSpouseIncluded} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="spouseSSN" className="mb-1">
              Spouse SSN
            </Label>
            <Input {...register("spouseSSN")} disabled={!isSpouseIncluded} />
          </div>
          <div>
            <Label htmlFor="spouseDOB" className="mb-1">
              Spouse Date of Birth
            </Label>
            <Input
              {...register("spouseDOB")}
              type="date"
              disabled={!isSpouseIncluded}
            />
          </div>
          <div>
            <Label htmlFor="spouseOccupation" className="mb-1">
              Spouse Occupation
            </Label>
            <Input
              {...register("spouseOccupation")}
              disabled={!isSpouseIncluded}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Dependents Details</h2>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
            >
              <div>
                <Label
                  htmlFor={`dependentDetails.${index}.firstName`}
                  className="mb-1"
                >
                  First Name
                </Label>
                <Input
                  {...register(`dependentDetails.${index}.firstName`)}
                  placeholder="First Name"
                />
              </div>
              <div>
                <Label
                  htmlFor={`dependentDetails.${index}.middleName`}
                  className="mb-1"
                >
                  Middle Name
                </Label>
                <Input
                  {...register(`dependentDetails.${index}.middleName`)}
                  placeholder="Middle Name"
                />
              </div>
              <div>
                <Label
                  htmlFor={`dependentDetails.${index}.lastName`}
                  className="mb-1"
                >
                  Last Name
                </Label>
                <Input
                  {...register(`dependentDetails.${index}.lastName`)}
                  placeholder="Last Name"
                />
              </div>
              <div>
                <Label
                  htmlFor={`dependentDetails.${index}.relation`}
                  className="mb-1"
                >
                  Relation
                </Label>
                <Input
                  {...register(`dependentDetails.${index}.relation`)}
                  placeholder="Relation"
                />
              </div>
              <div>
                <Label
                  htmlFor={`dependentDetails.${index}.dob`}
                  className="mb-1"
                >
                  Date of Birth
                </Label>
                <Input
                  {...register(`dependentDetails.${index}.dob`)}
                  placeholder="Date of Birth"
                  type="date"
                />
              </div>
              <div>
                <Label
                  htmlFor={`dependentDetails.${index}.ssn`}
                  className="mb-1"
                >
                  SSN
                </Label>
                <Input
                  {...register(`dependentDetails.${index}.ssn`)}
                  placeholder="SSN"
                />
              </div>
              <Button
                className="w-fit"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            className="w-fit bg-blue-500 hover:bg-blue-600"
            onClick={() =>
              append({
                firstName: "",
                middleName: "",
                lastName: "",
                relation: "",
                dob: "",
                ssn: "",
              })
            }
          >
            Add Dependent
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Residency Details</h2>
        <div className="space-y-4">
          <Label htmlFor="residencyStates" className="mb-1">
            Residency States
          </Label>
          <Controller
            name="residencyStates"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange([value])}
                value={field.value[0]}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((item) => (
                    <SelectItem value={item.code} key={item.code}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Source of Income</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="wages" className="mb-1">
                Wages
              </Label>
              <Input
                type="number"
                {...register("wages", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="spouseWages" className="mb-1">
                Spouse Wages
              </Label>
              <Input
                type="number"
                {...register("spouseWages", { valueAsNumber: true })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="wagesFile" className="mb-1">
                Wages File
              </Label>
              <Input type="file" {...register("wagesFile")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="businessIncome" className="mb-1">
                Business Income
              </Label>
              <Input
                type="number"
                {...register("businessIncome", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="spouseBusinessIncome" className="mb-1">
                Spouse Business Income
              </Label>
              <Input
                type="number"
                {...register("spouseBusinessIncome", { valueAsNumber: true })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="businessIncomeFile" className="mb-1">
                Business Income File
              </Label>
              <Input type="file" {...register("businessIncomeFile")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="rentalIncome" className="mb-1">
                Rental Income
              </Label>
              <Input
                type="number"
                {...register("rentalIncome", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="spouseRentalIncome" className="mb-1">
                Spouse Rental Income
              </Label>
              <Input
                type="number"
                {...register("spouseRentalIncome", { valueAsNumber: true })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="rentalIncomeFile" className="mb-1">
                Rental Income File
              </Label>
              <Input type="file" {...register("rentalIncomeFile")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="interestIncome" className="mb-1">
                Interest Income
              </Label>
              <Input
                type="number"
                {...register("interestIncome", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="spouseInterestIncome" className="mb-1">
                Spouse Interest Income
              </Label>
              <Input
                type="number"
                {...register("spouseInterestIncome", { valueAsNumber: true })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="interestIncomeFile" className="mb-1">
                Interest Income File
              </Label>
              <Input type="file" {...register("interestIncomeFile")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="dividendIncome" className="mb-1">
                Dividend Income
              </Label>
              <Input
                type="number"
                {...register("dividendIncome", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="spouseDividendIncome" className="mb-1">
                Spouse Dividend Income
              </Label>
              <Input
                type="number"
                {...register("spouseDividendIncome", { valueAsNumber: true })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="dividendIncomeFile" className="mb-1">
                Dividend Income File
              </Label>
              <Input type="file" {...register("dividendIncomeFile")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="saleOfStock_CryptoIncome" className="mb-1">
                Sale of Stock/Crypto Income
              </Label>
              <Input
                type="number"
                {...register("saleOfStock_CryptoIncome", {
                  valueAsNumber: true,
                })}
              />
            </div>
            <div>
              <Label htmlFor="spouseSaleOfStock_CryptoIncome" className="mb-1">
                Spouse Sale of Stock/Crypto Income
              </Label>
              <Input
                type="number"
                {...register("spouseSaleOfStock_CryptoIncome", {
                  valueAsNumber: true,
                })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="saleOfStock_CryptoIncomeFile" className="mb-1">
                Sale of Stock/Crypto Income File
              </Label>
              <Input
                type="file"
                {...register("saleOfStock_CryptoIncomeFile")}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="retirePlanIncome" className="mb-1">
                Retirement Plan Income
              </Label>
              <Input
                type="number"
                {...register("retirePlanIncome", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="spouseRetirePlanIncome" className="mb-1">
                Spouse Retirement Plan Income
              </Label>
              <Input
                type="number"
                {...register("spouseRetirePlanIncome", {
                  valueAsNumber: true,
                })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="retirePlanIncomeFile" className="mb-1">
                Retirement Plan Income File
              </Label>
              <Input type="file" {...register("retirePlanIncomeFile")} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">
          Source of Deduction/Benefits
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="mortgageInterest" className="mb-1">
                Mortgage Interest
              </Label>
              <Input
                type="number"
                {...register("mortgageInterest", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="spouseMortgageInterest" className="mb-1">
                Spouse Mortgage Interest
              </Label>
              <Input
                type="number"
                {...register("spouseMortgageInterest", {
                  valueAsNumber: true,
                })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="mortgageInterestFile" className="mb-1">
                Mortgage Interest File
              </Label>
              <Input type="file" {...register("mortgageInterestFile")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="propertyTax" className="mb-1">
                Property Tax
              </Label>
              <Input
                type="number"
                {...register("propertyTax", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="spousePropertyTax" className="mb-1">
                Spouse Property Tax
              </Label>
              <Input
                type="number"
                {...register("spousePropertyTax", { valueAsNumber: true })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="propertyTaxFile" className="mb-1">
                Property Tax File
              </Label>
              <Input type="file" {...register("propertyTaxFile")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="charitableDonations" className="mb-1">
                Charitable Donations
              </Label>
              <Input
                type="number"
                {...register("charitableDonations", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="spouseCharitableDonations" className="mb-1">
                Spouse Charitable Donations
              </Label>
              <Input
                type="number"
                {...register("spouseCharitableDonations", {
                  valueAsNumber: true,
                })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="charitableDonationsFile" className="mb-1">
                Charitable Donations File
              </Label>
              <Input type="file" {...register("charitableDonationsFile")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="medicalExpenses" className="mb-1">
                Medical Expenses
              </Label>
              <Input
                type="number"
                {...register("medicalExpenses", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="spouseMedicalExpenses" className="mb-1">
                Spouse Medical Expenses
              </Label>
              <Input
                type="number"
                {...register("spouseMedicalExpenses", {
                  valueAsNumber: true,
                })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="medicalExpensesFile" className="mb-1">
                Medical Expenses File
              </Label>
              <Input type="file" {...register("medicalExpensesFile")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="studentLoanInterest" className="mb-1">
                Student Loan Interest
              </Label>
              <Input
                type="number"
                {...register("studentLoanInterest", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="spouseStudentLoanInterest" className="mb-1">
                Spouse Student Loan Interest
              </Label>
              <Input
                type="number"
                {...register("spouseStudentLoanInterest", {
                  valueAsNumber: true,
                })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="studentLoanInterestFile" className="mb-1">
                Student Loan Interest File
              </Label>
              <Input type="file" {...register("studentLoanInterestFile")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="educationExpenses" className="mb-1">
                Education Expenses
              </Label>
              <Input
                type="number"
                {...register("educationExpenses", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="spouseEducationExpenses" className="mb-1">
                Spouse Education Expenses
              </Label>
              <Input
                type="number"
                {...register("spouseEducationExpenses", {
                  valueAsNumber: true,
                })}
                disabled={!isSpouseIncluded}
              />
            </div>
            <div>
              <Label htmlFor="educationExpensesFile" className="mb-1">
                Education Expenses File
              </Label>
              <Input type="file" {...register("educationExpensesFile")} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Other Disclosure</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fbar" className="mb-1">
                FBAR
              </Label>
              <Controller
                name="fbar"
                control={control}
                render={({ field }) => (
                  <BooleanSelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="spouseFbar" className="mb-1">
                Spouse FBAR
              </Label>
              <Controller
                name="spouseFbar"
                control={control}
                render={({ field }) => (
                  <BooleanSelect
                    value={field.value}
                    onChange={field.onChange}
                    disabled={!isSpouseIncluded}
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="fbarFile" className="mb-1">
                FBAR File
              </Label>
              <Input type="file" {...register("fbarFile")} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fatca_pfic" className="mb-1">
                FATCA/PFIC
              </Label>
              <Controller
                name="fatca_pfic"
                control={control}
                render={({ field }) => (
                  <BooleanSelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="spouseFatca_pfic" className="mb-1">
                Spouse FATCA/PFIC
              </Label>
              <Controller
                name="spouseFatca_pfic"
                control={control}
                render={({ field }) => (
                  <BooleanSelect
                    value={field.value}
                    onChange={field.onChange}
                    disabled={!isSpouseIncluded}
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="fatca_pfic_File" className="mb-1">
                FATCA/PFIC File
              </Label>
              <Input type="file" {...register("fatca_pfic_File")} />
            </div>
          </div>
        </div>
      </section>

      <Button
        type="submit"
        size="lg"
        className="w-fit bg-blue-500 hover:bg-blue-600"
      >
        Submit Tax Form
      </Button>
    </form>
  );
}
