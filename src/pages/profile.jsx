import React, { useRef, useState } from "react";
import Header from "../components/Editprofile/Header";
import Address from "../components/Editprofile/address";
import Education from "../components/Editprofile/education";
import File from "../components/Editprofile/file";
import Lang from "../components/Editprofile/lang";
import LocationSelector from "../components/Editprofile/LocationSelector";
import Section1 from "../components/Editprofile/section1";

const Profile = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl max-w-3xl mx-auto p-8">
        <Header imagePreview={imagePreview} handleFileChange={handleFileChange} />
        <Section1 />
        <LocationSelector />
        <Address />
        <Education />
        <Lang />
        <File file={file} fileInputRef={fileInputRef} handleFileChange={handleFileChange} />
      </div>
    </div>
  );
};

export default Profile;
