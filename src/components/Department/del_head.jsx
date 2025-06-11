import React from "react";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";

const ModalDelHead = ({ isOpen, onClose, head, handleChangeHead }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50 rounded-[10px]">
      <div className="bg-white rounded-xl p-6 w-[600px] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-red-600">
            ยืนยันการลบพี่เลี้ยง
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition duration-200"
          >
            ✕
          </button>
        </div>

        <hr className="mb-4" />

        {/* รายละเอียด */}
        <div className="max-h-[250px] overflow-y-auto pr-2">
          <p className="text-lg text-gray-700">
            คุณแน่ใจหรือไม่ว่าต้องการลบพี่เลี้ยง:
          </p>
          <p className="text-lg font-semibold text-red-500">
            ลบหัวหน้า <br />
            {head?.name || "ไม่พบชื่อ"}
          </p>
        </div>

        {/* ปุ่ม */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white font-medium rounded-3xl hover:bg-gray-500 transition"
          >
            ยกเลิก
          </button>
          <button
            onClick={() => {
              handleChangeHead(); // ✅ เรียกใช้ฟังก์ชันลบพี่เลี้ยง
              
              onClose(); // ปิด modal
            }}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-3xl hover:bg-red-700 transition"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalDelHead;
