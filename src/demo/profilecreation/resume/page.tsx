'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';

const ResumePage = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    router.push('/dashboard');
  };

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      setFile(newFile);
      setFileName(newFile.name);
      setUploadProgress(0);
    },
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'], // Example: only accept PDF files
    },
  });

  const handleUpload = () => {
    if (!file) return; // Exit if no file
  
    // Start progress simulation
    setUploadProgress(10);
  
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100; // Ensure it stops at 100%
        }
        return newProgress;
      });
    }, 500); // Increase progress every 500ms
  
    // TODO: Implement actual file upload logic
    console.log('Uploading file:', file);
  };
  

  return (
    <div className='mt-20'>
      <Card className="w-full max-w-2xl mx-auto shadow-lg border rounded-lg pt-30 ">
        <CardHeader className="bg-purple-800 text-white rounded-tl-lg rounded-tr-lg">
          <CardTitle className="text-xl font-semibold">Upload Your Resume</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div 
              {...getRootProps()} 
              className="border-2 border-dashed border-purple-400 p-6 rounded-lg bg-purple-100 hover:bg-purple-200 transition-colors duration-200"
            >
              <input {...getInputProps()} />
              {file ? (
                <div className="flex flex-col items-start space-y-2">
                  <div className="text-lg font-medium">{fileName}</div>
                  <div className="relative w-full bg-purple-300 h-2 rounded">
                    <div 
                      className="absolute top-0 left-0 h-full bg-purple-500 rounded transition-width duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{uploadProgress}% Uploaded</div>
                </div>
              ) : (
                <div className="text-center text-gray-600">
                  <p>Drag and drop your resume file here</p>
                  <p>or</p>
                  <Button variant="outline" className="mt-2">Click to Upload</Button>
                </div>
              )}
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <Input
                placeholder="Enter a name for your resume"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleUpload} 
                disabled={!file} 
                className="ml-4 hover:bg-purple-100"
                variant="outline"
              >
                {uploadProgress === 100 ?'Uploaded' : 'Click Me'}
              </Button>
            </div>
          </div>
        </CardContent>
        <div className='flex justify-between' >
          <div className='mx-4 mb-4 flex space-x-4'>
            {/* <Button type="submit">Back</Button> */}
            <Button type="submit" onClick={handleSubmit}>Next</Button>
          </div>
          <div>
            <Button type="submit" variant="outline" className="mx-4 hover:bg-purple-100" onClick={handleSubmit}>Skip for now</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResumePage;
