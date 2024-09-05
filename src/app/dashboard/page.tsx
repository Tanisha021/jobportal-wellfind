"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BriefcaseIcon,
  BuildingIcon,
  MenuIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { ModeToggle } from "@/components/ThemeToggler";
import { useAppStore } from "@/hooks/useAppStore";
import Header from "@/components/Header";

// Job listing type
type JobListing = {
  id: number;
  title: string;
  company: string;
  location: string;
  postedDate: string;
};

// Sample job listings data
const initialJobListings: JobListing[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    postedDate: "2023-07-15",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "DataWiz",
    location: "New York, NY",
    postedDate: "2023-07-14",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "InnovateCo",
    location: "Austin, TX",
    postedDate: "2023-07-13",
  },
  {
    id: 4,
    title: "UX Designer",
    company: "DesignHub",
    location: "Seattle, WA",
    postedDate: "2023-07-12",
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "ServerPro",
    location: "Boston, MA",
    postedDate: "2023-07-11",
  },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobListings, setJobListings] =
    useState<JobListing[]>(initialJobListings);

  useEffect(() => {
    const filteredListings = initialJobListings.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setJobListings(filteredListings);
  }, [searchTerm]);

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900`}>
      <Sidebar />
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Jobs
                </CardTitle>
                <BriefcaseIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-green-500 dark:text-green-400">
                  +20% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Applications
                </CardTitle>
                <UserIcon className="h-4 w-4 text-purple-500 dark:text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-green-500 dark:text-green-400">
                  +12% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Companies
                </CardTitle>
                <BuildingIcon className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-green-500 dark:text-green-400">
                  +7% from last quarter
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Placement Rate
                </CardTitle>
                <UserIcon className="h-4 w-4 text-green-500 dark:text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-green-500 dark:text-green-400">
                  +5% from last year
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Job Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 relative">
                  <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Search jobs..."
                    className="pl-8 max-w-sm bg-white dark:bg-gray-800"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Posted Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobListings.map((job) => (
                      <TableRow
                        key={job.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <TableCell className="font-medium">
                          {job.title}
                        </TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.postedDate}</TableCell>
                      </TableRow>
                    ))}
                    {jobListings.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No jobs found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
