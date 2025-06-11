import React, { useState, useMemo, useEffect } from "react";
import provinceData from '../assets/provinceData';

const RegisDetail = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  // State สำหรับ dropdown ที่อยู่
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedAmphure, setSelectedAmphure] = useState("");
  const [selectedTambon, setSelectedTambon] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // State สำหรับ dropdown ที่อยู่ตามภูมิลำเนา
  const [selectedProvince2, setSelectedProvince2] = useState("");
  const [selectedAmphure2, setSelectedAmphure2] = useState("");
  const [selectedTambon2, setSelectedTambon2] = useState("");
  const [postalCode2, setPostalCode2] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setSuccess("");
    setError("");
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setShowButtons(true);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setShowButtons(false);
    }
  };

  const handleCancel = () => {
    setImage(null);
    setPreview(null);
    setSuccess("");
    setError("");
    setShowButtons(false);
    document.getElementById("profileImage").value = "";
  };

  const handleUpload = () => {
    if (!image) return;
    setSuccess("บันทึกรูปภาพสำเร็จ (ยังไม่ได้อัปโหลดไป backend)");
    setShowButtons(false);
    setError("");
    // รูปจะถูกเก็บไว้ใน state: image, preview
  };

  const provinces = useMemo(() => provinceData.map(p => p.province), []);
  const amphures = useMemo(() => {
    if (!selectedProvince) return [];
    const found = provinceData.find(p => p.province === selectedProvince);
    return found ? found.amphure.map(a => a.amphure) : [];
  }, [selectedProvince]);
  const tambons = useMemo(() => {
    if (!selectedProvince || !selectedAmphure) return [];
    const found = provinceData.find(p => p.province === selectedProvince);
    const amphure = found?.amphure.find(a => a.amphure === selectedAmphure);
    return amphure ? amphure.tambon.map(t => t.tambon) : [];
  }, [selectedProvince, selectedAmphure]);
  useEffect(() => {
    if (!selectedProvince || !selectedAmphure || !selectedTambon) {
      setPostalCode("");
      return;
    }
    const found = provinceData.find(p => p.province === selectedProvince);
    const amphure = found?.amphure.find(a => a.amphure === selectedAmphure);
    const tambon = amphure?.tambon.find(t => t.tambon === selectedTambon);
    setPostalCode(tambon ? tambon.postalCode : "");
  }, [selectedProvince, selectedAmphure, selectedTambon]);

  // สำหรับที่อยู่ตามภูมิลำเนา
  const provinces2 = useMemo(() => provinceData.map(p => p.province), []);
  const amphures2 = useMemo(() => {
    if (!selectedProvince2) return [];
    const found = provinceData.find(p => p.province === selectedProvince2);
    return found ? found.amphure.map(a => a.amphure) : [];
  }, [selectedProvince2]);
  const tambons2 = useMemo(() => {
    if (!selectedProvince2 || !selectedAmphure2) return [];
    const found = provinceData.find(p => p.province === selectedProvince2);
    const amphure = found?.amphure.find(a => a.amphure === selectedAmphure2);
    return amphure ? amphure.tambon.map(t => t.tambon) : [];
  }, [selectedProvince2, selectedAmphure2]);
  useEffect(() => {
    if (!selectedProvince2 || !selectedAmphure2 || !selectedTambon2) {
      setPostalCode2("");
      return;
    }
    const found = provinceData.find(p => p.province === selectedProvince2);
    const amphure = found?.amphure.find(a => a.amphure === selectedAmphure2);
    const tambon = amphure?.tambon.find(t => t.tambon === selectedTambon2);
    setPostalCode2(tambon ? tambon.postalCode : "");
  }, [selectedProvince2, selectedAmphure2, selectedTambon2]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl max-w-4xl w-full p-8">
        <header className="text-2xl font-bold text-blue-900 mb-4 text-left">
          รายละเอียดการลงทะเบียน
        </header>
        <hr className="my-4 border-blue-900" />
        
        <div className="flex flex-col items-center mt-8 ">
          <div className="flex flex-row items-center gap-8 w-full  ml-8">
            <span className="text-navy-blue text-lg font-semibold min-w-max">รูปโปรไฟล์</span>
            <div className="relative w-40 h-40 mb-2 group">
              <label
                htmlFor="profileImage"
                className="cursor-pointer w-40 h-40 rounded-full border-2 border-blue-300 shadow flex items-center justify-center overflow-hidden bg-blue-50 hover:bg-blue-100 transition relative"
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white text-lg font-semibold">
                      แก้ไขรูปภาพ
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-blue-400 text-4xl font-bold">+</span>
                    <span className="absolute inset-0 flex items-center justify-center text-blue-700 text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      เพิ่มรูปภาพ
                    </span>
                  </>
                )}
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {showButtons && (
              <div className="flex flex-col gap-4 ml-2">
                <button
                  type="button"
                  className="w-32 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow disabled:opacity-60"
                  onClick={handleUpload}
                  disabled={!image || uploading}
                >
                  {uploading ? "กำลังบันทึก..." : "ยืนยัน"}
                </button>
                <button
                  type="button"
                  className="w-32 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold shadow"
                  onClick={handleCancel}
                >
                  ยกเลิก
                </button>
              </div>
            )}
          </div>
          {success && (
            <div className="text-green-600 text-center mt-2">{success}</div>
          )}
          {error && <div className="text-red-600 text-center mt-2">{error}</div>}

        </div>

        {/* ข้อมูลส่วนบุคคล */}
        <div>
          <p className="text-navy-blue text-xl mt-4 font-semibold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-navy-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ข้อมูลส่วนบุคคล
          </p>
        </div>
        <div>
          <p className="text-navy-blue text-m mt-4 ml-4">ชื่อภาษาไทย</p>
        </div>
        <div className="flex flex-row gap-12 w-full  ml-4">
            {/*คำนำหน้าชื่อ*/}
            <select
             className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-36"
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
             className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-64"
              placeholder="ชื่อ"
              name="firstname"
            />
            <input
              type="text"
              className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-64"
              placeholder="นามสกุล"
              name="lastname"
            />
          </div>
          
          {/* เพศและวันเกิด */}
          
          <div className="flex flex-row gap-9 w-full ml-4 mt-8">
            <div className="flex flex-col w-1/2">
              <label className="text-navy-blue text-m mb-1">เพศ <span className="text-red-500">*</span></label>
              <div className="flex flex-row items-center gap-6 mt-1">
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
                  onInput={e => { e.target.setCustomValidity(''); }}
                  onInvalid={e => { e.target.setCustomValidity('กรุณากรอกวันเกิดเป็น วว/ดด/ปีพ.ศ.'); }}
                />
              </div>
            <span className="text-xs text-gray-300 opacity-50 mt-1">กรุณากรอกวันเกิดเป็น วว/ดด/ปีพ.ศ. หรือเลือกจากปฏิทิน</span>
          </div>
        </div>
        
        {/* ข้อมูลติดต่อ */}
        <div className="flex flex-row gap-12  ml-4 mt-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="email" className="text-navy-blue text-m mb-1">อีเมล <span className="text-red-500">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-80"
              placeholder="example@email.com"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="phone" className="text-navy-blue text-m mb-1">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
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
        <div className="flex flex-row gap-12 ml-4 mt-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="citizenId" className="text-navy-blue text-m mb-1">เลขบัตรประชาชน <span className="text-red-500">*</span></label>
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
          <div className="flex flex-col w-1/2">
            <label htmlFor="employeeId" className="text-navy-blue text-m mb-1">รหัสพนักงาน</label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-80"
              placeholder="กรอกรหัสพนักงาน (ถ้ามี)"
            />
          </div>
        </div>
            <br/>        


        {/* ข้อมูลที่อยู่อาศัย */}
        <div>
          <p className="text-navy-blue text-xl mt-10 font-semibold flex items-center">
            {/* ไอคอนโลเคชั่น (Location Pin) แบบ Material Design */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-navy-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c-4.418 0-8-5.03-8-9.5C4 7.462 7.134 4 12 4s8 3.462 8 7.5c0 4.47-3.582 9.5-8 9.5zm0-11.5a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            ข้อมูลที่อยู่อาศัย
          </p>
        </div>
        {/* ที่อยู่ตามภูมิลำเนา */}
        <div className="flex flex-row gap-12 ml-4 mt-6">
          <div className="flex flex-col w-2/3">
            <label className="text-navy-blue text-m mb-4">ที่อยู่ตามภูมิลำเนา</label>
            <input
              type="text"
              className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-full"
              placeholder="กรอกที่อยู่ตามภูมิลำเนา"
              name="homeAddress"
            />
            <div className="flex flex-row gap-2 mt-6">
              <select
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-1/3"
                value={selectedProvince}
                onChange={e => {
                  setSelectedProvince(e.target.value);
                  setSelectedAmphure("");
                  setSelectedTambon("");
                }}
              >
                <option value="">จังหวัด</option>
                {provinceData.map(p => (
                  <option key={p.province} value={p.province}>{p.province}</option>
                ))}
              </select>
              <select
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-1/3"
                value={selectedAmphure}
                onChange={e => {
                  setSelectedAmphure(e.target.value);
                  setSelectedTambon("");
                }}
                disabled={!selectedProvince}
              >
                <option value="">อำเภอ</option>
                {selectedProvince && provinceData.find(p => p.province === selectedProvince)?.amphure.map(a => (
                  <option key={a.amphure} value={a.amphure}>{a.amphure}</option>
                ))}
              </select>
              <select
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-1/3"
                value={selectedTambon}
                onChange={e => setSelectedTambon(e.target.value)}
                disabled={!selectedAmphure}
              >
                <option value="">ตำบล</option>
                {tambons.map(tam => (
                  <option key={tam} value={tam}>{tam}</option>
                ))}
              </select>
            </div>
            <input
              type="text"
              className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-full mt-6"
              value={postalCode}
              readOnly
              placeholder="รหัสไปรษณีย์จะถูกเลือกอัตโนมัติ"
            />
          </div>
        </div>
        <br/>
        {/* ที่อยู่ปัจจุบัน */}
        <div className="flex flex-row gap-12 ml-4 mt-6">
          <div className="flex flex-col w-2/3">
            <label className="text-navy-blue text-m mb-4">ที่อยู่ปัจจุบัน</label>
            <input
              type="text"
              className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-full"
              placeholder="กรอกที่อยู่ปัจจุบัน"
              name="currentAddress"
            />
            <div className="flex flex-row gap-2 mt-6">
              <select
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-1/3"
                value={selectedProvince2}
                onChange={e => {
                  setSelectedProvince2(e.target.value);
                  setSelectedAmphure2("");
                  setSelectedTambon2("");
                }}
              >
                <option value="">จังหวัด</option>
                {provinceData.map(p => (
                  <option key={p.province} value={p.province}>{p.province}</option>
                ))}
              </select>
              <select
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-1/3"
                value={selectedAmphure2}
                onChange={e => {
                  setSelectedAmphure2(e.target.value);
                  setSelectedTambon2("");
                }}
                disabled={!selectedProvince2}
              >
                <option value="">อำเภอ</option>
                {selectedProvince2 && provinceData.find(p => p.province === selectedProvince2)?.amphure.map(a => (
                  <option key={a.amphure} value={a.amphure}>{a.amphure}</option>
                ))}
              </select>
              <select
                className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-1/3"
                value={selectedTambon2}
                onChange={e => setSelectedTambon2(e.target.value)}
                disabled={!selectedAmphure2}
              >
                <option value="">ตำบล</option>
                {tambons2.map(tam => (
                  <option key={tam} value={tam}>{tam}</option>
                ))}
              </select>
            </div>
            <input
              type="text"
              className="border-b-2 border-navy-blue bg-transparent px-3 pt-1 pb-0.5 focus:outline-none focus:border-blue-400 text-gray-700 w-full mt-6"
              value={postalCode2}
              readOnly
              placeholder="รหัสไปรษณีย์จะถูกเลือกอัตโนมัติ"
            />
          </div>
        </div>

      {/* ข้อมุลการศึกษา */}
      
      {/* ปุ่มยืนยัน */}
      <div className="flex justify-end mt-10 gap-4">
        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg shadow transition duration-300"
        >
          ยืนยัน
        </button>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-8 rounded-lg shadow transition duration-300"
        >
          ยกเลิก
        </button>
      </div>
      </div>
    </div>
  );
};

export default RegisDetail;
