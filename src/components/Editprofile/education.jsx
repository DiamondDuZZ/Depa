import React from "react";

const Education = ({ formData, handleInputChange }) => {
  return (
    <div>
      <div className="mt-8 bg-gray-100 flex items-center justify-center">
            <div>
              <h2 className="text-xl font-bold text-gray-700 mb-6">
                ข้อมูลการศึกษา EDUCATION
              </h2>
              <div className="grid grid-cols-7 gap-4 text-center">
                {/* Header Row */}
                <div className="font-bold text-gray-700 text-left">
                  ระดับ <br /> Class/Level
                </div>
                <div className="font-bold text-gray-700 text-left">
                  ชื่อสถานศึกษา <br /> Name of Institution
                </div>
                <div className="font-bold text-gray-700 text-left">
                  ปีที่เข้าศึกษา <br /> Year attended
                </div>
                <div className="font-bold text-gray-700 text-left">
                  วุฒิที่ได้รับ <br /> Diploma/Degree
                </div>
                <div className="font-bold text-gray-700 text-left">
                  สาขาวิชาเอก <br /> Major
                </div>
                <div className="font-bold text-gray-700 text-left">
                  เกรดเฉลี่ย <br /> GPA
                </div>
                <div className="font-bold text-gray-700 text-left">
                  เกียรตินิยม <br /> Honor
                </div>

                {/* Data Row */}
                <div>
                  <select className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none text-center">
                    <option value="bachelor">ปริญญาตรี</option>
                    <option value="master">ปริญญาโท</option>
                    <option value="phd">ปริญญาเอก</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="ชื่อสถานศึกษา *"
                    className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400 text-center"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="ปี (จาก-ถึง) *"
                    className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400 text-center"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="วุฒิที่ได้รับ *"
                    className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400 text-center"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="วิชาเอก *"
                    className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400 text-center"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="เกรดเฉลี่ย *"
                    className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400 text-center"
                  />
                </div>
                <div>
                  <select className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none text-center">
                    <option value="">ไม่มี</option>
                    <option value="first-class">เกียรตินิยมอันดับ 1</option>
                    <option value="second-class">เกียรตินิยมอันดับ 2</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-16 mt-8">
            <h2 className="text-lg font-bold text-gray-700 mb-4">ผลการศึกษา</h2>
            <p className="text-sm text-gray-600 mb-6">
              คำแนะนำ : เอกสารประกอบขนาดไฟล์ไม่เกิน 2 MB สกุลไฟล .pdf เท่านั้น
            </p>
          </div>
          <div className="w-full ml-14">
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
  );
};

export default Education;
