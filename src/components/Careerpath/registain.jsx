import React from 'react';

export default function Registain({ isOpen, onClose }) {
  if (!isOpen) return null; // ไม่แสดง popup ถ้า isOpen เป็น false

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // ปิด popup เมื่อคลิกพื้นที่รอบนอก
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

        {/* ภาพ Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://via.placeholder.com/300" // แก้ URL เป็นรูปของคุณ
            alt="Popup Header"
            className="w-full md:w-1/3 rounded-md"
          />

          {/* ข้อมูลใน Popup */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              เคล็ดลับการทำงานให้ปัง
            </h2>
            <p className="text-gray-600 mb-4">
              ปลดล็อกศักยภาพการทำงานด้วยเคล็ดลับและกลยุทธ์ที่จะช่วยให้คุณทำงานได้อย่างมีประสิทธิภาพ เพิ่มความมั่นใจในการสื่อสาร การจัดการเวลา และการทำงานเป็นทีม
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>
                <strong>วัตถุประสงค์:</strong> เพื่อเพิ่มประสิทธิภาพการทำงาน
              </li>
              <li>
                <strong>ระยะเวลาอบรม:</strong> 4 ชั่วโมง 30 นาที
              </li>
              <li>
                <strong>ระยะเวลาลงทะเบียน:</strong> หมดเขต 10 มกราคม 2025
              </li>
              <li>
                <strong>สถานที่:</strong> ห้อง 804 บริคอท
              </li>
              <li>
                <strong>วิทยากร:</strong> ดร.ปัญญา พัฒนาพงษ์
              </li>
            </ul>
          </div>
        </div>

        {/* ปุ่มลงทะเบียน */}
        <div className="mt-6 text-center">
          <button className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition">
            ลงทะเบียน
          </button>
        </div>
      </div>
    </div>
  );
}
