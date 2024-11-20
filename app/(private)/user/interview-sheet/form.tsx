"use client";

import React, { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { states } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type DependentDetail = {
  firstName: string;
  middleName: string;
  lastName: string;
  relation: string;
  dob: string;
  ssn: string;
};

type FormData = {
  // Personal info section
  maritalStatus: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  ssn: string;
  dob: string;
  visaCategory: string;
  occupation: string;
  currentAddress: string;
  currentCity: string;
  currentState: string;
  zipCode: string;

  // Spouse details section
  includeSpouseDetails: boolean;
  spouseFirstName: string;
  spouseMiddleName: string;
  spouseLastName: string;
  spouseEmail: string;
  spousePhone: string;
  spouseSSN: string;
  spouseDOB: string;
  spouseOccupation: string;

  // Dependent details section
  dependentDetails: DependentDetail[];

  // Residency states section
  residencyStates: string[];

  // Source of Income section
  wages: number;
  spouseWages: number;
  wagesFile: File | null;
  businessIncome: number;
  spouseBusinessIncome: number;
  businessIncomeFile: File | null;
  rentalIncome: number;
  spouseRentalIncome: number;
  rentalIncomeFile: File | null;
  interestIncome: number;
  spouseInterestIncome: number;
  interestIncomeFile: File | null;
  dividendIncome: number;
  spouseDividendIncome: number;
  dividendIncomeFile: File | null;
  saleOfStock_CryptoIncome: number;
  spouseSaleOfStock_CryptoIncome: number;
  saleOfStock_CryptoIncomeFile: File | null;
  retirePlanIncome: number;
  spouseRetirePlanIncome: number;
  retirePlanIncomeFile: File | null;

  // Source of Deduction/Benefits section
  mortgageInterest: number;
  spouseMortgageInterest: number;
  mortgageInterestFile: File | null;
  propertyTax: number;
  spousePropertyTax: number;
  propertyTaxFile: File | null;
  charitableDonations: number;
  spouseCharitableDonations: number;
  charitableDonationsFile: File | null;
  medicalExpenses: number;
  spouseMedicalExpenses: number;
  medicalExpensesFile: File | null;
  studentLoanInterest: number;
  spouseStudentLoanInterest: number;
  studentLoanInterestFile: File | null;
  educationExpenses: number;
  spouseEducationExpenses: number;
  educationExpensesFile: File | null;

  // Other Disclosure section
  fbar: boolean;
  spouseFbar: boolean;
  fbarFile: File | null;
  fatca_pfic: boolean;
  spouseFatca_pfic: boolean;
  fatca_pfic_File: File | null;
};

export default function InterviewSheetForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    maritalStatus: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    ssn: "",
    dob: "",
    visaCategory: "",
    occupation: "",
    currentAddress: "",
    currentCity: "",
    currentState: "",
    zipCode: "",
    includeSpouseDetails: true,
    spouseFirstName: "",
    spouseMiddleName: "",
    spouseLastName: "",
    spouseEmail: "",
    spousePhone: "",
    spouseSSN: "",
    spouseDOB: "",
    spouseOccupation: "",
    dependentDetails: [
      {
        dob: "",
        firstName: "",
        lastName: "",
        middleName: "",
        relation: "",
        ssn: "",
      },
    ],
    residencyStates: [],
    wages: 0,
    spouseWages: 0,
    wagesFile: null,
    businessIncome: 0,
    spouseBusinessIncome: 0,
    businessIncomeFile: null,
    rentalIncome: 0,
    spouseRentalIncome: 0,
    rentalIncomeFile: null,
    interestIncome: 0,
    spouseInterestIncome: 0,
    interestIncomeFile: null,
    dividendIncome: 0,
    spouseDividendIncome: 0,
    dividendIncomeFile: null,
    saleOfStock_CryptoIncome: 0,
    spouseSaleOfStock_CryptoIncome: 0,
    saleOfStock_CryptoIncomeFile: null,
    retirePlanIncome: 0,
    spouseRetirePlanIncome: 0,
    retirePlanIncomeFile: null,
    mortgageInterest: 0,
    spouseMortgageInterest: 0,
    mortgageInterestFile: null,
    propertyTax: 0,
    spousePropertyTax: 0,
    propertyTaxFile: null,
    charitableDonations: 0,
    spouseCharitableDonations: 0,
    charitableDonationsFile: null,
    medicalExpenses: 0,
    spouseMedicalExpenses: 0,
    medicalExpensesFile: null,
    studentLoanInterest: 0,
    spouseStudentLoanInterest: 0,
    studentLoanInterestFile: null,
    educationExpenses: 0,
    spouseEducationExpenses: 0,
    educationExpensesFile: null,
    fbar: false,
    spouseFbar: false,
    fbarFile: null,
    fatca_pfic: false,
    spouseFatca_pfic: false,
    fatca_pfic_File: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data:", formData);
    toast({
      title: "Interview Sheet Submitted",
      description: `The interview sheet is submitted and will be processed`,
      variant: "success",
    });
  };

  const renderInput = (
    name: keyof FormData,
    label: string,
    type: string = "text",
    required: boolean = false
  ) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        value={formData[name] as string}
        onChange={handleInputChange}
        required={required}
      />
    </div>
  );

  const renderFileInput = (name: keyof FormData, label: string) => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="file"
        id={name}
        name={name}
        onChange={handleFileChange}
        accept=".pdf"
      />
    </div>
  );

  const renderSelect = (
    name: keyof FormData,
    label: string,
    options: { value: string; label: string }[],
    required: boolean = false
  ) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select
        name={name}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, [name]: value }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const renderBooleanSelect = (name: keyof FormData, label: string) => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select
        name={name}
        value={formData[name] ? "yes" : "no"}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, [name]: value === "yes" }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yes">Yes</SelectItem>
          <SelectItem value="no">No</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const DependentDetails = () => {
    return (
      <>
        {formData.dependentDetails.map((dependent, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-md mb-4">
            {renderInput(
              `dependentDetails.${index}.firstName` as keyof FormData,
              "First Name",
              "text",
              true
            )}
            {renderInput(
              `dependentDetails.${index}.middleName` as keyof FormData,
              "Middle Name"
            )}
            {renderInput(
              `dependentDetails.${index}.lastName` as keyof FormData,
              "Last Name",
              "text",
              true
            )}
            {renderInput(
              `dependentDetails.${index}.relation` as keyof FormData,
              "Relation",
              "text",
              true
            )}
            {renderInput(
              `dependentDetails.${index}.dob` as keyof FormData,
              "Date of Birth",
              "date",
              true
            )}
            {renderInput(
              `dependentDetails.${index}.ssn` as keyof FormData,
              "SSN"
            )}
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                const newDependents = [...formData.dependentDetails];
                newDependents.splice(index, 1);
                setFormData((prev) => ({
                  ...prev,
                  dependentDetails: newDependents,
                }));
              }}
            >
              Remove Dependent
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              dependentDetails: [
                ...prev.dependentDetails,
                {
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  relation: "",
                  dob: "",
                  ssn: "",
                },
              ],
            }));
          }}
        >
          Add Dependent
        </Button>
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mx-auto -mt-5">
      <Card className="shadow-none border-none">
        <CardHeader className="px-0">
          <CardTitle>Personal Information</CardTitle>
          <p className="!mb-5 !mt-3.5 text-sm text-muted-foreground">
            Fields marked with an asterisk (*) are mandatory. Also upload
            supports PDF only which is less than 2MB.
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 px-0">
          {renderSelect(
            "maritalStatus",
            "Marital Status",
            [
              { value: "single", label: "Single" },
              { value: "married", label: "Married" },
              { value: "divorced", label: "Divorced" },
              { value: "widowed", label: "Widowed" },
            ],
            true
          )}
          {renderInput("firstName", "First Name as per SSN", "text", true)}
          {renderInput("middleName", "Middle Name as per SSN")}
          {renderInput("lastName", "Last Name as per SSN", "text", true)}
          {renderInput("email", "Email", "email", true)}
          {renderInput("phone", "Phone", "tel", true)}
          {renderInput("ssn", "SSN", "text", true)}
          {renderInput("dob", "Date of Birth", "date", true)}
          {renderInput("visaCategory", "Visa Category", "text", true)}
          {renderInput("occupation", "Occupation", "text", true)}
          {renderInput("currentAddress", "Current Address", "text", true)}
          {renderInput("currentCity", "Current City", "text", true)}
          {renderInput("currentState", "Current State", "text", true)}
          {renderInput("zipCode", "Zip Code", "text", true)}
        </CardContent>
      </Card>

      <Card className="shadow-none border-none">
        <CardHeader className="px-0">
          <CardTitle>Spouse Details</CardTitle>
          <p className="!mt-3.5 text-sm text-muted-foreground">
            Enter spouse details, can be disable as well
          </p>
        </CardHeader>
        <CardContent className="space-y-4 px-0">
          {renderBooleanSelect(
            "includeSpouseDetails",
            "Include Spouse Details"
          )}
          {formData.includeSpouseDetails && (
            <div className="grid grid-cols-1 gap-6">
              {renderInput("spouseFirstName", "Spouse First Name")}
              {renderInput("spouseMiddleName", "Spouse Middle Name")}
              {renderInput("spouseLastName", "Spouse Last Name")}
              {renderInput("spouseEmail", "Spouse Email", "email")}
              {renderInput("spousePhone", "Spouse Phone", "tel")}
              {renderInput("spouseSSN", "Spouse SSN")}
              {renderInput("spouseDOB", "Spouse Date of Birth", "date")}
              {renderInput("spouseOccupation", "Spouse Occupation")}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-none border-none">
        <CardHeader className="px-0">
          <CardTitle>Dependent Details</CardTitle>
          <p className="!mt-3.5 text-sm text-muted-foreground">
            Enter dependent details, can add multiple
          </p>
        </CardHeader>
        <CardContent className="px-0">
          <DependentDetails />
        </CardContent>
      </Card>

      <Card className="shadow-none border-none">
        <CardHeader className="px-0">
          <CardTitle>Residency States</CardTitle>
          <p className=" !mt-3.5 text-sm text-muted-foreground">
            Select residency states can be multiple
          </p>
        </CardHeader>
        <CardContent className="px-0">
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                residencyStates: [...prev.residencyStates, value],
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select states" />
            </SelectTrigger>
            <SelectContent>
              {states.map((item) => (
                <SelectItem value={item.code} key={item.code}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-3">
            {formData.residencyStates.map((state, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {state}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      residencyStates: prev.residencyStates.filter(
                        (_, i) => i !== index
                      ),
                    }))
                  }
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none border-none">
        <CardHeader className="px-0">
          <CardTitle>Source of Income</CardTitle>
          <p className="!mt-3.5 text-sm text-muted-foreground">
            Enter income details and also can upload PDF files
          </p>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          {renderInput("wages", "Wages", "number")}
          {formData.includeSpouseDetails &&
            renderInput("spouseWages", "Spouse Wages", "number")}
          {renderFileInput("wagesFile", "Wages File")}
          {renderInput("businessIncome", "Business Income", "number")}
          {formData.includeSpouseDetails &&
            renderInput(
              "spouseBusinessIncome",
              "Spouse Business Income",
              "number"
            )}
          {renderFileInput("businessIncomeFile", "Business Income File")}
          {renderInput("rentalIncome", "Rental Income", "number")}
          {formData.includeSpouseDetails &&
            renderInput("spouseRentalIncome", "Spouse Rental Income", "number")}
          {renderFileInput("rentalIncomeFile", "Rental Income File")}
          {renderInput("interestIncome", "Interest Income", "number")}
          {formData.includeSpouseDetails &&
            renderInput(
              "spouseInterestIncome",
              "Spouse Interest Income",
              "number"
            )}
          {renderFileInput("interestIncomeFile", "Interest Income File")}
          {renderInput("dividendIncome", "Dividend Income", "number")}
          {formData.includeSpouseDetails &&
            renderInput(
              "spouseDividendIncome",
              "Spouse Dividend Income",
              "number"
            )}
          {renderFileInput("dividendIncomeFile", "Dividend Income File")}
          {renderInput(
            "saleOfStock_CryptoIncome",
            "Sale of Stock/Crypto Income",
            "number"
          )}
          {formData.includeSpouseDetails &&
            renderInput(
              "spouseSaleOfStock_CryptoIncome",
              "Spouse Sale of Stock/Crypto Income",
              "number"
            )}
          {renderFileInput(
            "saleOfStock_CryptoIncomeFile",
            "Sale of Stock/Crypto Income File"
          )}
          {renderInput("retirePlanIncome", "Retirement Plan Income", "number")}
          {formData.includeSpouseDetails &&
            renderInput(
              "spouseRetirePlanIncome",
              "Spouse Retirement Plan Income",
              "number"
            )}
          {renderFileInput(
            "retirePlanIncomeFile",
            "Retirement Plan Income File"
          )}
        </CardContent>
      </Card>

      <Card className="shadow-none border-none">
        <CardHeader className="px-0">
          <CardTitle>Source of Deduction/Benefits</CardTitle>
          <p className="!mt-3.5 text-sm text-muted-foreground">
            Enter deduction details and also can upload PDF files
          </p>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          {renderInput("mortgageInterest", "Mortgage Interest", "number")}
          {formData.includeSpouseDetails &&
            renderInput(
              "spouseMortgageInterest",
              "Spouse Mortgage Interest",
              "number"
            )}
          {renderFileInput("mortgageInterestFile", "Mortgage Interest File")}
          {renderInput("propertyTax", "Property Tax", "number")}
          {formData.includeSpouseDetails &&
            renderInput("spousePropertyTax", "Spouse Property Tax", "number")}
          {renderFileInput("propertyTaxFile", "Property Tax File")}
          {renderInput("charitableDonations", "Charitable Donations", "number")}
          {formData.includeSpouseDetails &&
            renderInput(
              "spouseCharitableDonations",
              "Spouse Charitable Donations",
              "number"
            )}
          {renderFileInput(
            "charitableDonationsFile",
            "Charitable Donations File"
          )}
          {renderInput("medicalExpenses", "Medical Expenses", "number")}
          {formData.includeSpouseDetails &&
            renderInput(
              "spouseMedicalExpenses",
              "Spouse Medical Expenses",
              "number"
            )}
          {renderFileInput("medicalExpensesFile", "Medical Expenses File")}
          {renderInput(
            "studentLoanInterest",
            "Student Loan Interest",
            "number"
          )}
          {formData.includeSpouseDetails &&
            renderInput(
              "spouseStudentLoanInterest",
              "Spouse Student Loan Interest",
              "number"
            )}
          {renderFileInput(
            "studentLoanInterestFile",
            "Student Loan Interest File"
          )}
          {renderInput("educationExpenses", "Education Expenses", "number")}
          {formData.includeSpouseDetails &&
            renderInput(
              "spouseEducationExpenses",
              "Spouse Education Expenses",
              "number"
            )}
          {renderFileInput("educationExpensesFile", "Education Expenses File")}
        </CardContent>
      </Card>

      <Card className="shadow-none border-none">
        <CardHeader className="px-0">
          <CardTitle>Other Disclosure</CardTitle>
          <p className="!mt-3.5 text-sm text-muted-foreground">
            Enter other disclosure details and also can upload PDF files
          </p>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          {renderBooleanSelect("fbar", "FBAR")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect("spouseFbar", "Spouse FBAR")}
          {renderFileInput("fbarFile", "FBAR File")}
          {renderBooleanSelect("fatca_pfic", "FATCA/PFIC")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect("spouseFatca_pfic", "Spouse FATCA/PFIC")}
          {renderFileInput("fatca_pfic_File", "FATCA/PFIC File")}
        </CardContent>
      </Card>

      <Button
        type="submit"
        size="lg"
        className="w-fit bg-blue-500 hover:bg-blue-600 !mt-7"
      >
        Submit Interview Form
      </Button>
    </form>
  );
}
