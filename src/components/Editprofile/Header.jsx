import React from "react";

const Header = ({ imagePreview, handleFileChange, namerole, subrole }) => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div className="flex flex-col items-start flex-1">
        <div className="flex items-center mb-4">
          <div className="bg-gray-200 rounded-full h-48 w-48 flex items-center justify-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="h-48 w-48 rounded-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-8 w-8 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 21c0-2.65 2.686-4.5 6-4.5s6 1.85 6 4.5"
                />
              </svg>
            )}
          </div>
              <div className="ml-8" >
                <h2 className="text-lg font-bold text-navy-blue">
                  ข้อมูลรูปภาพส่วนบุคคล PERSONAL IMAGE DETAILS
                </h2>
                <p className="text-sm text-gray-300 mb-6">
                  คำแนะนำ : ขนาดรูปภาพที่แนะนำคือสูงสุด 2 MB, สกุลไฟล์ jpg, png, jpeg เท่านั้น
                </p>
                <div className="w-full">
              <label
                htmlFor="file-upload-img"
                className="block text-gray-700 font-medium mb-2"
              >
                กรุณาเลือกไฟล์รูปภาพ <span className="text-red-500">*</span>
              </label>
              <input
                id="file-upload-img"
                type="file"
                name="img"
                accept="image/*"
                className="w-[600px] h-[31px] pl-2 pb-9 border-b border-navy-blue focus:border-blue-500 outline-none placeholder-gray-400"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 ml-8">
        <h3 className="text-gray-700 font-bold">
          ตำแหน่ง:{" "}
          {namerole ? (
            <span className="text-red-500">{namerole.namerole_name}</span>
          ) : (
            <p>กำลังโหลดข้อมูล...</p>
          )}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          ระดับ:{" "}
          {subrole ? (
            <span className="font-medium">{subrole.subrole_name}</span>
          ) : (
            <p>กำลังโหลดข้อมูล...</p>
          )}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          สังกัด:{" "}
          {namerole ? (
            <span>{namerole.depart_name}</span>
          ) : (
            <p>กำลังโหลดข้อมูล...</p>
          )}
        </p>
      </div>
    </div>
  );
};

export default Header;
