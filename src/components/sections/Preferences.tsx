"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

interface Location {
  address: string;
  lat: number;
  lng: number;
}

const JobPreferencesForm: React.FC = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const [address, setAddress] = useState<string>("");
  const [isScriptLoaded] = useState<boolean>(false);
  const router = useRouter();

  const roles = [
    "Engineering",
    "Product",
    "Design",
    "Business",
    "Marketing",
    "Operations",
    "Other",
  ];

  const handleRoleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value;
    if (!selectedRoles.includes(selectedRole)) {
      setSelectedRoles((prev) => [...prev, selectedRole]);
    }
  };

  const handleRoleRemove = (role: string) => {
    setSelectedRoles((prev) => prev.filter((r) => r !== role));
  };

  const handleSelect = async (value: string) => {
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setSelectedLocations((prev) => [...prev, { address: value, ...latLng }]);
      setAddress("");
    } catch (error) {
      console.error("Error in geocoding:", error);
    }
  };

  const handleRemoveLocation = (locationToRemove: Location) => {
    setSelectedLocations((prev) =>
      prev.filter((location) => location.address !== locationToRemove.address)
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    router.push("/profilecreation/resume");
  };

  return (
    <Card className="w-full mx-auto">
      {/* Job Search Status */}
      <Card className="space-y-2 my-4 mx-2">
        <CardHeader>
          <CardTitle>Job Search Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Where are you in your job search?</Label>
          <RadioGroup className="mt-4 space-y-3">
            {["Ready to interview", "Open to offers", "Closed to offers"].map(
              (status) => (
                <div key={status} className="flex items-center space-x-3">
                  <RadioGroupItem value={status} id={status} />
                  <Label htmlFor={status}>{status}</Label>
                </div>
              )
            )}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Job Type */}
      <Card className="space-y-2 my-4 mx-2">
        <CardHeader>
          <CardTitle>Job Type</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>What type of job are you interested in?</Label>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {["Full-time Employee", "Contractor", "Intern", "Co-founder"].map(
              (type) => (
                <div key={type} className="flex items-center space-x-3">
                  <Checkbox id={type} />
                  <Label htmlFor={type}>{type}</Label>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Desired Salary */}
      <Card className="space-y-2 my-4 mx-2">
        <CardHeader>
          <CardTitle>Desired Salary</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>What is your desired salary?</Label>
          <div className="flex items-center space-x-4 mt-4">
            <Input type="number" placeholder="Enter amount" className="w-1/4" />
            <select defaultValue="USD" className="w-24 p-2 border rounded-md">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Role Selection */}
      <Card className="space-y-2 my-4 mx-2">
        <CardHeader>
          <CardTitle>Role Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>What kind of role are you looking for?</Label>
          <div className="mt-4">
            <select
              onChange={handleRoleSelect}
              className="w-1/2 p-2 border rounded-md"
              defaultValue=""
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <div className="mt-4">
              {selectedRoles.map((role) => (
                <div
                  key={role}
                  className="inline-flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full m-1 hover:bg-red-400"
                >
                  <span>{role}</span>
                  <button
                    onClick={() => handleRoleRemove(role)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Selection */}
      <Card className="space-y-2 my-4 mx-2">
        <CardHeader>
          <CardTitle>Location Preferences</CardTitle>
        </CardHeader>
        <CardContent className="w-1/2">
          <Label>Where do you want to work?</Label>

          <div className="mt-4">
            {selectedLocations.map((location) => (
              <div
                key={location.address}
                className="inline-flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full m-1"
              >
                <span>{location.address}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveLocation(location)}
                >
                  &times;
                </Button>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-4 p-2 bg-gray-50 rounded-lg shadow-sm">
            <div className="relative flex items-center">
              <Input
                type="checkbox"
                id="remote"
                className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded transition duration-150 ease-in-out"
              />
            </div>
            <Label
              htmlFor="remote"
              className="text-sm font-medium text-gray-700"
            >
              I am open to working remotely
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* US Work Authorization */}
      <Card className="space-y-2 my-4 mx-2">
        <CardHeader>
          <CardTitle>US Work Authorization</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Do you require US work visa sponsorship?</Label>
          <RadioGroup className="mt-4 space-y-3">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Button
          //   onClick={handleSubmit}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Next
        </Button>
      </div>
    </Card>
  );
};

export default JobPreferencesForm;
