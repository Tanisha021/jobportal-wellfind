"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Briefcase, GraduationCap, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, Linkedin, Github, Twitter } from "lucide-react";
import { ExperienceItem } from "@/components/ExperienceItem";
import { EducationItem } from "@/components/EducationItem";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

type Props = {};

const Profile = (props: Props) => {
  const [skills, setSkills] = useState([
    "Python",
    "PHP",
    "Javascript",
    "Django",
    "Node.js",
    "React.js",
    "React Native",
    "Next.Js",
  ]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <>
      {/* About */}
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Tell us about yourself so startups know who you are.
          </p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Your name*</Label>
              <Input id="name" placeholder="Dhruvil S Shah" />
            </div>

            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <Button variant="outline">Upload a new photo</Button>
            </div>

            <div>
              <Label htmlFor="location">Where are you based?*</Label>
              <div className="relative">
                <Input id="location" placeholder="Ahmedabad, Gujarat" />
                <Button
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Select your primary role*</Label>
                <Select>
                  <option>Full-Stack Engineer</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="experience">Years of experience*</Label>
                <Select>
                  <option>2 Years</option>
                </Select>
              </div>
            </div>

            <div>
              <Label>Open to the following roles</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">
                  Software Engineer
                  <Button variant="ghost" size="sm" className="h-auto p-0 ml-2">
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
                <Badge variant="secondary">
                  Frontend Engineer
                  <Button variant="ghost" size="sm" className="h-auto p-0 ml-2">
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
                <Badge variant="secondary">
                  Backend Engineer
                  <Button variant="ghost" size="sm" className="h-auto p-0 ml-2">
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </div>
              <Select className="mt-2">
                <option>Select role</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="bio">Your bio</Label>
              <Textarea
                id="bio"
                placeholder="SSIP Grantee, 2 Failed startups, MERN/SERN/PERN, and Django stack. NCC 'A' Certificate"
                className="h-24"
              />
              <p className="text-sm text-muted-foreground text-right mt-1">
                62
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Experience */}
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Your work experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            What other positions have you held?
          </p>

          <ExperienceItem
            title="App Developer"
            company="Prasad Group of Companies"
            date="May 2024 to Aug 2024"
            description="• Developed cross-platform CRM application using React Native, Expo, TailwindCSS, React Query and Zustand. • Created a robust and secure backend using Node.js, Knex.js, JWT, MsSQL, Deployed on Private VM using pm2. • 50% boosted data entry, 30% increased team productivity, 25% faster database queries. 100% adoption in 2 weeks."
          />

          <ExperienceItem
            title="Web Developer"
            company="Pandit Deendayal Energy University"
            date="Jan 2023 to Jul 2023"
            description="HR Department. Made a full-fledged software to monitor and track faculty progress and give them a raise based on the collection of complex parameters discussed and set with the help of HR Department. Endorsed by the chief of HR."
          />

          <ExperienceItem
            title="Instructor"
            company="CDAC"
            date="Jul 2022 to Dec 2022"
            description=""
          />

          <Button className="w-full" variant="outline">
            <Briefcase className="w-4 h-4 mr-2" />
            Add work experience
          </Button>
        </CardContent>
      </Card>
      {/* Education */}
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            What schools have you studied at?
          </p>

          <EducationItem
            school="Vpmp Polytechnic"
            degree="Computer Engineering, High School"
            gpa="9.9/10.0"
            year="2022"
          />

          <EducationItem
            school="Pandit Deendayal Energy University"
            degree="Computer Science and Engineering, Bachelor's"
            year="2025"
          />

          <Button className="w-full" variant="outline">
            <GraduationCap className="w-4 h-4 mr-2" />
            Add education
          </Button>
        </CardContent>
      </Card>
      {/* Skills */}
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            This will help startups hone in on your strengths.
          </p>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {skill}
                <button className="ml-2 hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          <Input placeholder="e.g. Python, React" />
        </CardContent>
      </Card>
      {/* Achievements */}
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Sharing more details about yourself will help you stand out more.
            </p>
            <Textarea
              placeholder="List your achievements here..."
              defaultValue="NCC 'A' Certificate accredited.&#10;SSIP Grantee.&#10;D2D ACPC Rank : 49"
              className="h-32"
            />
          </div>
        </CardContent>
      </Card>
      {/* Social */}
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Social Profiles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Where can people find you online?
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="w-4 h-4" /> Website
              </Label>
              <Input
                id="website"
                placeholder="https://dhruvwill.com"
                defaultValue="https://dhruvwill.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/dhruvwill"
                defaultValue="https://linkedin.com/in/dhruvwill"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github" className="flex items-center gap-2">
                <Github className="w-4 h-4" /> GitHub
              </Label>
              <Input
                id="github"
                placeholder="https://github.com/dhruvwill"
                defaultValue="https://github.com/dhruvwill"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter" className="flex items-center gap-2">
                <Twitter className="w-4 h-4" /> Twitter
              </Label>
              <Input id="twitter" placeholder="https://twitter.com/username" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
