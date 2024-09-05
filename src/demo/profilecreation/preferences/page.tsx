'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';

const JobPreferencesForm = () => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [address, setAddress] = useState('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const roles = [
    "Engineering",
    "Product",
    "Design",
    "Business",
    "Marketing",
    "Operations",
    "Other",
  ];
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    router.push('/profilecreation/resume');
  };
  const locationOptions = [
    { value: 'new-york', label: 'New York, USA' },
    { value: 'san-francisco', label: 'San Francisco, USA' },
    { value: 'london', label: 'London, UK' },
    { value: 'berlin', label: 'Berlin, Germany' },
    { value: 'tokyo', label: 'Tokyo, Japan' },
    { value: 'sydney', label: 'Sydney, Australia' },
    // Add more locations or fetch dynamically
  ];
  //role
  const handleRoleSelect = (event) => {
    const selectedRole = event.target.value;
    if (!selectedRoles.includes(selectedRole)) {
      setSelectedRoles([...selectedRoles, selectedRole]);
    }
  };

  const handleRoleRemove = (role) => {
    setSelectedRoles(selectedRoles.filter((r) => r !== role));
  };

  //location
  // const handleLocationSelect = (selectedOption) => {
  //   if (selectedOption && !selectedLocations.some(loc => loc.value === selectedOption.value)) {
  //     setSelectedLocations([...selectedLocations, selectedOption]);
  //   }
  // };

  // const handleLocationRemove = (locationToRemove) => {
  //   setSelectedLocations(selectedLocations.filter(loc => loc.value !== locationToRemove.value));
  // };
  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
  };
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setSelectedLocations([...selectedLocations, { address: value, ...latLng }]);
    setAddress('');
  };

  const handleRemoveLocation = (locationToRemove) => {
    setSelectedLocations(selectedLocations.filter(location => location.address !== locationToRemove.address));
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto my-20 p-8">
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD6kejGma5DjKMxED1LzRWIQOaM5av1ZTE&libraries=places`}
        onLoad={handleScriptLoad}
      />
      {/* Job Search Status */}
      <Card className='space-y-2 my-4 mx-2'>
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
      <Card className='space-y-2 my-4 mx-2'>
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
      <Card className='space-y-2 my-4 mx-2'>
        <CardHeader>
          <CardTitle>Desired Salary</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>What is your desired salary?</Label>
          <div className="flex items-center space-x-4 mt-4">
            <Input
              type="number"
              placeholder="Enter amount"
              className="w-1/4"
            />
              <select
            defaultValue="USD"
            className="w-24 p-2 border rounded-md"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          </div>
        </CardContent>
      </Card>

      {/* Role Selection */}
      <Card className='space-y-2 my-4 mx-2'>
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
          <option value="" disabled>Select a role</option>
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
      <Card className='space-y-2 my-4 mx-2'>
        <CardHeader>
          <CardTitle>Location Preferences</CardTitle>
        </CardHeader>
        <CardContent className="w-1/2">
          <Label>Where do you want to work?</Label>

          {isScriptLoaded && (
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
              searchOptions={{ types: ['(cities)'] }}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <Input
                    {...getInputProps({
                      placeholder: "Search and select a location",
                      className: "mt-4",
                    })}
                  />
                  <div className="mt-2">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const style = { backgroundColor: suggestion.active ? "#e2e8f0" : "#fff" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { style })}
                          className="p-2 rounded hover:bg-gray-100"
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          )}

          <div className="mt-4">
            {selectedLocations.map((location) => (
              <div
                key={location.address}
                className="inline-flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full m-1"
              >
                <span>{location.address}</span>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveLocation(location)}>
                  &times;
                </Button>
              </div>
            ))}
          </div>
            {/* to work remotely   */}
          <div className="flex items-center space-x-4 mt-4 p-2 bg-gray-50 rounded-lg shadow-sm">
            <div className="relative flex items-center">
              <Input type="checkbox" id="remote" className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded transition duration-150 ease-in-out" />
            </div>
            <Label htmlFor="remote" className="text-sm font-medium text-gray-700">
              I am open to working remotely
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* US Work Authorization */}
      <Card className='space-y-2 my-4 mx-2'>
        <CardHeader>
          <CardTitle>US Work Authorization</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Are you legally authorized to work in the United States?</Label>
          <RadioGroup className="mt-4 space-y-3">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="yes" id="us-auth-yes" />
              <Label htmlFor="us-auth-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="no" id="us-auth-no" />
              <Label htmlFor="us-auth-no">No</Label>
            </div>
          </RadioGroup>

          <Separator className="my-6" />

          <Label>Do you or will you require sponsorship for a US employment visa (e.g., H-1B)?</Label>
          <RadioGroup className="mt-4 space-y-3">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="yes" id="visa-yes" />
              <Label htmlFor="visa-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="no" id="visa-no" />
              <Label htmlFor="visa-no">No</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Company Size Preferences */}
      <Card className='space-y-2 my-4 mx-2'>
        <CardHeader>
          <CardTitle>Company Size Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>What size companies do you prefer to work at?</Label>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[
              "Seed (1 - 10 employees)",
              "Early (11 - 50 employees)",
              "Mid-size (51 - 200 employees)",
              "Large (201 - 500 employees)",
              "Very Large (501 - 1000 employees)",
              "Massive (1001+ employees)",
            ].map((size) => (
              <div key={size} className="flex items-center space-x-3">
                <Checkbox id={size} />
                <Label htmlFor={size}>{size}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button variant="outline" size="lg" type="submit" onClick={handleSubmit} >
          Save Preferences
        </Button>
      </div>
    </Card>
  );
};

export default JobPreferencesForm;
