import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const ModalSeenComment = ({ isOpen, onClose, assignment }) => {
  const [comment, setComment] = useState("");

  // ✅ โหลดค่าใหม่ทุกครั้งที่กดเปิด Modal (isOpen === true)
  useEffect(() => {
    if (isOpen && assignment) {
      setComment(assignment.comment || "ไม่มีความคิดเห็น");
    }
  }, [isOpen]); // ใช้ isOpen เป็น dependency

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50 rounded-[10px]">
      <div className="bg-white rounded-xl p-6 w-[600px] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-navy-blue">คำอธิบาย</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <hr className="mb-4" />

        {/* Scrollable History */}
        <div className="max-h-[250px] overflow-y-auto pr-2">
          <ul className="space-y-4">
            <p>{comment}</p>
          </ul>
        </div>

        {/* ปุ่มปิด */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-[#DD2025] shadow-md text-white font-medium rounded-3xl hover:bg-red-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            ปิด
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalSeenComment;
