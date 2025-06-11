import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterMain = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    setError("");
    // ... ดำเนินการสมัครสมาชิกต่อ ...
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#FFC600] to-[#FFF200] flex items-center justify-center p-6">
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
        <div className="w-1/2 p-8 flex flex-col justify-center items-center">
          <h2 className="text-center text-gray-600 mb-10 text-[48px] font-semibold text-navy-blue pt-6">สมัครสมาชิก</h2>
          
          <form className="space-y-6 w-full max-w-md mx-auto flex flex-col items-center" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="flex items-center gap-4 w-full">
              <label
                htmlFor="username"
                className="text-navy-blue font-semibold whitespace-nowrap"
                style={{ minWidth: '140px' }}
              >
                Username :
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="grow px-4 py-3 border border-navy-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="กรอกชื่อผู้ใช้"
                required
              />
            </div>

            {/*password*/}
            <div className="flex items-center gap-4 w-full">
              <label
                htmlFor="password"
                className="text-navy-blue font-semibold whitespace-nowrap"
                style={{ minWidth: '140px' }}
              >
                Password :
              </label>
              <div className="relative grow">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 border border-navy-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="กรอกรหัสผ่าน"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-blue text-xl focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            {/* Confirm Password */}
            <div className="flex items-center gap-4 w-full ">
              <label
                htmlFor="confirmPassword"
                className="text-navy-blue font-semibold whitespace-nowrap"
                style={{ minWidth: '140px' }}
              >
                Confirm Password
              </label>
              <div className="relative grow">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-3 border border-navy-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="ยืนยันรหัสผ่าน"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-blue text-xl focus:outline-none"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 w-full text-center font-medium">{error}</div>
            )}

            {/*ปุ่มสมัครสมาชิก*/}    
            <button 
              type="submit"
              className="w-[360px] h-[60px] bg-gradient-to-r from-[#FFF200] to-[#FFD304] rounded-[15px] font-medium text-xl font-semibold text-navy-blue shadow-xl mt-10"
            >
              สมัครสมาชิก
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterMain;