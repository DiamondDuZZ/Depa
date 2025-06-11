import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Department_H = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || "N/A"; // ถ้าไม่มี user_id ให้แสดง "N/A"
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); // ✅ ใช้ navigate เพื่อเปลี่ยนหน้า

  useEffect(() => {
    if (userId !== "N/A") {
      fetchTasks(userId);
    }
  }, [userId]);

  const fetchTasks = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/relations/tasks?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "ไม่ระบุ";

    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
    return `${formattedDate}`;
  };

  // ✅ ฟังก์ชันสำหรับไปที่หน้า Department_HD พร้อมส่งข้อมูล task ที่เลือก
  const handleCheckWork = (task) => {
    navigate("/department_head_detail", { state: { task } });
  };

  return (
    <div className="p-8 bg-white min-h-screen rounded-xl drop-shadow-md">
      <h1 className="depa-Header-text text-navy-blue mb-6 mt-2">
        รายชื่อพนักงานทดลองงาน
      </h1>
      <table className="table-auto w-full bg-white shadow-md rounded-b-2xl mt-6">
        <thead>
          <tr className="bg-[#0C2F53] text-white text-center">
            <th className="py-3 px-4">ลำดับ</th>
            <th className="py-3 px-4">ชื่อ</th>
            <th className="py-3 px-4">แผนก</th>
            <th className="py-3 px-4">วันที่สิ้นสุด</th>
            <th className="py-3 px-4">ความคืบหน้าในงาน</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr
                key={index}
                className={`text-center ${
                  index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
                }`}
              >
                <td className="py-3 px-4 text-[#686868]">{index + 1}</td>
                <td className="py-3 px-4 text-[#686868]">{task.f_name}</td>
                <td className="py-3 px-4 text-[#686868]">{task.depart_name}</td>
                <td className="py-3 px-4 text-[#686868]">
                  {formatDateTime(task.evaluate_expired)}
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-center items-center relative">
                    <div className="w-[200px] h-[30px] bg-gray-200 rounded-full dark:bg-gray-700 shadow-md relative">
                      {/* % Text กลาง Progress Bar */}
                      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-navy-blue z-10">
                        {task.progress}%
                      </span>

                      {/* Progress Bar */}
                      <div
                        className="h-[30px] bg-gradient-to-r from-[#FFC600] to-[#FFF200] rounded-full shadow-lg"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4 text-base">
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => handleCheckWork(task)} // ✅ กดแล้วไปหน้า Department_HD พร้อมส่งข้อมูล
                      className="flex items-center justify-center text-[14px] drop-shadow-lg bg-gradient-to-r from-[#74C5FF] to-[#3B82F6] text-white rounded-full py-2 px-3"
                    >
                      <img
                        src="../src/assets/images/button/check_work.png"
                        alt="ตรวจ"
                        className="mr-[10px]"
                      />
                      ตรวจสอบงาน
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                ไม่มีข้อมูล
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Department_H;
