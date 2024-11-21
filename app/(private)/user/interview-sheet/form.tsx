"use client";

import React, { useCallback, useMemo, useState, useTransition } from "react";
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
import { fileToBase64, states } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  interviewSheetSubmitAction,
  uploadDocumentAction,
} from "@/actions/user-forms";

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
  spousePhoneNumber: string;
  spouseSsn: string;
  spouseDob: string;
  spouseOccupation: string;

  // Dependent details section
  dependentDetails: DependentDetail[];

  // Residency states section
  residencyStates: string[];

  // Source of Income section
  wages: number;
  spouseWages: number;
  wagesFile: string | null;
  businessIncome: number;
  spouseBusinessIncome: number;
  businessIncomeFile: string | null;
  rentalIncome: number;
  spouseRentalIncome: number;
  rentalIncomeFile: string | null;
  interestIncome: number;
  spouseInterestIncome: number;
  interestIncomeFile: string | null;
  dividendIncome: number;
  spouseDividendIncome: number;
  dividendIncomeFile: string | null;
  saleOfStock_CryptoIncome: number;
  spouseSaleOfStock_CryptoIncome: number;
  saleOfStock_CryptoIncomeFile: string | null;
  retirePlanIncome: number;
  spouseRetirePlanIncome: number;
  retirePlanIncomeFile: string | null;

  // Source of Deduction/Benefits section
  mortgageInterest: number;
  spouseMortgageInterest: number;
  mortgageInterestFile: string | null;
  propertyTax: number;
  spousePropertyTax: number;
  propertyTaxFile: string | null;
  charitableDonations: number;
  spouseCharitableDonations: number;
  charitableDonationsFile: string | null;
  medicalExpenses: number;
  spouseMedicalExpenses: number;
  medicalExpensesFile: string | null;
  studentLoanInterest: number;
  spouseStudentLoanInterest: number;
  studentLoanInterestFile: string | null;
  educationExpenses: number;
  spouseEducationExpenses: number;
  educationExpensesFile: string | null;

  // Other Disclosure section
  fbar: boolean;
  spouseFbar: boolean;
  fbarFile: string | null;
  fatca_pfic: boolean;
  spouseFatca_pfic: boolean;
  fatca_pfic_File: string | null;
};

export default function InterviewSheetForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
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
    spousePhoneNumber: "",
    spouseSsn: "",
    spouseDob: "",
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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) || 0 : value,
      }));
    },
    []
  );

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = e.target;
      if (files && files[0]) {
        const base64Str = await fileToBase64(files[0]);
        const uploadResult = await uploadDocumentAction(base64Str);
        console.log(uploadResult);

        if (uploadResult.success)
          setFormData((prev) => ({
            ...prev,
            [name]: uploadResult.fileId,
          }));
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(formData);
      startTransition(async () => {
        const resp = await interviewSheetSubmitAction(formData);
        console.log(resp);

        if (resp.success)
          toast({
            title: "Interview Sheet Submitted",
            description: `The interview sheet is submitted and will be processed`,
            variant: "success",
          });
        else
          toast({
            title: "Interview Sheet upload failed",
            description: `The interview sheet submission failed`,
            variant: "destructive",
          });
      });
    },
    [toast, formData]
  );

  const renderInput = useCallback(
    (
      name: keyof FormData,
      label: string,
      type: string = "text",
      required: boolean = false
    ) => (
      <div className="space-y-2" key={name}>
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
    ),
    [formData, handleInputChange]
  );

  const renderFileInput = useCallback(
    (name: keyof FormData, label: string) => (
      <div className="space-y-2" key={name}>
        <Label htmlFor={name}>{label}</Label>
        <Input
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          accept=".pdf"
        />
      </div>
    ),
    [handleFileChange]
  );

  const renderSelect = useCallback(
    (
      name: keyof FormData,
      label: string,
      options: { value: string; label: string }[],
      required: boolean = false
    ) => (
      <div className="space-y-2" key={name}>
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
    ),
    []
  );

  const renderBooleanSelect = useCallback(
    (name: keyof FormData, label: string) => (
      <div className="space-y-2" key={name}>
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
    ),
    [formData]
  );

  const DependentDetails = useCallback(() => {
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
  }, [formData.dependentDetails, renderInput]);

  const memoizedDependentDetails = useMemo(
    () => <DependentDetails />,
    [DependentDetails]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mx-auto -mt-5">
      {/* Personal Information */}
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

      {/* Spouse Details */}
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
              {renderInput("spousePhoneNumber", "Spouse Phone", "tel")}
              {renderInput("spouseSsn", "Spouse SSN")}
              {renderInput("spouseDob", "Spouse Date of Birth", "date")}
              {renderInput("spouseOccupation", "Spouse Occupation")}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dependent Details */}
      <Card className="shadow-none border-none">
        <CardHeader className="px-0">
          <CardTitle>Dependent Details</CardTitle>
          <p className="!mt-3.5 text-sm text-muted-foreground">
            Enter dependent details, can add multiple
          </p>
        </CardHeader>
        <CardContent className="px-0">{memoizedDependentDetails}</CardContent>
      </Card>

      {/* Residency States */}
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

      {/* Source of Income */}
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
          {renderBooleanSelect("businessIncome", "Business Income")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect(
              "spouseBusinessIncome",
              "Spouse Business Income"
            )}
          {renderFileInput("businessIncomeFile", "Business Income File")}
          {renderBooleanSelect("rentalIncome", "Rental Income")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect("spouseRentalIncome", "Spouse Rental Income")}
          {renderFileInput("rentalIncomeFile", "Rental Income File")}
          {renderBooleanSelect("interestIncome", "Interest Income")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect(
              "spouseInterestIncome",
              "Spouse Interest Income"
            )}
          {renderFileInput("interestIncomeFile", "Interest Income File")}
          {renderBooleanSelect("dividendIncome", "Dividend Income")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect(
              "spouseDividendIncome",
              "Spouse Dividend Income"
            )}
          {renderFileInput("dividendIncomeFile", "Dividend Income File")}
          {renderBooleanSelect(
            "saleOfStock_CryptoIncome",
            "Sale of Stock/Crypto Income"
          )}
          {formData.includeSpouseDetails &&
            renderBooleanSelect(
              "spouseSaleOfStock_CryptoIncome",
              "Spouse Sale of Stock/Crypto Income"
            )}
          {renderFileInput(
            "saleOfStock_CryptoIncomeFile",
            "Sale of Stock/Crypto Income File"
          )}
          {renderBooleanSelect("retirePlanIncome", "Retirement Plan Income")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect(
              "spouseRetirePlanIncome",
              "Spouse Retirement Plan Income"
            )}
          {renderFileInput(
            "retirePlanIncomeFile",
            "Retirement Plan Income File"
          )}
        </CardContent>
      </Card>

      {/* Source of Deduction/Benefits */}
      <Card className="shadow-none border-none">
        <CardHeader className="px-0">
          <CardTitle>Source of Deduction/Benefits</CardTitle>
          <p className="!mt-3.5 text-sm text-muted-foreground">
            Enter deduction details and also can upload PDF files
          </p>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          {renderBooleanSelect("mortgageInterest", "Mortgage Interest")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect(
              "spouseMortgageInterest",
              "Spouse Mortgage Interest"
            )}
          {renderFileInput("mortgageInterestFile", "Mortgage Interest File")}
          {renderBooleanSelect("propertyTax", "Property Tax")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect("spousePropertyTax", "Spouse Property Tax")}
          {renderFileInput("propertyTaxFile", "Property Tax File")}
          {renderBooleanSelect("charitableDonations", "Charitable Donations")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect(
              "spouseCharitableDonations",
              "Spouse Charitable Donations"
            )}
          {renderFileInput(
            "charitableDonationsFile",
            "Charitable Donations File"
          )}
          {renderBooleanSelect("medicalExpenses", "Medical Expenses")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect(
              "spouseMedicalExpenses",
              "Spouse Medical Expenses"
            )}
          {renderFileInput("medicalExpensesFile", "Medical Expenses File")}
          {renderBooleanSelect("studentLoanInterest", "Student Loan Interest")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect(
              "spouseStudentLoanInterest",
              "Spouse Student Loan Interest"
            )}
          {renderFileInput(
            "studentLoanInterestFile",
            "Student Loan Interest File"
          )}
          {renderBooleanSelect("educationExpenses", "Education Expenses")}
          {formData.includeSpouseDetails &&
            renderBooleanSelect(
              "spouseEducationExpenses",
              "Spouse Education Expenses"
            )}
          {renderFileInput("educationExpensesFile", "Education Expenses File")}
        </CardContent>
      </Card>

      {/* Other Disclosure */}
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
        disabled={isPending}
        type="submit"
        size="lg"
        className="w-fit bg-blue-500 hover:bg-blue-600 !mt-7"
      >
        Submit Interview Form
      </Button>
    </form>
  );
}
