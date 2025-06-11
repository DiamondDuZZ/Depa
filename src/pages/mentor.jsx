import React, { useState, useEffect } from "react";
import MentorEvaluation from "./mentor_evaluation";

const Mentor = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser?.userId || "N/A");
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (userId && userId !== "N/A") {
      fetchListMentor(userId);
    }
  }, [userId]);
  
  const fetchListMentor = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/relations/getmen?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data, status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched Data:", data); // ตรวจสอบว่าข้อมูล API ออกมาเป็นอย่างไร
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  

  const handleOpenPopup = (employee) => {
    setSelectedEmployee(employee);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const filteredEmployees = employees.filter((employee) =>
    (employee.f_name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

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
  

  return (
    <div className="p-8 bg-white min-h-screen rounded-xl drop-shadow-md">
      <h1 className="depa-Header-text text-navy-blue mb-6 mt-2">
        รายชื่อพนักงานในการดูแล
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
        </div>
      </div>
      <table className="table-auto w-full bg-white shadow-md rounded-b-2xl mt-6">
        <thead>
          <tr className="bg-[#0C2F53] text-white text-center">
            <th className="py-3 px-4">ลำดับ</th>
            <th className="py-3 px-4">ชื่อ</th>
            <th className="py-3 px-4">แผนก</th>
            <th className="py-3 px-4">วันที่สิ้นสุด</th>
            <th className="py-3 px-4">ประเมินความพึงพอใจ</th>
          </tr>
        </thead>
        <tbody>
  {filteredEmployees.length === 0 ? (
    <tr>
      <td colSpan="5" className="py-4 text-center text-gray-500">
        ยังไม่มีข้อมูล
      </td>
    </tr>
  ) : (
    filteredEmployees.map((employee, index) => (
      <tr
        key={index}
        className={`text-center ${index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}`}
      >
        <td className="py-3 px-4 text-[#686868]">{index + 1}</td>
        <td className="py-3 px-4 text-[#686868]">{employee.f_name}</td>
        <td className="py-3 px-4 text-[#686868]">{employee.depart_name}</td>
        <td className="py-3 px-4 text-[#686868]">
          {formatDateTime(employee.evaluate_expired)}
        </td>
        <td className="py-3 px-4 text-base">
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleOpenPopup(employee)}
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-text"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                <path d="M9 12h6" />
                <path d="M9 16h6" />
              </svg>
              <p className="ml-2">ประเมิน</p>
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>
      <MentorEvaluation isOpen={showPopup} onClose={handleClosePopup} employee={selectedEmployee} />
    </div>
  );
};

export default Mentor;
