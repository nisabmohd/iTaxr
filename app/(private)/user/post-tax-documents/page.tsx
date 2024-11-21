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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import { clientFileInputSchema, fileToBase64 } from "@/lib/utils";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { postTaxFormAction } from "@/actions/user-forms";

const documentTypes = [
  { value: "w2", label: "W-2" },
  { value: "1099", label: "1099" },
  { value: "1098", label: "1098" },
  { value: "other", label: "Other" },
] as const;

const FormSchema = z.object({
  documentType: z.string({
    required_error: "Please select a document type.",
  }),
  file: clientFileInputSchema,
  remarks: z.string().optional(),
});

export default function FormsAndDocuments() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { file, documentType, remarks } = data;
    startTransition(async () => {
      const base64File = await fileToBase64(file);
      console.log(base64File);
      const resp = await postTaxFormAction({
        documentType,
        documentRemarks: remarks,
        documentTypeFile: base64File,
      });

      if (resp.success) {
        toast({
          title: "Document uploaded",
          description: `Uploaded ${data.file.name} as ${data.documentType}`,
          variant: "success",
        });
        router.refresh();
      } else {
        toast({
          title: "Document update failed",
          description: resp.message,
          variant: "destructive",
        });
      }
    });
  }

  const handleDownload = (formType: string) => {
    // Placeholder function for download logic
    console.log(`Downloading ${formType}`);
    toast({
      title: "Download started",
      description: `Downloading ${formType}`,
      variant: "success",
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Forms & Documents</h3>
      <div className="flex space-x-4">
        <Button
          onClick={() => handleDownload("Draft Tax Return(s)")}
          className="bg-green-500 hover:bg-green-600"
        >
          <Download className="mr-2 h-4 w-4" /> Draft Tax Return(s)
        </Button>
        <Button
          onClick={() => handleDownload("E-File Authorization Form")}
          className="bg-green-500 hover:bg-green-600"
        >
          <Download className="mr-2 h-4 w-4" /> E-File Authorization Form
        </Button>
      </div>
      <Form {...form}>
        <p className="text-sm text-muted-foreground mb-7 mt-2">
          Fields marked with an asterisk (*) are mandatory.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-[600px]"
        >
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Document Type<span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a document type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Select File<span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                      }
                    }}
                    accept=".pdf, .doc, .docx"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any additional comments here."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            size="lg"
            className="w-fit bg-blue-500 hover:bg-blue-600 !mt-7"
          >
            Upload
          </Button>
        </form>
      </Form>
    </div>
  );
}
