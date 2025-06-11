import React from "react";

const section1 = ({ formData, handleInputChange, handleFileChange, today }) => {
  return (
    <div>
      <div>
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          ข้อมูลส่วนบุคคล PERSONAL DETAILS
        </h2>
        <div className="grid grid-cols-3 gap-4 ml-16">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ชื่อ Name in Thai
            </label>
            <select
              name="title_name"
              value={formData.title_name} // ค่าเริ่มต้นจาก formData
              onChange={handleInputChange} // อัปเดต formData เมื่อเลือกใหม่
              className="w-[280px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-gray-700"
              disabled
            >
              <option value="" disabled>
                Please select a title *
              </option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2"></label>
            <input
              type="text"
              name="f_name"
              value={formData.f_name}
              onChange={handleInputChange}
              placeholder="กรุณากรอกชื่อ *"
              className="w-[350px] h-[31px] pl-2 mt-6 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2"></label>
            <input
              type="text"
              name="l_name"
              value={formData.l_name}
              onChange={handleInputChange}
              placeholder="กรุณากรอกนามสกุล *"
              className="w-[350px] h-[31px] pl-2 mt-6 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ชื่อภาษาอังกฤษ Name in English
            </label>
            <select
              name="title_name_en"
              value={formData.title_name_en} // ค่าเริ่มต้นจาก formData
              onChange={handleInputChange} // อัปเดต formData เมื่อเลือกใหม่
              className="w-[280px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-gray-700"
              disabled
            >
              <option value="" disabled>
                Please select a title *
              </option>
              <option value="mr">Mr.</option>
              <option value="ms">Ms.</option>
              <option value="mrs">Mrs.</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2"></label>
            <input
              type="text"
              name="f_name_en"
              value={formData.f_name_en}
              onChange={handleInputChange}
              placeholder="Please enter your name *"
              className="w-[350px] h-[31px] pl-2 mt-6 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2"></label>
            <input
              type="text"
              name="l_name_en"
              value={formData.l_name_en}
              onChange={handleInputChange}
              placeholder="Please enter your last name *"
              className="w-[350px] h-[31px] pl-2 mt-6 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              เพศ Sex
            </label>
            <div className="flex items-center pl-2 space-x-4">
              {/* ตัวเลือกเพศชาย */}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="M"
                  checked={formData.sex === "M"} // ตรวจสอบค่าเพศจาก formData
                  onChange={handleInputChange} // อัปเดต formData เมื่อเลือก
                  className="form-radio text-blue-500"
                  disabled
                />
                <span className="ml-2">ชาย Male</span>
              </label>

              {/* ตัวเลือกเพศหญิง */}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="F"
                  checked={formData.sex === "F"} // ตรวจสอบค่าเพศจาก formData
                  onChange={handleInputChange} // อัปเดต formData เมื่อเลือก
                  className="form-radio text-blue-500"
                  disabled
                />
                <span className="ml-2">หญิง Female</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ชื่อเล่น Nickname
            </label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname} // ค่าเริ่มต้นจาก formData
              onChange={handleInputChange} // อัปเดต formData เมื่อเลือกใหม่
              placeholder="กรุณากรอกชื่อเล่น *"
              className="w-[350px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              วันเกิด Date of Birth
            </label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday} // Ensure it is always in yyyy-MM-dd format
              onChange={handleInputChange} // Update formData when the date changes
              max={today} // Restrict to today or earlier
              className="w-[350px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              สัญชาติ Nationality
            </label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality} // ค่าเริ่มต้นจาก formData
              onChange={handleInputChange} // อัปเดต formData เมื่อเลือกใหม่
              placeholder="Please enter your name *"
              className="w-[280px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              บัตรประชาชน I.D.Card No
            </label>
            <input
              type="text"
              name="id_card_no"
              value={formData.id_card_no} // ค่าเริ่มต้นจาก formData
              onChange={handleInputChange} // อัปเดต formData เมื่อเลือกใหม่
              placeholder="Please enter your name *"
              className="w-[350px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              วันหมดอายุบัตร ID Card Expired
            </label>
            <input
              type="date"
              name="id_card_expired"
              value={formData.id_card_expired} // Ensure it is always in yyyy-MM-dd format
              onChange={handleInputChange} // Update formData when the date changes
              max={today} // Restrict to today or earlier
              className="w-[350px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              อีเมลล์ Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email} // ค่าเริ่มต้นจาก formData
              onChange={handleInputChange} // อัปเดต formData เมื่อเลือกใหม่
              placeholder="Please enter your last name *"
              className="w-[280px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
            />
          </div>
        </div>
      </div>
      <div className="ml-16 mt-8">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          บัตรประจำตัวประชาชน
        </h2>
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
          id="file-upload-files"
          type="file"
          name="files"
          accept=".pdf,.doc,.docx"
          className="w-[600px] h-[31px] pl-2 pb-9 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default section1;
