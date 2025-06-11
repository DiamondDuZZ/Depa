import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = ({
  toggleSidebar,
  isSidebarCollapsed,
  setIsCareerPathOpen,
  setIsHealthOpen,
  setIsWealthOpen,
}) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [userRole, setUserRole] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "N/A";
  const userRoleID = user?.nameroleId || "N/A";
  const userImg = user?.img;
  const userId = user?.userId;

  // ฟังก์ชันดึงข้อมูล role จาก API
  const fetchUserRole = async () => {
    if (!userRoleID || userRoleID === "N/A") return;
    
    try {
      const response = await fetch("http://localhost:3000/api/nameroles/getNamerole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nameroleId: userRoleID }),
      });
      
      const data = await response.json();
      if (data.success && data.namerole) {
        setUserRole(data.namerole.namerole_name || "N/A");
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      setUserRole("N/A");
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, [userRoleID]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  if (location.pathname === "/login") return null;

  const getTitle = (pathname) => {
    const paths = pathname.split("/").filter(Boolean);
    return paths.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" > ");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <nav
      className={`bg-white shadow-md p-4 flex justify-between items-center fixed top-5 left-10 right-1 rounded-[20px] transition-all duration-300 h-[90px] z-50 ${
        isSidebarCollapsed ? "ml-0 md:ml-[80px] mr-0" : "ml-0 md:ml-60 mr-0"
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
      style={{ maxWidth: "calc(100% - 20px)", marginRight: "20px" }}
    >
      <div className="flex w-full items-center">
        <div className="flex-none w-14 flex items-center justify-center">
          <button
            onClick={() => {
              toggleSidebar();
              setIsCareerPathOpen(false);
              setIsHealthOpen(false);
              setIsWealthOpen(false);
            }}
            className="text-2xl focus:outline-none flex items-center justify-center"
            style={{ color: "#0C2F53" }}
          >
            ☰
          </button>
        </div>
        <div className="flex-auto flex items-center text-left">
          <h1
            className="depa-Subtitle-text font-bold"
            style={{ color: "#0C2F53" }}
          >
            {getTitle(location.pathname)}
          </h1>
        </div>
        <div className="relative flex-none">
          {/* Username + Role + Profile Image */}
          <div
            className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {/* Username และ Role */}
            <div className="mr-3 text-right">
              <div
                className="font-bold text-lg leading-tight"
                style={{ color: "#0C2F53" }}
              >
                {username}
              </div>
              <div
                className="text-sm opacity-75 leading-tight"
                style={{ color: "#0C2F53" }}
              >
                {userRole}
              </div>
            </div>

            {/* Profile Image */}
            <div
              className="w-12 h-12 rounded-full overflow-hidden border-2 flex items-center justify-center transition-all duration-200 hover:shadow-lg"
              style={{ borderColor: "#0C2F53" }}
            >
              {userImg && !imageError ? (
                <img
                  src={userImg}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center rounded-full"
                  style={{ 
                    background: "linear-gradient(135deg, #0C2F53 0%, #1e4b73 100%)",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)"
                  }}
                >
                  <div className="relative">
                    {/* Background Circle */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-20"
                      style={{ 
                        background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)"
                      }}
                    />
                    
                    {/* User Icon */}
                    <FaUser
                      size={20}
                      className="text-white drop-shadow-sm relative z-10"
                      style={{ 
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden transition-all">
              <div className="flex flex-col">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-white bg-white hover:bg-gradient-to-r from-red-500 to-red-600 transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M9 12h12l-3 -3" />
                    <path d="M18 15l3 -3" />
                  </svg>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;