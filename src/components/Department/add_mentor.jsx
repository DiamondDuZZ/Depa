import React, { useEffect, useState } from "react";
import Select from "react-select"; // อย่าลืมติดตั้ง react-select และ import ให้ถูกต้อง
import { toast } from "react-toastify";
import ReactDOM from "react-dom";

const Addmentor = ({ isOpen, onClose, task, setTask }) => {
  const [comment, setComment] = useState("");
  const [allUsers, setAllUsers] = useState([]); // เก็บตัวเลือกทั้งหมด
  const [selectedUser, setSelectedUser] = useState(null); // เก็บค่าที่เลือกจาก Select

  // โหลดค่าใหม่ทุกครั้งที่กดเปิด Modal (isOpen === true)
  useEffect(() => {
    if (isOpen && task) {
      setComment(task.user_id || "ไม่มีความคิดเห็น");
    }
  }, [isOpen, task]);

  // เรียก API เพื่อดึงรายชื่อผู้ใช้ทั้งหมด
  useEffect(() => {
    fetch("http://localhost:3000/api/users/gethorm")
      .then((res) => res.json())
      .then((data) => {
        // แปลงข้อมูลจาก API ให้อยู่ในรูป { value, label }
        const transformedData = data.map((user) => ({
          value: user.user_id,
          label: `${user.f_name} (${user.depart_name})`,
        }));
        setAllUsers(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // จัดการเมื่อมีการเปลี่ยนค่าใน Select
  const handleUserChange = (option) => {
    setSelectedUser(option); // option = { value: user_id, label: f_name (depart_name) }
    console.log("Selected User:", option);
  };

  // ฟังก์ชันสำหรับส่งข้อมูลไปยัง API
  const handleSave = async () => {
    // ตรวจสอบว่ามีการเลือกข้อมูลหรือไม่
    if (!selectedUser) {
      alert("กรุณาเลือกชื่อจากรายการ");
      return;
    }

    // สร้าง payload สำหรับส่งไปยัง API
    const payload = {
      mentorUserId: selectedUser.value, // user_id ที่เลือก
      user_id: comment, // ข้อความ comment (อาจเป็นข้อมูลเพิ่มเติม)
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/relations/updateMentor",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setTask((prevTask) => ({
          ...prevTask,
          mentor: selectedUser.value, // อัปเดตเฉพาะ mentor
        }));
        // ส่งข้อมูลสำเร็จ
        toast.success("🎉 เพิ่มพี่เลี้ยงสำเร็จ!");
        setSelectedUser(null);
        onClose(); // ปิด modal เมื่อบันทึกสำเร็จ
      } else {
        console.error("Error saving mentor data");
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("Error saving mentor data:", error);
      toast.error("เกิดข้อผิดพลาด! ไม่สามารถบันทึกข้อมูลได้");
    }
  };

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

        {/* Select รายชื่อ (f_name และ depart_name) แต่เก็บค่าเป็น user_id */}
        <Select
          options={allUsers} // ตัวเลือกทั้งหมดที่ได้จาก API
          value={selectedUser} // ค่าที่ถูกเลือกในปัจจุบัน
          onChange={handleUserChange}
          placeholder="เลือกชื่อ"
        />

        {/* แสดงผล comment หรือค่าที่คุณต้องการ */}
        <div className="max-h-[250px] overflow-y-auto pr-2 mt-4">
          <ul className="space-y-4">
            <p>{comment}</p>
          </ul>
        </div>

        {/* ปุ่มบันทึก */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-[#33AC5E] shadow-md text-white font-medium rounded-3xl hover:bg-green-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 12l2 2l4 -4" />
            </svg>
            บันทึก
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Addmentor;
