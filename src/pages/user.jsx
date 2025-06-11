import React, { useState, useEffect } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // เก็บค่าคำค้นหา

  useEffect(() => {
    fetch("http://localhost:3000/admin/user/getuser")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleChange = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  const handleSave = (index) => {
    const { user_id, ...updatedData } = users[index];
    fetch(`http://localhost:3000/admin/user/update/${user_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          alert("🎉 อัปเดตข้อมูลสำเร็จ!");
        } else {
          throw new Error("⚠️ บันทึกข้อมูลไม่สำเร็จ");
        }
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  // ฟังก์ชันกรองข้อมูลผู้ใช้ตามคำค้นหา
  const filteredUsers = users.filter(
    (user) =>
      user.f_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-white min-h-screen rounded-xl drop-shadow-md">
      <h1 className="depa-Header-text text-navy-blue mb-6 mt-2">
        จัดการข้อมูลผู้ใช้งาน
      </h1>

      <div className="flex items-center justify-between w-full gap-4">
        <div className="relative w-[300px] sm:w-[400px]">
          <input
            type="text"
            placeholder="ค้นหารายชื่อหรืออีเมล..."
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
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-b-2xl mt-6">
          <thead>
            <tr className="bg-[#0C2F53] text-white text-center">
              <th className="py-3 px-4">User ID</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Password</th>
              <th className="py-3 px-4">ชื่อ</th>
              <th className="py-3 px-4">นามสกุล</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">สถานะ</th>
              <th className="py-3 px-4">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.user_id}
                className={`text-center hover:bg-gray-200 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"
                }`}
              >
                <td className="py-3 px-4 text-[#686868]">{user.user_id}</td>
                <td className="py-3 px-4 text-[#686868]">
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={user.username}
                    disabled
                  />
                </td>
                <td className="py-3 px-4 text-[#686868]">
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={user.password}
                    disabled
                  />
                </td>
                <td className="py-3 px-4 text-[#686868]">
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={user.f_name || ""}
                    onChange={(e) =>
                      handleChange(index, "f_name", e.target.value)
                    }
                  />
                </td>
                <td className="py-3 px-4 text-[#686868]">
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={user.l_name || ""}
                    onChange={(e) =>
                      handleChange(index, "l_name", e.target.value)
                    }
                  />
                </td>
                <td className="py-3 px-4 text-[#686868]">
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={user.email}
                    disabled
                  />
                </td>
                <td className="py-3 px-4 text-[#686868]">
                  <select
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={user.status}
                    onChange={(e) =>
                      handleChange(index, "status", e.target.value)
                    }
                  >
                    <option value="T">Probation</option>
                    <option value="H">HR</option>
                    <option value="M">Mentor</option>
                    <option value="L">Leader</option>
                    <option value="A">Admin</option>
                    <option value="S">Suspend</option>
                  </select>
                </td>
                <td className="py-3 px-4 flex justify-center">
                  <button
                    onClick={() => handleSave(index)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
                  >
                    <span>บันทึก</span>
                  </button>
                </td>
              </tr>
            ))}

            {/* ถ้าไม่พบข้อมูล */}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  🔎 ไม่พบข้อมูลที่ตรงกับคำค้นหา
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
