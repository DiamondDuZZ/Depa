import React from 'react';

export default function PrivacyPolicyPopup({ isOpen, onClose }) {
  if (!isOpen) return null; // ไม่แสดง popup ถ้า isOpen เป็น false

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"

    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} // หยุดการส่ง event เมื่อคลิกข้างใน popup
      >
        {/* ปุ่มปิด Popup */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>

        {/* หัวข้อ */}
        <h2 className="text-lg font-bold text-gray-700 mb-2">
          นโยบายความเป็นส่วนตัว
        </h2>
        <div className="border-b border-gray-300 mb-4"></div>

        {/* เนื้อหา */}
        <div className="text-gray-600 leading-relaxed">
          <p>
            สำนักงานส่งเสริมเศรษฐกิจดิจิทัลมีความมุ่งมั่นที่จะปกป้องความเป็นส่วนตัวของข้อมูลส่วนบุคคลของคุณ
            เราจะใช้ข้อมูลที่คุณให้ไว้เพื่อประโยชน์ของคุณเท่านั้น และจะไม่เปิดเผยข้อมูลส่วนบุคคลของคุณแก่บุคคลภายนอก
            ยกเว้นกรณีที่ได้รับความยินยอมจากคุณ
          </p>
          <p className="mt-4">
            กรุณาอ่านรายละเอียดเพิ่มเติมในเอกสารนโยบายความเป็นส่วนตัวฉบับเต็ม หรือหากคุณมีข้อสงสัยเพิ่มเติม
            โปรดติดต่อเรา
          </p>
        </div>
      </div>
    </div>
  );
}
