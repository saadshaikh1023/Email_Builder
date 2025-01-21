// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './styles.css';

// eslint-disable-next-line react/prop-types
const ImageUpload = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  };

  return (
    <div className="image-upload">
      <div className="flex justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
        <div className="text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Choose Image
          </label>
        </div>
      </div>
      
      {preview && (
        <div className="mt-4">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-w-full h-auto rounded-lg shadow-sm"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;