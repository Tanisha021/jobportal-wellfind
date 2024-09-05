"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaSearch } from "react-icons/fa";

const ProfileCreation = () => {
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [isStudent, setIsStudent] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [school, setSchool] = useState("");
  const [gradMonth, setGradMonth] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [studyField, setStudyField] = useState("");
  const [query, setQuery] = useState("");

  const router = useRouter();

  const locations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "India",
  ];

  const filteredLocations =
    query === ""
      ? locations
      : locations.filter((loc) =>
          loc.toLowerCase().includes(query.toLowerCase())
        );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({
      location,
      role,
      experience,
      isStudent,
      jobTitle,
      company,
      linkedin,
      website,
      school,
      gradMonth,
      gradYear,
      studyField,
    });
    router.push("/profilecreation/preferences");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-20">
      <CardHeader>
        <CardTitle>Create Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Where do you belong?</Label>
            <div className="relative">
              <Input
                id="location"
                placeholder="Search for your location"
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                required
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {filteredLocations.map((loc) => (
                <div
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {loc}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">What role do you do best?</Label>
            <Select onValueChange={setRole} value={role}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Years of experience</Label>
            <Select onValueChange={setExperience} value={experience}>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select years of experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">0-1 years</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5+">5+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Are you a student?</Label>
            <div className="flex space-x-4">
              <Button
                variant={isStudent === true ? "default" : "outline"}
                onClick={() => setIsStudent(true)}
              >
                Yes
              </Button>
              <Button
                variant={isStudent === false ? "default" : "outline"}
                onClick={() => setIsStudent(false)}
              >
                No
              </Button>
            </div>
          </div>

          {isStudent === true && (
            <>
              <div className="space-y-2">
                <Label htmlFor="school">School</Label>
                <Input
                  id="school"
                  placeholder="Enter your school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gradMonth">Graduation Month</Label>
                <Select onValueChange={setGradMonth} value={gradMonth}>
                  <SelectTrigger id="gradMonth">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gradYear">Graduation Year</Label>
                <Select onValueChange={setGradYear} value={gradYear}>
                  <SelectTrigger id="gradYear">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => (
                      <SelectItem key={i} value={String(2024 + i)}>
                        {2024 + i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studyField">Field of Study</Label>
                <Input
                  id="studyField"
                  placeholder="Enter your field of study"
                  value={studyField}
                  onChange={(e) => setStudyField(e.target.value)}
                />
              </div>
            </>
          )}

          {isStudent === false && (
            <>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Your job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Your company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="p-4 rounded-lg shadow-lg w-full border border-gray-200 bg-gray-100">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://yourwebsite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button type="submit">Next</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileCreation;
