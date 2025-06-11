import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State สำหรับ Dropdown
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "N/A"; // ถ้าไม่มี user_id ให้แสดง "N/A"

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

  if (location.pathname === "/login") return null; // ซ่อน Navbar ในหน้า Login

  const getTitle = (pathname) => {
    const paths = pathname.split("/").filter(Boolean);
    return paths.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" > ");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
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
      <div className="flex w-full">
        <div className="flex-none w-14">
          <button
            onClick={() => {
              toggleSidebar();
              setIsCareerPathOpen(false);
              setIsHealthOpen(false);
              setIsWealthOpen(false);
            }}
            className="text-gray-800 text-2xl focus:outline-none"
          >
            ☰
          </button>
        </div>
        <div className="flex-auto text-left">
          <h1 className="depa-Subtitle-text text-navy-blue font-bold">
            {getTitle(location.pathname)}
          </h1>
        </div>
        <div className="relative flex-none">
          {/* ✅ Username + Dropdown Icon */}
          <div
            className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-gray-700 mr-2 font-bold">{username}</span>

            {/* ✅ ไอคอนลูกศร (Chevron Down) */}
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
              className={`transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          {/* ✅ Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl  overflow-hidden transition-all">
              <div className="flex flex-col">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-white bg-white hover:bg-gradient-to-r from-red-500 to-red-600 transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  {/* ✅ ไอคอน Logout */}
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
