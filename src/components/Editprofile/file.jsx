import React from "react";


const File = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
            แนบข้อมูลประกอบ
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            คำแนะนำ : เอกสารประกอบขนาดไฟล์ไม่เกิน 2 MB สกุลไฟล์ .pdf เท่านั้น
          </p>

          {/* รายการข้อมูล */}
          <div className="grid grid-cols-3 gap-4 items-center">
            {/* ผลตรวจสุขภาพ */}
            <div className="text-gray-700 font-medium">ผลตรวจสุขภาพ</div>
            <div className="col-span-2">
              <div className="w-full">
                <label
                  htmlFor="file-upload"
                  className="block text-gray-700 font-medium mb-2"
                >
                  เพิ่มไฟล์เอกสาร <span className="text-red-500">*</span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="w-[600px] h-[31px] pl-2 pb-9 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
                />
              </div>
            </div>

            {/* ผลตรวจประวัติอาชญากรรม */}
            <div className="text-gray-700 font-medium">
              ผลตรวจประวัติอาชญากรรม
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <label
                  htmlFor="file-upload"
                  className="block text-gray-700 font-medium mb-2"
                >
                  เพิ่มไฟล์เอกสาร <span className="text-red-500">*</span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="w-[600px] h-[31px] pl-2 pb-9 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
                />
              </div>
            </div>

            {/* อื่นๆ */}
            <div className="text-gray-700 font-medium">อื่นๆ</div>
            <div className="col-span-2">
              <div className="w-full">
                <label
                  htmlFor="file-upload"
                  className="block text-gray-700 font-medium mb-2"
                >
                  เพิ่มไฟล์เอกสาร <span className="text-red-500">*</span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="w-[600px] h-[31px] pl-2 pb-9 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
                />
              </div>
            </div>
          </div>
    </div>
  );
};

export default File;
