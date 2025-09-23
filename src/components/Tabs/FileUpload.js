// import { useState } from "react";
// import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

// const FileUpload = () => {
//   const [files, setFiles] = useState([]);
//   const [dragging, setDragging] = useState(false);
//   const [selectedDoc, setSelectedDoc] = useState("");

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setDragging(false);
//     const uploadedFiles = Array.from(event.dataTransfer.files);
//     setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
//   };

//   const handleFileSelect = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
//   };

//   const removeFile = (fileName) => {
//     setFiles(files.filter((file) => file.name !== fileName));
//   };

//   return (
//     <div className="w-full lg:w-6/12 px-4">
//       {/* <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
//         Document to Be Submitted
//       </label>
//       <select
//         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//         onChange={(e) => setSelectedDoc(e.target.value)}
//       >
//         <option value="">Select Document</option>
//         <option value="id_proof">ID Proof</option>
//         <option value="address_proof">Address Proof</option>
//       </select> */}

//       <div
//         className={`mt-4 p-8 border-2 border-blue-600 border-dashed rounded-lg text-center cursor-pointer ${dragging ? "bg-blue-100" : ""}`}
//         onDragOver={(event) => {
//           event.preventDefault();
//           setDragging(true);
//         }}
//         onDragLeave={() => setDragging(false)}
//         onDrop={handleDrop}
//       >
//         <input type="file" multiple className="hidden" id="fileInput" onChange={handleFileSelect} />
//         <FaCloudUploadAlt size={35} className="mx-auto text-gray-500" />
//         <p className="block text-blueGray-600 text-xs mb-2">Drag & Drop files here or click to upload</p>
//         <label htmlFor="fileInput" className="block mt-2 p-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">Browse Files</label>
//       </div>

//       <div className="mt-4 space-y-2">
//         {files.map((file) => (
//           <div key={file.name} className="flex items-center justify-between p-2 border rounded-lg">
//             <span className="truncate">{file.name}</span>
//             <FaTrash className="text-red-500 cursor-pointer" onClick={() => removeFile(file.name)} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FileUpload;

import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  return (
    <div className="w-full lg:w-6/12 px-4">
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          id="file_input"
          type="file"
          onChange={handleFileChange}
        />

        {file && (
          <div className="mt-3 flex items-center justify-between p-2 border rounded-lg">
            <p className="truncate">{file.name}</p>
            <FaTrash
              className="text-red-500 cursor-pointer"
              onClick={handleDeleteFile}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
