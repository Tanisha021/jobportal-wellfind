import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const Files = (props) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the uploaded files here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 4,
    maxSize: 4 * 1024 * 1024, // 4 MB
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? "bg-gray-100" : "hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="mt-1 text-sm text-gray-600">
          Drag n drop files here, or click to select files
        </p>
        <p className="mt-1 text-xs text-gray-500">
          You can upload 4 files (up to 4 MB each)
        </p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">Uploaded files</h3>
        <p className="mt-1 text-sm text-gray-500">
          View the uploaded files here
        </p>
        <div className="mt-2 border-2 border-gray-200 rounded-md p-4">
          <div className="flex items-center justify-center h-32">
            {/* <svg
              className="h-8 w-8 text-gray-400 hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg> */}
            <p className="ml-2 text-sm text-gray-500">No files uploaded</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;
