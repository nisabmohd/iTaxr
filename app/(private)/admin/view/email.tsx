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
  const [template, setTemplate] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const handleTemplateChange = (value: string) => {
    setTemplate(value);
    // In a real application, you would fetch the template content here
    setEmailContent(`This is the content for the ${value} template.`);
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
              <SelectItem value="welcome">Welcome Email</SelectItem>
              <SelectItem value="followup">Follow-up Email</SelectItem>
              <SelectItem value="offer">Job Offer Email</SelectItem>
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
          />
        </div>
        <Button
          size="lg"
          onClick={handleSend}
          className="w-fit bg-blue-500 hover:bg-blue-600"
        >
          Send Email
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmailTab;
