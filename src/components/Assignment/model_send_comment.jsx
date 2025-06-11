import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";

const ModalSendComment = ({ isOpen, onClose, assignment }) => {
  const [comment, setComment] = useState("");

  // ✅ โหลดค่าเริ่มต้นจาก assignment.user_comment ทุกครั้งที่เปิด Modal
  useEffect(() => {
    if (isOpen && assignment) {
      setComment(assignment.user_comment || "");
    }
  }, [isOpen, assignment]);

  // ✅ ฟังก์ชันอัปเดต comment ไปยัง API
  const handleSubmit = async () => {
    if (!assignment || !assignment.assignment_id) {
      toast.error("ไม่พบ Assignment ที่จะอัปเดต");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/assignments/update-comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignment_id: assignment.assignment_id,
          user_comment: comment,
        }),
      });

      if (response.ok) {
        toast.success("🎉 ส่งข้อมูลสำเร็จ!");
        onClose();
      } else {
        throw new Error("บันทึกข้อมูลไม่สำเร็จ");
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด! ไม่สามารถบันทึกข้อมูลได้");
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50 rounded-[10px]">
      <div className="bg-white rounded-xl p-6 w-[500px] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-navy-blue">
            เพิ่มคำอธิบาย
          </h2>
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

        {/* Toastify Container */}

        {/* Content */}
        <div className="flex gap-6 mt-6">
          {/* Input Area */}
          <div className="w-full">
            <textarea
              className="w-full h-60 border border-blue-400 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-400"
              placeholder="ข้อความ......"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              onClick={handleSubmit}
              className="mt-4 mb-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
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
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
              ส่งคำอธิบาย
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalSendComment;
