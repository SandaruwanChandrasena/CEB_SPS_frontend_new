import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Trash, File, } from "lucide-react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Uploads = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
  }, []);

  const removeFile = (name) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "application/pdf": [] }, // allows images and pdf
    maxSize: 10 * 1024 * 1024, // 10mb limit
  });

  return (
    <div className="border p-4 rounded-lg bg-gray-100 text-center">
      <div
        {...getRootProps()}
        className="p-4 border-dashed border-2 rounded-lg cursor-pointer"
      >
        <input {...getInputProps()} />
        <FaCloudUploadAlt size={35} className="mx-auto text-gray-500" />
        {isDragActive ? (
          <p className="text-gray-600 text-sm">Drop the files here...</p>
        ) : (
          <p className="text-gray-600 text-sm">Drag & Drop files here or click to upload</p>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center justify-between bg-white p-2 rounded-lg shadow"
          >
            {file.type.startsWith("image/") ? (
              <img
                src={file.preview}
                alt={file.name}
                className="w-12 h-12 object-cover rounded"
              />
            ) : (
              <File size={30} className="text-gray-500" />
            )}
            <span className="text-sm truncate w-32">{file.name}</span>
            <Trash
              size={20}
              className="text-red-500 cursor-pointer"
              onClick={() => removeFile(file.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uploads;
