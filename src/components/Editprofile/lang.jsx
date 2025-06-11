import React from "react";

const Lang = ({ formData, handleInputChange }) => {
  return (
    <div>
      <div className="mt-8 bg-gray-100 ml-16 items-center justify-center">
            <div>
              {/* หัวข้อ */}
              <h2 className="text-lg font-bold text-gray-700 mb-4">
                ความชำนาญทางภาษา Languages Proficiency
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                ผลการทดสอบภาษาหรือใบรับรองที่อื่นๆ ที่ได้รับ Language Test or
                Certificate to be received.
              </p>

              {/* ตารางข้อมูล */}
              <div className="grid grid-cols-4 gap-6">
                {/* TOEIC */}
                <div className="flex items-center">
                  <select
                    id="language-type"
                    className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none text-center"
                  >
                    <option value="TOEIC">TOEIC</option>
                    <option value="IELTS">IELTS</option>
                    <option value="TOEFL">TOEFL</option>
                  </select>
                </div>

                {/* คะแนนที่ได้รับ */}
                <div className="flex items-center">
                  <label
                    htmlFor="score"
                    className="block text-gray-700 font-medium w-32"
                  >
                    คะแนนที่ได้รับ
                  </label>
                  <input
                    id="score"
                    type="text"
                    placeholder="คะแนนที่ได้รับ *"
                    className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400 text-center"
                  />
                </div>

                {/* วันที่ได้รับ */}
                <div className="flex items-center">
                  <label
                    htmlFor="received-date"
                    className="block text-gray-700 font-medium w-32"
                  >
                    วันที่ได้รับ
                  </label>
                  <input
                    id="received-date"
                    type="date"
                    className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none text-center"
                  />
                </div>
              </div>

              {/* ส่วนการอัปโหลดไฟล์ */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-700 mb-4">ผลภาษา</h3>
                <p className="text-sm text-gray-600 mb-2">
                  คำแนะนำ: เอกสารประกอบขนาดไฟล์ไม่เกิน 2 MB สกุลไฟล์ .pdf
                  เท่านั้น
                </p>
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
    </div>
  );
};

export default Lang;
