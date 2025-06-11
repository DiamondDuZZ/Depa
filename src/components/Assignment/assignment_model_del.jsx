import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";

const ModalDel = ({ isOpen, onClose, assignment }) => {
  const [assignment_id, setAssignmentId] = useState("");
  const [name, setName] = useState("");

  // ✅ โหลดค่าใหม่ทุกครั้งที่เปิด Modal
  useEffect(() => {
    if (isOpen && assignment) {
      setAssignmentId(assignment.assignment_id || "");
      setName(assignment.name || "");
    }
  }, [isOpen, assignment]);

  // ✅ ฟังก์ชันลบ assignment
  const handleDelete = async () => {
    if (!assignment_id) {
      toast.error("ไม่พบ Assignment ที่จะลบ");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/assignments/delete/${assignment_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("🎉 ลบข้อมูลสำเร็จ!");
        onClose();
      } else {
        throw new Error("ลบข้อมูลไม่สำเร็จ");
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด! ไม่สามารถลบข้อมูลได้");
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50 rounded-[10px]">
      <div className="bg-white rounded-xl p-6 w-[600px] shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-red-600">ยืนยันการลบ</h2>
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
          <p className="text-lg text-gray-700">คุณแน่ใจหรือไม่ว่าต้องการลบ:</p>
          <p className="text-lg font-semibold text-red-500">{name}</p>
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
            onClick={handleDelete}
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

export default ModalDel;
