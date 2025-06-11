import React, { useRef, useState } from "react";

const Profile = () => {
  // --- State ---
  const [profileImage, setProfileImage] = useState(null);
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");
  const fileInputRef = useRef(null);

  // --- Handlers ---
  const handleImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setProfileImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBirthdateChange = (e) => {
    const value = e.target.value;
    setBirthdate(value);
    if (value) {
      const today = new Date();
      const birth = new Date(value);
      let calculatedAge = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge >= 0 ? calculatedAge : "");
    } else {
      setAge("");
    }
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ">
      <div className="bg-white shadow-lg rounded-2xl  w-full p-8 flex flex-col ">
        <h1 className="text-2xl font-bold text-blue-900 ml-4">ข้อมูลส่วนตัว</h1>
        <hr className="my-4 border-blue-900 w-full" />

        {/* Profile Image Circle + Info */}
        <div className="flex flex-row p-8 pl-12">
          {/* Profile Image */}
          <div
            className="w-56 h-56 mb-1 rounded-full bg-red-200 flex items-center justify-center shadow-md cursor-pointer hover:ring-4 hover:ring-blue-300 transition-all relative overflow-hidden"
            onClick={handleImageClick}
            title="เปลี่ยนรูปโปรไฟล์"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z" />
              </svg>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-xs text-center py-1 opacity-0 hover:opacity-100 transition-opacity">เปลี่ยนรูป</div>
          </div>
          {/* Right: ตำแหน่ง ระดับ สังกัด */}
          <div className="flex flex-col justify-center items-end ml-12 min-w-[180px]">
            <div className="mb-2">
              <label className="block text-navy-blue text-sm font-semibold mb-1">ตำแหน่ง</label>
            </div>
            <div className="mb-2">
              <label className="block text-navy-blue text-sm font-semibold mb-1">ระดับ</label>
            </div>
            <div>
              <label className="block text-navy-blue text-sm font-semibold mb-1">สังกัด</label>
            </div>
          </div>
        </div>


        {/* Profile Information */}
        <div className="flex flex-col gap-2 ml-12">
          <p className="text-navy-blue text-xl mt-4 font-semibold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-navy-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ข้อมูลส่วนบุคคล
          </p>
          <div className="ml-4">
            <p className="text-navy-blue text-l mt-4 ml-4 mb-2">ชื่อภาษาไทย</p>
            <div className="flex flex-row gap-36  w-full  ml-4">
              {/*คำนำหน้าชื่อ*/}
              <select
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-48"
                defaultValue=""
                name=""
              >
                <option value="" disabled>คำนำหน้า</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
              </select>
              <input
                type="text"
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-80"
                placeholder="ชื่อ"
                name="firstname"
              />
              <input
                type="text"
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-80"
                placeholder="นามสกุล"
                name="lastname"
              />
            </div>
          </div>

          {/* เพศและวันเกิด */}
          <div className="flex flex-row ml-12 mt-8 gap-16">
            <div className="flex flex-col" style={{ minWidth: '340px', marginRight: '48px' }}>
              <label className="text-navy-blue text-m mb-1">เพศ <span className="text-red-500">*</span></label>
              <div className="flex flex-row items-center gap-6 mt-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="ชาย"
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">ชาย</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="หญิง"
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">หญิง</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="birthdate" className="text-navy-blue text-m mb-1">วันเกิด <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  required
                  className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-80 appearance-none"
                  pattern="\\d{4}-\\d{2}-\\d{2}"
                  placeholder="วว/ดด/ปีพ.ศ."
                  value={birthdate}
                  onChange={handleBirthdateChange}
                  onInput={e => { e.target.setCustomValidity(''); }}
                  onInvalid={e => { e.target.setCustomValidity('กรุณากรอกวันเกิดเป็น วว/ดด/ปีพ.ศ.'); }}
                />
              </div>
              <span className="text-xs text-gray-300 opacity-50 mt-1">กรุณากรอกวันเกิดเป็น วว/ดด/ปีพ.ศ. หรือเลือกจากปฏิทิน</span>
            </div>
            
          </div>

          {/* ข้อมูลติดต่อ */}
          <div className="flex flex-row ml-12 mt-8 gap-16">
            <div className="flex flex-col" style={{ minWidth: '340px', marginRight: '48px' }}>
              <label htmlFor="email" className="text-navy-blue text-m mb-2">อีเมล <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-80"
                placeholder="example@email.com"
              />
            </div>
            <div className="flex flex-col" style={{ minWidth: '340px' }}>
              <label htmlFor="phone" className="text-navy-blue text-m mb-2">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                pattern="[0-9]{10}"
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-80"
                placeholder="08xxxxxxxx"
              />
            </div>
          </div>

          {/* เลขบัตรประชาชน และรหัสพนักงาน */}
          <div className="flex flex-row ml-12 mt-8 gap-16">
            <div className="flex flex-col" style={{ minWidth: '340px', marginRight: '48px' }}>
              <label htmlFor="citizenId" className="text-navy-blue text-m mb-2">เลขบัตรประชาชน <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="citizenId"
                name="citizenId"
                required
                pattern="[0-9]{13}"
                maxLength={13}
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-80"
                placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
              />
            </div>
            <div className="flex flex-col" style={{ minWidth: '340px' }}>
              <label htmlFor="employeeId" className="text-navy-blue text-m mb-2">รหัสพนักงาน</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-80"
                placeholder="กรอกรหัสพนักงาน (ถ้ามี)"
              />
            </div>
          </div>
        </div>
        <br/>


        {/* ข้อมูลที่อยู่อาศัย */}
        <div className="flex flex-col ml-12 ">
          <p className="text-navy-blue text-xl mt-10 font-semibold flex items-center">
            {/* ไอคอนโลเคชั่น (Location Pin) แบบ Material Design */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-navy-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c-4.418 0-8-5.03-8-9.5C4 7.462 7.134 4 12 4s8 3.462 8 7.5c0 4.47-3.582 9.5-8 9.5zm0-11.5a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            ข้อมูลที่อยู่อาศัย
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
