import { useState, useEffect } from "react";
import Select from "react-select";

const LocationSelector = ({ onLocationChange, value }) => {
  const [provinces, setProvinces] = useState([]); // รายชื่อจังหวัด
  const [selectedProvince, setSelectedProvince] = useState(null); // จังหวัดที่เลือก
  const [amphures, setAmphures] = useState([]); // รายชื่ออำเภอ
  const [selectedAmphure, setSelectedAmphure] = useState(null); // อำเภอที่เลือก
  const [tambons, setTambons] = useState([]); // รายชื่อตำบล
  const [selectedTambon, setSelectedTambon] = useState(null); // ตำบลที่เลือก
  const [zipCode, setZipCode] = useState(""); // รหัสไปรษณีย์

  // โหลดข้อมูลจังหวัดจากไฟล์ JSON
  useEffect(() => {
    fetch("/backend/api_province_with_amphure_tambon.json")
      .then((response) => response.json())
      .then((data) => setProvinces(data))
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error);
        alert("ไม่สามารถโหลดข้อมูลจังหวัดได้ กรุณาลองใหม่อีกครั้ง");
      });
  }, []);

  // ตั้งค่าเริ่มต้นเมื่อมี `value` ส่งเข้ามา
  useEffect(() => {
    if (value && provinces.length > 0) {
      const { province = null, amphure = null, tambon = null, zip_code = "" } = value;

      const selectedProvinceData = provinces.find((p) => String(p.id) === String(province));
      const selectedAmphureData = selectedProvinceData?.amphure?.find((a) => String(a.id) === String(amphure));
      const selectedTambonData = selectedAmphureData?.tambon?.find((t) => String(t.id) === String(tambon));

      setSelectedProvince(
        selectedProvinceData ? { value: selectedProvinceData.id, label: selectedProvinceData.name_th } : null
      );
      setAmphures(selectedProvinceData?.amphure || []);
      setSelectedAmphure(
        selectedAmphureData ? { value: selectedAmphureData.id, label: selectedAmphureData.name_th } : null
      );
      setTambons(selectedAmphureData?.tambon || []);
      setSelectedTambon(
        selectedTambonData ? { value: selectedTambonData.id, label: selectedTambonData.name_th } : null
      );
      setZipCode(zip_code);
    }
  }, [value, provinces]);


  // เมื่อผู้ใช้เลือกจังหวัด
  const handleProvinceChange = (selectedOption) => {
    const selectedProvinceData = provinces.find((p) => p.id === selectedOption.value);
    
    // ดึง phone_number เดิม ถ้ามีค่าอยู่แล้ว
    const existingPhoneNumber = value?.phone_number || "";
  
    setSelectedProvince(selectedOption);
    setAmphures(selectedProvinceData?.amphure || []);
    setSelectedAmphure(null);
    setTambons([]);
    setZipCode("");
  
    onLocationChange({
      province: selectedOption.value,
      amphure: "",
      tambon: "",
      zip_code: "",
      phone_number: existingPhoneNumber, // ✅ ใช้ค่า phone_number เดิม ถ้ามีอยู่แล้ว
    });
  };
  

  // เมื่อผู้ใช้เลือกอำเภอ
  const handleAmphureChange = (selectedOption) => {
    const selectedAmphureData = amphures.find((a) => a.id === selectedOption.value);
    setSelectedAmphure(selectedOption);
    setTambons(selectedAmphureData?.tambon || []);
    setSelectedTambon(null);
    setZipCode("");
    onLocationChange({
      province: selectedProvince?.value || "",
      amphure: selectedOption.value,
      tambon: "",
      zip_code: "",
    });
  };

  // เมื่อผู้ใช้เลือกตำบล
  const handleTambonChange = (selectedOption) => {
    const selectedTambonData = tambons.find((t) => t.id === selectedOption.value);
    const newZipCode = selectedTambonData?.zip_code || "";
    setSelectedTambon(selectedOption);
    setZipCode(newZipCode);
    onLocationChange({
      province: selectedProvince?.value || "",
      amphure: selectedAmphure?.value || "",
      tambon: selectedOption.value,
      zip_code: newZipCode,
    });
  };

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {/* จังหวัด */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">จังหวัด</label>
        <Select
          value={selectedProvince}
          onChange={handleProvinceChange}
          options={provinces.map((province) => ({
            value: province.id,
            label: province.name_th,
          }))}
          placeholder="เลือกจังหวัด"
        />
      </div>

      {/* อำเภอ */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">อำเภอ</label>
        <Select
          value={selectedAmphure}
          onChange={handleAmphureChange}
          options={amphures.map((amphure) => ({
            value: amphure.id,
            label: amphure.name_th,
          }))}
          placeholder="เลือกอำเภอ"
          isDisabled={!selectedProvince}
        />
      </div>

      {/* ตำบล */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">ตำบล</label>
        <Select
          value={selectedTambon}
          onChange={handleTambonChange}
          options={tambons.map((tambon) => ({
            value: tambon.id,
            label: tambon.name_th,
          }))}
          placeholder="เลือกตำบล"
          isDisabled={!selectedAmphure}
        />
      </div>

      {/* รหัสไปรษณีย์ */}
      <div>
        <label className="block text-gray-700 font-medium mb-2 ">รหัสไปรษณีย์</label>
        <input
          type="text"
          value={zipCode}
          readOnly
          className="w-full h-[35px] border border-gray-300 rounded px-2 bg-gray-100 "
        />
      </div>
    </div>
  );
};

export default LocationSelector;
