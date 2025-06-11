import React, { useState, useEffect } from "react";
import LocationSelector from "./LocationSelector";

const defaultFormDataAddress = {
  permanent: {
    address_line: "",
    province: "",
    amphure: "",
    tambon: "",
    zip_code: "",
    phone_number: "",
  },
  current: {
    address_line: "",
    province: "",
    amphure: "",
    tambon: "",
    zip_code: "",
  },

};

const Address = ({ formDataAddress, setFormDataAddress }) => {
  const [isSameAddress, setIsSameAddress] = useState(false);

  // ฟังก์ชัน Handle Checkbox
  const handleSameAddressChange = (e) => {
    const checked = e.target.checked;
    setIsSameAddress(checked);

    if (checked) {
      setFormDataAddress((prev) => {
        if (!prev.permanent) {
          console.error("Permanent address is empty!");
          return prev;
        }

        return {
          ...prev,
          current: { ...prev.permanent },
        };
      });
    } else {
      setFormDataAddress((prev) => ({
        ...prev,
        current: {
          address_line: "",
          province: "",
          amphure: "",
          tambon: "",
          zip_code: "",
        },
      }));
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-700 mb-4">ข้อมูลสถานที่ ADDRESS</h2>

      {/* ภูมิลำเนาเดิม Permanent Address */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          ภูมิลำเนาเดิม Permanent Home Address
        </label>
        <LocationSelector
          onLocationChange={(location) =>
            setFormDataAddress((prev) => ({
              ...prev,
              permanent: {
                ...location,
                phone_number: prev.permanent.phone_number || location.phone_number, // ✅ เก็บ phone_number เดิม
              },
            }))
          }
          value={formDataAddress.permanent}
        />

        <input
          type="text"
          name="permanent_address"
          value={formDataAddress?.permanent?.address_line || ""}
          onChange={(e) =>
            setFormDataAddress((prev) => ({
              ...prev,
              permanent: { ...prev.permanent, address_line: e.target.value },
            }))
          }
          placeholder="กรุณากรอกภูมิลำเนาเดิม *"
          className="w-[400px] h-[31px] mt-3 pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
        />
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded"></div>

      {/* ที่อยู่ปัจจุบัน Current Address */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          ที่อยู่ปัจจุบัน Current Address
        </label>
        <LocationSelector
          onLocationChange={(location) =>
            setFormDataAddress((prev) => ({
              ...prev,
              current: { ...location },
            }))
          }
          value={formDataAddress.current}
        />
        <div className="flex items-center space-x-2 mb-2 ml-2">
          <input
            type="checkbox"
            id="same-address"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            checked={isSameAddress}
            onChange={handleSameAddressChange}
          />
          <label htmlFor="same-address" className="text-gray-700">
            ตามที่อยู่เดิม
          </label>
        </div>
        <input
          type="text"
          name="current_address"
          value={formDataAddress?.current?.address_line || ""}
          onChange={(e) =>
            setFormDataAddress((prev) => ({
              ...prev,
              current: { ...prev.current, address_line: e.target.value },
            }))
          }
          placeholder="กรุณากรอกที่อยู่ปัจจุบัน *"
          className="w-[400px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
        />
      </div>

      {/* โทรศัพท์มือถือ */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          โทรศัพท์มือถือ Mobile Phone
        </label>
        <input
          type="text"
          name="phone_number"
          value={formDataAddress?.permanent?.phone_number || ""}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) {
              setFormDataAddress((prev) => ({
                ...prev,
                permanent: {
                  ...prev.permanent,
                  phone_number: value, // ✅ ต้องอัปเดต phone_number
                },
              }));
            }
          }}
          placeholder="กรุณากรอกโทรศัพท์มือถือ *"
          className="w-[400px] h-[31px] pl-2 pb-1 border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400"
        />

      </div>
    </div>
  );
};

export default Address;
