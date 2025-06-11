import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("เข้าสู่ระบบสำเร็จ!");
        // เก็บข้อมูลผู้ใช้ใน LocalStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("User data saved to localStorage:", data.user);
        navigate("/");
      } else {
        toast.error(data.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-[#FFC600] to-[#FFF200]">
      <div className="flex bg-white shadow-lg rounded-tr-[80px] rounded-bl-[80px] overflow-hidden w-[1300px] h-[800px]">
        {/* ส่วนโลโก้ */}
        <div className="relative w-1/2 flex items-center justify-center bg-white w-[567px]">
          {/* ครึ่งวงกลมพื้นหลัง */}
          <div className="absolute w-[700px] h-[630px] bg-gradient-to-t from-[#FFC600] to-[#FFF200] rounded-full left-[-350px] top-1/2 transform -translate-y-1/2"></div>

          {/* โลโก้ */}
          <div className="relative z-10 bg-white p-6 rounded-[50px] shadow-md">
            <img
              src="../src/assets/images/login/logodepa.jpg"
              alt="Logo"
              className="w-[300px] h-[300px] object-contain"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="h-[574px] w-[1px] bg-navy-blue"></div>
        </div>
        
        {/* ส่วนฟอร์ม */}
        <div className="w-1/2 p-12 flex flex-col pt-[110px] pr-0 pl-[120px] w-[630px]">
          <h2 className="text-center text-gray-600 mb-16 text-[48px] font-semibold text-navy-blue pt-6">
            ยินดีต้อนรับเข้าสู่ระบบ
          </h2>
          <form onSubmit={handleLogin}>
            {/* ช่อง Username */}
            <div className="relative mb-16">
              <input
                id="username"
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                className="border-navy-blue peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 w-[510px] h-[60px] bg-white shadow-xl"
              />
              <label
                htmlFor="username"
                className="absolute text-navy-blue left-4 top-0 transform translate-y-[-50%] bg-white px-1 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-2/4 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-yellow-500"
              >
                Username
              </label>
            </div>

            {/* ช่อง Password */}
            <div className="relative mb-8">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-navy-blue peer w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 w-[510px] h-[60px] bg-white shadow-xl"
              />
              <label
                htmlFor="password"
                className="text-navy-blue absolute text-gray-500 left-4 top-0 transform translate-y-[-50%] bg-white px-1 transition-all duration-300 pointer-events-none peer-placeholder-shown:top-2/4 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-yellow-500"
              >
                Password
              </label>
            </div>

            {/* จำค่าที่ฉันไว้ในระบบ และลืมรหัสผ่าน */}
            <div className="flex items-center justify-between mb-16">
              <label className="flex items-center text-16 text-navy-blue">
                <input
                  type="checkbox"
                  className="mr-2 w-[25px] h-[25px] border border-gray-300 rounded-md checked:bg-navy-blue"
                />
                จดจำฉันไว้ในระบบ
              </label>

              <a
                href="/reset-password"
                className="text-[16px] text-yellow-500 underline decoration-1 underline-offset-4 text-navy-blue"
              >
                ลืมรหัสผ่าน?
              </a>
            </div>

            {/* ปุ่ม Login */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-[360px] h-[60px] bg-gradient-to-r from-[#FFF200] to-[#FFD304] rounded-[15px] font-medium text-xl font-semibold text-navy-blue shadow-xl"
              >
                เข้าสู่ระบบ
              </button>
            </div>
              <a
                href=""
                className="flex justify-center text-[16px] text-yellow-500 underline decoration-1 underline-offset-4 text-navy-blue mt-8"
              >
                สมัครสมาชิกใหม่
              </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
