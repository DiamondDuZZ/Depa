import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Mainmenu from "./pages/mainmenu";
import Careerpath from "./pages/careerpath";
import Wealth from "./pages/wealth";
import Wealth2 from "./pages/wealth2";

import HealthA from "./pages/health_a";
import HealthB from "./pages/health_b";
import HealthMain from "./pages/health_main";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Editprofile from "./pages/editprofile";
import Hr_detail from "./pages/hr_detail_new";
import Assignment from "./pages/assignment";
import Routine from "./pages/routine";
import Hr from "./pages/hr";
import HrDetail from "./components/HR/hr_detail";
import Mentor from "./pages/mentor";
import DepartmentH from "./pages/department_head";
import DepartmentHD from "./pages/department_head_detail";
import Editdevelopment from "./pages/editdevelopment";
import Department_other from "./pages/department_other";
import Department_other_detail from "./pages/department_other_detail";
import User from "./pages/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/register";
import PDPA from "./pages/PDPA"; 
import RegisterMain from "./pages/register_main";
import RegisterDetail from "./pages/register_detail"; 


function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ตรวจสอบ userId ใน localStorage และ Redirect ไปที่ /login ถ้าไม่มี
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.userId) {
      navigate("/login"); // Redirect ไปหน้า Login
    }
  }, [navigate]); // ทำงานทุกครั้งที่ path เปลี่ยน

  //health A
  const [height, setHeight] = useState(167);
  const [weight, setWeight] = useState(63);

  //sidebar
  const [isCareerPathOpen, setIsCareerPathOpen] = useState(false);
  const [isHealthOpen, setIsHealthOpen] = useState(false);
  const [isWealthOpen, setIsWealthOpen] = useState(false);
  //sidebar

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); 
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <div className="hidden md:block">
        {!isLoginPage && (
          <Sidebar
            toggleSidebar={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            isCareerPathOpen={isCareerPathOpen}
            setIsCareerPathOpen={setIsCareerPathOpen}
            isHealthOpen={isHealthOpen}
            setIsHealthOpen={setIsHealthOpen}
            isWealthOpen={isWealthOpen}
            setIsWealthOpen={setIsWealthOpen}
          />
        )}
      </div>
      <main
        className={`${
          isLoginPage
            ? "min-h-screen"
            : `ml-0 md:bg-gray-light3 pt-[120px] p-6 min-h-screen overflow-x-auto ${
                isSidebarCollapsed ? "md:ml-[96px]" : "md:ml-64"
              }`
        }`}
      >
        {!isLoginPage && (
          <Navbar
            toggleSidebar={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            setIsCareerPathOpen={setIsCareerPathOpen}
            setIsHealthOpen={setIsHealthOpen}
            setIsWealthOpen={setIsWealthOpen}
          />
        )}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Mainmenu />} />
          <Route path="/careerpath" element={<Careerpath />} />
          <Route path="/wealth/wealth1" element={<Wealth />} />
          <Route path="/wealth/wealth2" element={<Wealth2 />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/hr_detail" element={<Hr_detail />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/hr" element={<Hr />} />
          <Route path="/hr_detail" element={<HrDetail />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/department_head" element={<DepartmentH />} />
          <Route path="/department_head_detail" element={<DepartmentHD />} />
          <Route path="/editdevelopment" element={<Editdevelopment />} />
          <Route path="/user" element={<User/>} />
          <Route path="/department_other" element={<Department_other/>} />
          <Route path="/department_other_detail" element={<Department_other_detail/>} />

          <Route path="/health/healtha" element={<HealthA/>} />
          <Route path="/health/healthb" element={<HealthB/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </main>
    </>
  );
}

export default App;