import React, { useState, useEffect } from "react";
import Register from "../components/register";
import dayjs from "dayjs"; // ใช้ DayJS ในการจัดการวันที่
import duration from "dayjs/plugin/duration";
import "dayjs/locale/th"; // ตั้งค่าเป็นภาษาไทย
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Hr = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // state สำหรับข้อความค้นหา
  const navigate = useNavigate(); // ✅ ใช้ navigate เพื่อเปลี่ยนหน้า

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    fetchUsers();
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/getHr`);
      const data = await response.json();
      setUsersData(data);
    } catch (error) {
      console.error("Error fetching assignment data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  // กรองข้อมูลโดยค้นหาตามชื่อ (user.f_name)
  // กรองข้อมูลโดยตรวจสอบก่อนว่า user.f_name มีค่าหรือไม่
  const filteredUsers = usersData.filter((user) => {
    const fName = user.f_name || ""; // ถ้าไม่มีค่า ให้เป็นสตริงว่าง
    return fName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleCheckWork = (task) => {
    navigate("/hr_detail", { state: { task } });
  };

  return (
    <div className="p-8 bg-white min-h-screen rounded-xl drop-shadow-md">
      <h1 className="depa-Header-text text-navy-blue mb-6 mt-2">
        รายชื่อพนักงานทดลองงาน
      </h1>
      <div className="flex items-center justify-between w-full gap-4">
        <div className="relative w-[300px] sm:w-[400px]">
          <input
            type="text"
            placeholder="ค้นหารายชื่อ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 px-4 text-sm text-gray-700 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          />
          <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35"
              />
            </svg>
          </button>
        </div>

        <button
          onClick={handleOpenPopup}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white  cursor-pointer hover:from-green-600 hover:to-green-700  font-medium py-2 px-5 shadow-sm rounded-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          <span>เพิ่มสมาชิก</span>
        </button>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md z-50 rounded-md">
            <div className="relative bg-white rounded-xl shadow-2xl p-8 w-[600px] sm:w-[800px] md:w-[1000px] lg:w-[1200px] scale-105 transition-transform duration-300 ease-in-out">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110"
                onClick={handleClosePopup}
              >
                &times;
              </button>
              <Register handleClosePopup={handleClosePopup} />
            </div>
          </div>
        )}
      </div>
      <table className="table-auto w-full bg-white shadow-md rounded-b-2xl mt-6">
        <thead>
          <tr className="bg-[#0C2F53] text-white text-center">
            <th className="py-3 px-4">ลำดับ</th>
            <th className="py-3 px-4">ชื่อ</th>
            <th className="py-3 px-4">แผนก</th>
            <th className="py-3 px-4">วันที่สิ้นสุด</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr
              key={index}
              className={`text-center ${
                index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
              }`}
            >
              <td className="py-3 px-4 text-[#686868]">{index + 1}</td>
              <td className="py-3 px-4 text-[#686868]">{user.f_name}</td>
              <td className="py-3 px-4 text-[#686868]">{user.depart_name}</td>
              <td className="py-3 px-4 text-[#686868]">
                {formatDateTime(user.evaluate_expired)}
              </td>

              <td className="py-3 px-4 text-base">
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => handleCheckWork(user)}
                    className="flex items-center justify-center text-[14px] drop-shadow-lg bg-gradient-to-r from-[#74C5FF] to-[#3B82F6] text-white rounded-full py-2 px-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-file-search"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" />
                      <path d="M16.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
                      <path d="M18.5 19.5l2.5 2.5" />
                    </svg>
                    <p className="ml-2">ตรวจสอบงาน</p>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Hr;
