import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "./sections/Profile";
import Files from "./sections/Files";
import JobPreferencesForm from "./sections/Preferences";

export function ProfileTabs() {
  const skills = [
    "Python",
    "PHP",
    "Javascript",
    "Django",
    "Node.js",
    "React.js",
    "React Native",
    "Next.Js",
  ];
  return (
    <Tabs defaultValue="profile" className="w-auto">
      <div className="border-2 rounded-md border-neutral-300">
        <TabsList className="grid w-full h-auto grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="profile" className="w-full space-y-4">
        <Profile />
      </TabsContent>
      <TabsContent value="resume">
        <Files />
      </TabsContent>
      <TabsContent value="preferences">
        <JobPreferencesForm />
      </TabsContent>
    </Tabs>
  );
}

export default ProfileTabs;
