import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { uploadData, getUrl } from 'aws-amplify/storage';

const UploadPhoto = ({ setProfilePhoto, profilePhoto }) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(profilePhoto);
  const [uploadProgress, setUploadProgress] = useState(0);

  const getProfileUrl = async (file) => {
    const fileName = `${Date.now()}_${file.name}`;
    const path = `public/album/2024/${fileName}`;
    const result = await uploadData({
      path,
      progressCallback(progress) {
        setUploadProgress(Math.round((progress.loaded / progress.total) * 100)); 
      },
      data: file,
    }).result;

    const getUrlResult = await getUrl({
      path: path,
      options: {
        validateObjectExistence: false,
        expiresIn: 20,
        useAccelerateEndpoint: true
      },
    });
    const baseUrl = new URL(getUrlResult?.url).origin + new URL(getUrlResult?.url).pathname;
    return baseUrl;
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
    try {

      const url = await getProfileUrl(file);
      console.log(url)
      setImageUrl(url);
      setProfilePhoto(url);
      setUploading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 mb-4">
      <label htmlFor="profilePhotoInput" className="text-sm font-medium text-gray-700">
        Add a profile photo
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="profilePhotoInput"
      />

      <button
        onClick={() => document.getElementById('profilePhotoInput').click()}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        disabled={uploading}
      >
        <Upload size={16} />
        {uploading ? `Uploading... ${uploadProgress}%` : 'Click to upload'}
      </button>

      {imageUrl && (
        <div className="mt-4">
          <p className="text-sm text-green-600">Image uploaded successfully</p>
          <img src={imageUrl} alt="Uploaded Profile" className="mt-2" width={100} />
        </div>
      )}
    </div>
  );
};

export default UploadPhoto;
