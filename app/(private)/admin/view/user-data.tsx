import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import EmailTab from "./email";

const PersonalInfoTab = () => (
  <Card>
    <CardHeader>
      <CardTitle>Personal Information</CardTitle>
      <CardDescription>View your personal details</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" value="John Doe" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value="john.doe@example.com" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" value="+1 (555) 123-4567" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" value="123 Main St, Anytown, USA" readOnly />
      </div>

      <p className="text-muted-foreground text-sm">
        Work in progress ... Rest all details will come here
      </p>
    </CardContent>
  </Card>
);

const InterviewSheetTab = () => (
  <Card>
    <CardHeader>
      <CardTitle>Interview Sheet</CardTitle>
      <CardDescription>View user interview sheet details</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="position">First Name as per SSN</Label>
        <Input id="position" value="Nisab" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Last Name as per SSN</Label>
        <Input id="date" value="Mohammad" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="interviewer">Interviewer</Label>
        <Input id="interviewer" value="Jane Smith" readOnly />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Input id="status" value="Completed" readOnly />
      </div>

      <p className="text-muted-foreground text-sm">
        Work in progress ... Rest all details will come here
      </p>
    </CardContent>
  </Card>
);

export default function UserDataTabs() {
  return (
    <Tabs defaultValue="personal" className="w-full mr-16">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="interview">Interview Sheet</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <PersonalInfoTab />
      </TabsContent>
      <TabsContent value="interview">
        <InterviewSheetTab />
      </TabsContent>
      <TabsContent value="email">
        <EmailTab />
      </TabsContent>
    </Tabs>
  );
}
