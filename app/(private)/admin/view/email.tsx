"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EmailTab = () => {
  const [template, setTemplate] = useState<EmailTemplateValue | undefined>();
  const [emailContent, setEmailContent] = useState("");

  const handleTemplateChange = (value: EmailTemplateValue) => {
    setTemplate(value);
    const temp = email_templates.find((tp) => tp.name == value)!;
    setEmailContent(temp.content);
  };

  const handleSend = () => {
    // In a real application, you would implement the send logic here
    console.log("Sending email:", emailContent);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Email</CardTitle>
        <CardDescription>Compose and send an email</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="template">Select Template</Label>
          <Select value={template} onValueChange={handleTemplateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {email_templates.map((template) => (
                <SelectItem key={template.name} value={template.name}>
                  {template.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email-content">Email Content</Label>
          <Textarea
            id="email-content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="min-h-[200px]"
            rows={15}
          />
        </div>
        <Button size="lg" onClick={handleSend} className="w-fit !bg-tomato">
          Send Email
        </Button>
      </CardContent>
    </Card>
  );
};

const email_templates = [
  {
    name: "welcome",
    title: "Welcome Email",
    content: `Subject: Welcome to Our Service!

Hi [Name],

Thank you for joining [Service Name]! We're thrilled to have you on board. 

Feel free to explore and let us know if you have any questions.

Best regards,  
[Your Company Name]`,
  },
  {
    name: "followup",
    title: "Follow-up Email",
    content: `Subject: Just Checking In

Hi [Name],

I hope this message finds you well! I wanted to follow up regarding [specific topic]. Let me know if there's anything I can assist you with.

Looking forward to your response.

Best regards,  
[Your Name]`,
  },
] as const;

type EmailTemplateValue = (typeof email_templates)[number]["name"];

export default EmailTab;
